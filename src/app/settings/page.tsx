"use client";

import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Keyboard, 
  Github, 
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!session) return;
      try {
        const res = await fetch("/api/user/accounts");
        const data = await res.json();
        setLinkedAccounts(data.providers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [session]);

  const providers = [
    { id: "github", name: "GitHub", icon: <Github className="w-5 h-5" /> },
    { id: "discord", name: "Discord", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "google", name: "Google", icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.31l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    )},
  ];

  if (status === "loading" || loading) {
    return <div className="min-h-screen bg-zinc-950 grid-pattern flex items-center justify-center font-bold uppercase text-[10px] tracking-widest text-zinc-600 italic animate-pulse">Syncing Preferences...</div>;
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight uppercase italic tracking-tighter">Settings</h1>
            <p className="text-zinc-500 font-medium text-sm">Manage your account and preferences.</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Account Linking Section */}
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3">
                <Shield className="w-4 h-4 text-orange-500" />
                Linked Accounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {providers.map((p) => {
                    const isLinked = linkedAccounts.includes(p.id);
                    return (
                        <div key={p.id} className={`p-6 rounded-[24px] border transition-all ${isLinked ? 'bg-orange-500/5 border-orange-500/20' : 'bg-zinc-900/50 border-white/5'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-2.5 rounded-xl border ${isLinked ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-white/5 border-white/10 text-zinc-500'}`}>
                                    {p.icon}
                                </div>
                                {isLinked ? (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Linked
                                    </span>
                                ) : (
                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Disconnected</span>
                                )}
                            </div>
                            <h4 className="font-bold text-white mb-4">{p.name}</h4>
                            {!isLinked && (
                                <button 
                                    onClick={() => signIn(p.id)}
                                    className="w-full py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-3 h-3" /> Connect
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
          </section>

          {/* Preferences Section */}
          <section className="space-y-6 pt-8 border-t border-white/5">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-3">
                <Keyboard className="w-4 h-4 text-blue-500" />
                Editor Preferences
            </h3>
            <div className="p-8 rounded-[32px] bg-zinc-900/30 border-2 border-dashed border-white/5 text-center">
                <p className="text-zinc-600 text-sm font-medium">Custom themes and keybindings are coming in v1.3</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}