import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// ---------- REGISTO ----------
export const register = async (req, res) => {
  try {
    console.log("🟢 [REGISTER] Pedido recebido:", req.body);

    const { name, email, password } = req.body;

    console.log("📩 [STEP 1] A verificar se o email existe...");
    const existingUser = await User.findOne({ email });
    console.log("📩 [STEP 1] Resultado do findOne:", existingUser);

    if (existingUser) {
      console.log("❌ [STEP 1] Email já existente ->", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    console.log("🔐 [STEP 2] A encriptar password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("💾 [STEP 3] A criar novo utilizador...");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: false,
    });
    await newUser.save();
    console.log("✅ [STEP 3] Utilizador guardado:", newUser._id);

    // Gera token
    console.log("🎫 [STEP 4] A gerar token JWT...");
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Define URL de verificação
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://justtakes.onrender.com"
        : "http://localhost:5000";
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;
    console.log("🔗 [STEP 4] URL de verificação:", verifyUrl);

    // Configurar email
    console.log("📤 [STEP 5] A configurar transporte de email...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar email
    console.log("📨 [STEP 6] A enviar email para:", email);
    await transporter.verify()
    .then(() => console.log("✅ SMTP Gmail pronto para envio"))
    .catch((err) => console.error("❌ SMTP Gmail erro:", err));

    await transporter.sendMail({
      from: `"JustTakes" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your JustTakes account",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering on <strong>JustTakes</strong>.</p>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
        <br><br>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    console.log("✅ [STEP 6] Email enviado com sucesso!");
    res.status(201).json({
      message:
        "User registered successfully! Please check your email to verify your account.",
    });
  } catch (err) {
    console.error("❌ [REGISTER ERROR]:", err);
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};


export const verifyEmail = async(req, res)=>{
  try{
    const {token} = req.query
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)
    if(!user){
      return res.status(404).send("<h2>User not found ❌</h2>");
    }

    if(user.verified){
      return res.status(200).send("<h2>Email already verified ✅</h2>");
    }

    user.verified = true
    await user.save()

    res.status(200).send("<h2>Email verified successfully ✅</h2>");

  }catch(err){
    res.status(400).send("<h2>Invalid or expired token ❌</h2>");
  }
}

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Procurar utilizador
    console.log("📥 Login recebido para:", email);
    const existingUser = await User.findOne({ email });
    console.log("🔍 Resultado da pesquisa:", existingUser);

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // 🔹 Verificar se o email foi confirmado
    if (!existingUser.verified)
      return res.status(401).json({ message: "Please verify your email before logging in." });

    // 🔹 Validar password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid password" });

    // 🔹 Verificar se é o primeiro login
    let isFirstLogin = false;
    if (existingUser.firstLogin === undefined || existingUser.firstLogin === true) {
      isFirstLogin = true;
      existingUser.firstLogin = false;
      await existingUser.save();
    }

    // 🔹 Gerar token JWT
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 🔹 Resposta ao cliente
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
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};



// ---------- PERFIL (autenticado) ----------
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};
