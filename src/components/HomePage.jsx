import './HomePage.css'
import './NavBar.css'

import { motion } from "framer-motion";
import { useState, useEffect } from 'react'

function HomePage() {
  const heroImages = [
    '/images/HeroSection/HeroSection1.jpg',
    '/images/HeroSection/HeroSection.jpg',
    '/images/HeroSection/HeroSection2.jpg',
    '/images/HeroSection/HeroSection3.jpg',
    '/images/HeroSection/HeroSectionOnepiece.png',
    '/images/HeroSection/HeroSection4.jpg',
    '/images/HeroSection/HeroSection5.jpg',
    '/images/HeroSection/HeroSection6.jpg'
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        return (prevSlide + 1) % heroImages.length
      })
    }, 3000)
    return () => clearInterval(interval)
  }, []) 

  const testimonals = [
    {id:1, name: "João Evaristo", avatar: "/images/Avatars/pfp1.jpeg", rating: "⭐⭐⭐⭐⭐", title: "THE BEST!", descrição:"allllllllllllllllllllalalallalla"},
    {id:2, name: "Jordão Bruno", avatar: "/images/Avatars/pfp2.jpeg", rating: "⭐⭐⭐⭐", title: "OMG !!!", descrição:"dididididididididid"},
    {id:3, name: "Gonçalo Antão", avatar: "/images/Avatars/pfp3.jpeg", rating: "⭐⭐⭐⭐⭐", title: "LOVE IT ❤️", descrição:"blablablablablabla"}
  ]

  return (
    <div className="homepage">
      <div className="hero-section" id="home">
        <div className="hero-background">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hero ${index + 1}`}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
          <div className="hero-text">
            <p className="tagline">
              Personal Media Hub | For Movies, Books, Series & Games
            </p>
            <h1>
              Welcome to <span>PMHub</span>
              <br />
              Your Personal Media Shelf
            </h1>
          </div>
        </div>
      </div>

      <div className="categories-section" id="categories">
        <div className="categories-section-container">
          <h2>Choose One Category</h2>
          <p>What would you like to explore today?</p>
          <div className="categories-grid">
            <div className="categories-movies-card" a>
              <h3>Movies & Series</h3>
              <p>
                Discover and track your favorite movies, TV shows, cartoons and
                animes.
              </p>
              <button className="card-button" onClick={() => { /**/ }}>
                Explore
              </button>
            </div>

            <div className="category-card books-card">
              <div className="category-icon">📚</div>
              <h3>Books, Comics & Manga</h3>
              <p>Build your personal digital library.</p>
              <button className="category-button">Explore</button>
            </div>

            <div className="category-card games-card">
              <div className="category-icon">🎮</div>
              <h3>Video Games</h3>
              <p>Track your gaming achievements and wishlist</p>
              <button className="category-button">Explore</button>
            </div>
          </div>
        </div>
      </div>

    <div className="about-section" id="about">
      <div className="about-contender">
        
        {/* Texto com animação da esquerda */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>About PMHUB</h2>
          <p className="about-subtitle">All Your Media. One Hub.</p>
          <p className="about-description">
            PMHub is your ultimate companion to track, rate, and share
            everything you watch, read, or play. From movies and series to
            anime, manga, books, and games — organize your media life in one
            intuitive and modern platform.
          </p>
          <p className="about-description">
            Build personal lists, get tailored recommendations, and connect
            with your friends through chat groups and shared experiences.
            Whether you're a casual viewer or a media completionist, PMHub
            evolves with your journey.
          </p>

          {/* Features com animação em cascata */}
          <motion.div
            className="about-features"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "📊", text: "Track your progress across all media types" },
              { icon: "⭐", text: "Rate and review your favorites" },
              { icon: "🎯", text: "Get personalized recommendations" },
              { icon: "🫂", text: "Create groups and share media with friends" },
              { icon: "🏆", text: "Level up your profile and compete with others" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Imagem com animação da direita */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/about-illustration.png"
            alt="PMHub Features"
          />
        </motion.div>
      </div>
    </div>

      <div className="testimonals" id="testimonals">
        <div className="testimonals-contender">
          <h2 className="testimonals-title">What Our Users Say About Us</h2>
          <p className="testimonals-subtitle"><br />Join Thousands of happy media enthusiasts</p>
          <div className="testimonals-grid">
            {testimonals.map((review)=>(
              <div className="testimonals-card" key={review.id}>
                  <img src={review.avatar} alt={review.name} className="avatar"/>
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

      <div className="contact-section" id="contact">
        <div className="contact-contender">
          <div className="contact-text">
            <h2>Get In Touch</h2>
            <p className="contact-subtittle">Always available for you</p>
            <p className="contact-description">
              Have questions, suggestions, or just want to say hello? We'd love
              to hear from you! Reach out to our team.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>contact@pmhub.com</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">
                  <img src="/images/Contacts/discord_clyde.png" alt="Discord" />
                </span>
                <div>
                  <h4>Discord</h4>
                  <p>Join our community server</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">
                  <img src="/images/Contacts/github-mark.png" alt="GitHub" />
                </span>
                <div>
                  <h4>Github</h4>
                  <p>Contribute to the project</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div className="form-sec">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-sec">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-sec">
                <textarea placeholder="Your message" rows="5" required />
              </div>
              <button type="submit" className="contact-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>Copyright © PMHub Programming Team.</p>
      </div>
    </div>
  )
}

export default HomePage
