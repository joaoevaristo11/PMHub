import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import fs from "fs";

import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);


// 📩 Rota para guardar mensagens no CSV
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Caminho absoluto seguro
  const dir = path.resolve(process.cwd(), "data");
  const filePath = path.join(dir, "messages.csv");

  try {
    // Garante que a pasta "data" existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log("📁 Pasta 'data' criada.");
    }

    // Cria o ficheiro se não existir
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "\uFEFFName;Email;Message;Date\n", "utf8");
      console.log("🆕 Ficheiro CSV criado.");
    }

    const date = new Date().toLocaleString("pt-PT");
    const line = `"${name}";"${email}";"${message.replace(/"/g, '""')}";"${date}"\n`;

    fs.appendFileSync(filePath, line, "utf8");

    console.log(`✅ Nova mensagem de ${name} guardada no CSV.`);
    res.status(200).json({ message: "Message saved to CSV successfully!" });
  } catch (err) {
    console.error("❌ Erro ao guardar mensagem:", err);
    res.status(500).json({ message: "Error saving message", error: err.message });
  }
});

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`)
);
