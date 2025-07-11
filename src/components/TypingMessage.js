import React, { useEffect, useState, useRef } from "react";

function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);

  useEffect(() => {
    if (!text) return;

    const delay = () => 10 + Math.random() * 30;

    const typeChar = () => {
      setDisplayed((prev) => prev + text.charAt(index.current));
      index.current += 1;

      if (index.current < text.length) {
        setTimeout(typeChar, delay());
      } else if (onDone) {
        onDone();
      }
    };

    typeChar();
  }, [text, onDone]);

  return (
    <div className="whitespace-pre-wrap text-white">
      {displayed}
      <span className="animate-pulse text-red-400 ml-1">|</span>
    </div>
  );
}

export default TypingMessage;
