import { useState } from "react";
import "./Authentication.css";

function Authentication() {
  const [isRegister, setIsRegister] = useState(false);

  const handleSignUpClick = () => setIsRegister(true);
  const handleSignInClick = () => setIsRegister(false);

  return (
    <div className={`hero-logreg-box ${isRegister ? "active" : ""}`}>
      <div className="form-box login">
        <form action="#">
          <h2>Sign In</h2>
          <div className="input-box">
            <span className="icon">
              <img src="/images/envelope.png" alt="envelope" />
            </span>
            <input type="email" required />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/key.png" alt="key" />
            </span>
            <input type="password" required />
            <label>Password</label>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn">Sign In</button>

          <div className="login-register">
            <p>
              Don't have an account?
              <a href="#" className="register-link" onClick={handleSignUpClick}>
                {" "}Sign up
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form action="#">
          <h2>Sign Up</h2>
          <div className="input-box">
            <span className="icon">
              <img src="/images/Sample_User_Icon.png" alt="user" />
            </span>
            <input type="text" required />
            <label>Name</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/envelope.png" alt="envelope" />
            </span>
            <input type="email" required />
            <label>Email</label>
          </div>

          <div className="input-box">
            <span className="icon">
              <img src="/images/key.png" alt="key" />
            </span>
            <input type="password" required />
            <label>Password</label>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> I agree to the terms & conditions
            </label>
          </div>

          <button type="submit" className="btn">Sign Up</button>

          <div className="login-register">
            <p>
              Already have an account?
              <a href="#" className="register-link" onClick={handleSignInClick}>
                {" "}Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
