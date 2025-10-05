import { FaSearch } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="NavBar">
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
