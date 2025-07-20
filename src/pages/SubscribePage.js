import React from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SubscribePage() {
  const navigate = useNavigate();

  const handlePaddleSubscribe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first.");

    try {
      const res = await API.post("/paddle/create-checkout-session", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
      } else {
        alert("Failed to get checkout link.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start checkout session.");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      color: "#fff",
      textAlign: "center",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "640px",
        backgroundColor: "#111",
        padding: "3rem",
        borderRadius: "2rem",
        boxShadow: "0 0 50px rgba(255, 26, 26, 0.3)"
      }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "2rem", fontWeight: "bold" }}>
          Unlock Full Access to The Hustler Bot
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#ccc" }}>
          Upgrade for <strong>$20/month</strong> and get unlimited access to advanced AI mentorship built for entrepreneurs.
        </p>

        <ul style={{
          textAlign: "left",
          marginBottom: "2rem",
          color: "#ddd",
          lineHeight: "1.8",
          paddingLeft: "1rem",
          fontSize: "1rem"
        }}>
          <li>&bull; Ask unlimited business, strategy, and product questions</li>
          <li>&bull; Receive personalized startup guidance tailored to your idea and stage</li>
          <li>&bull; Access expert-level insight across marketing, funding, positioning, and more</li>
          <li>&bull; Get actionable suggestions for MVPs, landing pages, ads, and campaigns</li>
          <li>&bull; Enjoy faster responses and direct access to priority support</li>
          <li>&bull; Unlock future features and improvements at no additional cost</li>
        </ul>

        <button onClick={handlePaddleSubscribe} style={{
          backgroundColor: "#8b0000",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "1.1rem",
          width: "100%",
          fontWeight: "bold",
          marginBottom: "1rem",
          boxShadow: "0 0 20px #ff1a1a88"
        }}>
          Subscribe Now
        </button>

        <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
          localStorage.removeItem("seen_intro");
          navigate("/login");
        }} style={{
          backgroundColor: "#444",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          width: "100%",
          fontWeight: "bold"
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}
