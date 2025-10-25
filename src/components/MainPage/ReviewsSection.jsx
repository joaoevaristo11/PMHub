import "./ReviewsSection.css"

function ReviewsSection(){
    const testimonals = [
    {
      id: 1,
      name: "João Evaristo",
      avatar: "/images/Avatars/pfp1.jpeg",
      rating: "⭐⭐⭐⭐⭐",
      title: "THE BEST!",
      descrição: "allllllllllllllllllllalalallalla"
    },
    {
      id: 2,
      name: "Jordão Bruno",
      avatar: "/images/Avatars/pfp2.jpeg",
      rating: "⭐",
      title: "OMG! It won't work bismillah",
      descrição: "dididididididididid"
    },
    {
      id: 3,
      name: "Gonçalo Antão",
      avatar: "/images/Avatars/pfp3.jpeg",
      rating: "⭐⭐⭐⭐⭐",
      title: "LOVE IT ❤️",
      descrição: "blablablablablabla"
    }
  ]
    return (
        <div className="testimonals" id="testimonals">
        <div className="testimonals-contender">
          <h2 className="testimonals-title">What Our Users Say About Us</h2>
          <p className="testimonals-subtitle">
            <br />Join Thousands of happy media enthusiasts
          </p>

          <div className="testimonals-grid">
            {testimonals.map((review) => (
              <div className="testimonals-card" key={review.id}>
                <img src={review.avatar} alt={review.name} className="avatar" />
                <div className="review-header">
                  <p className="user-name">{review.name}</p>
                  <p className="user-rating">{review.rating}</p>
                  <p className="review-meta">{review.title}</p>
                </div>
                <p className="review-description">{review.descrição}</p>
              </div>
            ))}
          </div>

          <div className="see-all-reviews">
            <button onClick={() => navigate("/reviews")}>
              See All Reviews
            </button>
          </div>
        </div>
      </div>
    )
}

export default ReviewsSection;