import React, { useState, useEffect, useRef } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function SubscribeModal({ onClose, onSubscribe }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 9999
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: "1rem", padding: "2rem",
        width: "90%", maxWidth: "500px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        fontFamily: "Segoe UI, sans-serif", textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "1rem", color: "#333" }}>💼 Upgrade to Pro</h2>
        <p style={{ marginBottom: "1rem", color: "#666" }}>
          Unlock full mentor access for <strong>$20/month</strong>
        </p>
        <ul style={{ textAlign: "left", paddingLeft: "1.5rem", marginBottom: "1.5rem", lineHeight: "1.7", color: "#444" }}>
          <li>🚀 Unlimited business questions</li>
          <li>📊 Step-by-step strategy advice</li>
          <li>🛠️ Tools for founders</li>
          <li>⚡ Priority support</li>
        </ul>
        <button onClick={onSubscribe} style={{
          backgroundColor: "#6753ea", color: "white", padding: "12px 20px",
          borderRadius: "8px", fontSize: "1rem", border: "none", cursor: "pointer"
        }}>
          💳 Subscribe Now
        </button>
        <br /><br />
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#888",
          textDecoration: "underline", cursor: "pointer"
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
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        { headers: { Authorization: `Bearer ${token}` } }
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
    if (!token) return alert("Please log in first.");
    try {
      const res = await API.post(
        "/paddle/create-checkout-session",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error("Failed to start checkout:", err);
      alert("Failed to start checkout session.");
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100vh", width: "100vw",
      fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f5f6fa"
    }}>
      {/* Header */}
      <div style={{
        padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #ddd",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>💬 AI Business Mentor</h2>
        <div>
          <button onClick={handleNewSession} style={btn}>🔁 New Session</button>
          <button onClick={handleLogout} style={btn}>🚪 Logout</button>
        </div>
      </div>

      {/* Subscribe Button */}
      <div style={{ padding: "1rem", backgroundColor: "#fff", borderBottom: "1px solid #eee", textAlign: "center" }}>
        <button onClick={() => setShowModal(true)} style={{
          backgroundColor: "#6753ea", color: "white", padding: "10px 20px",
          borderRadius: "10px", border: "none", cursor: "pointer"
        }}>
          💳 Subscribe to Unlock Full Access
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flexGrow: 1, overflowY: "auto", padding: "1rem", backgroundColor: "#eef1f5"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "0.75rem"
          }}>
            <div style={{
              backgroundColor: msg.role === "user" ? "#d0e7ff" : "#d5ffd9",
              padding: "12px 16px",
              borderRadius: "16px",
              maxWidth: "70%",
              whiteSpace: "pre-wrap",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)"
            }}>
              <strong>{msg.role === "user" ? "You" : "Mentor"}</strong>
              <div style={{ marginTop: "4px" }}>{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{
        display: "flex", padding: "1rem", borderTop: "1px solid #ddd",
        backgroundColor: "#fff"
      }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask your business question..."
          rows={2}
          style={{
            flexGrow: 1, resize: "none", padding: "12px", borderRadius: "8px",
            border: "1px solid #ccc", fontSize: "1rem", marginRight: "10px"
          }}
        />
        <button type="submit" style={{
          backgroundColor: "#333", color: "#fff", padding: "12px 20px",
          border: "none", borderRadius: "8px", cursor: "pointer"
        }}>
          ➤
        </button>
      </form>

      {/* Error */}
      {error && (
        <div style={{ padding: "0.5rem 1rem", color: "red", backgroundColor: "#ffe5e5" }}>
          ❌ {error}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <SubscribeModal
          onClose={() => setShowModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

const btn = {
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "8px 12px",
  marginLeft: "10px",
  cursor: "pointer",
  fontSize: "0.9rem"
};

export default Chat;
