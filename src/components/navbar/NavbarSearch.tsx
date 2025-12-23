"use client";

import { Search, Command } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NavbarSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById("navbar-search");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative group hidden lg:block">
      <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'w-80' : 'w-64'}`}>
        <Search className={`absolute left-3 w-4 h-4 transition-colors ${isFocused ? 'text-orange-500' : 'text-zinc-500'}`} />
        <input
          id="navbar-search"
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search problems..."
          className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-12 text-xs font-medium text-zinc-300 focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 transition-all placeholder:text-zinc-600"
        />
        <div className="absolute right-3 flex items-center gap-1 pointer-events-none">
          <div className="bg-zinc-800 border border-white/5 px-1.5 py-0.5 rounded text-[10px] font-black text-zinc-500 flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>
    </div>
  );
};
