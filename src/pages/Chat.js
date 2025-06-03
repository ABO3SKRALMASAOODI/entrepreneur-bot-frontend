import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  startSession,
  sendMessageToSession,
  getSessions,
  getMessagesForSession,
} from "../api/api";
import API from "../api/api";

function SubscribeModal({ onClose, onSubscribe }) {
  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h1 style={modalTitle}>Unlock Full Access to The Hustler Bot 🚀</h1>
        <p style={modalDescription}>
          Upgrade to the Pro version for just <strong>$20/month</strong> and get unlimited access to a powerful AI mentor.
        </p>
        <ul style={modalList}>
          <li>✅ Unlimited business questions, advice, and mentoring</li>
          <li>📈 Personalized startup strategies tailored to your goals</li>
          <li>🧠 Expert-level insights on marketing, funding, product, and more</li>
          <li>🛠️ Access to exclusive tools and entrepreneurial resources</li>
          <li>⚡ Faster responses and priority support</li>
          <li>🌐 Future features and updates included for free</li>
        </ul>
        <button onClick={onSubscribe} style={subscribeButton}>Upgrade to Pro</button>
        <button onClick={onClose} style={cancelButton}>No thanks, maybe later</button>
      </div>
    </div>
  );
}

function IntroModal({ onContinue }) {
  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h1 style={modalTitle}>Welcome to The Hustler Bot 💼</h1>
        <p style={modalDescription}>
          This AI-powered chatbot is your personal startup mentor. Ask business questions and get expert advice instantly.
        </p>
        <button onClick={onContinue} style={subscribeButton}>Continue</button>
      </div>
    </div>
  );
}

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const userEmail = localStorage.getItem("user_email");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("seen_intro")) {
      setShowIntro(true);
    }
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch {
      setSessions([]);
    }
  };

  const loadMessages = async (sessionId) => {
    try {
      const data = await getMessagesForSession(sessionId);
      setMessages(data);
      setCurrentSessionId(sessionId);
    } catch {
      setMessages([]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = await startSession();
        setCurrentSessionId(sessionId);
        loadSessions();
      }

      const userMessage = { role: "user", content: prompt };
      setMessages((prev) => [...prev, userMessage]);
      setPrompt("");

      const reply = await sendMessageToSession(sessionId, prompt);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.response?.data?.error || "Error during chat");
    }
  };

  const handleNewSession = () => {
    setMessages([]);
    setPrompt("");
    setError("");
    setCurrentSessionId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("seen_intro");
    navigate("/login");
  };

  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first.");
    try {
      const res = await API.post("/paddle/create-checkout-session", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.href = res.data.checkout_url;
    } catch {
      alert("Failed to start checkout session.");
    }
  };

  return (
    <div style={layout}>
      {/* 👤 Floating account icon */}
      <Link to="/account" style={floatingAccountBtn}>👤</Link>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "260px" : "0",
        transition: "width 0.3s ease",
        backgroundColor: "#111",
        color: "#fff",
        padding: sidebarOpen ? "2rem 1rem" : "0",
        overflow: "hidden"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>The Hustler Bot</h2>
          <button onClick={() => setSidebarOpen(false)} style={closeBtn}>×</button>
        </div>

        <p style={{ fontSize: "0.95rem", marginBottom: "1rem", color: "#aaa" }}>
          {userEmail || "User"}
        </p>

        <button onClick={handleNewSession} style={sidebarBtn}>New Session</button>
        <button onClick={() => {
          setSidebarOpen(false);
          setShowModal(true);
        }} style={sidebarBtn}>Subscribe</button>
        <button onClick={handleLogout} style={sidebarBtn}>Logout</button>

        <hr style={{ margin: "1.5rem 0", borderColor: "#333" }} />
        <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#bbb" }}>Sessions</h4>

        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
          {sessions.map((s) => (
            <button key={s.id} onClick={() => loadMessages(s.id)} style={{
              ...sidebarBtn,
              backgroundColor: currentSessionId === s.id ? "#b30000" : "#222",
              marginBottom: "0.5rem"
            }}>
              {s.title || `Session ${s.id}`}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={topBar}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ ...mainBtn, marginRight: "1rem" }}>☰</button>
          <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#fff" }}>The Hustler Bot</h2>
          <div style={{ width: "30px" }} />
        </div>

        <div style={chatWindow}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                background: msg.role === "user" ? "#8b0000" : "#660000",
                padding: "12px 16px", borderRadius: "16px",
                color: "#fff", maxWidth: "75%", whiteSpace: "pre-wrap",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
              }}>
                <strong>{msg.role === "user" ? "You" : "The Hustler Bot"}</strong>
                <div style={{ marginTop: "6px" }}>{msg.content}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} style={chatForm}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask your business question..."
            rows={2}
            style={inputBox}
          />
          <button type="submit" style={mainBtn}>➤</button>
        </form>

        {error && (
          <div style={{ padding: "0.5rem 1rem", color: "#ff8080", backgroundColor: "#2f1f1f" }}>
            ❌ {error}
          </div>
        )}
      </div>

      {showModal && <SubscribeModal onClose={() => setShowModal(false)} onSubscribe={handleSubscribe} />}
      {showIntro && (
        <IntroModal onContinue={() => {
          localStorage.setItem("seen_intro", "true");
          setShowIntro(false);
        }} />
      )}
    </div>
  );
}

// 🔧 Styles

const layout = {
  height: "100vh", width: "100vw", display: "flex", flexDirection: "row",
  backgroundColor: "#000", color: "#eee", fontFamily: "Segoe UI, sans-serif"
};

const topBar = {
  padding: "1rem", background: "#000", borderBottom: "1px solid #222",
  display: "flex", justifyContent: "space-between", alignItems: "center"
};

const chatWindow = {
  flexGrow: 1, overflowY: "auto", padding: "1rem 1rem 2rem",
  display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#000"
};

const chatForm = {
  padding: "1rem", backgroundColor: "#000", display: "flex",
  justifyContent: "center", borderTop: "1px solid #222"
};

const inputBox = {
  width: "70%", maxWidth: "800px", backgroundColor: "#111",
  color: "#fff", border: "1px solid #444", borderRadius: "12px",
  padding: "12px", fontSize: "1rem", resize: "none", marginRight: "10px"
};

const mainBtn = {
  backgroundColor: "#8b0000",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem"
};

const sidebarBtn = {
  width: "100%",
  marginBottom: "0.8rem",
  backgroundColor: "#8b0000",
  color: "#fff",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer"
};

const closeBtn = {
  backgroundColor: "#222", border: "none", borderRadius: "50%",
  width: "32px", height: "32px", color: "#fff", fontSize: "1.2rem",
  fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
};

const floatingAccountBtn = {
  position: "fixed",
  top: "16px",
  right: "16px",
  backgroundColor: "#222",
  color: "#fff",
  borderRadius: "50%",
  width: "42px",
  height: "42px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
  zIndex: 10005,
  textDecoration: "none",
  border: "1px solid #444",
  boxShadow: "0 0 10px rgba(0,0,0,0.4)"
};

const modalOverlay = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.85)", display: "flex",
  justifyContent: "center", alignItems: "center", zIndex: 10002
};

const modalContent = {
  background: "#111", borderRadius: "1.5rem", padding: "3rem",
  width: "95%", maxWidth: "650px", color: "#fff", boxShadow: "0 0 50px rgba(0,0,0,0.8)",
  textAlign: "center"
};

const modalTitle = { marginBottom: "1.5rem", fontSize: "2rem" };
const modalDescription = { fontSize: "1.1rem", color: "#ccc", marginBottom: "2rem" };
const modalList = { paddingLeft: "1.8rem", lineHeight: "1.8", fontSize: "1rem", color: "#ddd", textAlign: "left" };
const subscribeButton = {
  background: "#8b0000", color: "#fff", padding: "14px 28px",
  borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "1.1rem",
  width: "100%", fontWeight: "bold"
};
const cancelButton = {
  background: "none", border: "none", color: "#aaa",
  textDecoration: "underline", cursor: "pointer", display: "block",
  margin: "1rem auto 0", fontSize: "0.95rem"
};

export default Chat;
