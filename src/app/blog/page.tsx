"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const articles = [
  { title: "Building a High-Performance Code Runner with Node.js", date: "Dec 15, 2025", category: "Engineering" },
  { title: "How to Ace the System Design Interview in 2026", date: "Dec 10, 2025", category: "Career" },
  { title: "The Future of AI in Technical Recruitment", date: "Dec 05, 2025", category: "AI" },
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Blog</h1>
          <p className="text-zinc-500 font-medium">Engineering insights, product updates, and career advice.</p>
        </div>

        <div className="space-y-1">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 flex items-center justify-between border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{article.category}</span>
                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors tracking-tight">{article.title}</h3>
                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{article.date}</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-zinc-700 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
