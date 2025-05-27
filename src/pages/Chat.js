import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
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

  const handleSubscribe = () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first.");

    // Extract user ID from JWT (optional)
    let userId = "unknown";
    try {
      userId = JSON.parse(atob(token.split('.')[1]))?.sub || "unknown";
    } catch (e) {
      console.error("Invalid token format");
    }

    window.Paddle.Checkout.open({
      product: "pri_01jw8722trngfyz12kq158vrz7",
      passthrough: JSON.stringify({ user_id: userId }),
      successCallback: () => {
        alert("✅ Payment successful! Access will be activated shortly.");
      },
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto", position: "relative" }}>
      {/* Top Right Controls */}
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button onClick={handleNewSession} style={{ marginRight: "10px" }}>
          🔁 New Session
        </button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h2>💬 AI Business Mentor</h2>

      {/* Subscription CTA */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={handleSubscribe}
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

      {/* Message History */}
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

      {/* Chat Input */}
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
    </div>
  );
}

export default Chat;
