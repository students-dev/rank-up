"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Zap, Star } from "lucide-react";
import Link from "next/link";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpGained: number;
  level: number;
  problemTitle: string;
}

export const SubmissionModal = ({ isOpen, onClose, xpGained, level, problemTitle }: SubmissionModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[48px] p-12 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full" />
            
            <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <motion.div
                initial={{ rotate: -10, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="bg-orange-500 p-6 rounded-[32px] shadow-2xl shadow-orange-500/20"
              >
                <Trophy className="w-12 h-12 text-white fill-current" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Accepted!</h2>
                <p className="text-zinc-500 font-medium tracking-tight">You successfully solved <span className="text-zinc-300">{problemTitle}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-inner">
                  <p className="text-zinc-500 text-xs font-bold mb-1">XP Gained</p>
                  <div className="flex items-center justify-center gap-2 text-orange-500">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="text-2xl font-bold">+{xpGained}</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-inner">
                  <p className="text-zinc-500 text-xs font-bold mb-1">Current Level</p>
                  <div className="flex items-center justify-center gap-2 text-blue-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-2xl font-bold">{level}</span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-3 pt-4">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-white text-black rounded-2xl font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl"
                >
                  Continue Solving
                </button>
                <Link
                  href="/leaderboard"
                  className="block w-full py-4 glass text-white rounded-2xl font-semibold text-sm hover:bg-white/5 transition-all"
                >
                  View Rankings
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};