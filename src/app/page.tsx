"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Code2, Rocket, Trophy, Zap, Terminal, Globe, Shield, Sparkles, Command } from "lucide-react";

export default function Home() {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-orange-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-8 pt-32 pb-40"
      >
        <motion.div variants={fadeInUp} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900/50 border border-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Engineering OS v1.2
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center space-y-8 mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] uppercase italic">
            Accelerate <br />
            <span className="text-zinc-600">Your</span> <span className="text-orange-500 text-glow">Logic.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-bold tracking-tight leading-relaxed">
            The high-fidelity platform for modern engineers to master algorithms, compete in real-time, and rank up.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-40">
          <Link
            href="/problems"
            className="group relative w-full sm:w-auto px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/10 active:scale-95"
          >
            Start Engine <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore"
            className="w-full sm:w-auto px-12 py-5 glass text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all text-center border border-white/10 active:scale-95 flex items-center justify-center gap-3"
          >
            <Command className="w-4 h-4" /> Explore Paths
          </Link>
        </motion.div>

        {/* High-Fidelity Stats Preview */}
        <motion.div 
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Terminal className="w-5 h-5 text-blue-500" />,
              title: "Cloud IDE",
              desc: "Zero-latency Monaco engine with customizable themes and safe execution."
            },
            {
              icon: <Sparkles className="w-5 h-5 text-orange-500" />,
              title: "AI Assistant",
              desc: "Intelligent hints and optimization suggestions to guide your learning."
            },
            {
              icon: <Trophy className="w-5 h-5 text-emerald-500" />,
              title: "Global Guild",
              desc: "Climb the ranks from Bronze to Diamond in real-time competitive matches."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="p-10 rounded-[40px] bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                {feature.icon}
              </div>
              <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/5 text-zinc-400 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-4">{feature.title}</h3>
              <p className="text-zinc-500 text-sm font-bold leading-relaxed tracking-tight">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-20 pointer-events-none"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">Monaco-Engine</span>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">Cloud-Runner</span>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">Prisma-Accelerate</span>
      </motion.div>
    </div>
  );
}