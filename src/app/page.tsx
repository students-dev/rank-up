"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Rocket, Trophy, Zap, Terminal, Globe, Shield } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden grid-background">
      {/* Animated Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-32 flex flex-col items-center text-center"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-8"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>v1.0 is now live</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
        >
          CODE FAST.<br />
          <span className="text-orange-500 text-glow">RANK UP.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed"
        >
          The intelligent platform for modern engineers. Master algorithms with 
          a world-class IDE, real-time feedback, and global competition.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <Link
            href="/problems"
            className="group relative bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-500/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Solving <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="glass px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all hover:bg-white/5 active:scale-[0.98]"
          >
            Leaderboard
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          {[
            {
              icon: <Terminal className="w-6 h-6 text-blue-500" />,
              title: "Monaco Engine",
              desc: "The same core that powers VS Code. High performance, zero latency."
            },
            {
              icon: <Shield className="w-6 h-6 text-orange-500" />,
              title: "Safe Execution",
              desc: "Instant feedback through our secure, isolated serverless runner."
            },
            {
              icon: <Globe className="w-6 h-6 text-emerald-500" />,
              title: "Global Reach",
              desc: "Compete with thousands of developers in real-time ranked matches."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl text-left group hover:border-white/10 transition-colors"
            >
              <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-zinc-950 to-transparent z-0" />
    </div>
  );
}
