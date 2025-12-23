"use client";

import { motion } from "framer-motion";
import { Timer, Users, Trophy, ChevronRight } from "lucide-react";

const contests = [
  { id: 1, title: "Weekly Contest 432", time: "Dec 28, 2025 • 08:00 AM", players: "12,432", prize: "500 XP + Gold Badge", active: true },
  { id: 2, title: "Biweekly Contest 98", time: "Jan 02, 2026 • 10:30 PM", players: "8,921", prize: "300 XP + Silver Badge", active: false },
  { id: 3, title: "Global Dev Cup 2026", time: "Jan 15, 2026 • 09:00 AM", players: "45,000+", prize: "$5,000 + Rank-up Pro", active: false },
];

export default function ContestsPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Coding Contests</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">Compete in real-time and win exclusive rewards.</p>
        </div>

        <div className="space-y-6">
          {contests.map((contest, i) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[32px] border ${contest.active ? "bg-orange-500/5 border-orange-500/20" : "bg-zinc-900/50 border-white/5"} group hover:border-white/10 transition-all cursor-pointer`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {contest.active && <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />}
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{contest.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" /> {contest.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> {contest.players} Enrolled
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Trophy className="w-4 h-4" /> {contest.prize}
                    </div>
                  </div>
                </div>
                <button className="bg-white text-black px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 whitespace-nowrap">
                  Register <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[40px] glass border-dashed border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4 italic">Host your own contest?</h2>
            <p className="text-zinc-500 font-medium mb-8">Teams and universities can now host private competitions on Rank-up.</p>
            <button className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">Contact Enterprise Support</button>
        </div>
      </div>
    </div>
  );
}
