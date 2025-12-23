"use client";

import { motion } from "framer-motion";
import { GitBranch, Rocket, Sparkles } from "lucide-react";

const changes = [
  {
    version: "1.2.0",
    date: "Dec 23, 2025",
    type: "Major",
    title: "The UI Overhaul",
    items: [
      "New premium design language inspired by Lovable",
      "Enhanced glassmorphism effects across all components",
      "Staggered entrance animations with Framer Motion",
      "Improved mobile responsiveness for the dashboard"
    ],
    icon: <Sparkles className="w-4 h-4 text-orange-500" />
  },
  {
    version: "1.1.0",
    date: "Dec 20, 2025",
    type: "Feature",
    title: "Workspace Integration",
    items: [
      "Monaco Editor integration for a VS Code experience",
      "Real-time JavaScript execution API",
      "Markdown support for problem descriptions"
    ],
    icon: <Rocket className="w-4 h-4 text-blue-500" />
  },
  {
    version: "1.0.0",
    date: "Dec 18, 2025",
    type: "Launch",
    title: "Initial Release",
    items: [
      "GitHub & Google OAuth authentication",
      "Prisma database setup for problem tracking",
      "Core platform architecture"
    ],
    icon: <GitBranch className="w-4 h-4 text-emerald-500" />
  }
];

export default function ChangelogPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="space-y-4 mb-16">
          <h1 className="text-4xl font-semibold text-white tracking-tight">Changelog</h1>
          <p className="text-zinc-500 font-medium">Follow the evolution of Rank-up.</p>
        </div>

        <div className="space-y-12">
          {changes.map((change, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 border-l border-white/5"
            >
              <div className="absolute left-[-9px] top-0 bg-zinc-950 border border-white/5 p-1 rounded-full shadow-lg">
                {change.icon}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                  <span className="text-orange-500">v{change.version}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500">{change.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{change.title}</h3>
                <ul className="space-y-2">
                  {change.items.map((item, j) => (
                    <li key={j} className="text-zinc-400 text-sm flex items-center gap-2 font-medium leading-relaxed">
                      <div className="w-1 h-1 bg-zinc-700 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
