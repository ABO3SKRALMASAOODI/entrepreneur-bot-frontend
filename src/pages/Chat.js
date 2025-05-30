import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function SubscribeModal({ onClose, onSubscribe }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: "100vh", width: "100vw",
      backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 9999
    }}>
      <div style={{
        background: "#fff", padding: "2rem", borderRadius: "1rem",
        width: "90%", maxWidth: "500px", textAlign: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ marginBottom: "1rem", color: "#333" }}>💼 Upgrade Your Business Plan</h2>
        <p style={{ marginBottom: "1rem", fontSize: "1.1rem", color: "#555" }}>
          Full access for <strong>$20/month</strong>
        </p>
        <ul style={{ textAlign: "left", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          <li>🚀 Unlimited personalized business advice</li>
          <li>📊 Step-by-step strategies to grow fast</li>
          <li>🛠️ Exclusive tools for founders</li>
          <li>⚡ Priority access and support</li>
        </ul>
        <button onClick={onSubscribe} style={{
          background: "#6753ea", color: "#fff", padding: "12px 24px",
          borderRadius: "8px", fontSize: "1rem", border: "none", cursor: "pointer"
        }}>
          💳 Subscribe Now
        </button>
        <br /><br />
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#888",
          cursor: "pointer", textDecoration: "underline"
        }}>
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
      const res = await API.post("/chat/", { prompt }, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    if (!token) return alert("Please log in first.");
    try {
      const res = await API.post("/paddle/create-checkout-session", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error("Failed to start checkout:", err);
      alert("Failed to start checkout session.");
    }
  };

  return (
    <div style={{
      maxWidth: "700px", margin: "auto", padding: "2rem", fontFamily: "Segoe UI, sans-serif"
    }}>
      <div style={{
        display: "flex", justifyContent: "flex-end", marginBottom: "1rem", gap: "10px"
      }}>
        <button onClick={handleNewSession} style={btnStyle}>🔁 New Session</button>
        <button onClick={handleLogout} style={btnStyle}>🚪 Logout</button>
      </div>

      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}>💬 AI Business Mentor</h2>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button onClick={() => setShowModal(true)} style={{
          backgroundColor: "#6753ea", color: "white", padding: "12px 24px",
          border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1rem"
        }}>
          💳 Subscribe to Unlock Full Access
        </button>
      </div>

      <div style={{
        background: "#f1f3f6", padding: "1rem", borderRadius: "10px", height: "60vh",
        overflowY: "auto", marginBottom: "1rem", border: "1px solid #ccc"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "1rem", textAlign: msg.role === "user" ? "right" : "left" }}>
            <div style={{
              display: "inline-block", padding: "10px 14px", borderRadius: "12px",
              backgroundColor: msg.role === "user" ? "#dceeff" : "#e8ffe7",
              maxWidth: "75%", boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}>
              <strong>{msg.role === "user" ? "You" : "Mentor"}</strong>
              <div style={{ marginTop: "5px", whiteSpace: "pre-wrap" }}>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask your business question..."
          rows={3}
          style={{
            resize: "none", padding: "12px", borderRadius: "8px", border: "1px solid #ccc",
            fontSize: "1rem", width: "100%"
          }}
        />
        <button type="submit" style={{
          alignSelf: "flex-end", padding: "10px 20px", background: "#333",
          color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer"
        }}>
          ➤ Send
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>❌ {error}</p>}
      {showModal && (
        <SubscribeModal
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#eee",
  color: "#333",
  padding: "8px 16px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.95rem",
};

export default Chat;
