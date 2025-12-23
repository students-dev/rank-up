"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Heart, MessageSquare } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-5xl font-black text-white tracking-tighter">THE COMMUNITY.</h1>
          <p className="text-zinc-500 text-lg font-bold max-w-2xl mx-auto tracking-tight">Connect with engineers around the globe, join teams, and build together.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 space-y-6 group hover:border-blue-500/20 transition-all cursor-pointer">
                <div className="p-4 bg-blue-500/10 rounded-2xl w-fit border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Join Teams</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Collaborate with peers, participate in team-only contests, and climb the team leaderboards.</p>
            </div>
            <div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 space-y-6 group hover:border-orange-500/20 transition-all cursor-pointer">
                <div className="p-4 bg-orange-500/10 rounded-2xl w-fit border border-orange-500/20 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Find Mentors</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Connect with senior engineers from top tech companies for guidance and code reviews.</p>
            </div>
            <div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 space-y-6 group hover:border-emerald-500/20 transition-all cursor-pointer">
                <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Giving Back</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">Contribute to our open-source problems or write explanations for fellow learners.</p>
            </div>
        </div>

        <div className="mt-20 glass p-12 rounded-[48px] text-center border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageSquare className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10 max-w-xl mx-auto space-y-8">
                <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Ready to join the guild?</h2>
                <p className="text-zinc-500 font-bold tracking-tight">Connect with 50,000+ engineers solving the world's most interesting problems.</p>
                <button className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl">Join Discord Community</button>
            </div>
        </div>
      </div>
    </div>
  );
}
