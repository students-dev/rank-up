"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Trophy, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PageTransition } from "@/components/PageTransition";

const difficultyColor = {
  EASY: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  MEDIUM: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  HARD: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [stats, setStats] = useState({ solved: 0, total: 0 });

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/problems?search=${search}&difficulty=${difficulty}`);
        const data = await res.json();
        setProblems(data);
        setStats({ solved: 0, total: data.length });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProblems, 300);
    return () => clearTimeout(timer);
  }, [search, difficulty]);

  return (
    <PageTransition>
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-zinc-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">Problem Set</h1>
          <p className="text-zinc-500 font-medium">Elevate your technical skills with curated challenges.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title or category..." 
                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-medium text-zinc-300 shadow-xl"
                />
            </div>
            <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full sm:w-auto bg-zinc-900 border border-white/5 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 focus:outline-none focus:border-orange-500/50 transition-all cursor-pointer shadow-xl appearance-none"
            >
                <option value="ALL">All Levels</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>
        </div>
      </div>

      <div className="hidden md:block overflow-hidden bg-zinc-900/40 border border-white/5 rounded-[32px] shadow-2xl">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-zinc-600 w-24 text-center">Status</th>
                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-zinc-600">Problem</th>
                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-zinc-600 w-32">Difficulty</th>
                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-zinc-600 w-40">Category</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="wait">
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                            <td className="px-8 py-6"><div className="w-5 h-5 bg-zinc-800 rounded-full mx-auto" /></td>
                            <td className="px-8 py-6"><div className="h-4 bg-zinc-800 rounded-lg w-48" /></td>
                            <td className="px-8 py-6"><div className="h-4 bg-zinc-800 rounded-lg w-16" /></td>
                            <td className="px-8 py-6"><div className="h-4 bg-zinc-800 rounded-lg w-24" /></td>
                        </tr>
                    ))
                ) : problems.length > 0 ? (
                problems.map((problem: any) => (
                    <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={problem.id}
                        className="hover:bg-white/[0.02] transition-all group"
                    >
                    <td className="px-8 py-6 text-center">
                        <Circle className="w-5 h-5 text-zinc-800 mx-auto group-hover:text-zinc-700 transition-colors" />
                    </td>
                    <td className="px-8 py-6">
                        <Link
                        href={`/problems/${problem.slug}`}
                        className="font-bold text-zinc-100 group-hover:text-orange-500 transition-colors tracking-tight text-base"
                        >
                        {problem.order}. {problem.title}
                        </Link>
                    </td>
                    <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`}>
                        {problem.difficulty}
                        </span>
                    </td>
                    <td className="px-8 py-6">
                        <span className="text-zinc-500 font-bold text-xs uppercase tracking-tight group-hover:text-zinc-300 transition-colors">
                        {problem.category}
                        </span>
                    </td>
                    </motion.tr>
                ))
                ) : (
                <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-40">
                            <Search className="w-8 h-8 text-zinc-600" />
                            <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.2em]">No matching problems found</p>
                        </div>
                    </td>
                </tr>
                )}
                </AnimatePresence>
            </tbody>
            </table>
        </div>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden space-y-4">
        {loading ? (
             Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 animate-pulse space-y-4">
                    <div className="h-4 bg-zinc-800 rounded-lg w-3/4" />
                    <div className="flex gap-2">
                        <div className="h-4 bg-zinc-800 rounded-lg w-16" />
                        <div className="h-4 bg-zinc-800 rounded-lg w-20" />
                    </div>
                </div>
            ))
        ) : problems.length > 0 ? (
            problems.map((problem: any) => (
                <Link
                    key={problem.id}
                    href={`/problems/${problem.slug}`}
                    className="block bg-zinc-900/40 border border-white/5 rounded-3xl p-6 hover:border-orange-500/30 transition-all active:scale-[0.98]"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-zinc-100 pr-4 leading-tight">
                            {problem.order}. {problem.title}
                        </h3>
                        <Circle className="w-4 h-4 text-zinc-800 shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {problem.category}
                        </span>
                    </div>
                </Link>
            ))
        ) : (
            <div className="py-20 text-center bg-zinc-900/40 border border-white/5 rounded-3xl">
                <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.2em]">No results found</p>
            </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}