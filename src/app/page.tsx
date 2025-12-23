import Link from "next/link";
import { ArrowRight, Code2, Rocket, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 flex flex-col items-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-6">
          <Rocket className="w-4 h-4" />
          <span>Launch your coding career</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          The Best Way to <span className="text-orange-500 text-glow">Rank Up</span> Your Coding Skills
        </h1>
        <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mb-10">
          Master algorithms and data structures through curated challenges, real-time execution, and a competitive community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/problems"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            Start Solving <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/leaderboard"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-bold text-lg border border-zinc-700 transition-all"
          >
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
          <div className="bg-blue-500/10 p-3 rounded-xl w-fit mb-6">
            <Code2 className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">Pro Workspace</h3>
          <p className="text-zinc-400">
            A high-performance IDE experience with Monaco Editor, the same engine that powers VS Code.
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
          <div className="bg-orange-500/10 p-3 rounded-xl w-fit mb-6">
            <Rocket className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">Real-time Execution</h3>
          <p className="text-zinc-400">
            Submit your code and see results instantly against comprehensive test suites.
          </p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
          <div className="bg-green-500/10 p-3 rounded-xl w-fit mb-6">
            <Trophy className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-4">Global Ranking</h3>
          <p className="text-zinc-400">
            Compete with developers worldwide and climb the ranks by solving increasingly difficult problems.
          </p>
        </div>
      </section>
    </div>
  );
}