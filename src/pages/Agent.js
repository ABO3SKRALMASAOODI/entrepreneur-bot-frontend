import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { callOrchestrator } from "../api/api";

function TypingText({ text, speed, displayed, setDisplayed, onComplete }) {
  const indexRef = useRef(displayed.length);

  useEffect(() => {
    if (!text || indexRef.current >= text.length) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, indexRef.current + 1));
      indexRef.current += 1;

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, setDisplayed, onComplete]);

  return <span style={{ whiteSpace: "pre-wrap" }}>{displayed}</span>;
}

export default function Agents() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingIndex, setTypingIndex] = useState(null);
  const [typingText, setTypingText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsBotResponding(true);
    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const data = await callOrchestrator(userMessage.content);
      const botReply = data.content || data.plan || JSON.stringify(data);

      setDisplayedText("");
      setMessages((prev) => {
        const updated = [...prev, { role: "assistant", content: "" }];
        setTypingIndex(updated.length - 1);
        setTypingText(botReply);
        return updated;
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Network or server error");
      setIsBotResponding(false);
    }
  };

  const handleStop = () => {
    setTypingIndex(null);
    setTypingText("");
    setDisplayedText("");
    setIsBotResponding(false);
  };

  return (
    <div style={layout}>
      <div style={chatWindow}>
        {messages.map((msg, i) => {
          const isTyping = i === typingIndex && msg.role === "assistant";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  background: msg.role === "user" ? "#8b0000" : "#660000",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  color: "#fff",
                  maxWidth: "75%",
                  whiteSpace: "pre-wrap",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  fontFamily: "inherit",
                }}
              >
                <strong>{msg.role === "user" ? "You" : "Orchestrator"}</strong>
                <div style={{ marginTop: "6px" }}>
                  {isTyping ? (
                    <TypingText
                      key={`typing-${i}`}
                      text={typingText}
                      speed={15}
                      displayed={displayedText}
                      setDisplayed={setDisplayedText}
                      onComplete={() => {
                        setMessages((prev) => {
                          const updated = [...prev];
                          updated[i].content = typingText;
                          return updated;
                        });
                        setTypingIndex(null);
                        setIsBotResponding(false);
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(msg.content || ""),
                      }}
                      style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit",
                        overflowWrap: "break-word",
                      }}
                      className="message-content"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} style={chatForm}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          placeholder="Ask your agent anything..."
          rows={2}
          style={inputBox}
        />
        {isBotResponding ? (
          <button
            type="button"
            onClick={handleStop}
            style={{ ...mainBtn, backgroundColor: "#444" }}
          >
            Stop
          </button>
        ) : (
          <button type="submit" style={mainBtn}>
            ➤
          </button>
        )}
      </form>

      {error && (
        <div style={{ padding: "0.5rem 1rem", color: "#ff8080", backgroundColor: "#2f1f1f" }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}

const layout = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#000",
  color: "#eee",
  fontFamily: "Segoe UI, sans-serif",
};

const chatWindow = {
  flexGrow: 1,
  overflowY: "auto",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  backgroundColor: "#000",
};

const chatForm = {
  padding: "1rem",
  backgroundColor: "#000",
  display: "flex",
  justifyContent: "center",
  borderTop: "1px solid #222",
};

const inputBox = {
  width: "70%",
  maxWidth: "800px",
  backgroundColor: "#111",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "12px",
  padding: "12px",
  fontSize: "1rem",
  resize: "none",
  marginRight: "10px",
};

const mainBtn = {
  backgroundColor: "#8b0000",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
};
