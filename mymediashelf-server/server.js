import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // 👈 NOVO

dotenv.config();
console.log("🧩 BREVO_API_KEY:", process.env.BREVO_API_KEY ? "Encontrada ✅" : "Não encontrada ❌");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes); // 👈 ROTA NOVA

// Ligação MongoDB
mongoose
  .connect(`${process.env.MONGO_URI}/JustTakes`)
  .then(() => console.log("✅ MongoDB conectado à base JustTakes"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

mongoose.connection.on("connected", () => {
  console.log(`✅ Ligado à base de dados: ${mongoose.connection.name}`);
});

// 🚀 Inicializar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Servidor a correr na porta ${PORT}`)
);
