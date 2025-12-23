"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Code2, LogOut, User as UserIcon, LayoutGrid, Trophy as TrophyIcon, Sparkles, HelpCircle, Settings, ChevronDown, Rocket, Compass, BookOpen, MessageSquare, Briefcase, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreLinks = [
    { name: "Explore", href: "/explore", icon: <Compass className="w-4 h-4" /> },
    { name: "Contests", href: "/contests", icon: <TrophyIcon className="w-4 h-4" /> },
    { name: "Discuss", href: "/discuss", icon: <MessageSquare className="w-4 h-4" /> },
    { name: "Roadmap", href: "/roadmap", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Interview Prep", href: "/interview-prep", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Badges", href: "/badges", icon: <Award className="w-4 h-4" /> },
    { name: "Premium", href: "/premium", icon: <Sparkles className="w-4 h-4" />, color: "text-orange-500" },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <Code2 className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                Rankup
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <Link href="/problems" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">
                Problems
              </Link>
              <Link href="/leaderboard" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors">
                Leaderboard
              </Link>
              
              <div className="relative">
                <button 
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  More <ChevronDown className={`w-3 h-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setIsMoreOpen(false)}
                      className="absolute top-full left-0 mt-2 w-56 glass-darker p-2 rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="grid gap-1">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 transition-all ${link.color || 'text-zinc-400 hover:text-white'}`}
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/settings" className="p-2 text-zinc-500 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </Link>
                <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-all">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <img src={session.user.image} alt={session.user.name || "User"} />
                    ) : (
                      <UserIcon className="w-3 h-3 text-zinc-400" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-zinc-300">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;