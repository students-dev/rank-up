import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Trophy, Calendar, Code, Star, Timer } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      submissions: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { problem: true },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Sidebar */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-orange-500 p-1 mb-6">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=18181b&color=f97316`}
                alt={user.name!}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-zinc-500 mb-6">{user.email}</p>
            <div className="flex gap-4 w-full">
              <div className="flex-1 bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700">
                <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Rank</p>
                <p className="text-xl font-black text-orange-500">#{user.rank}</p>
              </div>
              <div className="flex-1 bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700">
                <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Solved</p>
                <p className="text-xl font-black text-white">0</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-500" />
              Badges
            </h3>
            <div className="flex flex-wrap gap-2 text-zinc-500 italic text-sm">
              No badges earned yet. Solve problems to earn badges!
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <Code className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-bold">Accuracy</h4>
              </div>
              <p className="text-3xl font-black">0%</p>
              <p className="text-sm text-zinc-500 mt-1">From total submissions</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Timer className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="font-bold">Avg. Speed</h4>
              </div>
              <p className="text-3xl font-black">--</p>
              <p className="text-sm text-zinc-500 mt-1">Seconds per problem</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Recent Submissions
              </h3>
            </div>
            <div className="divide-y divide-zinc-800">
              {user.submissions.length > 0 ? (
                user.submissions.map((sub) => (
                  <div key={sub.id} className="p-6 flex justify-between items-center hover:bg-zinc-800/30 transition-colors">
                    <div>
                      <h5 className="font-bold text-zinc-100">{sub.problem.title}</h5>
                      <p className="text-xs text-zinc-500 mt-1">
                        {new Date(sub.createdAt).toLocaleDateString()} at {new Date(sub.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sub.status === "Accepted" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-zinc-500 italic">
                  No submissions yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
