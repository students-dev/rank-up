"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Code2, LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Rank<span className="text-orange-500">-up</span>
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-8">
            <Link href="/problems" className="text-zinc-400 hover:text-white transition-colors">
              Problems
            </Link>
            <Link href="/leaderboard" className="text-zinc-400 hover:text-white transition-colors">
              Leaderboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <img src={session.user.image} alt={session.user.name || "User"} />
                    ) : (
                      <UserIcon className="w-5 h-5" />
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
