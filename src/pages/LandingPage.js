import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json";

export default function LandingPage() {
  const navigate = useNavigate();

  const roadmapPoints = [
    { title: "💡 Validate Ideas Instantly", desc: "AI-backed startup idea checks" },
    { title: "📊 Growth Blueprints", desc: "Tailored strategies for your journey" },
    { title: "🤖 24/7 AI Mentor", desc: "Always-on business support" },
    { title: "🚀 Step-by-step Launch Guide", desc: "Clear roadmap to success" },
    { title: "🔐 Full Privacy", desc: "Your data stays yours" },
    { title: "🎁 Free 7-Day Trial", desc: "Risk-free, no card needed" },
  ];

  return (
    <div className="bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-black via-[#1a0000] to-black">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-red-600 drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        >
          The Hustler Bot
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          <Typewriter
            words={[
              "Helping you build a real business...",
              "Marketing. Growth. Execution. Funding.",
              "Try it for free now — no risk.",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl font-bold text-lg shadow-md"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-2xl font-semibold text-lg"
          >
            Login
          </button>
        </div>

        <div className="mt-10 max-w-sm md:max-w-md">
          <Lottie animationData={robotAnimation} loop={true} />
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative py-28 bg-black overflow-hidden">
        <h2 className="text-center text-4xl font-bold mb-16">Your Journey</h2>
        <div className="absolute left-1/2 w-1 bg-red-700 h-full transform -translate-x-1/2 blur-md opacity-60" />

        <div className="relative max-w-4xl mx-auto flex flex-col gap-20">
          {roadmapPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className={`relative pl-16 pr-6 ${i % 2 === 0 ? "self-start" : "self-end text-right"}`}
            >
              <div className="absolute left-4 top-2 w-4 h-4 bg-red-600 rounded-full animate-ping" />
              <h3 className="text-2xl font-semibold text-red-400">{point.title}</h3>
              <p className="text-gray-400 mt-1">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 bg-gradient-to-b from-black to-red-950">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Ready to Build Your Empire?
        </motion.h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">Sign up now and get instant access to a powerful AI startup coach.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg font-bold rounded-xl shadow-lg"
          >
            Start Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-white px-6 py-3 text-lg font-semibold rounded-xl hover:bg-white hover:text-black transition"
          >
            Login
          </button>
        </div>
      </section>
    </div>
  );
}
