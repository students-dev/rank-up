import React from "react";

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Hexagon / Nut Shape */}
      <path
        d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-zinc-800"
      />
      
      {/* Stylized R + Up Arrow */}
      <path
        d="M35 70V30H55C62 30 65 35 65 40C65 45 62 50 55 50H35M50 50L65 70"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      />
      
      {/* Upward Glow Accent */}
      <path
        d="M50 15L60 25M50 15L40 25"
        stroke="#f97316"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />
    </svg>
  );
};
