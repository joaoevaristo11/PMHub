import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ReviewsSection.css";

function ReviewsSection() {
  const navigate = useNavigate();

  const testimonals = [
    {
      id: 1,
      name: "João Evaristo",
      avatar: "/images/Avatars/pfp1.jpeg",
      rating: "⭐⭐⭐⭐⭐",
      title: "THE BEST!",
      descrição: "allllllllllllllllllllalalallalla",
    },
    {
      id: 2,
      name: "Jordão Bruno",
      avatar: "/images/Avatars/pfp2.jpeg",
      rating: "⭐",
      title: "OMG! It won't work bismillah",
      descrição: "dididididididididid",
    },
    {
      id: 3,
      name: "Gonçalo Antão",
      avatar: "/images/Avatars/pfp3.jpeg",
      rating: "⭐⭐⭐⭐⭐",
      title: "LOVE IT ❤️",
      descrição: "blablablablablabla",
    },
  ];

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
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          spaceBetween={50}
          className="testimonals-swiper"
        >
          {testimonals.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="testimonals-card">
                <img src={review.avatar} alt={review.name} className="avatar" />
                <div className="review-header">
                  <p className="user-name">{review.name}</p>
                  <p className="user-rating">{review.rating}</p>
                  <p className="review-meta">{review.title}</p>
                </div>
                <p className="review-description">{review.descrição}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="see-all-reviews">
          <button onClick={() => navigate("/reviews")}>See All Reviews</button>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
