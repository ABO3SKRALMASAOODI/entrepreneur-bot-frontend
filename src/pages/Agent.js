import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { callOrchestrator } from "../api/api";

export default function Agents() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
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

      // If it's just a clarifying question from backend
      if (data.role === "assistant" && !data.spec) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
        setIsBotResponding(false);
        return;
      }

      // If we have final spec + optional agents output
      if (data.spec) {
        // First add the orchestrator plan
        const botReply = data.content || JSON.stringify(data.spec, null, 2);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botReply },
        ]);

        // Then add each agent's code output
        if (
          data.agents_output &&
          Array.isArray(data.agents_output) &&
          data.agents_output.length > 0
        ) {
          const agentMessages = data.agents_output.map((agent) => ({
            role: "assistant",
            content: `### ${agent.file}\n\`\`\`python\n${agent.code}\n\`\`\``,
          }));
          setMessages((prev) => [...prev, ...agentMessages]);
        }

        setIsBotResponding(false);
        return;
      }

      // Fallback for unexpected data
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: JSON.stringify(data) },
      ]);
      setIsBotResponding(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Network or server error");
      setIsBotResponding(false);
    }
  };

  const handleStop = () => {
    setIsBotResponding(false);
  };

  return (
    <div style={layout}>
      {/* Chat window */}
      <div style={chatWindow}>
        {messages.map((msg, i) => (
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
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input form */}
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

      {/* Error display */}
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
