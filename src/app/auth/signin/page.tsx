"use client";

import { signIn } from "next-auth/react";
import { Code2, Github, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-zinc-950 grid-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900 border border-white/5 rounded-[48px] p-10 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-white p-3 rounded-2xl mb-6 shadow-xl">
            <Code2 className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Access Rank-up</h1>
          <p className="text-zinc-500 mt-2 font-medium">Continue your engineering journey.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black py-4 px-4 rounded-[20px] font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          <button
            onClick={() => signIn("discord", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 px-4 rounded-[20px] font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-[#5865F2]/20"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            Continue with Discord
          </button>
          
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white py-4 px-4 rounded-[20px] font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.98] border border-white/5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.31l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-10 text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
          Rank-up Cloud Engineering • v1.2
        </p>
      </motion.div>
    </div>
  );
}