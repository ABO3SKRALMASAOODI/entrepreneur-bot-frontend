import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import jwtDecode from 'jwt-decode'; // Import jwtDecode

function SignIn() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    localStorage.removeItem("seen_intro"); // Always show intro on new login

    navigate(`/enter-password?email=${encodeURIComponent(email)}`);
  };

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response;
    const decoded = jwtDecode(credential); // Decode Google response to get user data
    try {
      // Send the decoded Google credentials to the backend for further processing
      const res = await API.post("/auth/google", { email: decoded.email, name: decoded.name });
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      setMessage("Google login failed.");
    }
  };

  const handleGoogleLoginError = () => {
    setMessage("Google login failed.");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
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

      <div style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "#111",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Welcome Back</h3>

        <form onSubmit={handleNext}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={btnStyle}>Next</button>
        </form>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          useOneTap
        />

        {message && (
          <p style={{ marginTop: "1rem", color: "#ccc", fontSize: "0.95rem", textAlign: "center" }}>{message}</p>
        )}

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={linkStyle}>Register</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          <Link to="/legal" style={linkStyle}>View Terms & Policies</Link>
        </p>
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

const linkStyle = {
  color: "#f55",
  textDecoration: "underline",
  cursor: "pointer"
};

export default SignIn;
