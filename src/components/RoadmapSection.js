import React from "react";
import { motion } from "framer-motion";
import ChipCircuit from "./ChipCircuit"; // ⬅️ Glowing chip animation

const roadmapSteps = [
  {
    title: "Step 1: Sign Up Instantly",
    desc: "Register in seconds and get instant access to Hustler Bot with a 7-day free trial.",
  },
  {
    title: "Step 2: Validate Your Idea",
    desc: "Chat with the bot to stress-test your startup idea using proven business principles.",
  },
  {
    title: "Step 3: Get a Custom Strategy",
    desc: "Receive a personalized growth roadmap with action steps tailored to your industry.",
  },
  {
    title: "Step 4: Build With AI",
    desc: "Use Hustler Bot to generate landing pages, emails, and MVPs using GPT-powered tools.",
  },
  {
    title: "Step 5: Launch & Scale",
    desc: "Monitor KPIs, adjust tactics, and scale your business with ongoing AI mentorship.",
  },
];

function RoadmapSection() {
  return (
    <section className="py-36 bg-black relative z-10 overflow-hidden px-6 md:px-12">
      {/* 🔌 Chip Glow Circuit Animation */}
      <ChipCircuit />

      {/* 🧠 Blueprint Background Layer */}
      <motion.div
      className="absolute inset-0 bg-repeat opacity-5 pointer-events-none z-0"
      style={{ backgroundImage: "url('/blueprint.svg')" }}
      initial={{ y: 0 }}
      whileInView={{ y: -80 }}
      transition={{ duration: 5 }}
/>




      {/* 🧭 Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-center mb-24 text-white drop-shadow-[0_0_15px_#ff1a1a] relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Your Journey with Hustler Bot
      </motion.h2>

      <div className="relative max-w-6xl mx-auto">
        {/* ⚡ Central Pulse Line */}
        <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-red-600 via-transparent to-black animate-pulse z-0 transform -translate-x-1/2" />

        {roadmapSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-between gap-10 mb-24 z-10`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            {/* 🔴 Glowing Milestone */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
              <div className="w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_#ff1a1a]" />
              <div className="w-1 h-full bg-gradient-to-b from-red-600 to-transparent animate-pulse" />
            </div>

            {/* 🧱 Step Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#111] border border-red-900 rounded-2xl p-6 md:max-w-lg w-full shadow-[0_0_30px_rgba(255,26,26,0.2)] z-20 hover:shadow-[0_0_40px_#ff1a1a] hover:border-red-600 transition"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-gray-300 text-md">{step.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;
