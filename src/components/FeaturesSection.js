import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "💡",
    title: "Validate Business Ideas",
    desc: "Quickly assess and refine your startup ideas with instant AI feedback, saving you months of trial and error.",
  },
  {
    icon: "📈",
    title: "Tailored Growth Plans",
    desc: "Receive a personalized roadmap with milestones, actions, and KPIs based on your business type.",
  },
  {
    icon: "🧠",
    title: "24/7 AI Mentorship",
    desc: "Get guidance anytime from an intelligent assistant trained on successful startup strategies.",
  },
  {
    icon: "🚀",
    title: "Product & Marketing Help",
    desc: "From building MVPs to writing ad copy, Hustler Bot supports you with actionable suggestions.",
  },
  {
    icon: "🔒",
    title: "Data Security First",
    desc: "Your ideas and progress are encrypted and never shared. 100% private.",
  },
  {
    icon: "💳",
    title: "7-Day Free Trial",
    desc: "No payment needed upfront. Try the bot, build something real, and only pay if it works.",
  },
];

function FeaturesSection() {
  return (
    <section className="relative py-36 bg-black px-6 md:px-20 overflow-hidden">
      {/* Optional Blueprint Background */}
      <motion.div
        className="absolute inset-0 bg-[url('/blueprint.svg')] bg-repeat opacity-5 pointer-events-none z-0"
        initial={{ y: 0 }}
        whileInView={{ y: -60 }}
        transition={{ duration: 6 }}
      />

      {/* Section Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-bold text-center mb-20 text-white drop-shadow-[0_0_15px_#ff1a1a] relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Why Entrepreneurs Use Hustler Bot
      </motion.h2>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto relative z-10">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#111] border border-red-900 rounded-2xl p-6 shadow-[0_0_30px_rgba(255,26,26,0.2)] hover:shadow-[0_0_40px_#ff1a1a] hover:border-red-500 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-2 text-white flex items-center gap-2"
              whileHover={{ rotate: 1 }}
            >
              <motion.span whileHover={{ scale: 1.2 }}>{item.icon}</motion.span> {item.title}
            </motion.h3>
            <p className="text-gray-300 text-md">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
