import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const StickyNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full px-6 py-4 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-black/70 shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white drop-shadow-[0_0_5px_#ff1a1a]">
          The Hustler Bot
        </Link>
        <div className="flex gap-6">
          <Link to="/#features" className="text-white hover:text-red-500 transition">
            Features
          </Link>
          <Link to="/register" className="text-white hover:text-red-500 transition">
            Register
          </Link>
          <Link to="/login" className="text-white hover:text-red-500 transition">
            Login
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default StickyNavbar;
