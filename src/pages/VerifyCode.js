import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // Determine if we're in password reset mode
  const isResetMode = new URLSearchParams(location.search).get("mode") === "reset";

  useEffect(() => {
    const storedEmail = localStorage.getItem(isResetMode ? "reset_email" : "verify_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/login");
    }
  }, [isResetMode, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isResetMode ? "/auth/verify-reset-code" : "/verify/verify-code";
      await API.post(endpoint, { email, code });

      setMessage("✅ Code verified");

      if (isResetMode) {
        setTimeout(() => navigate("/reset-password"), 1000);
      } else {
        localStorage.removeItem("verify_email");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Header */}
      <div style={{
        padding: "1rem", background: "#000", borderBottom: "1px solid #222",
        display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>The Hustler Bot</h2>
      </div>

      {/* Form */}
      <div style={{
        maxWidth: "400px", margin: "2rem auto", padding: "2rem",
        backgroundColor: "#111", borderRadius: "16px", boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {isResetMode ? "Reset Password: Enter Code" : "Verify Your Email"}
        </h3>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            required
            onChange={(e) => setCode(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={btnStyle}>Verify</button>
        </form>

        {message && <p style={{ marginTop: "1rem", color: "#ccc", fontSize: "0.95rem" }}>{message}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#222",
  color: "#fff",
  fontSize: "1rem"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#8b0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer"
};

export default VerifyCode;
