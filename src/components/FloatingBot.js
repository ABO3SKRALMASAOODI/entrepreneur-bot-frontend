import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRive } from "rive-react";
import { motion } from "framer-motion";

function FloatingBot() {
  const navigate = useNavigate();

  // Load Rive bot animation
  const { rive, RiveComponent } = useRive({
    src: "/hustler-bubble-bot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  // Track mouse X for animation
  useEffect(() => {
    const handleMouse = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const input = rive?.inputs?.find((i) => i.name === "mouseX");
      if (input) input.value = mouseX;
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rive]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111] border border-red-700 rounded-full px-4 py-2 shadow-[0_0_25px_#ff1a1a] cursor-pointer"
      onClick={() => navigate("/register")}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 🤖 Animated Bot Head */}
      <div className="w-12 h-12 rounded-full overflow-hidden animate-pulse bg-black">
        <RiveComponent style={{ width: "100%", height: "100%" }} />
      </div>

      {/* 🗨️ Chat Text */}
      <motion.span
        className="text-sm text-white opacity-90 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Hello, how can I help you with your business today?
      </motion.span>
    </motion.div>
  );
}

export default FloatingBot;
