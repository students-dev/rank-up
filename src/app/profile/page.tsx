import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Trophy, Calendar, Code, Star, Timer, Flame, Zap, Award } from "lucide-react";

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
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans bg-zinc-950">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-32 h-32 rounded-full border-4 border-orange-500 p-1 mb-6 relative z-10">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=18181b&color=f97316`}
                alt={user.name!}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            
            <h1 className="text-2xl font-semibold mb-1 text-white relative z-10">{user.name}</h1>
            <p className="text-zinc-500 text-sm mb-8 relative z-10">{user.email}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Rank</p>
                <p className="text-xl font-bold text-white">#{user.rank || "---"}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">XP</p>
                <p className="text-xl font-bold text-orange-500">{user.xp || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500 fill-current" />
                Streak
              </h3>
              <span className="text-2xl font-bold text-white">{user.streak || 0} Days</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500 fill-current" />
                Level
              </h3>
              <span className="text-2xl font-bold text-white">{Math.floor((user.xp || 0) / 1000) + 1}</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-[32px] p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Achievements
            </h3>
            <div className="flex flex-wrap gap-3">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-20 grayscale transition-all hover:opacity-100 hover:grayscale-0 cursor-help" title="Early Adopter">
                  <Star className="w-6 h-6 text-yellow-500" />
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-20 grayscale" title="10 Problems Solved">
                  <Code className="w-6 h-6 text-blue-500" />
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-20 grayscale" title="First Streak">
                  <Flame className="w-6 h-6 text-orange-500" />
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-white/5 rounded-[32px] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Recent Submissions
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {user.submissions.length > 0 ? (
                user.submissions.map((sub: any) => (
                  <div key={sub.id} className="p-8 flex justify-between items-center hover:bg-white/[0.02] transition-colors group">
                    <div className="space-y-1">
                      <h5 className="font-semibold text-white group-hover:text-orange-500 transition-colors tracking-tight">{sub.problem.title}</h5>
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                        {new Date(sub.createdAt).toLocaleDateString()} at {new Date(sub.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-bold text-zinc-500">{sub.language.toUpperCase()}</span>
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          sub.status === "Accepted" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        }`}>
                          {sub.status}
                        </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center space-y-4">
                  <p className="text-zinc-600 italic font-medium">No submissions yet.</p>
                  <button className="text-xs font-black uppercase tracking-widest text-white px-6 py-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">Start Solving</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
