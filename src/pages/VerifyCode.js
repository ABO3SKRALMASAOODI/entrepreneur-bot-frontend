// src/pages/VerifyCode.js

import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("verify_email") || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/verify/verify-code", { email, code });
      setMessage("✅ Verified! You can now log in.");
      localStorage.removeItem("verify_email");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Verify Your Email</h2>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VerifyCode;
