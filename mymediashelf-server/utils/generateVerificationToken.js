import jwt from "jsonwebtoken"

export const generateVerificationToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" })
}

export const createRefreshToken = (userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})
}
