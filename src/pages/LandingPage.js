import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRive } from "rive-react";
import StickyNavbar from "../components/StickyNavbar";
import RobotBubble from "../components/RobotBubble";


function LandingPage() {
  const navigate = useNavigate();

  const { rive: heroRive, RiveComponent: HeroBot } = useRive({
    src: "/hustler-robot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  const { rive: bubbleRive, RiveComponent: BubbleBot } = useRive({
    src: "/hustler-bubble-bot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  useEffect(() => {
    const handleMouse = (x) => {
      const mouseX = x / window.innerWidth;
      const heroInput = heroRive?.inputs?.find((i) => i.name === "mouseX");
      const bubbleInput = bubbleRive?.inputs?.find((i) => i.name === "mouseX");
      if (heroInput) heroInput.value = mouseX;
      if (bubbleInput) bubbleInput.value = mouseX;
    };
    const onMouseMove = (e) => handleMouse(e.clientX);
    const onScroll = () => handleMouse(window.scrollY % window.innerWidth);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [heroRive, bubbleRive]);

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
    <>
      <StickyNavbar />
      <div className="bg-black text-white font-sans overflow-x-hidden">
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-red-900/30 via-transparent to-black pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />
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
            <div className="mt-10 flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-red-600 to-red-900 px-8 py-4 rounded-xl font-bold text-white shadow-lg"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/login")}
                className="bg-gray-800 border border-red-600 px-8 py-4 rounded-xl font-bold text-white"
              >
                Login
              </motion.button>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 w-[700px] h-[700px] z-0 opacity-90">
            <HeroBot style={{ width: "100%", height: "100%" }} />
          </div>
        </section>

        {/* WHY ENTREPRENEURS USE */}
        <section className="py-36 bg-black text-white text-center px-4 md:px-12 z-10 relative">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-20 drop-shadow-[0_0_15px_#ff1a1a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Why Entrepreneurs Use Hustler Bot
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#111] border border-transparent rounded-2xl p-6 shadow-[0_0_30px_rgba(255,26,26,0.2)] transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_25px_#ff1a1a]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-3">{item.icon} {item.title}</h3>
                <p className="text-gray-300 text-md">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section className="py-36 bg-black relative z-10 overflow-hidden px-4 md:px-12">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-24 text-white drop-shadow-[0_0_15px_#ff1a1a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Your Journey with Hustler Bot
          </motion.h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-red-600 via-transparent to-black animate-pulse z-0 transform -translate-x-1/2" />
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: false }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"} items-center justify-between gap-10 mb-24 z-10`}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                  <div className="w-6 h-6 bg-red-600 rounded-full shadow-[0_0_20px_#ff1a1a]" />
                  <div className="w-1 h-full bg-gradient-to-b from-red-600 to-transparent animate-pulse" />
                </div>
                <div className="bg-[#111] border border-red-900 rounded-2xl p-6 md:max-w-lg w-full shadow-[0_0_30px_rgba(255,26,26,0.2)] z-20">
                  <h3 className="text-2xl font-bold mb-2">{item.icon} {item.title}</h3>
                  <p className="text-gray-300 text-md">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-36 bg-gradient-to-b from-black via-[#110000] to-black overflow-hidden z-20">
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200%] h-full bg-gradient-radial from-red-800/30 to-transparent blur-2xl opacity-60 pointer-events-none"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-[0_0_15px_#ff1a1a] z-10 relative"
          >
            Ready to Build Your Empire?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-lg md:text-2xl text-center text-gray-300 max-w-3xl mx-auto z-10 relative"
          >
            Start your journey with AI mentorship, personalized strategies, and a 7-day free trial.
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center gap-6 z-10 relative"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-red-600 to-red-900 px-8 py-4 rounded-xl font-bold text-white shadow-[0_0_20px_#ff1a1a] hover:scale-105 transition"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-800 border border-red-600 px-8 py-4 rounded-xl font-bold text-white hover:bg-gray-700 hover:border-red-400 transition"
            >
              Login
            </button>
          </motion.div>
        </section>

        {/* BUBBLE CHAT */}
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111] border border-red-700 rounded-full px-4 py-2 shadow-[0_0_25px_#ff1a1a] hover:scale-105 transition cursor-pointer"
          onClick={() => navigate("/register")}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <BubbleBot style={{ width: "100%", height: "100%" }} />
          </div>
          <span className="text-sm text-white opacity-90 whitespace-nowrap">
            Hello, how can I help you with your business today?
          </span>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
