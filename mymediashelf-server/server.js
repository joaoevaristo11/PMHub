import express from "express";
import mongoose from "mongoose";
import ExcelJS from "exceljs";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);

app.post("/api/contact", async(req, res)=>{
  const {name, email, body} = req.body
  const filePath = path.join("messages.xlsx")
  const workbook = new ExcelJS.Workbook()
  let worksheet

  try{
    // Se o ficheiro já existir, carregá-lo
    if(fs.existsSync(filePath)){
      await workbook.xlsx.readFile(filePath)
      worksheet = workbook.getWorksheet("Messages")
    }else{
      // Caso contrário, criar novo
      worksheet = workbook.addWorksheet("Messages")
      worksheet.columns = [
        {header: "Name", key: "name"},
        { header: "Email", key: "email" },
        { header: "Message", key: "message" },
        { header: "Date", key: "date" },
      ]
    }

    worksheet.addRow({name, email, message, date: new Date().toLocaleString(),})
    await worksheet.xlsx.writeFile(filePath)

    res.status(200).json({ message: "Message saved successfully!" });
  }catch(err){
    res.status(500).json({ message: "Error saving message", error: err.message });

  }
})

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor a correr em http://localhost:${PORT}`)
);


