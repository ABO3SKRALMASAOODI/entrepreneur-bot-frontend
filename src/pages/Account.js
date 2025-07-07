import React from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");

  const handleCancelSubscription = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel auto-renewal? You'll keep access until the end of your billing period."
    );
    if (!confirmCancel) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Missing subscription details.");
      return;
    }

    fetch("https://entrepreneur-bot-backend.onrender.com/paddle/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Subscription cancellation processed.");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to cancel subscription. Please try again.");
      });
  };

  return (
    <div style={pageLayout}>
      <div style={header}>
        <h2 style={headerTitle}>Account Settings</h2>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>Your Info</h3>
        <p style={emailText}>
          <strong>Email:</strong><br />{email || "Not available"}
        </p>

        <div style={btnGroup}>
          <button onClick={() => navigate("/change-password")} style={mainBtn}>Change Password</button>
          <button onClick={() => navigate("/legal")} style={secondaryBtn}>Terms & Policies</button>
          <button onClick={handleCancelSubscription} style={secondaryBtn}>Cancel Subscription</button>
          <button onClick={() => navigate("/chat")} style={backBtn}>Back to Chat</button>
        </div>
      </div>
    </div>
  );
}

// Styles
const pageLayout = {
  height: "100vh",
  backgroundColor: "#000",
  color: "#fff",
  fontFamily: "Segoe UI, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "3rem"
};

const header = {
  width: "100%",
  backgroundColor: "#000",
  borderBottom: "1px solid #222",
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const headerTitle = {
  margin: 0,
  fontSize: "1.7rem"
};

const card = {
  width: "90%",
  maxWidth: "420px",
  backgroundColor: "#111",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  textAlign: "center"
};

const sectionTitle = {
  marginBottom: "1.5rem",
  fontSize: "1.3rem"
};

const emailText = {
  marginBottom: "2rem",
  fontSize: "1.05rem",
  color: "#ccc",
  wordBreak: "break-word"
};

const btnGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem"
};

const mainBtn = {
  padding: "12px",
  backgroundColor: "#8b0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "12px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer"
};

const backBtn = {
  padding: "12px",
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "0.5rem"
};

export default Account;
