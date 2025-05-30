import React, { useState, useEffect, useRef } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function SubscribeModal({ onClose, onSubscribe }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 9999
    }}>
      <div style={{
        background: "#1e1e2f", borderRadius: "1rem", padding: "2rem",
        width: "90%", maxWidth: "500px", color: "#fff", boxShadow: "0 0 30px #000"
      }}>
        <h2 style={{ marginBottom: "1rem", color: "#fff" }}>💼 Upgrade to Pro</h2>
        <p style={{ marginBottom: "1rem" }}>
          Full access for <strong>$20/month</strong>
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.7", color: "#ccc" }}>
          <li>🚀 Unlimited business questions</li>
          <li>📊 Step-by-step strategies</li>
          <li>🛠️ Tools for founders</li>
          <li>⚡ Priority support</li>
        </ul>
        <button onClick={onSubscribe} style={{
          background: "linear-gradient(135deg, #9c27b0, #673ab7)",
          color: "#fff", padding: "12px 20px", borderRadius: "8px",
          fontSize: "1rem", border: "none", cursor: "pointer", marginTop: "1rem"
        }}>
          💳 Subscribe Now
        </button>
        <br /><br />
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#aaa",
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
      height: "100vh", width: "100vw", display: "flex", flexDirection: "column",
      backgroundColor: "#121212", color: "#f0f0f0", fontFamily: "Segoe UI, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        padding: "1rem", background: "#1f1f2e", borderBottom: "1px solid #333",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>💬 AI Business Mentor</h2>
        <div>
          <button onClick={handleNewSession} style={btnStyle}>🔁 New Session</button>
          <button onClick={handleLogout} style={btnStyle}>🚪 Logout</button>
        </div>
      </div>

      {/* Subscribe */}
      <div style={{ padding: "0.5rem 1rem", textAlign: "center", backgroundColor: "#1c1c2b" }}>
        <button onClick={() => setShowModal(true)} style={{
          background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
          color: "#fff", border: "none", padding: "10px 18px", borderRadius: "10px",
          cursor: "pointer", fontSize: "1rem"
        }}>
          💳 Unlock Full Access
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flexGrow: 1, overflowY: "auto", padding: "1rem", display: "flex",
        flexDirection: "column", gap: "1rem", backgroundColor: "#181818"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              background: msg.role === "user"
                ? "linear-gradient(135deg, #2196f3, #21cbf3)"
                : "linear-gradient(135deg, #4caf50, #81c784)",
              padding: "12px 16px", borderRadius: "16px",
              color: "#fff", maxWidth: "70%", whiteSpace: "pre-wrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}>
              <strong>{msg.role === "user" ? "You" : "Mentor"}</strong>
              <div style={{ marginTop: "6px" }}>{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Prompt Area */}
      <form onSubmit={handleSend} style={{
        padding: "1rem", backgroundColor: "#1f1f2f", display: "flex", justifyContent: "center",
        borderTop: "1px solid #333"
      }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question..."
          rows={2}
          style={{
            width: "70%", maxWidth: "800px", backgroundColor: "#2a2a3b", color: "#fff",
            border: "1px solid #444", borderRadius: "12px", padding: "12px",
            fontSize: "1rem", resize: "none", marginRight: "10px"
          }}
        />
        <button type="submit" style={{
          background: "linear-gradient(135deg, #ff8a00, #e52e71)",
          color: "#fff", padding: "12px 20px", fontSize: "1.1rem",
          borderRadius: "10px", border: "none", cursor: "pointer"
        }}>
          ➤
        </button>
      </form>

      {error && (
        <div style={{ padding: "0.5rem 1rem", color: "#ff8080", backgroundColor: "#2f1f1f" }}>
          ❌ {error}
        </div>
      )}

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
  backgroundColor: "#2a2a3a",
  color: "#ccc",
  border: "1px solid #444",
  padding: "8px 14px",
  borderRadius: "8px",
  marginLeft: "10px",
  cursor: "pointer",
  fontSize: "0.9rem"
};

export default Chat;
