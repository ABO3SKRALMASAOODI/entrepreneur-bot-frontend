import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");

  return (
    <div style={{ height: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{
        padding: "1rem", background: "#000", borderBottom: "1px solid #222",
        display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Account Settings</h2>
      </div>

      <div style={{
        maxWidth: "400px", margin: "2rem auto", padding: "2rem",
        backgroundColor: "#111", borderRadius: "16px", boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Your Info</h3>
        <p style={{ marginBottom: "1.5rem", textAlign: "center", fontSize: "1.05rem", color: "#ccc" }}>
          <strong>Email:</strong><br />{email || "Not available"}
        </p>
        <button onClick={() => navigate("/change-password")} style={btnStyle}>Change Password</button>
        <button onClick={() => navigate("/chat")} style={{ ...btnStyle, marginTop: "1rem", backgroundColor: "#444" }}>
          Back to Chat
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "100%", padding: "12px", backgroundColor: "#8b0000",
  color: "#fff", border: "none", borderRadius: "10px",
  fontSize: "1rem", cursor: "pointer"
};

export default Account;
