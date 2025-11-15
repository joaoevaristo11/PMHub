import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { generateVerificationToken, createRefreshToken } from "../utils/generateVerificationToken.js"
import { createVerificationLink } from "../utils/createVerificationLink.js"
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js"

// ---------- REGISTO ----------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false
    })

    const token = generateVerificationToken(newUser._id)
    const verifyUrl = createVerificationLink(token)

    const emailSent = await sendVerificationEmail(name, email, verifyUrl)

    if (!emailSent)
      return res.status(500).json({ message: "Failed to send verification email" })

    return res
      .status(201)
      .json({ message: "User registered successfully! Please check your email." })
  } catch (err) {
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
    const { email, password, rememberMe } = req.body
    const existingUser = await User.findOne({ email })

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
    }

    const accessToken = generateVerificationToken(existingUser._id);
    const refreshToken = createRefreshToken(existingUser._id);

    if(rememberMe){
      existingUser.refreshToken = refreshToken
      existingUser.refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
    }else{
      // se não tiver rememberMe, limpamos qualquer refreshToken antigo
      existingUser.refreshToken = undefined;
      existingUser.refreshTokenExpires = undefined;
    }

    await existingUser.save();


    return res.status(200).json({
      message: isFirstLogin
        ? "Welcome! This is your first login 🎉"
        : "Welcome back!",
      firstLogin: isFirstLogin,
      token: accessToken,
      refreshToken: rememberMe ? refreshToken : null, // só mandamos refreshToken se rememberMe = true
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

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "User not found" })
    if (user.verified)
      return res.status(400).json({ message: "Account already verified" })

    const token = generateVerificationToken(user._id)
    const verifyUrl = createVerificationLink(token)

    const emailSent = await sendVerificationEmail(user.name, email, verifyUrl)

    if (!emailSent)
      return res.status(500).json({ message: "Failed to send verification email" })

    res.json({ message: "Verification email resent successfully!" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const refreshAccessToken = async (req, res)=>{
  try{
    const{refreshToken} = req.body
    if(!refreshAccessToken){
      return res.status(401).json({message: "Missing refresh token"})
    }

    let decoded
    try{
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    }catch(err){
      return res.status(401).json({message:"Invalid or expired refresh token"})
    }

    const user = await User.findById(decoded.id)
    if(!user){
      return res.status(401).json({message: "User not found"})
    }

    if(!user.refreshToken || user.refreshToken!==refreshToken || !user.refreshTokenExpires || 
      user.refreshTokenExpires.getTime()<Date.now()){
        return res.status(401).json({message: "Refresh token not valid anymore"})
    }

    const newAccessToken = generateVerificationToken(user.id)
    return res.status(200).json({token: newAccessToken})
  }catch(err){
    console.error("Refresh error:", err);
    res.status(500).json({ message: "Error refreshing token" });
  }
}


export const logout = async (req, res) => {
  try {
    const { userId } = req; // vindo do authMiddleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.refreshToken = undefined;
    user.refreshTokenExpires = undefined;
    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout error" });
  }
};

