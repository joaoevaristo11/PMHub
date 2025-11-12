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
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const res = await fetch(`https://justtakes.onrender.com/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setStatus("success");
        setMessage(data.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verify();
  }, []);

  return (
    <div className={`verify-container ${status}`}>
      <div className="verify-box">
        {status === "loading" && <p>🔄 Verifying your email...</p>}
        {status === "success" && (
          <>
            <img src="/images/success-icon.png" alt="Success" />
            <h1>Email Verified 🎉</h1>
            <p>{message}</p>
            <a href="/" className="btn">Go to JustTakes</a>
          </>
        )}
        {status === "error" && (
          <>
            <img src="/images/error-icon.png" alt="Error" />
            <h1>Verification Failed ❌</h1>
            <p>{message}</p>
            <a href="/" className="btn">Back to Home</a>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
