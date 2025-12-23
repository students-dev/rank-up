"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Rocket, Sparkles, Bug, Filter, Zap, Shield, ZapIcon } from "lucide-react";
import { useState } from "react";

const changes = [
  {
    version: "1.2.2",
    date: "Dec 23, 2025",
    type: "Feature",
    title: "Community & Integrity",
    items: [
      "Implemented a comprehensive Voting System for Discussions",
      "Added Account Linking: Connect GitHub, Discord, and Google to one profile",
      "Enhanced Discussion view with real-time comment counts",
      "Overhauled settings with a new unified account dashboard"
    ],
    icon: <ZapIcon className="w-4 h-4 text-blue-500" />,
    tag: "Feature"
  },
  {
    version: "1.2.1",
    date: "Dec 23, 2025",
    type: "Hotfix",
    title: "The Integrity Update",
    items: [
      "Fixed major bug where solving problems multiple times double-counted XP",
      "Special thanks to Anjali (insta: anjaili0410_) for the detailed bug report",
      "Optimized database queries for the Leaderboard",
      "Improved Monaco Editor responsiveness"
    ],
    icon: <Bug className="w-4 h-4 text-rose-500" />,
    tag: "Hotfix"
  },
  {
    version: "1.2.0",
    date: "Dec 23, 2025",
    type: "Major",
    title: "High-Fidelity Overhaul",
    items: [
      "New premium design language inspired by Engineering OS concepts",
      "Skill Radar charts: Dynamic visualization of engineering proficiency",
      "AI Hint System: Staggered hints for challenging problems",
      "New Submission celebrations with a custom Acceptance Modal"
    ],
    icon: <Sparkles className="w-4 h-4 text-orange-500" />,
    tag: "Major"
  },
  {
    version: "1.1.0",
    date: "Dec 20, 2025",
    type: "Feature",
    title: "Workspace Integration",
    items: [
      "Monaco Editor integration for a VS Code experience",
      "Real-time JavaScript execution API",
      "Multi-language support (JS, Python, Java) added to selector"
    ],
    icon: <Rocket className="w-4 h-4 text-blue-500" />,
    tag: "Feature"
  }
];

export default function ChangelogPage() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Major", "Feature", "Hotfix"];

  const filteredChanges = filter === "All" 
    ? changes 
    : changes.filter(c => c.tag === filter);

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-tight uppercase italic tracking-tighter">Changelog</h1>
                <p className="text-zinc-500 font-medium">Tracking the rapid evolution of Rank-up OS.</p>
            </div>
            
            <div className="flex bg-zinc-900/50 border border-white/5 p-1 rounded-xl">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                            filter === tag 
                                ? "bg-white text-black shadow-lg" 
                                : "text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredChanges.map((change, i) => (
                <motion.div 
                key={change.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative pl-12 border-l-2 border-white/5"
                >
                <div className="absolute left-[-11px] top-0 bg-zinc-950 border-2 border-white/10 p-1.5 rounded-full shadow-2xl z-10 ring-8 ring-zinc-950">
                    {change.icon}
                </div>
                
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                            change.tag === 'Major' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                            change.tag === 'Hotfix' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                            'bg-blue-500/10 border-blue-500/20 text-blue-500'
                        }`}>
                            {change.tag}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            <span>v{change.version}</span>
                            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                            <span>{change.date}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">{change.title}</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {change.items.map((item, j) => (
                                <div key={j} className="flex items-start gap-3 group">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-zinc-800 border border-white/10 rounded-full shrink-0 group-hover:bg-orange-500 transition-colors" />
                                    <p className="text-zinc-400 text-sm font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
