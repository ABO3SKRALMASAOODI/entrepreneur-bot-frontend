import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
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
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="glow-text">The Hustler Bot</h1>
            <p className="typing-text">
              <Typewriter
                words={[
                  "Helping you grow a real business...",
                  "Get marketing advice, startup plans, and more...",
                  "Join thousands of entrepreneurs right now.",
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
            <Lottie animationData={robotAnimation} loop={true} />
          </div>
        </div>
      </section>

      {/* Scroll-based Animated Roadmap */}
      <section className="roadmap roadmap-animated">
        <h2 className="section-title">Your Path to Success</h2>
        <div className="roadmap-curve">
          <div className="curve-line"></div>
          {[
            {
              title: "💡 Validate Ideas Instantly",
              desc: "Get real-time AI feedback on startup ideas.",
            },
            {
              title: "📊 Growth Blueprints",
              desc: "Custom strategies tailored to your business goals.",
            },
            {
              title: "🤖 24/7 AI Mentorship",
              desc: "On-demand advice and support whenever you need it.",
            },
            {
              title: "🚀 Launch With Confidence",
              desc: "Follow a step-by-step guided launch system.",
            },
            {
              title: "🔐 Full Privacy Guaranteed",
              desc: "We never share or sell your data. Period.",
            },
            {
              title: "🎁 Free 7-Day Trial",
              desc: "No credit card required to get started.",
            },
          ].map((item, idx) => (
            <div key={idx} className="roadmap-point" data-aos="fade-up">
              <div className="roadmap-bullet" />
              <div className="roadmap-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="bottom-cta pulse-highlight">
        <h2>🚀 Ready to Build Your Business?</h2>
        <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
          Don’t wait — start your free trial and launch smarter today.
        </p>
        <div className="cta-buttons">
          <button onClick={handleRegister}>Start Free Trial</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
