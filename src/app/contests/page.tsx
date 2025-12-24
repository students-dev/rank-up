"use client";

import { motion } from "framer-motion";
import { Timer, Users, Trophy, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";

export default function ContestsPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch("/api/contests");
        const data = await res.json();
        setContests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const isActive = (startTime: string, endTime: string) => {
    const now = new Date();
    return now >= new Date(startTime) && now <= new Date(endTime);
  };

  return (
    <PageTransition>
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-32 relative z-10">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Coding Contests</h1>
          <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">Compete in real-time matches, solve unique challenges, and win exclusive rewards to boost your rank.</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-40 bg-zinc-900/50 rounded-[32px] border border-white/5 animate-pulse" />
            ))
          ) : contests.length > 0 ? (
            contests.map((contest, i) => {
              const active = isActive(contest.startTime, contest.endTime);
              return (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 md:p-10 rounded-[32px] md:rounded-[48px] border ${active ? "bg-orange-500/5 border-orange-500/20 shadow-[0_0_40px_rgba(249,115,22,0.05)]" : "bg-zinc-900/40 border-white/5"} group hover:border-white/10 transition-all cursor-pointer relative overflow-hidden`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div className="space-y-6 flex-1">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            {active && <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />}
                            <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-orange-500 transition-colors tracking-tight">{contest.title}</h3>
                        </div>
                        <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                            {contest.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 md:gap-8 text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                          <Timer className="w-4 h-4 text-orange-500" /> {new Date(contest.startTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                          <Users className="w-4 h-4 text-blue-500" /> {contest._count?.participants || 0} Registered
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                          <Trophy className="w-4 h-4" /> Rewards Included
                        </div>
                      </div>
                    </div>
                    <button className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-2xl md:rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl active:scale-95">
                      Enter Contest <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-20 text-center glass rounded-[48px] border-dashed border-white/5">
                <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.2em]">No scheduled contests found</p>
            </div>
          )}
        </div>

        <div className="mt-20 p-8 md:p-16 rounded-[48px] md:rounded-[64px] glass border-dashed border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 italic tracking-tight relative z-10">Host your own contest?</h2>
            <p className="text-zinc-500 font-medium mb-10 max-w-lg mx-auto relative z-10">Teams and universities can now host private competitions on Rank-up with custom problems and real-time proctoring.</p>
            <button className="text-[11px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors relative z-10">Contact Enterprise Support</button>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}

