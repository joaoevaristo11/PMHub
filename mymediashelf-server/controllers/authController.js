import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// ---------- REGISTO ----------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // verificar se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, verified: false});
    await newUser.save();

     // 🔹 Gera token de verificação (válido 1h)
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{
      expiresIn: "1h"
    })

    // 🔹 Configurar transporte de email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    // 🔹 Link de verificação
    const verifyUrl = `http://localhost:5000/api/auth/verify?token=${token}`;

    // 🔹 Envia o email
    await transporter.sendMail({
      from: `"JustTakes" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verifiy you JustTakes account",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering on <strong>JustTakes</strong>.</p>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
        <br><br>
        <p>This link will expire in 1 hour.</p>
      `,
    })

    res.status(201).json({
       message: "User registered successfully! Please check your email to verify your account.",
    })
  }catch (err) {
    console.error("Signup error details:", err);
    res.status(500).json({ message: "Signup error", error: err.message });
  }
}

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
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.verified)
      return res.status(401).json({ message: "Please verify your email before logging in." });


    // 🔹 Validar password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid password" });

    // 🔹 Verificar se é o primeiro login
    let isFirstLogin = false;
    if (user.firstLogin === undefined || user.firstLogin === true) {
      isFirstLogin = true;
      user.firstLogin = false; // já não é o primeiro login
      await user.save(); // atualizar na base de dados
    }

    // 🔹 Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 🔹 Resposta ao cliente
    res.status(200).json({
      message: isFirstLogin
        ? "Welcome! This is your first login 🎉"
        : "Welcome back!",
      firstLogin: isFirstLogin,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
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
