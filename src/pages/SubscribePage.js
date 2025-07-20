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
      padding: "2rem",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto"
    }}>
      <div style={{
        maxWidth: "640px",
        width: "100%",
        backgroundColor: "#111",
        padding: "3rem",
        borderRadius: "2rem",
        boxShadow: "0 0 45px rgba(255, 26, 26, 0.35)",
        border: "1px solid #8b0000"
      }}>
        <h1 style={{
          fontSize: "2.25rem",
          fontWeight: "800",
          marginBottom: "1.5rem",
          lineHeight: "1.2"
        }}>
          Unlock Full Access to Hustler Bot
        </h1>

        <p style={{
          fontSize: "1.125rem",
          color: "#ccc",
          marginBottom: "2rem"
        }}>
          Upgrade for <strong>$20/month</strong> to access the full power of Hustler Bot — your intelligent startup mentor.
        </p>

        <ul style={{
          textAlign: "left",
          marginBottom: "2.5rem",
          color: "#ddd",
          fontSize: "1rem",
          lineHeight: "1.75",
          listStyleType: "disc",
          paddingLeft: "1.25rem"
        }}>
          <li>Ask unlimited business, product, and marketing questions</li>
          <li>Get personalized strategies tailored to your startup’s stage</li>
          <li>Access expert insights across growth, funding, and positioning</li>
          <li>Generate high-converting landing pages, ads, and content</li>
          <li>Receive faster replies and access priority support</li>
          <li>Unlock all future updates and premium features automatically</li>
        </ul>

        <button onClick={handlePaddleSubscribe} style={{
          backgroundColor: "#8b0000",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "1.125rem",
          fontWeight: "bold",
          width: "100%",
          marginBottom: "1.2rem",
          boxShadow: "0 0 25px rgba(255, 26, 26, 0.3)",
          transition: "transform 0.2s ease"
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          Subscribe Now
        </button>

        <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
          localStorage.removeItem("seen_intro");
          navigate("/login");
        }} style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
          width: "100%",
          transition: "background 0.2s ease"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#333")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
