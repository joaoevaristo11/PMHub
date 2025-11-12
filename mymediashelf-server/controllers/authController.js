import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fetch from "node-fetch" // ⚡ usamos fetch em vez de nodemailer
import User from "../models/User.js"

// ---------- REGISTO ----------
export const register = async (req, res) => {
  try {
    console.log("🟢 [REGISTER] Pedido recebido:", req.body)
    const { name, email, password } = req.body

    // 🔹 Verificar se o email já existe
    console.log("📩 A verificar se o email existe...")
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log("❌ Email já registado:", email)
      return res.status(400).json({ message: "Email already registered" })
    }

    // 🔹 Encriptar password
    console.log("🔐 A encriptar password...")
    const hashedPassword = await bcrypt.hash(password, 10)

    // 🔹 Criar novo utilizador
    const newUser = new User({ name, email, password: hashedPassword, verified: false })
    await newUser.save()
    console.log("✅ Utilizador criado:", newUser._id)

    // 🔹 Gerar token de verificação
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://justtakes.onrender.com"
        : "http://localhost:5000"

    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`
    console.log("🔗 URL de verificação:", verifyUrl)

    // ---------- Enviar email via Brevo API ----------
    console.log("📨 A enviar email de verificação via Brevo API...")
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "JustTakes", email: "contact.justtakes@gmail.com" },
        to: [{ email }],
        subject: "Verify your JustTakes account",
        htmlContent: `
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for registering on <strong>JustTakes</strong>.</p>
          <p>Please confirm your email by clicking the link below:</p>
          <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
          <br><br><p>This link will expire in 1 hour.</p>
        `,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error("❌ Erro ao enviar email via Brevo:", errText)
      return res.status(500).json({ message: "Failed to send verification email" })
    }

    console.log("✅ Email de verificação enviado com sucesso via Brevo!")
    res.status(201).json({ message: "User registered successfully! Please check your email." })
  } catch (err) {
    console.error("❌ [REGISTER ERROR]:", err)
    res.status(500).json({ message: "Signup error", error: err.message })
  }
}

// ---------- VERIFICAR EMAIL ----------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({status: "error", message: "User not found ❌"})

    if (user.verified)
      return res.status(200).json({status: "ok", message:"Email already verified ✅"})

    user.verified = true
    await user.save()

    res.status(200).json({status: "ok", message:"Email verified successfully ✅"})
  } catch (err) {
    res.status(400).json({status: "error", message:"Invalid or expired token ❌"})
  }
}

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log("📥 Login recebido para:", email)
    const existingUser = await User.findOne({ email })
    console.log("🔍 Resultado da pesquisa:", existingUser)

    if (!existingUser)
      return res.status(404).json({ message: "User not found" })

    if (!existingUser.verified)
      return res.status(401).json({ message: "Please verify your email before logging in." })

    const validPassword = await bcrypt.compare(password, existingUser.password)
    if (!validPassword)
      return res.status(401).json({ message: "Invalid password" })

    let isFirstLogin = false
    if (existingUser.firstLogin === undefined || existingUser.firstLogin === true) {
      isFirstLogin = true
      existingUser.firstLogin = false
      await existingUser.save()
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(200).json({
      message: isFirstLogin
        ? "Welcome! This is your first login 🎉"
        : "Welcome back!",
      firstLogin: isFirstLogin,
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ message: "Login error", error: err.message })
  }
}

// ---------- PERFIL (autenticado) ----------
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if (!user)
      return res.status(404).json({ message: "User not found" })

    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message })
  }
}
