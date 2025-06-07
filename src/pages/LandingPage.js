// 🌐 Ultimate AI Landing Page – Modular, Cinematic, and Scroll-Animated
// ✅ Powered by Tailwind CSS, Framer Motion, Rive, and Custom FX
// ✅ Fully modular design with high conversion flow and visual polish

import React from 'react';
import StickyNavbar from '../components/StickyNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import RoadmapSection from '../components/RoadmapSection';
import CTASection from '../components/CTASection';
import FloatingBot from '../components/FloatingBot';

function LandingPage() {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden scroll-smooth selection:bg-red-700 selection:text-white">
      {/* 🔝 Fixed Navigation */}
      <StickyNavbar />

      {/* 🎬 Hero */}
      <HeroSection />

      {/* 💡 Feature Highlights */}
      <FeaturesSection />

      {/* ⚡ Roadmap Timeline */}
      <RoadmapSection />

      {/* 🚀 Call to Action */}
      <CTASection />

      {/* 🤖 Floating Chatbot */}
      <FloatingBot />
    </main>
  );
}

export default LandingPage;
