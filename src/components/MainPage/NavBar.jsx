import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ================= MOBILE SEARCH FIXED ================= */}
      <div className={`mobile-search-fixed ${isVisible ? "visible": "hidden"} ${menuOpen ? "menu-open" : ""}`}>
        <input type="text" placeholder="Search..." />
        <button><FaSearch /></button>
      </div>

      {/* ================= OVERLAY ================= */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <nav
        className={`NavBar ${isVisible ? "visible" : "hidden"} ${
          isAtTop ? "at-top" : "scrolled"
        }`}
      >
        <div className="NavBar-container">

          {/* HAMBURGER BUTTON */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* ================== DESKTOP MENU ================== */}
          <ul className="NavBar-menu desktop">
            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#testimonals">Testimonals</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>

          {/* ================== DESKTOP SEARCH ================== */}
          <div className="search-bar desktop">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE SIDE MENU ================= */}
      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><a onClick={() => setMenuOpen(false)} href="#home">Home</a></li>
          <li><a onClick={() => setMenuOpen(false)} href="#categories">Categories</a></li>
          <li><a onClick={() => setMenuOpen(false)} href="#about">About</a></li>
          <li><a onClick={() => setMenuOpen(false)} href="#testimonals">Testimonals</a></li>
          <li><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a></li>
          <li><a onClick={() => setMenuOpen(false)} href="#profile">Profile</a></li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
