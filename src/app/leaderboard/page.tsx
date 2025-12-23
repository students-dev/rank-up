import { Trophy, Medal, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-zinc-300 fill-zinc-300/20" />;
  if (rank === 3) return <Award className="w-6 h-6 text-orange-500 fill-orange-500/20" />;
  return <span className="w-6 text-center text-zinc-500 font-black text-xs">{rank}</span>;
};

export default async function LeaderboardPage() {
  const users = await prisma.user.findMany({
    orderBy: [
      { xp: "desc" },
      { name: "asc" }
    ],
    take: 20,
    include: {
      _count: {
        select: { submissions: { where: { status: "Accepted" } } }
      }
    }
  });

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Global Leaderboard</h1>
          <p className="text-zinc-500 font-medium leading-relaxed">The top performing developers in our community.</p>
        </div>

        <div className="space-y-3">
          {users.map((user, i) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-zinc-900/40 border border-white/5 p-5 rounded-2xl hover:bg-zinc-900/60 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="w-8 flex justify-center">
                  <RankBadge rank={i + 1} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 font-bold overflow-hidden shadow-inner">
                    {user.image ? (
                        <img src={user.image} alt={user.name || "User"} />
                    ) : (
                        user.name?.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 group-hover:text-orange-500 transition-colors">{user.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                      {user._count.submissions} problems solved
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white tracking-tighter">{user.xp.toLocaleString()}</p>
                <p className="text-[9px] uppercase font-black text-orange-500 tracking-widest">Points</p>
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="p-20 text-center bg-zinc-900/20 rounded-[32px] border-2 border-dashed border-white/5">
                <p className="text-zinc-600 font-medium italic">The climb hasn't started yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}