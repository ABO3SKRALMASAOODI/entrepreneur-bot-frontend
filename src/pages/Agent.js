import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { callOrchestrator } from "../api/api";

// Typing animation component for orchestrator messages
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
    const userMessage = { role: "user", source: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const data = await callOrchestrator(userMessage.content);

      // Case 1: Backend asking a clarifying question (no spec)
      if (data.role === "assistant" && !data.spec) {
        setDisplayedText("");
        setMessages((prev) => {
          const updated = [
            ...prev,
            { role: "assistant", source: "orchestrator", content: "" }
          ];
          setTypingIndex(updated.length - 1);
          setTypingText(data.content);
          return updated;
        });
        return;
      }

      // Case 2: Orchestrator + agents pipeline
      if (data.orchestrator_output && data.agents_output) {
        // Show orchestrator first
        setDisplayedText("");
        setMessages((prev) => {
          const updated = [
            ...prev,
            { role: "assistant", source: "orchestrator", content: "" }
          ];
          setTypingIndex(updated.length - 1);
          setTypingText(data.orchestrator_output);
          return updated;
        });

        // Once orchestrator finishes typing, show agents one by one
        const onOrchestratorComplete = () => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[typingIndex].content = data.orchestrator_output;
            return updated;
          });
          setTypingIndex(null);
          setIsBotResponding(false);

          data.agents_output.forEach((agent, idx) => {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  source: "agent",
                  content: `${agent.agent_name}:\n${agent.output}`
                },
              ]);
            }, idx * 500); // delay between agents
          });
        };

        // Attach callback to TypingText via state
        setTypingText(data.orchestrator_output);
        setDisplayedText("");
        setTypingIndex(messages.length); // orchestrator message index
        return setTypingTextCallback(() => onOrchestratorComplete);
      }

      // Case 3: Unexpected data
      setDisplayedText("");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", source: "orchestrator", content: JSON.stringify(data) }
      ]);
    } catch (err) {
      console.error("Error:", err);
      setError("Network or server error");
      setIsBotResponding(false);
    }
  };

  // Typing callback storage
  const [typingTextCallback, setTypingTextCallback] = useState(null);

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
                <strong>
                  {msg.role === "user"
                    ? "You"
                    : msg.source === "agent"
                    ? msg.content.split(":")[0] // agent name before ":"
                    : "Orchestrator"}
                </strong>
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
                        if (typingTextCallback) typingTextCallback();
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
