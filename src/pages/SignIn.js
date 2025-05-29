import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/chat"), 500);
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
      </form>
      {message && <p>{message}</p>}

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don’t have an account? <a href="/register">Register</a>
      </p>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        <a
          href="/legal"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          View Terms & Policies
        </a>
      </p>
    </div>
  );
}

export default SignIn;
