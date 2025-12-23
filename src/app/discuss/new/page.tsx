"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, X, MessageSquare, Tag, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
    setError("");

    try {
      const response = await fetch("/api/discuss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
        }),
      });

      if (response.ok) {
        router.push("/discuss");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight italic">Create Post</h1>
              <p className="text-zinc-500 font-medium">Share your knowledge with the guild.</p>
            </div>
            <Link 
              href="/discuss"
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-500 text-sm font-bold"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Headline</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Optimized solution for Longest Palindrome"
                  className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 px-8 text-lg font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Tags (comma separated)</label>
                <div className="relative">
                    <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Algorithms, Python, Interview"
                        className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-14 pr-8 text-sm font-bold text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-4">Content</label>
                <textarea
                  required
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell us more about your approach..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-[32px] py-6 px-8 text-sm font-medium leading-relaxed text-zinc-300 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-700 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex items-center gap-3 px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
