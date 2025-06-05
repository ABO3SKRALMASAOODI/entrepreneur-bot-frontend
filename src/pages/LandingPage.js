import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import robotAnimation from "../assets/robot.json";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeInUp");
        }
      });
    });

    const items = document.querySelectorAll(".fade-in-section");
    items.forEach((item) => observer.observe(item));
  }, []);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 gap-12 relative">
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-red-600 drop-shadow-lg">
            The Hustler Bot
          </h1>
          <p className="text-xl text-white/80 mb-6">
            <Typewriter
              words={["Helping you grow a real business...", "Get marketing advice, startup plans, and more..."]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </p>
          <div className="flex gap-4">
            <button
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-xl font-semibold shadow-lg"
              onClick={() => navigate("/register")}
            >
              Start Free Trial
            </button>
            <button
              className="border border-white hover:border-red-600 hover:text-red-600 py-3 px-6 rounded-xl font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex-1 max-w-md">
          <Lottie animationData={robotAnimation} loop autoplay />
        </div>
      </section>

      {/* SVG Curved Roadmap */}
      <section className="py-24 bg-zinc-900 relative">
        <h2 className="text-center text-4xl font-bold mb-16 text-white">
          Why Choose The Hustler Bot?
        </h2>
        <svg viewBox="0 0 800 600" className="w-full max-w-6xl mx-auto block">
          <path
            d="M 100 550 C 200 300, 600 300, 700 50"
            stroke="#dc2626"
            strokeWidth="6"
            fill="none"
          />
          {[100, 250, 400, 550, 650, 700].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={i % 2 === 0 ? 550 - i * 80 : 550 - i * 100}
              r="10"
              fill="#dc2626"
            />
          ))}
        </svg>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 mt-16">
          {[
            ["💡", "Validate Business Ideas Instantly", "Get feedback fast on your startup concepts."],
            ["📈", "Personalized Growth Strategies", "Tailored plans for your business."],
            ["🧠", "24/7 Mentorship", "Real advice anytime, anywhere."],
            ["🚀", "Step-by-Step Launch Help", "Navigate your journey with confidence."],
            ["🔒", "Private & Secure", "We protect your business data."],
            ["💳", "7-Day Free Trial", "Try before you commit."],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="fade-in-section opacity-0">
              <h3 className="text-xl font-bold mb-1">{icon} {title}</h3>
              <p className="text-white/80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-xl font-semibold shadow-lg"
            onClick={() => navigate("/register")}
          >
            Start Free Trial
          </button>
          <button
            className="border border-white hover:border-red-600 hover:text-red-600 py-3 px-6 rounded-xl font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-white/50 py-6 bg-zinc-900 border-t border-white/10">
        © 2025 The Hustler Bot. All rights reserved. | <a href="/legal" className="underline">Legal</a>
      </footer>
    </div>
  );
}

export default LandingPage;
