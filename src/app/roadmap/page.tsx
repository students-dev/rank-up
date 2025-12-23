"use client";

import { motion } from "framer-motion";
import { Map, Flag, Lock, CheckCircle2 } from "lucide-react";

const roadmaps = [
  {
    title: "Data Structures Mastery",
    difficulty: "Beginner to Advanced",
    steps: [
      { name: "Arrays & Strings", status: "completed" },
      { name: "Linked Lists", status: "completed" },
      { name: "Stacks & Queues", status: "current" },
      { name: "Trees & Graphs", status: "locked" },
      { name: "Heaps & Tries", status: "locked" }
    ]
  },
  {
    title: "The DP Specialist",
    difficulty: "Advanced",
    steps: [
      { name: "Fibonacci Series", status: "locked" },
      { name: "Knapsack Problem", status: "locked" },
      { name: "Matrix Chain Multiplication", status: "locked" },
      { name: "Dynamic Programming on Trees", status: "locked" }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-4 justify-center md:justify-start">
            <Map className="w-8 h-8 text-blue-500" />
            Learning Roadmaps
          </h1>
          <p className="text-zinc-500 font-medium mt-4">Follow battle-tested paths to master engineering concepts.</p>
        </div>

        <div className="space-y-16">
          {roadmaps.map((roadmap, i) => (
            <div key={i} className="space-y-8">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold text-white tracking-tight">{roadmap.title}</h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 border border-white/5 px-3 py-1 rounded-full">{roadmap.difficulty}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmap.steps.map((step, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-[24px] border transition-all ${
                      step.status === "completed" ? "bg-emerald-500/5 border-emerald-500/10" :
                      step.status === "current" ? "bg-orange-500/5 border-orange-500/20 shadow-xl shadow-orange-500/5" :
                      "bg-zinc-900/50 border-white/5 opacity-40"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${
                        step.status === "completed" ? "text-emerald-500" :
                        step.status === "current" ? "text-orange-500" :
                        "text-zinc-600"
                      }`}>Step {j + 1}</span>
                      {step.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                       step.status === "locked" ? <Lock className="w-4 h-4 text-zinc-600" /> :
                       <Flag className="w-4 h-4 text-orange-500" />}
                    </div>
                    <h4 className="text-sm font-bold text-zinc-200">{step.name}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
