// LandingPage.js (Complete + Correct)
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRive } from "rive-react";

function LandingPage() {
  const navigate = useNavigate();
  const { rive, RiveComponent } = useRive({
    src: "/hustler-robot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

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
    <div className="bg-black text-white overflow-x-hidden font-sans">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold drop-shadow-[0_0_20px_#ff1a1a]"
        >
          The Hustler Bot
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-6 text-lg md:text-2xl max-w-2xl text-gray-300"
        >
          Build your empire with smart strategies, instant advice, and AI mentorship.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-6 justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
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

        {/* Rive Robot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 w-full flex justify-center"
        >
          <div className="w-[600px] h-[600px] max-w-full">
            <RiveComponent style={{ width: "100%", height: "100%" }} />
          </div>
        </motion.div>
      </section>

      {/* ROADMAP */}
      <section
        ref={sectionRef}
        className="py-32 bg-gradient-to-b from-[#111] to-black px-6 relative overflow-hidden"
      >
        <h2 className="text-5xl font-bold text-center mb-24 drop-shadow-[0_0_15px_#ff1a1a]">
          Your Journey with Hustler Bot
        </h2>

        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 z-0"
          height="100%"
          width="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="6" height="100%" fill="url(#glowLine)" />
          <defs>
            <linearGradient id="glowLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff1a1a" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-20">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="relative w-12 h-12">
                <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_25px_#ff1a1a] absolute top-3 left-3 z-10" />
              </div>

              <div className="bg-[#111] border border-red-900 shadow-md rounded-2xl p-6 max-w-xl w-full">
                <h3 className="text-2xl font-bold mb-2">
                  {item.icon} {item.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-black text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-10 drop-shadow-[0_0_20px_#ff1a1a]"
        >
          Ready to Build Your Empire?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Start your journey today — access 24/7 mentorship, instant strategy, and an AI
          partner that helps you win. No card required.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-900 rounded-xl text-white font-bold text-lg shadow-xl hover:scale-105 hover:shadow-[0_0_30px_#ff1a1a] transition"
          >
            Start Free Trial
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-gray-800 border border-red-600 rounded-xl text-white font-bold text-lg hover:bg-gray-700 hover:border-red-400 transition"
          >
            Login
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default LandingPage;
