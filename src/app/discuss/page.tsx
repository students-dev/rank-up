"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Eye, Search, User, Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";

export default function DiscussPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/discuss");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">Community</h1>
                <p className="text-zinc-500 font-medium">Share insights, ask questions, and build together.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-3.5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl active:scale-95">New Post</button>
                <button className="flex-1 md:flex-none px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 hover:bg-zinc-800 transition-all active:scale-95">Filter</button>
            </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-zinc-900/50 rounded-[32px] border border-white/5 animate-pulse" />
            ))
          ) : posts.length > 0 ? (
            posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-10 rounded-[40px] bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all group cursor-pointer shadow-sm hover:shadow-2xl"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-6 flex-1">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, j: number) => (
                          <span key={j} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-white/5 px-2.5 py-1 rounded-lg bg-white/[0.02]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors leading-tight tracking-tight">{post.title}</h3>
                      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                                {post.author.image ? <img src={post.author.image} alt="" /> : <User className="w-3 h-3" />}
                            </div>
                            <span className="text-zinc-400">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-500/50">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post._count.comments} Comments</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end items-end gap-8 md:gap-4 shrink-0">
                       <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-white leading-none">{post.likes}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Votes</span>
                       </div>
                       <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-white leading-none">{post.views}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Views</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))
          ) : (
            <div className="p-24 text-center glass rounded-[48px] border-dashed border-white/5 opacity-40">
                <MessageSquare className="w-12 h-12 mx-auto mb-6 text-zinc-600" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600">The forum is quiet... for now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}