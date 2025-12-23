"use client";

import { motion } from "framer-motion";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useState } from "react";
import { VoteType } from "@prisma/client";

interface VoteButtonsProps {
  initialLikes: number;
  postId: string;
  initialUserVote?: VoteType | null;
}

export const VoteButtons = ({ initialLikes, postId, initialUserVote }: VoteButtonsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [userVote, setUserVote] = useState<VoteType | null>(initialUserVote || null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: VoteType) => {
    if (isVoting) return;
    setIsVoting(true);

    try {
      const res = await fetch(`/api/discuss/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        
        // Toggle logic
        if (userVote === type) {
          setUserVote(null);
        } else {
          setUserVote(type);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-zinc-900/50 border border-white/5 rounded-xl p-1 shrink-0 h-fit">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleVote(VoteType.UP);
        }}
        disabled={isVoting}
        className={`p-1.5 rounded-lg transition-all ${
          userVote === VoteType.UP 
            ? "text-orange-500 bg-orange-500/10" 
            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
        }`}
      >
        <ArrowBigUp className={`w-6 h-6 ${userVote === VoteType.UP ? "fill-current" : ""}`} />
      </button>
      
      <span className={`text-xs font-black min-w-[20px] text-center ${
        userVote === VoteType.UP ? "text-orange-500" : 
        userVote === VoteType.DOWN ? "text-blue-500" : "text-zinc-400"
      }`}>
        {likes}
      </span>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleVote(VoteType.DOWN);
        }}
        disabled={isVoting}
        className={`p-1.5 rounded-lg transition-all ${
          userVote === VoteType.DOWN 
            ? "text-blue-500 bg-blue-500/10" 
            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
        }`}
      >
        <ArrowBigDown className={`w-6 h-6 ${userVote === VoteType.DOWN ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};
