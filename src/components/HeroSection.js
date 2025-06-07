import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRive } from "rive-react";

function HeroSection() {
  const navigate = useNavigate();

  // Load Rive robot animation
  const { rive, RiveComponent } = useRive({
    src: "/hustler-robot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  // Cursor tracking for robot interactivity
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
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">

      {/* 🔴 Radial Red Glow Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-red-900/40 via-transparent to-black pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* 🔵 Parallax Blueprint Layer (slow scroll motion) */}
      <motion.div
        className="absolute inset-0 bg-[url('/blueprint.svg')] bg-repeat opacity-5 pointer-events-none z-0"
        initial={{ y: 0 }}
        whileInView={{ y: -100 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      />

      {/* ⚡ Hero Content */}
      <motion.div
        className="z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_25px_#ff1a1a]">
          The Hustler Bot
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300">
          Build your empire with AI-powered mentorship and smart strategies.
        </p>

        {/* 🧠 CTA Buttons */}
        <div className="mt-10 flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.06, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-red-600 to-red-900 px-8 py-4 rounded-xl font-bold text-white shadow-[0_0_20px_#ff1a1a] hover:shadow-[0_0_35px_#ff1a1a]"
          >
            Start Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate("/login")}
            className="bg-gray-800 border border-red-600 px-8 py-4 rounded-xl font-bold text-white hover:bg-gray-700 hover:border-red-400 transition"
          >
            Login
          </motion.button>
        </div>
      </motion.div>

      {/* 🤖 Rive Robot Animation */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 w-[700px] h-[700px] z-0 opacity-90">
        <RiveComponent style={{ width: "100%", height: "100%" }} />
      </div>
    </section>
  );
}

export default HeroSection;
