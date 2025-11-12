import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/MainPage/NavBar";
import HomePage from "./components/MainPage/HomePage";
import VerifyEmail from "./components/MainPage/VerifyEmail"; // ✅ novo import
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<HomePage />} />

          {/* Página de verificação de email */}
          <Route path="/verify" element={<VerifyEmail />} />  {/* ✅ nova rota */}

          {/* Outras rotas */}
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
