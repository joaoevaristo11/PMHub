import { useEffect, useState } from "react";
import "./VerifyEmail.css";

function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("preview");
        setMessage("Preview mode — no token provided.");
        return;
      }

      try {
        const res = await fetch(`https://justtakes.onrender.com/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Invalid or expired link");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Server connection failed.");
      }
    };

    verify();
  }, []);

  return (
    <section className={`verify-container ${status}`}>
      {/* 🌊 Fundo animado */}
      <div className="wave">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 📦 Conteúdo principal */}
      <div className="verify-box">
        {status === "loading" && (
          <>
            <h1>Verifying your email...</h1>
            <p>Please wait a moment ⏳</p>
          </>
        )}

        {status === "success" && (
          <>
            <img src="/images/success-icon.png" alt="Success" />
            <h1>Email Verified ✅</h1>
            <p>{message}</p>
            <a href="/" className="btn">
              Go to JustTakes
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <img src="/images/error-icon.png" alt="Error" />
            <h1>Verification Failed ❌</h1>
            <p>{message}</p>
            <a href="/" className="btn">
              Back to Home
            </a>
          </>
        )}

        {status === "preview" && (
          <>
            <h1>Preview Mode 👀</h1>
            <p>This is just a design preview of the verification page.</p>
          </>
        )}
      </div>
    </section>
  );
}

export default VerifyEmail;
