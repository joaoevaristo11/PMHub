import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detectar se estamos no topo
      setIsAtTop(currentScrollY < 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed 100px
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`NavBar ${isVisible ? 'visible' : 'hidden'} ${isAtTop ? 'at-top' : 'scrolled'}`}>
      <div className="NavBar-container">
        
        {/* Menu */}
        <ul className="NavBar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#testimonals">Testimonals</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#profile">Profile</a></li>
        </ul>

        {/* Search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
            <button className="search-btn" onClick={''}>
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;