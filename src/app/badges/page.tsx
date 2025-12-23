"use client";

import { motion } from "framer-motion";
import { Award, Star, Zap, Flame, Shield, Trophy } from "lucide-react";

const badgeCategories = [
  {
    name: "Mastery",
    badges: [
      { name: "Early Adopter", icon: <Star className="w-6 h-6 text-yellow-500" />, unlocked: true, desc: "Joined during the initial beta phase." },
      { name: "Top Solver", icon: <Trophy className="w-6 h-6 text-orange-500" />, unlocked: false, desc: "Solve 100 problems correctly." },
    ]
  },
  {
    name: "Consistency",
    badges: [
      { name: "7 Day Streak", icon: <Flame className="w-6 h-6 text-red-500" />, unlocked: true, desc: "Maintained a streak for one full week." },
      { name: "Night Owl", icon: <Zap className="w-6 h-6 text-indigo-500" />, unlocked: true, desc: "Solved a problem between 12 AM and 4 AM." },
    ]
  },
  {
    name: "Contribution",
    badges: [
      { name: "Bug Hunter", icon: <Shield className="w-6 h-6 text-emerald-500" />, unlocked: false, desc: "Reported a critical platform bug." },
      { name: "Top Commenter", icon: <Award className="w-6 h-6 text-blue-500" />, unlocked: false, desc: "Received 100+ likes on a discussion post." },
    ]
  }
];

export default function BadgesPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">Achievements & Badges</h1>
          <p className="text-zinc-500 font-medium">Earn exclusive badges by reaching engineering milestones.</p>
        </div>

        <div className="space-y-16">
          {badgeCategories.map((cat, i) => (
            <div key={i} className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 border-b border-white/5 pb-4">{cat.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.badges.map((badge, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.02 }}
                    className={`p-8 rounded-[32px] border flex items-start gap-6 transition-all ${
                      badge.unlocked ? "bg-zinc-900/40 border-white/5" : "bg-black opacity-30 border-transparent"
                    }`}
                  >
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 shrink-0 shadow-inner ${!badge.unlocked && "grayscale"}`}>
                      {badge.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-zinc-100">{badge.name}</h4>
                      <p className="text-zinc-500 text-xs font-medium leading-relaxed">{badge.desc}</p>
                      {!badge.unlocked && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700 block mt-2 italic">Locked</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
