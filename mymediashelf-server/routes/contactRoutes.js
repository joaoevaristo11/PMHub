import express from "express"
import Contact from "../models/Contact.js"

const router = express.Router()

router.post("/", async(req, res)=>{
    try{
        const {name, email, message} = req.body

        if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing fields" });
        }

        await Contact.create({name, email, message})

        res.status(200).json({ message: "Message stored successfully!" });
    
    }catch(err){
        console.error("❌ Error storing message:", err);
        res.status(500).json({ message: "Error storing message" });
    }
})

router.get("/", async(req, res)=>{
    try{
        const messages = await Contact.find().sort({createdAt: -1})
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json({ message: "Error fetching messages" })
    }
})

export default router