import { useState, useEffect } from "react"
import "./Authentication.css"
import { createPortal } from "react-dom"


const API_URL = "http://localhost:5000/api/auth"

function Authentication() {
    const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Verificar se há user/token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile(token);
  }, []);

  // ✅ Mostrar notificações visuais
  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), duration);
  };

  // ✅ Buscar perfil do user autenticado
  const fetchProfile = async (token) => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Invalid token");
      const data = await res.json();
      setLoggedInUser(data.user);
    } catch (err) {
      localStorage.removeItem("token");
    }
  };

  // ✅ Atualizar campos dinamicamente
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Sign Up → abre popup
  const handleSignup = (e) => {
    e.preventDefault();
    if (!agreed)
      return showToast("Please agree to the terms & conditions.", "error");
    if (form.password.length < 6)
      return showToast("Password must have at least 6 characters.", "error");

    setShowConfirmPassword(true);
  };

  // ✅ Confirmar password e criar conta
  const confirmSignup = async () => {
    if (confirmPassword !== form.password) {
      showToast("Passwords do not match!", "error");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔸 Se falhar (ex: email já registado), mostra erro e mantém modal
        showToast(data.message || "Registration failed.", "error");
        return;
      }

      // 🔹 Caso contrário, sucesso
      showToast("Account created successfully!", "success",3000);

      // 🔹 Fecha o popup e limpa campos
      setShowConfirmPassword(false);
      setConfirmPassword("");
      setForm({ name: "", email: "", password: "" });
      setAgreed(false);
      setIsRegister(false);

      // 🔹 Mostra aviso de verificação de email 1.5s depois
      setTimeout(() => {
        showToast(
          "Please check your email to verify your account before signing in. 📧",
          "info",
          7000
        );
      }, 3200);
    } catch (err) {
      showToast("Server error — please try again later.", "error");
    }
  };

  // ✅ Login com JWT
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 600);
        showToast(data.message || "Invalid credentials.", "error");
        return;
      }

      const { token, user, firstLogin } = data;
      setLoggedInUser({ ...user, firstLogin });
      if (firstLogin) {
        showToast(
          `Welcome, ${user.name}! Your account is now active 🎉`,
          "success"
        );
      } else {
        showToast(`Welcome back, ${user.name}!`, "success");
      }

      localStorage.setItem("token", token);
      if (rememberMe)
        localStorage.setItem("RememberedUser", JSON.stringify(user));
    } catch (err) {
      showToast("Connection error. Check your server.", "error");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("RememberedUser");
    setLoggedInUser(null);
    setForm({ name: "", email: "", password: "" });
    showToast("You have logged out.", "info");
  };

  // ✅ Se estiver logado
  if (loggedInUser) {
    return (
      <div className="welcome-message">
        <h2>
          {loggedInUser.firstLogin ? (
            <>
              Welcome, <span>{loggedInUser.name}</span>!
            </>
          ) : (
            <>
              Welcome back, <span>{loggedInUser.name}</span>!
            </>
          )}
        </h2>
        <p>
          {loggedInUser.firstLogin
            ? "Your account is ready — explore PMHub 🎉"
            : "We're happy to see you again on PMHub 💫"}
        </p>
        <button className="btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  }

  if (loggedInUser) {
    return (
      <div className="welcome-message">
        <h2>
          {loggedInUser.firstLogin ? (
            <>Welcome, <span>{loggedInUser.name}</span>!</>) : (<>Welcome back, <span>{loggedInUser.name}</span>!</>
          )}
        </h2>
        <p>
          {loggedInUser.firstLogin ? "Your account is ready — explore PMHub 🎉" : "We're happy to see you again on PMHub 💫"}</p>
        <button className="btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    )  
  }

return (
  <div className={`hero-logreg-box ${isRegister ? "active" : ""}`}>
    {/* ---------- Sign In ---------- */}
    <div className={`form-box login ${loginError ? "shake" : ""}`}>
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>

        <div className="input-box">
          <span className="icon">
            <img src="/images/envelope.png" alt="email" />
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <span
            className="icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                showPassword
                  ? "/images/cadeado-aberto.png"
                  : "/images/cadeado.png"
              }
              alt="toggle password visibility"
              title={showPassword ? "Hide password" : "Show password"}
            />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn small-btn">
          Sign In
        </button>

        <div className="login-register">
          <p>
            Don't have an account?
            <a href="#" onClick={() => setIsRegister(true)}>
              {" "}
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>

    {/* ---------- Sign Up ---------- */}
    <div className="form-box register">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <div className="input-box">
          <span className="icon">
            <img src="/images/Sample_User_Icon.png" alt="user" />
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Name</label>
        </div>

        <div className="input-box">
          <span className="icon">
            <img src="/images/envelope.png" alt="email" />
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <span
            className="icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                showPassword
                  ? "/images/cadeado-aberto.png"
                  : "/images/cadeado.png"
              }
              alt="toggle password visibility"
              title={showPassword ? "Hide password" : "Show password"}
            />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />{" "}
            I agree to the terms & conditions
          </label>
        </div>

        <button type="submit" className="btn small-btn">
          Sign Up
        </button>

        <div className="login-register">
          <p>
            Already have an account?
            <a href="#" onClick={() => setIsRegister(false)}>
              {" "}
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>

    {/* ---------- Popup Confirm Password ---------- */}
    {showConfirmPassword &&
      createPortal(
        <div className="confirm-overlay">
          <div
            className="confirm-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <h3 id="confirm-title">Confirm your password</h3>
            <input
              autoFocus
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="confirm-actions">
              <button
                type="button"
                onClick={confirmSignup}
                className="btn confirm-btn"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(false)}
                className="btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    {/* ---------- Toast ---------- */}
    {toast.message &&
      createPortal(
        <div className={`toast ${toast.type}`} style={{ zIndex: 9999 }}>
          {toast.message}
        </div>,
        document.body
      )}
  </div>
);

}


export default Authentication
