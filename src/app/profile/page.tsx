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
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Sidebar */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full border-4 border-orange-500 p-1 mb-6 shadow-xl shadow-orange-500/10">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=18181b&color=f97316`}
                alt={user.name!}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-black mb-1 text-white">{user.name}</h1>
            <p className="text-zinc-500 font-medium text-sm mb-6">{user.email}</p>
            <div className="flex gap-4 w-full">
              <div className="flex-1 bg-zinc-800/30 rounded-2xl p-4 border border-zinc-800">
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1.5">Rank</p>
                <p className="text-2xl font-black text-orange-500 tracking-tighter">#{user.rank || "---"}</p>
              </div>
              <div className="flex-1 bg-zinc-800/30 rounded-2xl p-4 border border-zinc-800">
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1.5">Solved</p>
                <p className="text-2xl font-black text-white tracking-tighter">0</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h3 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-zinc-400">
              <Star className="w-4 h-4 text-orange-500" />
              Achievements
            </h3>
            <div className="flex flex-wrap gap-2 text-zinc-600 italic text-xs font-medium px-2 py-4 border-2 border-dashed border-zinc-800 rounded-2xl text-center justify-center">
              No badges earned yet. Solve problems to earn badges!
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl group hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-500/10 p-2.5 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                  <Code className="w-5 h-5 text-emerald-500" />
                </div>
                <h4 className="font-black text-xs uppercase tracking-widest text-zinc-400">Accuracy</h4>
              </div>
              <p className="text-4xl font-black text-white">0%</p>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">Global Average: 42%</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl group hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500/10 p-2.5 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Timer className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="font-black text-xs uppercase tracking-widest text-zinc-400">Avg. Speed</h4>
              </div>
              <p className="text-4xl font-black text-white">--</p>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-2">Seconds per problem</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-zinc-400">
                <Calendar className="w-4 h-4 text-orange-500" />
                Recent Submissions
              </h3>
            </div>
            <div className="divide-y divide-zinc-800">
              {user.submissions.length > 0 ? (
                user.submissions.map((sub: any) => (
                  <div key={sub.id} className="p-6 flex justify-between items-center hover:bg-zinc-800/30 transition-colors group">
                    <div>
                      <h5 className="font-bold text-zinc-100 group-hover:text-orange-500 transition-colors">{sub.problem.title}</h5>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-2">
                        {new Date(sub.createdAt).toLocaleDateString()} • {new Date(sub.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      sub.status === "Accepted" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center text-zinc-600 italic font-medium">
                  No submissions yet. Start your journey today!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}