import './HomePage.css'
import './NavBar.css'

import { useState, useEffect } from 'react'

function HomePage() {
    const heroImages=[
        '/images/HeroSection.jpg',
        '/images/HeroSection1.jpg',
        '/images/HeroSection2.jpg',
        '/images/HeroSection3.jpg',
        '/images/HeroSection4.jpg',
        '/images/HeroSection5.jpg',
        '/images/HeroSection6.jpg'
    ]

    const [currentSlide, setCurrentSlide]=useState(1)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentSlide((prevSlide)=>{
                return (prevSlide+1)%heroImages.length
            })
        }, 3000)
        return ()=>clearInterval(interval)
    }, [])

  return (
    <div className="homepage">
      <div className="hero-section">
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

      <div className="categories-section">
        <div className="categories-section-container">
          <h2>Choose One Category</h2>
          <p>What would you like to explore today?</p>
          <div className="categories-grid">
            <div className="categories-movies-card">
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

      <div className="about-section">
        <div className="about-contender">
          <div className="about-text">
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
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Track your progress across all media types</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Rate and review your favorites</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Get personalized recommendations</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🫂</span>
                <span>Create groups and share media with friends</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏆</span>
                <span>Level up your profile and compete with others</span>
              </div>
            </div>
            <div className="about-image">
              <img
                src="/images/about-illustration.png"
                alt="PMHub Features"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section">
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
                  <img src="/images/discord_clyde.png" alt="Discord" />
                </span>
                <div>
                  <h4>Discord</h4>
                  <p>Join our community server</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon">
                  <img src="/images/github-mark.png" alt="GitHub" />
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

export default HomePage;
