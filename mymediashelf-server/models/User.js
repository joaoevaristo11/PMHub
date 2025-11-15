import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },    
  verified: { type: Boolean, default: false },
  firstLogin:{type: Boolean, default: true},
  refreshToken: { type: String },
  refreshTokenExpires: { type: Date },
})



export default mongoose.model("User", userSchema)
