import { Trophy, Medal, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/PageTransition";

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500/20" />;
  if (rank === 2) return <Medal className="w-5 h-5 md:w-6 md:h-6 text-zinc-300 fill-zinc-300/20" />;
  if (rank === 3) return <Award className="w-5 h-5 md:w-6 md:h-6 text-orange-500 fill-orange-500/20" />;
  return <span className="w-6 text-center text-zinc-500 font-black text-[10px] md:text-xs">{rank}</span>;
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
    <PageTransition>
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-32 relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tight">Global Ranks</h1>
          <p className="text-zinc-500 font-medium leading-relaxed text-sm md:text-base">The elite engineers pushing the boundaries of competitive coding.</p>
        </div>

        <div className="space-y-3">
          {users.map((user: any, i: number) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-zinc-900/40 border border-white/5 p-4 md:p-6 rounded-[24px] md:rounded-[32px] hover:bg-zinc-900/60 hover:border-white/10 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="flex items-center gap-4 md:gap-8">
                <div className="w-6 md:w-8 flex justify-center">
                  <RankBadge rank={i + 1} />
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 font-bold overflow-hidden shadow-inner shrink-0">
                    {user.image ? (
                        <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-lg md:text-xl font-black uppercase">{user.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 group-hover:text-orange-500 transition-colors text-sm md:text-lg tracking-tight">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        {user._count.submissions} solved
                        </p>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        Rank #{i + 1}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg md:text-3xl font-black text-white tracking-tighter">{user.xp.toLocaleString()}</p>
                <p className="text-[8px] md:text-[9px] uppercase font-black text-orange-500 tracking-[0.2em]">Points</p>
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="p-20 text-center bg-zinc-900/20 rounded-[48px] border-2 border-dashed border-white/5">
                <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.2em]">The climb hasn't started yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}