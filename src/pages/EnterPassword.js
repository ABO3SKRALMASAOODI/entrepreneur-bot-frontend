import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../api/api";

function EnterPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get("email");
    if (emailFromURL) setEmail(emailFromURL);
    else navigate("/login");
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });

      // ✅ Updated this line to use access_token instead of token
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("user_email", email);

      setMessage("Login successful!");
      console.log("Login success, token:", token);

      const statusRes = await API.get("/auth/status/subscription", {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Subscription status response:", statusRes.data);

      if (statusRes.data.is_subscribed) {
        navigate("/chat");
      } else {
        navigate("/subscribe");
      }

    } catch (error) {
      console.error("Login or subscription check failed:", error);
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>The Hustler Bot</h2>
      </div>

      <div style={boxStyle}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Enter Your Password</h3>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={btnStyle}>Login</button>
        </form>

        {message && (
          <p style={messageStyle}>{message}</p>
        )}

        <p style={forgotStyle}>
          <Link to="/change-password" style={linkStyle}>Forgot or Change Password?</Link>
        </p>
      </div>
    </div>
  );
}

// Styles remain unchanged
const pageStyle = {
  height: "100vh",
  backgroundColor: "#000",
  color: "#fff",
  fontFamily: "Segoe UI, sans-serif"
};

const headerStyle = {
  padding: "1rem",
  background: "#000",
  borderBottom: "1px solid #222",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const boxStyle = {
  maxWidth: "400px",
  margin: "2rem auto",
  padding: "2rem",
  backgroundColor: "#111",
  borderRadius: "16px",
  boxShadow: "0 0 20px rgba(0,0,0,0.6)"
};

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

const messageStyle = {
  marginTop: "1rem",
  color: "#ccc",
  fontSize: "0.95rem",
  textAlign: "center"
};

const forgotStyle = {
  textAlign: "center",
  marginTop: "1.5rem",
  fontSize: "0.9rem"
};

const linkStyle = {
  color: "#f55",
  textDecoration: "underline",
  cursor: "pointer"
};

export default EnterPassword;
