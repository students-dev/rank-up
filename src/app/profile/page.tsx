import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Trophy, Calendar, Code, Star, Timer, Flame, Zap, Award, BarChart3 } from "lucide-react";
import { SkillRadar } from "@/components/SkillRadar";

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
        take: 10,
        include: { problem: true },
      },
      _count: {
        select: { submissions: { where: { status: "Accepted" } } }
      }
    },
  });

  if (!user) return null;

  const solvedCount = user._count.submissions;
  const level = Math.floor((user.xp || 0) / 1000) + 1;
  const accuracy = user.submissions.length > 0 
    ? Math.round((solvedCount / user.submissions.length) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-zinc-950 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-32 h-32 rounded-[40px] border-4 border-orange-500 p-1 mb-8 relative z-10 rotate-3 group-hover:rotate-0 transition-transform shadow-2xl shadow-orange-500/20">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=18181b&color=f97316`}
                alt={user.name!}
                className="w-full h-full rounded-[36px] object-cover"
              />
            </div>
            
            <h1 className="text-3xl font-black mb-1 text-white relative z-10 tracking-tight uppercase italic">{user.name}</h1>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-10 relative z-10">Lvl {level} Engineer</p>
            
            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              <div className="bg-white/5 rounded-3xl p-5 border border-white/5 shadow-inner">
                <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Rank</p>
                <p className="text-2xl font-black text-white tracking-tighter">#{user.rank || "---"}</p>
              </div>
              <div className="bg-white/5 rounded-3xl p-5 border border-white/5 shadow-inner">
                <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">XP</p>
                <p className="text-2xl font-black text-orange-500 tracking-tighter">{user.xp.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 space-y-8 shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              Proficiency
            </h3>
            <SkillRadar />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[48px] group hover:border-orange-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/10 p-3 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                  <Code className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-zinc-500">Problems Solved</h4>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="text-5xl font-black text-white">{solvedCount}</p>
                <p className="text-zinc-600 font-black text-xs uppercase italic">Total</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-white/5 p-10 rounded-[48px] group hover:border-blue-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-500/10 p-3 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                  <Flame className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-zinc-500">Current Streak</h4>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="text-5xl font-black text-white">{user.streak}</p>
                <p className="text-zinc-600 font-black text-xs uppercase italic">Days</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
            <div className="p-8 px-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Activity Stream
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {user.submissions.length > 0 ? (
                user.submissions.map((sub: any) => (
                  <div key={sub.id} className="p-10 flex justify-between items-center hover:bg-white/[0.02] transition-colors group">
                    <div className="space-y-2">
                      <h5 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors tracking-tight">{sub.problem.title}</h5>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{new Date(sub.createdAt).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{sub.language.toUpperCase()}</span>
                      </div>
                    </div>
                    <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      sub.status === "Accepted" 
                        ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500/10" 
                        : "bg-rose-500/5 text-rose-500 border-rose-500/20 group-hover:bg-rose-500/10"
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-24 text-center">
                  <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest italic opacity-50">No data points captured yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
