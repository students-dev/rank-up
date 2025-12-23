"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, Trophy, Zap, Terminal, Globe, Shield } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-40"
      >
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Beta 1.0 is now live
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
            Master the art of <br />
            <span className="text-zinc-400">efficient coding.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The modern platform for developers to practice, compete, and level up their engineering skills.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32">
          <Link
            href="/problems"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            Explore Problems <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/leaderboard"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white border border-white/10 font-semibold rounded-xl hover:bg-zinc-800 transition-all text-center"
          >
            Leaderboard
          </Link>
        </motion.div>

        {/* Simplified Feature Grid */}
        <motion.div 
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Terminal className="w-5 h-5" />,
              title: "Modern IDE",
              desc: "A familiar, high-performance editor with smart features."
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: "Safe Sandbox",
              desc: "Instant code execution in isolated cloud environments."
            },
            {
              icon: <Trophy className="w-5 h-5" />,
              title: "Ranked System",
              desc: "Climb the global ranks and prove your expertise."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="mb-4 text-zinc-400">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
