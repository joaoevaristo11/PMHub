import React from 'react';

function Home() {
  return (
    <div>
      {/* Navbar separada - fica sempre no topo */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" onClick={() => window.location.reload()}>
            <img src="/images/PM_Hub_transparent.png" 
              className="logo" 
              alt="PMHub"/>
          </a>
          
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero section com imagem de fundo - começa depois da navbar */}
      <div id="header" className="hero-section">
        <div className="hero-content">
          <div className="Header-text">
            <p className="tagline">Personal Media Hub | For Movies, Books, Series & Games</p>
            <h1>
              Welcome to <span>PMHub</span><br />
              your personal media shelf
            </h1>
          </div>
        </div>
      </div>

      {/* Secção Escolher Categoria */}
      <section id="categories" className="categories-section">
        <div className="categories-section-container">
          <h2>Choose Your Category</h2>
          <p>What would you like to explore today?</p>

          <div className="categories-grid">
            <div className="category-card movies-card">
              <div className="category-icon">🎬</div>
              <h3>Movies & Series</h3>
              <p>Discover and track your favorite movies, TV shows, cartoons and animes.</p>
              <button className="category-button">Explore</button>
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
      </section>
      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>About PMHub</h2>
              <p className="about-subtitle">All Your Media. One Hub.</p>
              <p className="about-description">
                PMHub is your ultimate companion to track, rate, and share everything you watch, read, or play. 
                From movies and series to anime, manga, books, and games — organize your media life in one 
                intuitive and modern platform.
              </p>
              <p className="about-description">
                Build personal lists, get tailored recommendations, and connect with your friends through chat groups 
                and shared experiences. Whether you're a casual viewer or a media completionist, PMHub evolves with 
                your journey.
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
            </div>
            <div className="about-image">
              <img src="/images/about-illustration.png" alt="PMHub Features" />
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-text">
              <h2>Get In Touch</h2>
              <p className="contact-subtitle">Ready to start your media journey?</p>
              <p className="contact-description">
                Have questions, suggestions, or just want to say hello? 
                We'd love to hear from you! Reach out to our team.
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
                  <span className="contact-icon"><img src="/images/discord_clyde.png" alt="Discord"/></span>
                  <div>
                    <h4>Discord</h4>
                    <p>Join our community server</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon"><img src="/images/github-mark.png" alt="GitHub" /></span>
                  <div>
                    <h4>GitHub</h4>
                    <p>Contribute to the project</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="contact-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="copyright">
        <p>Copyright © PMHub Programming Team.</p>
      </div>
    </div>
  );
}

export default Home;