import express from "express";
import Review from "../models/Reviews.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name avatar") // junta dados do user
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { rating, title, description } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReview = new Review({
      user: req.user.id,           
      name: user.name,
      rating,
      title,
      description,
    })
    await newReview.save();
    res.status(201).json({ message: "Review added successfully!", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Error saving review", error: err.message });
  }
});

export default router;
