import { useState, useEffect } from "react"
import "./Authentication.css"
import { createPortal } from "react-dom"

const API_URL = "https://justtakes.onrender.com/api/auth"

function Authentication() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [agreed, setAgreed] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loginError, setLoginError] = useState(false)
  const [toast, setToast] = useState({ message: "", type: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [canResend, setCanResend] = useState(false)
  const [counter, setCounter] = useState(30) // segundos para voltar a enviar
  const [showResendSection, setShowResendSection] = useState(false)
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState("")




  /* --------------------------- AUTH CHECK --------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) fetchProfileWithRefresh(token)
  }, [])

  const fetchProfileWithRefresh = async (accessToken) => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (res.status === 401) {
      // 🔥 tentar refresh
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        localStorage.removeItem("token")
        return
      }

      const refreshRes = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      const refreshData = await refreshRes.json()

      if (!refreshRes.ok || !refreshData.token) {
        // refresh falhou → limpar tudo
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        return
      }

      // guardar novo access token e tentar outra vez /me
      localStorage.setItem("token", refreshData.token)

      const retry = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${refreshData.token}` },
      })

      if (!retry.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        return
      }

      const retryData = await retry.json()
      setLoggedInUser(retryData.user)
      return
    }

    if (!res.ok) {
      localStorage.removeItem("token")
      return
    }

    const data = await res.json()
    setLoggedInUser(data.user)
  } catch (err) {
    console.error("Error fetching profile:", err)
  }
}

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: "", type: "" }), duration)
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  /* --------------------------- SIGNUP --------------------------- */
  const handleSignup = (e) => {
    e.preventDefault()
    if (!agreed)
      return showToast("Please agree to the terms & conditions.", "error")
    if (form.password.length < 6)
      return showToast("Password must have at least 6 characters.", "error")

    setShowConfirmPassword(true)
  }

  const confirmSignup = async () => {
  console.log("confirmPassword =", confirmPassword);
  console.log("form.password =", form.password);

  if (!confirmPassword || !form.password) {
    showToast("Both passwords are required", "error");
    return;
  }

  if (confirmPassword !== form.password) {
    showToast("Passwords do not match!", "error");
    return;
  }
  
  console.log("PASSA PARA O FETCH");

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      showToast(data.message || "Registration failed.", "error")
      return
    }

    setLastRegisteredEmail(form.email)

    showToast("Account created successfully!", "success")

    // 🔥 FECHAR O POPUP PRIMEIRO
    setShowConfirmPassword(false)

    setConfirmPassword("")
    setAgreed(false)
    setIsRegister(false)

    // 🔥 SÓ MOSTRAR RESEND SECTION DEPOIS
    setShowResendSection(true)

    // 🔥 INICIAR COOLDOWN
    setCanResend(false)
    setCounter(30)

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev === 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setTimeout(() => {
      showToast(
        "Please verify your email before signing in. 📧",
        "info",
        7000
      )
    }, 2500)

    // 🔥 LIMPAR FORM POR ÚLTIMO (IMPORTANTE!)
    setForm({ name: "", email: "", password: "" })

  } catch (err) {
    showToast("Server error — please try again later.", "error")
  }
}

  /* --------------------------- LOGIN --------------------------- */
  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLoginError(true)
        setTimeout(() => setLoginError(false), 600)
        showToast(data.message || "Invalid credentials.", "error")
        return
      }

      const { token, refreshToken, user, firstLogin } = data

      setLoggedInUser({ ...user, firstLogin })

      showToast(
        firstLogin
          ? `Welcome, ${user.name}! Your account is ready 🎉`
          : `Welcome back, ${user.name}!`,
        "success"
      )

      localStorage.setItem("token", token)
      if (rememberMe && refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      } else {
        localStorage.removeItem("refreshToken")
      }

    } catch (err) {
      showToast("Connection error. Check your server.", "error")
    }
  }

  /* --------------------------- LOGOUT --------------------------- */
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        // tenta limpar refreshToken na BD também
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (err) {
      console.error("Logout error:", err)
    }

    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setLoggedInUser(null)
    setForm({ name: "", email: "", password: "" })
    showToast("You have logged out.", "info")
  }

  const handleResend = async ()=>{
    try{
      const res = await fetch(`${API_URL}/resend-verification`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ email: lastRegisteredEmail})
      })

      const data = await res.json()

      if(!res.ok){
        showToast(data.message || "Failed to resend email.", "error")
        return
      }
      
      showToast("Verification email resent! 📧", "success")

      setCanResend(false)
      setCounter(30)

      const interval = setInterval(()=>{
        setCounter(prev=>{
          if(prev==1){
            clearInterval(interval)
            setCanResend(true)
            return 0
          }
          return prev-1
        })
      }, 1000)
    }catch(err){
      showToast("Server error — please try again later.", "error")
    }
  }

  const handleEnterConfirm = (e)=>{
    if(e.key=="Enter"){
      e.preventDefault()
      confirmSignup()
    }
  }

  const handleEnterSignUp = (e)=>{
    if(e.key=="Enter"){
      e.preventDefault()
      handleSignup(e)
    }
  }

    const handleEnterSignIn = (e)=>{
    if(e.key=="Enter"){
      e.preventDefault()
      handleSignIn(e)
    }
  }

  /* --------------------------- LOGGED IN VIEW --------------------------- */
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
            : "We're happy to see you again 💫"}
        </p>
        <button className="btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    )
  }
  /* --------------------------- LOGIN / REGISTER PANEL --------------------------- */
return (
  <div className={`auth-panel ${isRegister ? "active" : ""}`}>
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
            />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            onKeyDown={handleEnterSignIn}
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

        <button type="submit" className="btn">
          Sign In
        </button>

        {showResendSection && (
          <div className="resend-area">
            {!canResend ? (
              <p>
                Didn't receive the verification email? Resend in{" "}
                <strong>{counter}s</strong>
              </p>
            ) : (
              <button className="btn resend-btn" onClick={handleResend}>
                Resend Verification Email
              </button>
            )}
          </div>
        )}

        <div className="login-register">
          <p>
            Don't have an account?
            <a href="#" className="Bold" onClick={() => setIsRegister(true)}>
              {" "}
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>

    {/* ---------- Sign Up ---------- */}
    <div className="form-box register">
      <form onSubmit={(e) => e.preventDefault()}>
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
            />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            onKeyDown={handleEnterSignUp}
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

        <button type="button" className="btn" onClick={handleSignup}>
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

    {/* ---------- Confirm Password Popup ---------- */}
    {showConfirmPassword &&
      createPortal(
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm your password</h3>
            <input
              autoFocus
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleEnterConfirm}
            />

            <div className="confirm-actions">
              <button className="btn" type="button" onClick={confirmSignup}>
                Confirm
              </button>

              <button
                className="btn cancel-btn"
                type="button"
                onClick={() => setShowConfirmPassword(false)}
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
