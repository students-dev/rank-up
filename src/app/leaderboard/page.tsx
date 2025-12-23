import { Trophy, Medal, Award } from "lucide-react";

const topUsers = [
  { id: 1, name: "Sarah Jenkins", rank: 1, points: 12450, solved: 142, image: null },
  { id: 2, name: "Mike Chen", rank: 2, points: 11800, solved: 138, image: null },
  { id: 3, name: "Alex Rivera", rank: 3, points: 11200, solved: 135, image: null },
  { id: 4, name: "Jessica Wu", rank: 4, points: 9500, solved: 110, image: null },
  { id: 5, name: "David Miller", rank: 5, points: 8900, solved: 105, image: null },
];

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-zinc-300" />;
  if (rank === 3) return <Award className="w-6 h-6 text-orange-500" />;
  return <span className="w-6 text-center text-zinc-500 font-bold">{rank}</span>;
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Global Leaderboard</h1>
        <p className="text-zinc-400">The top developers in the Rank-up community.</p>
      </div>

      <div className="space-y-4">
        {topUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-6">
              <RankBadge rank={user.rank} />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-sm text-zinc-500">{user.solved} problems solved</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">{user.points.toLocaleString()}</p>
              <p className="text-xs uppercase font-bold text-orange-500 tracking-tighter">Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
