import React from 'react';

function Home() {
  return (
    <div id="header" className="Header">
      <div className="content">
        <nav className="navbar">
          <a href="#" onClick={() => window.location.reload()}>
            <img src="/images/PM_Hub_transparent.png" 
              className="logo" 
              alt="PMHub"/>
          </a>
          
          <ul className="nav-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/library">Library</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>
        <div className="Header-text">
          <p className="tagline">Personal Media Hub | For Movies, Books, Series & Games</p>
          <h1>
            Welcome to <span>PMHub</span><br />
            your personal media shelf
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;