import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ReviewsSection.css";

function ReviewsSection() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, title: "", description: "" });
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Buscar reviews reais da API
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Erro ao carregar reviews:", err));
  }, []);

  // ✅ Atualizar campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submeter review (só se logado)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setStatus("⚠️ You must be logged in to submit a review!");
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

      // Atualiza lista de reviews
      setReviews((prev) => [data.review, ...prev]);
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error("❌ Erro ao enviar review:", err);
      setStatus("❌ Error submitting review.");
    }
  };

  return (
    <section
      className="reviews-parallax"
      style={{ backgroundImage: "url('/images/ReviewsBackground.jpg')" }}
      id="testimonals"
    >
      <div className="reviews-parallax__overlay" />

      <div className="testimonals-contender">
        <h2 className="testimonals-title">What Our Users Say About Us</h2>

        {/* === Slider === */}
        {reviews.length === 0 ? (
          <p style={{ color: "#ccc", marginTop: "2rem" }}>
            No reviews yet. Be the first to write one!
          </p>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={50}
            className="testimonals-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="testimonals-card">
                  <img
                    src={review.user?.avatar || "/images/Avatars/default.png"}
                    alt={review.user?.name || "Anonymous"}
                    className="avatar"
                  />
                  <div className="review-header">
                    <p className="user-name">
                      {review.user?.name || "Anonymous"}
                    </p>
                    <p className="user-rating">
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p className="review-meta">{review.title}</p>
                  </div>
                  <p className="review-description">{review.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* === Formulário de nova review (apenas se logado) === */}
        {token && (
          <form className="add-review-form" onSubmit={handleSubmit}>
            <h3>Leave your review</h3>

            <label>Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ⭐
                </option>
              ))}
            </select>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (optional)"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Your review..."
              required
              rows="4"
            />

            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>

            {status && <p className="status-message">{status}</p>}
          </form>
        )}

        {!token && (
          <p style={{ marginTop: "2rem", color: "#aaa" }}>
            Login to leave your own review.
          </p>
        )}

        <div className="see-all-reviews">
          <button onClick={() => navigate("/reviews")}>See All Reviews</button>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
