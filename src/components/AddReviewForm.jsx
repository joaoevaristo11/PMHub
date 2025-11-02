import { useState } from "react";
import "./AddReviewForm.css"; // opcional

function AddReviewForm() {
  const [form, setForm] = useState({
    rating: 5,
    title: "",
    description: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("You need to be logged in to submit a review ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus("✅ Review added successfully!");
      setForm({ rating: 5, title: "", description: "" });
    } catch (err) {
      setStatus("❌ Error submitting review.");
      console.error(err);
    }
  };

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <h3>Leave Your Review</h3>

      <label>Rating</label>
      <select name="rating" value={form.rating} onChange={handleChange}>
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Short title"
      />

      <label>Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Your review..."
        rows="4"
        required
      />

      <button type="submit">Submit Review</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}

export default AddReviewForm;
