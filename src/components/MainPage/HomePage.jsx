import './HomePage.css'
import './NavBar.css'
import { useState, useEffect } from 'react'

import Authentication from './Authentication'
import CategoriesSection from "./CategoriesSection";
import AboutSection from "./AboutSection";
import ReviewsSection from './ReviewsSection';
import ContactSection from './ContactSection';
import NavBar from './NavBar'

function HomePage() {

  const heroImages = [
    '/images/HeroSection/HeroSection1.jpg',
    '/images/HeroSection/HeroSectionST.png',
    '/images/HeroSection/HeroSection2.jpg',
    '/images/HeroSection/HeroSection3.jpg',
    '/images/HeroSection/HeroSectionOnepiece.png',
    '/images/HeroSection/HeroSection4.jpg',
    '/images/HeroSection/HeroSectionSpiderMan.jpg',
    '/images/HeroSection/HeroSection5.jpg',
    '/images/HeroSection/HeroSection6.jpg',
    '/images/HeroSection/SquidGame.jpg'
  ];

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">

      {/* ---------------- NAVBAR ---------------- */}
      <NavBar />

      {/* ---------------- BACKGROUND SLIDES ---------------- */}
      <div className="background">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hero Background"
            className={`background-slide ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      {/* ---------------- HERO CONTAINER ---------------- */}
      <div className="hero-container" id="home">
        <div className="hero-blur-overlay"></div>

        {/* --- CARROSSEL DENTRO DO PAINEL (como tinhas antes) --- */}
        <div className="hero-slides">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        {/* ---------- LEFT SIDE ---------- */}
        <div className="hero-left">
          <div className="logo">
            <img src="/images/logo.png" alt="logo" className="logo-img" />
            <h2 className="logo-text">JustTakes</h2>
          </div>

          <div className="hero-text">
            <h2>
              Welcome to <br />
              <span>Your Hub of Reviews</span>
            </h2>

            <p>Discover honest ratings on movies, series, books, and video-games.</p>
            <p>Share your opinion, explore what others think, and never miss a great story.</p>
          </div>

          {/* ---------------- SOCIAL ICONS ---------------- */}
          <div className="social-icons">
            <ul>
              <li style={{ "--i": "#64c1f3ff", "--j": "#04739cff" }}>
                <a
                  href="https://www.linkedin.com/in/joão-evaristo-8663b2315/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon"><ion-icon name="logo-linkedin"></ion-icon></span>
                  <span className="title">LinkedIn</span>
                </a>
              </li>

              <li style={{ "--i": "#fc0d5cff", "--j": "#f55809ff" }}>
                <span className="icon"><ion-icon name="logo-instagram"></ion-icon></span>
                <span className="title">Instagram</span>
              </li>

              <li style={{ "--i": "#282929ff", "--j": "#090909ff" }}>
                <span className="icon"><ion-icon name="logo-whatsapp"></ion-icon></span>
                <span className="title">WhatsApp</span>
              </li>

              <li style={{ "--i": "#012d65ff", "--j": "#42A5F5" }}>
                <span className="icon"><ion-icon name="logo-facebook"></ion-icon></span>
                <span className="title">Facebook</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ---------- RIGHT SIDE (Authentication) ---------- */}
        <div className="hero-right">
          <Authentication />
        </div>

      </div>
      </div>

      {/* ---------------- BLUR FIXO ATRÁS DO PAINEL ---------------- */}
      

      {/* ---------------- SECTIONS ---------------- */}
      <CategoriesSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />

      {/* ---------------- FOOTER ---------------- */}
      <div className="copyright">
        <p>Copyright © JustTakes Programming Team.</p>
      </div>

    </div>
  );
}

export default HomePage;
