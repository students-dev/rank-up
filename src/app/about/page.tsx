"use client";

import { motion } from "framer-motion";
import { Code2, Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Elevating the world's <br />
              <span className="text-zinc-500 text-glow">engineering talent.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl font-medium">
              Rank-up was built on a simple premise: the best way to learn is by doing. 
              We've created a premium environment for developers to sharpen their skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Target className="w-5 h-5" />,
                title: "Our Mission",
                desc: "To provide a distraction-free, high-performance workspace where engineers can solve complex problems and track their growth."
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Community Driven",
                desc: "Built for developers, by developers. We focus on the features that actually matter for your daily engineering practice."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-4">
                <div className="bg-white/5 w-fit p-3 rounded-xl text-zinc-300 border border-white/5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[32px] bg-white text-black space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              The Tech Stack
            </h3>
            <p className="text-zinc-700 font-medium leading-relaxed">
              Rank-up is built with Next.js 15, Prisma Accelerate, and Tailwind CSS. 
              Every component is optimized for performance, ensuring a zero-latency coding experience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
