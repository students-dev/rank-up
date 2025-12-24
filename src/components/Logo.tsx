import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="rankup-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Shield Shape */}
      <path
        d="M50 10L85 25V55C85 75 50 90 50 90C50 90 15 75 15 55V25L50 10Z"
        fill="#18181b"
        stroke="white"
        strokeOpacity="0.1"
        strokeWidth="2"
      />
      
      {/* Stylized 'R' with built-in Upward Arrow */}
      <motion.path
        d="M38 65V35H55C62 35 65 40 65 45C65 50 62 55 55 55H38M52 55L65 70"
        stroke="url(#rankup-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        animate={{
          strokeDasharray: ["0, 1000", "1000, 0"],
          strokeDashoffset: [0, -1000],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Minimalist Top Accent */}
      <path
        d="M45 22L50 17L55 22"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
};