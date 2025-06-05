import React, { useEffect } from "react"; // ✅ Fix: Add useEffect here
import { useNavigate } from "react-router-dom";
import "./landing.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");

  return (
    <div className="landing-container">
      <section className="hero">
        <h1 className="glow-text">The Hustler Bot</h1>
        <p className="sub-text">Become a successful entrepreneur in 7 days.</p>
        <div className="cta-buttons">
          <button onClick={handleRegister}>Start Free Trial</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </section>

      <section className="feature" data-aos="fade-up">
        <h2>📈 Personalized Startup Strategies</h2>
        <p>Tell The Hustler Bot your goal. Get a real business roadmap instantly.</p>
      </section>

      <section className="feature" data-aos="fade-up">
        <h2>🚀 AI-Powered Business Coaching</h2>
        <p>24/7 answers, ideas, and step-by-step guides. Like a mentor, but smarter.</p>
      </section>

      <section className="feature" data-aos="fade-up">
        <h2>💳 Try Free for 7 Days</h2>
        <p>No risk. Cancel anytime. If you love it, it's just $20/month.</p>
      </section>

      <footer className="footer">
        <p>Made with ❤️ by DIYAR TAREQ TRADING L.L.C</p>
      </footer>
    </div>
  );
}

export default LandingPage;
