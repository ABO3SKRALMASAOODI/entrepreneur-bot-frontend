// src/components/ChatMessage.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function TypingTextMessage({ text, speed = 20, onDone }) {
    const [displayed, setDisplayed] = useState("");
  
    useEffect(() => {
      if (!text || typeof text !== "string") return;
  
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed((prev) => prev + text[i]);
          i++;
        } else {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
      return () => clearInterval(interval);
    }, [text]);
  
    return (
      <span>
        {displayed}
        {text && displayed.length < text.length ? (
          <span className="animate-pulse">|</span>
        ) : null}
      </span>
    );
  }
  
export default function ChatMessage({ msg, index }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: isUser ? "#8b0000" : "#660000",
          padding: "12px 16px",
          borderRadius: "16px",
          color: "#fff",
          maxWidth: "75%",
          whiteSpace: "pre-wrap",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <strong>{isUser ? "You" : "The Hustler Bot"}</strong>
        <div style={{ marginTop: "6px" }}>
          {isUser ? msg.content : <TypingTextMessage text={msg.content} />}
        </div>
      </div>
    </motion.div>
  );
}
