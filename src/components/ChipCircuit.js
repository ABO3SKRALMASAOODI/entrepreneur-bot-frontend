import React, { useEffect, useState } from "react";

const ChipCircuit = () => {
  const [offset, setOffset] = useState(0);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    const handleMouseMove = (e) => setMouseX(e.clientX / window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const dynamicDashOffset = -(offset / 5 + mouseX * 100);

  return (
    <svg
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      viewBox="0 0 1000 2000"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff1a1a" />
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ff1a1a" />
        </filter>
      </defs>

      {/* Main vertical glowing circuits */}
      {[0, 100, -100].map((offsetX, i) => (
        <path
          key={`main-${i}`}
          d={`
            M ${500 + offsetX} 0
            Q ${520 + offsetX} 400 ${480 + offsetX} 800
            Q ${520 + offsetX} 1200 ${500 + offsetX} 2000
          `}
          fill="none"
          stroke="#ff1a1a"
          strokeWidth="2"
          filter="url(#glow)"
          strokeDasharray="20 40"
          strokeDashoffset={dynamicDashOffset}
        />
      ))}

      {/* Additional diagonal branch paths */}
      {[[-300, 300], [300, 500]].map(([startX, endX], i) => (
        <path
          key={`branch-${i}`}
          d={`M ${startX} 1000 Q ${startX + 100} 1200 ${endX} 1600`}
          fill="none"
          stroke="#ff1a1a"
          strokeWidth="2"
          filter="url(#glow)"
          strokeDasharray="15 30"
          strokeDashoffset={dynamicDashOffset * 1.5}
        />
      ))}
    </svg>
  );
};

export default ChipCircuit;
