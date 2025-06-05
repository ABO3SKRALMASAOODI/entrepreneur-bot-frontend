import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import robotAnimation from "../assets/robot.json";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="glow-text">The Hustler Bot</h1>
            <p className="typing-text">
              <Typewriter
                words={[
                  "Helping you grow a real business...",
                  "Get marketing advice, startup plans, and more...",
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
          </div>
          <div className="hero-animation">
            <Lottie animationData={robotAnimation} loop />
          </div>
        </div>
      </section>

      {/* Turning Roadmap Section */}
      <section className="roadmap">
        <h2 className="section-title">How The Hustler Bot Empowers You</h2>
        <div className="roadmap-turning-container">
          {[
            {
              icon: "💡",
              title: "Validate Business Ideas",
              desc: "Test and refine your ideas instantly with AI support.",
            },
            {
              icon: "📈",
              title: "Tailored Growth Plans",
              desc: "Your success path, built for your niche.",
            },
            {
              icon: "🧠",
              title: "Mentoring 24/7",
              desc: "Real answers from AI mentors—anytime.",
            },
            {
              icon: "🚀",
              title: "Launch Support",
              desc: "From zero to go—step-by-step with Hustler Bot.",
            },
            {
              icon: "🔒",
              title: "Privacy Focused",
              desc: "Your data, encrypted and safe.",
            },
            {
              icon: "💳",
              title: "Free 7-Day Trial",
              desc: "No risk. High reward. Try it now.",
            },
          ].map((item, i) => (
            <motion.div
              className="roadmap-turning-item"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="turning-dot" />
              <div className="turning-content">
                <h3>{item.icon} {item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bottom-cta">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Build the Business You Dream Of?
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
