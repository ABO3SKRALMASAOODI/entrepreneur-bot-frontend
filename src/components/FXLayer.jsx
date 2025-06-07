import React from "react";
import ChipCircuit from "./ChipCircuit"; // Glowing SVG path
import { motion } from "framer-motion";

function FXLayer({ showBlueprint = true, showRadial = true }) {
  return (
    <>
      {/* 🔌 Glowing Chip Circuit Line */}
      <ChipCircuit />

      {/* 🔵 Blueprint Grid (parallax scroll) */}
      {showBlueprint && (
        <motion.div
        className="absolute inset-0 bg-[url('\\/blueprint.svg')] bg-repeat opacity-5 pointer-events-none z-0"
        initial={{ y: 0 }}
        whileInView={{ y: -100 }}
        transition={{ duration: 6 }}
        />
      )}

      {/* 🔴 Radial Glow Burst */}
      {showRadial && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200%] h-full bg-gradient-radial from-red-800/40 to-transparent blur-2xl opacity-60 pointer-events-none z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8 }}
        />
      )}
    </>
  );
}

export default FXLayer;
