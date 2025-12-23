"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Eye, Search } from "lucide-react";

const posts = [
  { id: 1, title: "How I optimized my 2Sum solution from O(n^2) to O(n)", author: "TheCodeMaster", time: "2h ago", likes: 342, views: "1.2k", tags: ["Array", "Algorithm"] },
  { id: 2, title: "Is it possible to solve 'Longest Palindrome' in constant space?", author: "AlgoWiz", time: "5h ago", likes: 89, views: "432", tags: ["String", "Optimization"] },
  { id: 3, title: "Preparing for Google L4 Interview: My experience", author: "ExGoogler", time: "1d ago", likes: 1205, views: "12k", tags: ["Interview", "Career"] },
];

export default function DiscussPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">Community Discussion</h1>
            <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all">New Post</button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest border border-white/5 hover:bg-zinc-800 transition-all">Filter</button>
            </div>
        </div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 border border-white/5 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-orange-500 transition-colors leading-snug">{post.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                    <span className="text-zinc-400">by {post.author}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end items-end gap-6 md:gap-2">
                   <div className="flex items-center gap-2 text-zinc-600">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-bold">{post.likes}</span>
                   </div>
                   <div className="flex items-center gap-2 text-zinc-600">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-bold">{post.views}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
