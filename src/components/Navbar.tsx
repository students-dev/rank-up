"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Code2, LogOut, User as UserIcon, LayoutGrid, Trophy as TrophyIcon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="glass sticky top-0 z-[100] h-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20"
              >
                <Code2 className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-black tracking-tighter uppercase italic">
                Rank<span className="text-orange-500">up</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/problems" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                <LayoutGrid className="w-4 h-4" />
                Problems
              </Link>
              <Link href="/leaderboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                <TrophyIcon className="w-4 h-4" />
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                <Link href="/profile" className="flex items-center gap-3 p-1 pr-4 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <img src={session.user.image} alt={session.user.name || "User"} />
                    ) : (
                      <UserIcon className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200">
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
                className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95"
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