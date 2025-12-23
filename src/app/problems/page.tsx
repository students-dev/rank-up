import Link from "next/link";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Problem } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const difficultyColor = {
  EASY: "text-emerald-500",
  MEDIUM: "text-amber-500",
  HARD: "text-rose-500",
};

export default async function ProblemsPage() {
  const session = await getServerSession(authOptions);
  
  const problems = await prisma.problem.findMany({
    orderBy: { order: "asc" },
  });

  let userSolvedIds: string[] = [];
  let userRank = "Unranked";
  let xp = 0;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        submissions: {
          where: { status: "Accepted" },
          select: { problemId: true }
        }
      }
    });
    if (user) {
      userSolvedIds = user.submissions.map((s: any) => s.problemId);
      xp = user.xp;
      if (xp > 1000) userRank = "Gold III";
      else if (xp > 500) userRank = "Silver I";
      else if (xp > 0) userRank = "Bronze I";
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans bg-zinc-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white tracking-tight">Problem Set</h1>
          <p className="text-zinc-500 text-lg font-medium">Choose a challenge and start coding.</p>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-4 rounded-3xl flex gap-8 w-full md:w-auto shadow-2xl">
          <div className="text-center flex-1 md:flex-none">
            <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1">Solved</p>
            <p className="text-2xl font-black text-white">{userSolvedIds.length}/{problems.length}</p>
          </div>
          <div className="text-center border-l border-white/5 pl-8 flex-1 md:flex-none">
            <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1">Rank</p>
            <div className="flex items-center justify-center gap-2 text-orange-500">
              <Trophy className="w-5 h-5 fill-current" />
              <p className="text-2xl font-black">{userRank}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-zinc-900/40 border border-white/5 rounded-[32px] shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-zinc-500 w-24">Status</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-zinc-500">Title</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-zinc-500 w-32">Difficulty</th>
              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-zinc-500 w-40">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {problems.length > 0 ? (
              problems.map((problem: Problem) => (
                <tr
                  key={problem.id}
                  className="hover:bg-white/[0.02] transition-all group cursor-pointer"
                >
                  <td className="px-8 py-5">
                    {userSolvedIds.includes(problem.id) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-800" />
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <Link
                      href={`/problems/${problem.slug}`}
                      className="font-bold text-zinc-100 group-hover:text-orange-500 transition-colors tracking-tight"
                    >
                      {problem.order}. {problem.title}
                    </Link>
                  </td>
                  <td className={`px-8 py-5 font-black text-[10px] tracking-widest ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`}>
                    {problem.difficulty}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-zinc-800/50 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {problem.category}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-8 py-24 text-center text-zinc-600 font-medium italic">
                  No problems found. Database is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
