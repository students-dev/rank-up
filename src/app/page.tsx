"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, Command } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Home() {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const float: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans overflow-hidden">
      {/* Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1200px] h-[400px] md:h-[800px] bg-orange-500 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500 rounded-full blur-[140px] pointer-events-none" 
      />

      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-20 md:pt-32 pb-40 flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, y: -100, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            duration: 1.2,
            delay: 0.2
          }}
          className="mb-12"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <Logo className="w-16 h-16 md:w-24 md:h-24 filter drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-500 cursor-pointer" />
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center space-y-6 md:space-y-8 mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight text-white leading-[1] max-w-4xl mx-auto">
            Accelerate your coding <br />
            <span className="text-zinc-600">proficiency with</span> <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">Rank-up.</span>
          </h1>
          <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
            The premium cloud platform for modern engineers to master algorithms, <br className="hidden md:block" />
            compete in real-time, and elevate their technical skills.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-32 md:mb-40 w-full sm:w-auto px-4">
          <Link
            href="/problems"
            className="group relative w-full sm:w-auto px-10 md:px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Start Solving <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore"
            className="w-full sm:w-auto px-10 md:px-12 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-center border border-white/10 active:scale-95 flex items-center justify-center gap-3 shadow-xl"
          >
            <Command className="w-4 h-4" /> Learning Paths
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {[
            {
              icon: <Terminal className="w-5 h-5 text-blue-500" />,
              title: "Cloud-Powered IDE",
              desc: "Zero-latency Monaco engine with customizable themes and safe execution environments.",
              gradient: "from-blue-500/10 to-transparent"
            },
            {
              icon: <Sparkles className="w-5 h-5 text-orange-500" />,
              title: "Rank-up Assistant",
              desc: "Intelligent hints and optimization suggestions to guide your engineering journey.",
              gradient: "from-orange-500/10 to-transparent"
            },
            {
              icon: <TrophyIcon className="w-5 h-5 text-emerald-500" />,
              title: "Global Community",
              desc: "Climb the ranks from Bronze to Diamond in real-time competitive coding matches.",
              gradient: "from-emerald-500/10 to-transparent"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="p-8 md:p-10 rounded-[40px] bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/5 text-zinc-400 group-hover:text-white transition-all group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed tracking-tight group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function TrophyIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
}