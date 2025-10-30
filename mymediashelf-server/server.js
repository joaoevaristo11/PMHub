import express from "express";
import mongoose from "mongoose";
import ExcelJS from "exceljs";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`)
);


