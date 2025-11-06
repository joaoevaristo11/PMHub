import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import fs from "fs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

// 📩 Rota para guardar mensagens no CSV
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const dir = path.resolve(process.cwd(), "data");
  const filePath = path.join(dir, "messages.csv");

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log("📁 Pasta 'data' criada.");
    }

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
