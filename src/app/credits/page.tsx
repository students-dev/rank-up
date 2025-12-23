"use client";

import { motion } from "framer-motion";
import { Github, Code2, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";

const developers = [
  {
    name: "Ramkrishna",
    username: "ramkrishna-xyz",
    role: "Lead Developer",
    github: "https://github.com/ramkrishna-xyz",
    image: "https://github.com/ramkrishna-xyz.png",
  },
  {
    name: "Manjunath",
    username: "manjunathh-xyz",
    role: "Core Contributor",
    github: "https://github.com/manjunathh-xyz",
    image: "https://github.com/manjunathh-xyz.png",
  }
];

export default function CreditsPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Code2 className="w-3 h-3 text-orange-500" />
            Built with Passion
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            MEET THE<br />
            <span className="text-orange-500 italic text-glow uppercase">ENGINEERS.</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto font-bold tracking-tight pt-4 leading-relaxed">
            The visionary minds behind the Rank-up platform, dedicated to crafting the ultimate engineering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {developers.map((dev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-10 rounded-[48px] border border-white/5 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity">
                <Github className="w-32 h-32 text-white" />
              </div>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                        src={dev.image} 
                        alt={dev.name} 
                        className="w-32 h-32 rounded-[40px] object-cover relative z-10 border border-white/10 shadow-2xl" 
                    />
                </div>
                
                <div className="space-y-1 relative z-10">
                    <h3 className="text-2xl font-black text-white tracking-tight">{dev.name}</h3>
                    <p className="text-orange-500 font-bold uppercase text-[10px] tracking-widest">{dev.role}</p>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <Link 
                        href={dev.github}
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-12 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-zinc-600 font-bold tracking-tight">
                Made with <Heart className="w-4 h-4 text-rose-500 fill-current" /> for the Global Developer Community
            </div>
        </div>
      </div>
    </div>
  );
}
