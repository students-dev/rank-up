"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { 
  ChevronDown, Compass, BookOpen, 
  MessageSquare, Briefcase, Award, Users, Info, GitBranch, Mail, Users2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";
import { UserDropdown } from "./navbar/UserDropdown";
import { NavbarSearch } from "./navbar/NavbarSearch";

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
    { name: "Community", href: "/community", icon: <Users2 className="w-4 h-4" /> },
    { name: "Changelog", href: "/changelog", icon: <GitBranch className="w-4 h-4" /> },
    { name: "FAQ", href: "/faq", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Credits", href: "/credits", icon: <Users className="w-4 h-4" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
    { name: "Premium", href: "/premium", icon: <SparklesIcon className="w-4 h-4" />, color: "text-orange-500" },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center gap-8">
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <Logo className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors hidden sm:block">
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
                  onMouseEnter={() => setIsMoreOpen(true)}
                  className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-4"
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
                      className="absolute top-full left-0 mt-0 w-64 glass-darker p-2 rounded-2xl shadow-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                      <div className="grid grid-cols-1 gap-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMoreOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium hover:bg-white/5 transition-all ${link.color || 'text-zinc-400 hover:text-white'}`}
                          >
                            <span className="shrink-0">{link.icon}</span>
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

          <div className="flex-1 flex justify-center max-w-xl">
            <NavbarSearch />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {session?.user ? (
              <UserDropdown user={session.user} />
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-white text-black px-5 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
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

function TrophyIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
}

function HelpCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
}

function SparklesIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
}

export default Navbar;
