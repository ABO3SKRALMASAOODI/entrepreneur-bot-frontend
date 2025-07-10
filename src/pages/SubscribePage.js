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
      height: "100vh", display: "flex", justifyContent: "center",
      alignItems: "center", backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "2rem"
    }}>
      <div style={{
        maxWidth: "600px", backgroundColor: "#111", padding: "3rem",
        borderRadius: "2rem", boxShadow: "0 0 50px rgba(0,0,0,0.8)"
      }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Unlock Full Access to The Hustler Bot 🚀</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#ccc" }}>
          Upgrade to the Pro version for just <strong>$20/month</strong> and get unlimited access to a powerful AI mentor.
        </p>
        <ul style={{ textAlign: "left", marginBottom: "2rem", color: "#ddd", lineHeight: "1.8" }}>
          <li>✅ Unlimited business questions, advice, and mentoring</li>
          <li>📈 Personalized startup strategies tailored to your goals</li>
          <li>🧠 Expert-level insights on marketing, funding, product, and more</li>
          <li>🛠️ Access to exclusive tools and entrepreneurial resources</li>
          <li>⚡ Faster responses and priority support</li>
          <li>🌐 Future features and updates included for free</li>
        </ul>
        <button onClick={handlePaddleSubscribe} style={{
          backgroundColor: "#8b0000", color: "#fff", padding: "14px 28px",
          borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "1.1rem",
          width: "100%", fontWeight: "bold"
        }}>
          Unlock Hustler Bot X5
        </button>
      </div>
    </div>
  );
}