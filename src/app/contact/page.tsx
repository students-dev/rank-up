"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 grid-pattern font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 relative z-10 text-center">
        <div className="space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-white tracking-tight">Get in touch</h1>
          <p className="text-zinc-500 font-medium max-w-lg mx-auto leading-relaxed">Have questions or feedback? We'd love to hear from you. Our team typically responds within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            <div className="p-8 rounded-[32px] glass border border-white/5 space-y-4">
                <div className="bg-white/5 w-fit p-3 rounded-xl mx-auto text-orange-500 border border-white/5">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Support</h3>
                <p className="text-zinc-500 text-sm font-medium italic">support@rank-up.io</p>
            </div>
            <div className="p-8 rounded-[32px] glass border border-white/5 space-y-4">
                <div className="bg-white/5 w-fit p-3 rounded-xl mx-auto text-blue-500 border border-white/5">
                    <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Discord</h3>
                <p className="text-zinc-500 text-sm font-medium italic">Join our community</p>
            </div>
        </div>

        <div className="flex justify-center gap-8 border-t border-white/5 pt-12">
            <Link href="https://github.com/students-dev/rank-up" className="text-zinc-600 hover:text-white transition-colors">
                <Github className="w-8 h-8" />
            </Link>
            <Link href="#" className="text-zinc-600 hover:text-white transition-colors">
                <Twitter className="w-8 h-8" />
            </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
