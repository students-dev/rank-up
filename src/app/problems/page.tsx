import Link from "next/link";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Problem } from "@prisma/client";

const difficultyColor = {
  EASY: "text-emerald-500",
  MEDIUM: "text-amber-500",
  HARD: "text-rose-500",
};

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow">Problem Set</h1>
          <p className="text-zinc-400 text-lg">Choose a challenge and start coding.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex gap-8 w-full md:w-auto">
          <div className="text-center flex-1 md:flex-none">
            <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Solved</p>
            <p className="text-2xl font-bold">0/{problems.length}</p>
          </div>
          <div className="text-center border-l border-zinc-800 pl-8 flex-1 md:flex-none">
            <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">Rank</p>
            <div className="flex items-center justify-center gap-2 text-orange-500">
              <Trophy className="w-5 h-5" />
              <p className="text-2xl font-bold">Unranked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900">
              <th className="px-6 py-4 font-semibold text-zinc-300 w-20">Status</th>
              <th className="px-6 py-4 font-semibold text-zinc-300">Title</th>
              <th className="px-6 py-4 font-semibold text-zinc-300 w-32">Difficulty</th>
              <th className="px-6 py-4 font-semibold text-zinc-300 w-32">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {problems.length > 0 ? (
              problems.map((problem: Problem) => (
                <tr
                  key={problem.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Circle className="w-5 h-5 text-zinc-700" />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/problems/${problem.slug}`}
                      className="font-medium text-zinc-100 group-hover:text-orange-500 transition-colors"
                    >
                      {problem.order}. {problem.title}
                    </Link>
                  </td>
                  <td className={`px-6 py-4 font-bold text-xs ${difficultyColor[problem.difficulty as keyof typeof difficultyColor]}`}>
                    {problem.difficulty}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded text-[10px] uppercase font-bold border border-zinc-700 tracking-tight">
                      {problem.category}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-zinc-500 italic">
                  No problems found. Run `npx prisma db seed` to populate the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
