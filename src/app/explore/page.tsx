"use client";

import { motion } from "framer-motion";
import { Search, Flame, Star, BookOpen, LayoutGrid } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Top Interview Questions", count: 50, icon: <Star className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-500/10" },
  { title: "Leetcoding 75", count: 75, icon: <Flame className="w-5 h-5 text-orange-500" />, color: "bg-orange-500/10" },
  { title: "Data Structures", count: 120, icon: <BookOpen className="w-5 h-5 text-blue-500" />, color: "bg-blue-500/10" },
  { title: "Dynamic Programming", count: 45, icon: <LayoutGrid className="w-5 h-5 text-emerald-500" />, color: "bg-emerald-500/10" },
];

export default function ExplorePage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight text-glow">Explore</h1>
            <p className="text-zinc-500 font-medium">Curated paths to master specific domains.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Search collections..." 
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[32px] group cursor-pointer border border-white/5 hover:border-white/10 transition-all"
            >
              <div className={`p-4 rounded-2xl w-fit mb-6 ${cat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{cat.title}</h3>
              <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">{cat.count} Problems</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 rounded-[40px] bg-gradient-to-br from-orange-500 to-rose-600 p-10 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform">
                    <Trophy className="w-48 h-48 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Weekly Contest 432</h2>
                <p className="text-white/80 font-bold uppercase text-xs tracking-widest">Starts in 12h 43m • Register Now</p>
            </div>
            <div className="h-64 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col justify-end group cursor-pointer overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform">
                    <Zap className="w-48 h-48 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Rank-up Pro</h2>
                <p className="text-white/80 font-bold uppercase text-xs tracking-widest">Unlock premium features & interview kits</p>
            </div>
        </div>
      </div>
    </div>
  );
}

function Trophy(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  )
}

function Zap(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  )
}
