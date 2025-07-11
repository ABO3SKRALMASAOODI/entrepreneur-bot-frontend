// src/pages/Chat.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRive } from "rive-react";

import {
  startSession,
  sendMessageToSession,
  getSessions,
  getMessagesForSession,
} from "../api/api";
import API from "../api/api";

import TypingText from "../components/TypingText";      // your typing-style component
import RobotBubble from "../components/RobotBubble";    // Rive bubble bot

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [error, setError] = useState("");
  const [showIntro, setShowIntro] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user_email");

  // Initialize your bubble-bot Rive animation
  const { rive: bubbleRive, RiveComponent: BubbleBot } = useRive({
    src: "/hustler-bubble-bot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Load sessions once
  useEffect(() => {
    loadSessions();
  }, []);

  // Show intro modal once
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

  const handleNewSession = () => {
    setMessages([]);
    setPrompt("");
    setError("");
    setCurrentSessionId(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = await startSession();
        setCurrentSessionId(sessionId);
        await loadSessions();
      }

      // Add user message
      setMessages((prev) => [
        ...prev,
        { role: "user", content: prompt.trim() },
      ]);
      setPrompt("");
      setIsThinking(true);

      // Call API
      const reply = await sendMessageToSession(sessionId, prompt);

      // Update sessions list if needed
      if (messages.length === 3) {
        await loadSessions();
      }

      // Add assistant reply
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      setError(err.response?.data?.error || "Error during chat");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div style={layout}>
      <Link to="/account" style={floatingAccountBtn}>
        👤
      </Link>

      {/* Sidebar */}
      <div
        style={{
          flex: "0 0 260px",
          width: sidebarOpen ? "260px" : "0",
          transition: "width 0.3s ease",
          backgroundColor: "#111",
          color: "#fff",
          overflow: "hidden",
          padding: sidebarOpen ? "2rem 1rem" : "0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>The Hustler Bot</h2>
          <button onClick={() => setSidebarOpen(false)} style={closeBtn}>
            ×
          </button>
        </div>
        <p style={{ color: "#aaa", marginBottom: "1rem" }}>
          {userEmail || "User"}
        </p>
        <button onClick={handleNewSession} style={sidebarBtn}>
          New Session
        </button>
        <button onClick={handleLogout} style={sidebarBtn}>
          Logout
        </button>
        <hr style={{ borderColor: "#333", margin: "1.5rem 0" }} />
        <h4 style={{ color: "#bbb" }}>Sessions</h4>
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => loadMessages(s.id)}
            style={sidebarBtn}
          >
            {s.title || "Untitled"}
          </button>
        ))}
      </div>

      {/* Main Chat Area */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000",
        }}
      >
        {/* Top Bar */}
        <div style={topBar}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ ...mainBtn, marginRight: "1rem" }}
          >
            ☰
          </button>
          <h2 style={{ color: "#fff" }}>The Hustler Bot</h2>
          <div style={{ width: 30 }} />
        </div>

        {/* Messages */}
        <div style={chatWindow}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    msg.role === "user" ? "#8b0000" : "#660000",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  color: "#fff",
                  maxWidth: "75%",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                <strong>
                  {msg.role === "user" ? "You" : "The Hustler Bot"}
                </strong>
                <div style={{ marginTop: 6 }}>{msg.content}</div>
              </motion.div>
            </motion.div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#660000",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  gap: "8px",
                }}
              >
                <BubbleBot style={{ width: 40, height: 40 }} />
                <TypingText text="Thinking..." speed={100} loop={true} />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={chatForm}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask your business question..."
            rows={2}
            style={inputBox}
          />
          <button type="submit" style={mainBtn}>
            ➤
          </button>
        </form>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "0.5rem 1rem",
              color: "#ff8080",
              backgroundColor: "#2f1f1f",
            }}
          >
            ❌ {error}
          </div>
        )}
      </div>

      {/* Intro Modal */}
      {showIntro && (
        <IntroModal
          onContinue={() => {
            localStorage.setItem("seen_intro", "true");
            setShowIntro(false);
          }}
        />
      )}
    </div>
  );
}

// (keep your existing IntroModal and styles here…)



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

const linkStyle = {
  display: "block",
  marginTop: "0.5rem",
  color: "#ccc",
  textDecoration: "underline",
  fontSize: "0.95rem"
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