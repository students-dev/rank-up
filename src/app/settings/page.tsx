"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Keyboard } from "lucide-react";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  const sections = [
    { icon: <User className="w-4 h-4" />, name: "Profile Settings", desc: "Manage your public profile and image." },
    { icon: <Bell className="w-4 h-4" />, name: "Notifications", desc: "Configure how you receive alerts." },
    { icon: <Shield className="w-4 h-4" />, name: "Security", desc: "Two-factor authentication and passwords." },
    { icon: <Keyboard className="w-4 h-4" />, name: "Editor Preferences", desc: "Vim mode, font size, and keybindings." },
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
            <p className="text-zinc-500 font-medium text-sm">Customize your Rank-up experience.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/5 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
                  {section.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Configure</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{section.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{section.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 border-dashed text-center">
          <p className="text-zinc-600 text-sm font-medium">Advanced settings are currently locked for the beta version.</p>
        </div>
      </div>
    </div>
  );
}
