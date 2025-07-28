import React from 'react';
import './Movies.css'; // Adiciona esta linha

function Movies() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-menu nav-left">
            <li><a href="#home">Home</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          
          <a href="#" onClick={() => window.location.reload()} className="logo-center">
            <img src="/images/PM_Hub_transparent.png" 
              className="logo" 
              alt="PMHub"/>
          </a>
          
          <ul className="nav-menu nav-right">
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#profile">Profile</a></li>
          </ul>
        </div>
      </nav>

      {/* Movies Hero Section */}
      <section className="movies-hero">
        <div className="movies-hero-content">
          <h1>Movies & Series</h1>
          <p>Discover, track, and rate your favorite movies, TV shows, anime, and cartoons</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search for movies, series, anime..." 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Movies</button>
            <button className="filter-btn">TV Shows</button>
            <button className="filter-btn">Anime</button>
            <button className="filter-btn">Cartoons</button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="movies-section">
        <div className="movies-container">
          <h2>🔥 Trending Now</h2>
          <div className="movies-grid">
            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/movie1.jpg" alt="Movie" />
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>Spider-Man: No Way Home</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.4</span>
                  <span className="year">2021</span>
                  <span className="genre">Action</span>
                </div>
              </div>
            </div>

            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/movie2.jpg" alt="Movie" />
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>The Batman</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 7.8</span>
                  <span className="year">2022</span>
                  <span className="genre">Crime</span>
                </div>
              </div>
            </div>

            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/movie3.jpg" alt="Movie" />
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>Dune</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.0</span>
                  <span className="year">2021</span>
                  <span className="genre">Sci-Fi</span>
                </div>
              </div>
            </div>

            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/movie4.jpg" alt="Movie" />
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>Top Gun: Maverick</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.3</span>
                  <span className="year">2022</span>
                  <span className="genre">Action</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Watchlist Section */}
      <section className="movies-section watchlist-section">
        <div className="movies-container">
          <h2>📋 Your Watchlist</h2>
          <p className="section-subtitle">Movies and shows you want to watch</p>
          
          <div className="watchlist-stats">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">To Watch</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Currently Watching</span>
            </div>
          </div>

          <div className="movies-grid">
            <div className="movie-card watchlist-card">
              <div className="movie-poster">
                <img src="/images/watchlist1.jpg" alt="Movie" />
                <div className="watchlist-badge">📋 Watchlist</div>
              </div>
              <div className="movie-info">
                <h3>The Witcher</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.2</span>
                  <span className="year">2019</span>
                  <span className="genre">Fantasy</span>
                </div>
                <div className="watchlist-actions">
                  <button className="btn-primary">Start Watching</button>
                  <button className="btn-secondary">Remove</button>
                </div>
              </div>
            </div>

            <div className="movie-card watchlist-card">
              <div className="movie-poster">
                <img src="/images/watchlist2.jpg" alt="Movie" />
                <div className="watchlist-badge">📋 Watchlist</div>
              </div>
              <div className="movie-info">
                <h3>House of the Dragon</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.5</span>
                  <span className="year">2022</span>
                  <span className="genre">Drama</span>
                </div>
                <div className="watchlist-actions">
                  <button className="btn-primary">Start Watching</button>
                  <button className="btn-secondary">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="movies-section">
        <div className="movies-container">
          <h2>🆕 Recently Added</h2>
          <div className="movies-grid">
            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/recent1.jpg" alt="Movie" />
                <div className="new-badge">NEW</div>
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>Wednesday</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 8.1</span>
                  <span className="year">2022</span>
                  <span className="genre">Comedy</span>
                </div>
              </div>
            </div>

            <div className="movie-card">
              <div className="movie-poster">
                <img src="/images/recent2.jpg" alt="Movie" />
                <div className="new-badge">NEW</div>
                <div className="movie-overlay">
                  <button className="watch-btn">👁️ View</button>
                  <button className="add-btn">➕ Add</button>
                </div>
              </div>
              <div className="movie-info">
                <h3>Avatar: The Way of Water</h3>
                <div className="movie-meta">
                  <span className="rating">⭐ 7.6</span>
                  <span className="year">2022</span>
                  <span className="genre">Adventure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="copyright">
        <p>Copyright © PMHub Programming Team.</p>
      </div>
    </div>
  );
}

export default Movies;