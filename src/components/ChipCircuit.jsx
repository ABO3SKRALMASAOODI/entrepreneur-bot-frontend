import React from "react";

function ChipCircuit() {
  return (
    <svg
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      viewBox="0 0 1000 2000"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Glowing stroke with red shadow */}
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff1a1a" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ff1a1a" />
        </filter>
      </defs>

      <path
        d="M 500 0 Q 520 300 480 600 Q 520 900 500 1200 Q 520 1500 480 1800"
        stroke="#ff1a1a"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;1000"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="8,12; 2,18; 8,12"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default ChipCircuit;
