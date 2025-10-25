import "./CategoriesSection.css";

function CategoriesSection() {
  return (
    <div className="categories-section" id="categories">
      <div className="categories-section-container">
        <h2>Choose One Category</h2>
        <p>What would you like to explore today?</p>

        <div className="categories-grid">
          <div className="categories-movies-card">
            <h3>Movies & Series</h3>
            <p>Discover and track your favorite movies, TV shows, cartoons and animes.</p>
            <button className="card-button">Explore</button>
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
            <p>Track your gaming achievements and wishlist.</p>
            <button className="category-button">Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSection;

