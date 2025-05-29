import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
function SubscribeModal({ onClose, onSubscribe }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          maxWidth: "600px",
          width: "100%",
          padding: "2.5rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>
          💼 Upgrade Your Business Plan
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#666", marginBottom: "1.5rem" }}>
          Get full access to your AI mentor for just <strong>$20/month</strong>
        </p>
        <ul
          style={{
            textAlign: "left",
            fontSize: "1.1rem",
            color: "#444",
            lineHeight: "1.8",
            marginBottom: "2rem",
            paddingLeft: "1.5rem",
          }}
        >
          <li>🚀 Unlimited personalized business advice</li>
          <li>📊 Step-by-step strategies to grow fast</li>
          <li>🛠️ Exclusive tools for founders</li>
          <li>⚡ Priority access and support</li>
        </ul>
        <button
          onClick={onSubscribe}
          style={{
            backgroundColor: "#6753ea",
            color: "#fff",
            padding: "14px 28px",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "1rem",
            transition: "background 0.3s",
          }}
        >
          💳 Subscribe Now
        </button>
        <br />
        <button
          onClick={onClose}
          style={{
            fontSize: "0.95rem",
            color: "#999",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ You're not logged in.");
      return;
    }

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await API.post(
        "/chat/",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const botReply = res.data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (err) {
      setError(err.response?.data?.error || "Error during chat");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNewSession = () => {
    setMessages([]);
    setPrompt("");
    setError("");
  };

  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");
    console.log("📦 Token being sent to backend:", token);

    if (!token) return alert("Please log in first.");

    try {
      const res = await API.post(
        "/paddle/create-checkout-session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error("Failed to start checkout:", err);
      alert("Failed to start checkout session.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto", position: "relative" }}>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button onClick={handleNewSession} style={{ marginRight: "10px" }}>
          🔁 New Session
        </button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h2>💬 AI Business Mentor</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#6753ea",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💳 Subscribe to Unlock Full Access
        </button>
      </div>

      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.role === "user" ? "#d1e7ff" : "#e2ffe1",
                maxWidth: "80%",
              }}
            >
              <strong>{msg.role === "user" ? "You" : "Mentor"}</strong>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <textarea
          placeholder="Ask your business question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Send
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          ❌ {error}
        </p>
      )}

      {/* ✅ Modal at the bottom */}
      {showModal && (
        <SubscribeModal
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

export default Chat;
