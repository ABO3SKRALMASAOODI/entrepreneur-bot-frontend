import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FXLayer from "./FXLayer"; // ✅ Replaces manual FX divs

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-36 bg-gradient-to-b from-black via-[#110000] to-black overflow-hidden z-20">
      {/* 🌌 FX Visual Background Layer */}
      <FXLayer showBlueprint={true} showRadial={true} />

      {/* ✨ Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-[0_0_15px_#ff1a1a] z-10 relative"
      >
        Ready to Build Your Empire?
      </motion.h2>

      {/* 🧠 Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-6 text-lg md:text-2xl text-center text-gray-300 max-w-3xl mx-auto z-10 relative"
      >
        Start your journey with AI mentorship, personalized strategies, and a 7-day free trial.
      </motion.p>

      {/* 🚀 Call-to-Action Buttons */}
      <motion.div
        className="mt-10 flex justify-center gap-6 z-10 relative"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 30px #ff1a1a" }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-red-600 to-red-900 px-8 py-4 rounded-xl font-bold text-white shadow-[0_0_20px_#ff1a1a] hover:shadow-[0_0_40px_#ff1a1a]"
        >
          Start Free Trial
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/login")}
          className="bg-gray-800 border border-red-600 px-8 py-4 rounded-xl font-bold text-white hover:bg-gray-700 hover:border-red-400 transition"
        >
          Login
        </motion.button>
      </motion.div>
    </section>
  );
}

export default CTASection;
