"use client";

import { motion } from "framer-motion";
import { Github, Code2, Heart, Instagram, Bug } from "lucide-react";
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

const reporters = [
  {
    name: "Anjali",
    handle: "anjaili0410_",
    role: "Bug Reporter",
    link: "https://www.instagram.com/anjaili0410_/",
  }
];

export default function CreditsPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center space-y-4 mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium mb-4"
          >
            <Heart className="w-3 h-3 fill-current" />
            Built for the community
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Team Behind <span className="text-orange-500">Rank-up</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium">
            The engineers and contributors who made this platform possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {developers.map((dev, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-10 rounded-[40px] border border-white/5 group flex flex-col items-center text-center space-y-6"
            >
              <img 
                src={dev.image} 
                alt={dev.name} 
                className="w-32 h-32 rounded-3xl object-cover border border-white/10 shadow-2xl" 
              />
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">{dev.name}</h3>
                <p className="text-zinc-500 font-medium">{dev.role}</p>
              </div>
              <Link 
                href={dev.github}
                target="_blank"
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-all shadow-lg"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Bug Bounty & Reporters</h2>
            <div className="h-px bg-white/5 flex-1" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reporters.map((rep, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-[32px] bg-zinc-900/50 border border-white/5 flex items-center gap-4"
              >
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{rep.name}</h4>
                  <Link 
                    href={rep.link} 
                    target="_blank"
                    className="text-xs font-medium text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-1"
                  >
                    @{rep.handle} <Instagram className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}