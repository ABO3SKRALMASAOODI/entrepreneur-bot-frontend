// LandingPage.js (Part 1)
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRive } from "rive-react";

function LandingPage() {
  const navigate = useNavigate();
  const { rive, RiveComponent } = useRive({
    src: "/hustler-robot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  const robotRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  useEffect(() => {
    const handleMouse = (x) => {
      const mouseX = x / window.innerWidth;
      const input = rive?.inputs?.find((i) => i.name === "mouseX");
      if (input) input.value = mouseX;
    };

    const onMouseMove = (e) => handleMouse(e.clientX);
    const onScroll = () => handleMouse(window.scrollY % window.innerWidth);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [rive]);

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
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_#ff1a1a]"
        >
          The Hustler Bot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
          Build your empire with smart strategies, instant advice, and AI mentorship.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-6 justify-center"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-red-600 to-red-900 px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-800 border border-red-600 px-8 py-3 rounded-xl font-bold text-white hover:bg-gray-700 hover:border-red-400 transition"
          >
            Login
          </button>
        </motion.div>

        {/* 🧠 Animated Robot */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[480px] md:w-[600px]">
          <RiveComponent className="w-full h-full" />
        </div>
      </section>
      {/* ROADMAP SECTION */}
      <section ref={sectionRef} className="py-28 bg-gradient-to-b from-[#111] to-black px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-[0_0_10px_#ff1a1a] mb-20">
          Your Journey with Hustler Bot
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: false }}
              className={`flex flex-col md:flex-row items-center mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Glow Dot + Line */}
              <div className="relative w-full md:w-1/5 flex justify-center mb-8 md:mb-0">
                <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_25px_#ff1a1a] relative z-10" />
                <div className="absolute top-6 w-1 h-full bg-gradient-to-b from-red-600 to-transparent animate-pulse z-0" />
              </div>

              {/* Card Content */}
              <div className="bg-[#111] border border-red-900 shadow-md text-white rounded-2xl p-6 max-w-lg md:w-4/5">
                <h3 className="text-xl font-bold mb-2">
                  {item.icon} {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 text-center bg-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-white mb-10 drop-shadow-[0_0_12px_#ff1a1a]"
        >
          Ready to Build Your Empire?
        </motion.h2>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-800 border border-red-600 px-8 py-3 rounded-xl font-bold text-white hover:bg-gray-700 hover:border-red-400 transition"
          >
            Login
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
