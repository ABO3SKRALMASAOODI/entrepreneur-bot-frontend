import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { GoogleLogin } from '@react-oauth/google';  // Import GoogleLogin for Google authentication
import jwtDecode from 'jwt-decode'; // For decoding Google JWT response

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle regular email/password registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/register", { email, password });
      localStorage.setItem("verify_email", email);
      setMessage("✅ Verification code sent to your email.");
      navigate("/verify");
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  // Handle Google Login Success
  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;  // Google credential returned after successful login
    const decoded = jwtDecode(credential);  // Decode the JWT to extract user info

    try {
      // Send the decoded Google credentials to your backend for verification and to get JWT
      const res = await API.post("/auth/google", { token: credential });
      localStorage.setItem("token", res.data.token); // Store token for session
      navigate("/chat"); // Redirect to the chat page
    } catch (err) {
      setMessage("Google login failed.");
    }
  };

  // Handle Google Login Error
  const handleGoogleLoginError = () => {
    setMessage("Google login failed.");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Header */}
      <div style={{
        padding: "1rem",
        background: "#000",
        borderBottom: "1px solid #222",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>The Hustler Bot</h2>
      </div>

      {/* Registration Form */}
      <div style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#111",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Create Your Account</h3>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={btnStyle}>Register</button>
        </form>

        {/* Google Login Button */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
          />
        </div>

        {/* Display messages */}
        {message && <p style={{ marginTop: "1rem", color: "#ccc", fontSize: "0.95rem", textAlign: "center" }}>{message}</p>}

        {/* Links to Login and Legal Terms */}
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>Login</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link to="/legal" style={linkStyle}>View Terms & Policies</Link>
        </p>
      </div>
    </div>
  );
}

// Styles for the components
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

const linkStyle = {
  color: "#f55",
  textDecoration: "underline",
  cursor: "pointer"
};

export default Register;
