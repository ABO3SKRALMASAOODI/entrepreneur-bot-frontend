import React, { useState } from "react";
import API from "../api/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/register", { email, password });
      setMessage("✅ Registered! You can now log in.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit" style={{ padding: "10px 20px" }}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account? <a href="/login">Login</a>
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

export default Register;
