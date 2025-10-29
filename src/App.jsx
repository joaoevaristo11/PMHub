import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/MainPage/NavBar";
import HomePage from "./components/MainPage/HomePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<HomePage />} />

          {/* Outras rotas futuras */}
          <Route
            path="/movies"
            element={
              <div style={{ textAlign: "center", marginTop: "120px" }}>
                <h2>Movies Page (em desenvolvimento 🎬)</h2>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div style={{ textAlign: "center", marginTop: "120px" }}>
                <h2>Profile Page (em desenvolvimento 👤)</h2>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
