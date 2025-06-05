import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import robotAnimation from "../assets/robot.json";

const roadmap = [
  {
    icon: "💡",
    title: "Validate Business Ideas Instantly",
    desc: "Receive immediate feedback on your startup concepts.",
  },
  {
    icon: "📈",
    title: "Personalized Growth Strategies",
    desc: "Tailored plans to accelerate your business growth.",
  },
  {
    icon: "🧠",
    title: "24/7 Business Mentoring",
    desc: "Access expert advice anytime, anywhere.",
  },
  {
    icon: "🚀",
    title: "Step-by-Step Launch Guidance",
    desc: "Navigate your startup journey with confidence.",
  },
  {
    icon: "🔒",
    title: "Data Privacy Assurance",
    desc: "Your information is secure and confidential.",
  },
  {
    icon: "💳",
    title: "Try Free for 7 Days",
    desc: "Experience the benefits risk-free.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 gap-12 relative overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-red-600 drop-shadow-lg">
            The Hustler Bot
          </h1>
          <p className="text-xl text-white/80 mb-6">
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
          <div className="flex gap-4">
            <button
              className="bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg"
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

        {/* Lottie Animation */}
        <div className="flex-1 max-w-md">
          <Lottie animationData={robotAnimation} loop autoplay />
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-24 px-6 md:px-20 bg-zinc-900 relative">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-white">
          Why Choose The Hustler Bot?
        </h2>
        <div className="relative border-l-4 border-red-700 pl-10">
          {roadmap.map((item, i) => (
            <motion.div
              key={i}
              className="mb-16 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="absolute -left-[32px] top-1 w-5 h-5 rounded-full bg-red-700 shadow-md" />
              <h3 className="text-xl font-semibold mb-1 text-white">
                {item.icon} {item.title}
              </h3>
              <p className="text-white/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-20 bg-black">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg"
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

      {/* Footer */}
      <footer className="text-center text-sm text-white/50 py-6 bg-zinc-900 border-t border-white/10">
        © 2025 EntrepreneurBot. All rights reserved. |{" "}
        <a href="/legal" className="underline">
          Legal
        </a>
      </footer>
    </div>
  );
}
