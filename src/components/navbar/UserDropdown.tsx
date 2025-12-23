"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Trophy, 
  Flame,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
      >
        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-4 h-4 text-zinc-400" />
          )}
        </div>
        <span className="text-xs font-semibold text-zinc-300 pr-2">
          {user.name?.split(' ')[0]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 glass-darker p-2 rounded-[24px] shadow-2xl border border-white/10 overflow-hidden z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-4 border-b border-white/5 mb-2">
              <p className="text-sm font-bold text-white tracking-tight">{user.name}</p>
              <p className="text-[10px] text-zinc-500 font-medium truncate">{user.email}</p>
            </div>

            <div className="grid gap-1">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <Trophy className="w-4 h-4" />
                My Rankings
              </Link>
            </div>

            <div className="mt-2 pt-2 border-t border-white/5">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
