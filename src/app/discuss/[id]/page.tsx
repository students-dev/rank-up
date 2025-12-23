"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  ThumbsUp, 
  User, 
  Clock, 
  ArrowLeft, 
  Send,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/discuss/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/discuss/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
      });
      if (res.ok) {
        setComment("");
        fetchPost();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-sans">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <Link 
          href="/discuss"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Community
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, i: number) => (
                <span key={i} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-white/5 px-2.5 py-1 rounded-lg bg-white/[0.02]">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                  {post.author.image ? <img src={post.author.image} alt="" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="text-zinc-300">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Votes</span>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="space-y-8 pt-12 border-t border-white/5">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              Discussion ({post.comments.length})
            </h3>

            {session ? (
              <form onSubmit={handleComment} className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-[24px] py-5 px-6 text-sm font-medium leading-relaxed text-zinc-300 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-700 resize-none"
                  rows={4}
                />
                <button
                  disabled={submitting || !comment.trim()}
                  className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 active:scale-95 shadow-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-[24px] glass border-dashed border-white/10 text-center">
                <p className="text-zinc-500 text-sm font-medium">Please sign in to join the discussion.</p>
              </div>
            )}

            <div className="space-y-4">
              {post.comments.map((c: any, i: number) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-[24px] bg-zinc-900/40 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                      {c.author.image ? <img src={c.author.image} alt="" /> : <User className="w-3 h-3 text-zinc-500" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{c.author.name}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700">•</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed font-medium">{c.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
