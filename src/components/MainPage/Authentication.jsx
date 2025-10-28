import { useState, useEffect } from "react";
import "./Authentication.css";

function Authentication() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  // ✅ verificar se há um utilizador guardado
  useEffect(() => {
    const savedUser = localStorage.getItem("RememberedUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setLoggedInUser(parsed);
    }
  }, []);

  const handleSignUpClick = () => setIsRegister(true);
  const handleSignInClick = () => setIsRegister(false);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agreed) {
      showToast("Please agree to the terms & conditions.", "error");
      return;
    }

    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    const userExist = data.find((u) => u.email === email);

    if (userExist) {
      showToast("Email already registered.", "error");
      return;
    }

    const newUser = { name, email, password };
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    showToast("Account created successfully!", "success");
    setName("");
    setEmail("");
    setPassword("");
    setAgreed(false);
    setIsRegister(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();

    const user = data.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setLoggedInUser(user);
      showToast(`Welcome back, ${user.name}!`, "success");

      // ✅ Guardar se o utilizador marcou "Remember me"
      if (rememberMe) {
        localStorage.setItem("RememberedUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("RememberedUser");
      }
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 600);
      showToast("Account not found — please sign up.", "error");
      setIsRegister(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("RememberedUser");
    setLoggedInUser(null);
    setEmail("");
    setPassword("");
    showToast("You have logged out.", "info");
  };

  if (loggedInUser) {
    return (
      <div className="welcome-message">
        <h2>
          Welcome back, <span>{loggedInUser.name}!</span>
        </h2>
        <p>We're happy to see you again on PMHub 💫</p>
        <button className="btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className={`hero-logreg-box ${isRegister ? "active" : ""}`}>
      {/* ---------- Sign In ---------- */}
      <div
        key={loginError ? "shake" : "normal"}
        className={`form-box login ${loginError ? "shake" : ""}`}
      >
        <form>
          <h2>Sign In</h2>

          <div className="input-box">
            <span className="icon">
              <img src="/images/envelope.png" alt="envelope" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/key.png" alt="key" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn" onClick={handleSignIn}>
            Sign In
          </button>

          <div className="login-register">
            <p>
              Don't have an account?
              <a href="#" className="register-link" onClick={handleSignUpClick}>
                {" "}
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* ---------- Sign Up ---------- */}
      <div className="form-box register">
        <form>
          <h2>Sign Up</h2>

          <div className="input-box">
            <span className="icon">
              <img src="/images/Sample_User_Icon.png" alt="user" />
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/envelope.png" alt="envelope" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/key.png" alt="key" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn" onClick={handleSignup}>
            Sign Up
          </button>

          <div className="login-register">
            <p>
              Already have an account?
              <a href="#" className="register-link" onClick={handleSignInClick}>
                {" "}
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* ---------- Toast global ---------- */}
      {toast.message && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}

export default Authentication;
