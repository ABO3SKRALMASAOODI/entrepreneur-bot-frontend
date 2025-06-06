import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { useRive } from "rive-react";

function LandingPage() {
  const navigate = useNavigate();
  const { rive, RiveComponent } = useRive({
    src: "/hustler-robot.riv",
    autoplay: true,
    stateMachines: ["State Machine 1"],
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

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

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");

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
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="glow-text">The Hustler Bot</h1>
            <p className="typing-text">
              <Typewriter
                words={[
                  "Helping you build real businesses...",
                  "Get strategies, insights, and mentorship...",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </p>
            <div className="cta-buttons">
              <button onClick={handleRegister}>Start Free Trial</button>
              <button onClick={handleLogin}>Login</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✅ Robot Section from v2 */}
      <section className="rive-bot-showcase">
        <RiveComponent className="rive-big-robot" />
      </section>

      <section className="roadmap">
        <h2 className="section-title">Your Journey with The Hustler Bot</h2>
        <div className="roadmap-turning-container">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className={`roadmap-turning-item ${
                index % 2 === 0 ? "left" : "right"
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="turning-dot" />
              <div className="circuit-line" />
              <div className="turning-content">
                <h3>{item.icon} {item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Are You Ready To Build Your Empire?
        </motion.h2>
        <div className="cta-buttons">
          <button onClick={handleRegister}>Start Free Trial</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
