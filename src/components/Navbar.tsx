"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Code2, LogOut, User as UserIcon, LayoutGrid, Trophy as TrophyIcon, Sparkles, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();

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
              <Link href="/problems" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                Problems
              </Link>
              <Link href="/leaderboard" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                Leaderboard
              </Link>
              <Link href="/changelog" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                Changelog
              </Link>
              <Link href="/about" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
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
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
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