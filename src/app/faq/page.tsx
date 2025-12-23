"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";

const faqs = [
  {
    q: "How does the ranking system work?",
    a: "Your rank is determined by the total XP you earn from solving problems. Each difficulty level provides a different amount of XP: Easy (50 XP), Medium (100 XP), and Hard (200 XP)."
  },
  {
    q: "Can I solve problems in different languages?",
    a: "Currently, we support real execution for JavaScript. Python and Java support is in simulation mode and will be fully available in our next major update."
  },
  {
    q: "How do streaks work?",
    a: "Solve at least one problem every 24 hours to maintain your streak. Streaks are visible on your profile and help you earn exclusive badges."
  },
  {
    q: "Is Rank-up free to use?",
    a: "Yes! Rank-up is an open-source platform dedicated to helping developers improve their skills for free."
  }
];

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="space-y-4 mb-16">
          <h1 className="text-4xl font-semibold text-white tracking-tight flex items-center gap-4">
            <HelpCircle className="w-8 h-8 text-orange-500" />
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-500 font-medium leading-relaxed">Everything you need to know about the Rank-up platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-between">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-500 transition-colors" />
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
