"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Shield, Cpu, Code } from "lucide-react";

const features = [
  "Unlimited problem solutions",
  "Real-time debugger & execution",
  "FAANG interview preparation kits",
  "Premium problem library access",
  "Priority support & cloud workspace",
  "No advertisements",
];

export default function PremiumPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Zap className="w-3 h-3 fill-current" />
            Rank-up Pro
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            UNLEASH YOUR<br />
            <span className="text-orange-500 italic">POTENTIAL.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-bold tracking-tight pt-4">
            Join 50,000+ developers accelerating their career with our premium engineering platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-8 underline decoration-orange-500/50 decoration-4 underline-offset-8">Why go Pro?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-1">
                                <Check className="w-3 h-3 text-emerald-500" />
                            </div>
                            <span className="text-zinc-400 text-sm font-bold tracking-tight">{feature}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-12 rounded-[48px] bg-zinc-900/50 border border-white/10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10 space-y-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">Annual Billing</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white">$12</span>
                            <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ month</span>
                        </div>
                        <p className="text-zinc-600 text-[10px] mt-2 font-bold uppercase tracking-widest italic">Save 40% with yearly payment</p>
                    </div>

                    <button className="w-full py-5 bg-white text-black rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl shadow-white/5">
                        Upgrade Now
                    </button>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <Shield className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Secure checkout</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Instant access</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
