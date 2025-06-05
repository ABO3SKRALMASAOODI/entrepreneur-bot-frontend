import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter"; // ✅ NEW
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
            <Lottie animationData={robotAnimation} loop={true} />
          </div>
        </div>
      </section>

      {/* Vertical Roadmap Section */}
      <section className="roadmap">
        <h2 className="section-title">Why Choose The Hustler Bot?</h2>
        <div className="roadmap-container">
          <div className="roadmap-line"></div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>💡 Validate Business Ideas Instantly</h3>
              <p>Receive immediate feedback on your startup concepts.</p>
            </div>
          </div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>📈 Personalized Growth Strategies</h3>
              <p>Tailored plans to accelerate your business growth.</p>
            </div>
          </div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>🧠 24/7 Business Mentoring</h3>
              <p>Access expert advice anytime, anywhere.</p>
            </div>
          </div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>🚀 Step-by-Step Launch Guidance</h3>
              <p>Navigate your startup journey with confidence.</p>
            </div>
          </div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>🔒 Data Privacy Assurance</h3>
              <p>Your information is secure and confidential.</p>
            </div>
          </div>
          <div className="roadmap-item" data-aos="fade-up">
            <div className="roadmap-dot"></div>
            <div className="roadmap-content">
              <h3>💳 Try Free for 7 Days</h3>
              <p>Experience the benefits risk-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bottom-cta">
        <h2>Ready to Transform Your Business?</h2>
        <div className="cta-buttons">
          <button onClick={handleRegister}>Start Free Trial</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ by DIYAR TAREQ TRADING L.L.C</p>
      </footer>
    </div>
  );
}

export default LandingPage;
