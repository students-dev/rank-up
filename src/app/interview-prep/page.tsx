"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Globe, FileText, ChevronRight } from "lucide-react";

const kits = [
  { company: "Google", role: "Software Engineer L4", problems: 24, icon: "G" },
  { company: "Meta", role: "Front-end Engineer", problems: 18, icon: "M" },
  { company: "Amazon", role: "SDE II", problems: 32, icon: "A" },
];

export default function InterviewPrepPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center md:text-left mb-16 space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4 justify-center md:justify-start">
            <Briefcase className="w-8 h-8 text-emerald-500" />
            Interview Preparation
          </h1>
          <p className="text-zinc-500 font-medium">Ace your technical rounds with company-specific training kits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kits.map((kit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-10 rounded-[40px] border border-white/5 hover:border-emerald-500/20 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-[24px] bg-white text-black flex items-center justify-center text-2xl font-black mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-white/5">
                {kit.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{kit.company}</h3>
              <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-8">{kit.role}</p>
              
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{kit.problems} Curated Problems</span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-zinc-900/40 p-12 rounded-[48px] border border-white/5">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white tracking-tight">System Design & Behavior</h2>
                <p className="text-zinc-500 leading-relaxed font-medium">Beyond coding, we provide comprehensive guides on distributed systems, scalability, and behavioral interview techniques.</p>
                <button className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-widest hover:text-emerald-400 transition-colors">
                    Access Library <FileText className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center p-4">
                    <Building2 className="w-6 h-6 text-zinc-500 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">FAANG Mock Interviews</span>
                </div>
                <div className="h-40 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center p-4">
                    <Globe className="w-6 h-6 text-zinc-500 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Behavioral Frameworks</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
