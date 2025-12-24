"use client";

import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { Play, Send, Settings, Terminal, CheckCircle2, XCircle, Loader2, ChevronDown, History, Sparkles, Lightbulb, Palette } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { SubmissionModal } from "@/components/SubmissionModal";

interface WorkspaceProps {
  problem: {
    title: string;
    description: string;
    starterCode: string;
    slug: string;
  };
}

const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "JS" },
  { id: "python", name: "Python", icon: "PY" },
  { id: "java", name: "Java", icon: "JV" },
];

const THEMES = [
  { id: "vs-dark", name: "Midnight" },
  { id: "light", name: "Cloud" },
];

const Workspace = ({ problem }: WorkspaceProps) => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(problem.starterCode);
  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const [mobileView, setMobileView] = useState<"description" | "code">("description");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);

  const hints = [
    "Think about the constraints. Could a hash map reduce the time complexity?",
    "Try iterating through the array once and storing the complement of each number.",
    "If you're stuck, remember that the indices are what need to be returned, not the values themselves."
  ];

  const handleExecute = async (isSubmit: boolean = false) => {
    setIsRunning(true);
    setShowConsole(true);
    if (window.innerWidth < 1024) {
        setMobileView("code");
    }
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemSlug: problem.slug,
          isSubmit
        }),
      });
      const data = await response.json();
      setResults(data);
      
      if (data.allPassed && isSubmit) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#f97316", "#ffffff", "#3b82f6", "#10b981"]
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Execution error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-zinc-950 flex flex-col font-sans text-zinc-200">
      <SubmissionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        xpGained={50}
        level={2}
        problemTitle={problem.title}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-zinc-800 bg-zinc-900 shrink-0">
        <button 
            onClick={() => setMobileView("description")}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${mobileView === "description" ? "text-orange-500 border-b-2 border-orange-500 bg-orange-500/5" : "text-zinc-500"}`}
        >
            Description
        </button>
        <button 
            onClick={() => setMobileView("code")}
            className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${mobileView === "code" ? "text-orange-500 border-b-2 border-orange-500 bg-orange-500/5" : "text-zinc-500"}`}
        >
            Editor & Console
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal" className="hidden lg:flex">
            <Panel defaultSize={40} minSize={25}>
            <div className="h-full flex flex-col bg-zinc-900/50 border-r border-zinc-800">
                <div className="flex gap-4 px-6 border-b border-zinc-800 bg-zinc-900">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`py-4 text-xs font-semibold tracking-tight border-b-2 transition-colors ${
                    activeTab === "description"
                        ? "border-orange-500 text-orange-500"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("submissions")}
                    className={`py-4 text-xs font-semibold tracking-tight border-b-2 transition-colors ${
                    activeTab === "submissions"
                        ? "border-orange-500 text-orange-500"
                        : "border-transparent text-zinc-600 hover:text-zinc-300"
                    }`}
                >
                    Submissions
                </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 prose prose-invert max-w-none custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight m-0">{problem.title}</h2>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Easy</span>
                </div>
                <ReactMarkdown>{problem.description}</ReactMarkdown>

                <div className="mt-12 space-y-4 pt-12 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        Rank-up Assistant
                    </div>
                    {hintIndex >= 0 && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-[24px] bg-orange-500/5 border border-orange-500/10 text-zinc-300 text-sm font-medium leading-relaxed"
                        >
                            {hints[hintIndex]}
                        </motion.div>
                    )}
                    <button 
                        onClick={() => setHintIndex(prev => (prev + 1) % hints.length)}
                        className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors"
                    >
                        <Lightbulb className="w-4 h-4" />
                        {hintIndex === -1 ? "Get a Hint" : "Next Hint"}
                    </button>
                </div>
                </div>
            </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-orange-500/50 transition-colors cursor-col-resize" />

            <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
                <Panel defaultSize={70} minSize={20}>
                <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center px-6 py-2 border-b border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                        <button className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                            {LANGUAGES.find(l => l.id === language)?.name}
                            <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-40 glass-darker p-2 rounded-xl shadow-2xl hidden group-hover:block z-50">
                            {LANGUAGES.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setLanguage(lang.id)}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
                            >
                                {lang.name}
                            </button>
                            ))}
                        </div>
                        </div>

                        <div className="relative group border-l border-white/5 pl-6">
                        <button className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                            <Palette className="w-4 h-4" />
                            Theme
                        </button>
                        <div className="absolute top-full left-6 mt-2 w-40 glass-darker p-2 rounded-xl shadow-2xl hidden group-hover:block z-50">
                            {THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
                            >
                                {t.name}
                            </button>
                            ))}
                        </div>
                        </div>
                    </div>
                    <Settings className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-zinc-300 transition-colors" />
                    </div>

                    <div className="flex-1 bg-zinc-950">
                    <Editor
                        height="100%"
                        language={language}
                        theme={theme}
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 24 },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        fontFamily: "var(--font-geist-mono)",
                        lineNumbers: "on",
                        renderLineHighlight: "all",
                        }}
                    />
                    </div>
                </div>
                </Panel>

                {showConsole && (
                <>
                    <PanelResizeHandle className="h-1 bg-zinc-800 hover:bg-orange-500/50 transition-colors cursor-row-resize" />
                    <Panel defaultSize={30} minSize={10}>
                    <div className="h-full bg-zinc-900 border-t border-zinc-800 flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-3 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                            <Terminal className="w-4 h-4 text-orange-500" />
                            Console
                        </div>
                        <button onClick={() => setShowConsole(false)} className="text-zinc-600 hover:text-zinc-300 text-xs font-semibold">Hide</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 font-mono text-sm text-zinc-300 custom-scrollbar">
                        {isRunning ? (
                            <div className="flex items-center gap-3 text-zinc-500 font-medium">
                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                            Executing Test Pipeline...
                            </div>
                        ) : results ? (
                            <div className="space-y-6">
                            <div className="flex items-center gap-2 font-bold text-xs">
                                {results.allPassed ? (
                                <span className="text-emerald-500 flex items-center gap-2 tracking-tight">
                                    <CheckCircle2 className="w-4 h-4" /> Accepted
                                </span>
                                ) : (
                                <span className="text-rose-500 flex items-center gap-2 tracking-tight">
                                    <XCircle className="w-4 h-4" /> Runtime Error
                                </span>
                                )}
                            </div>
                            {results.results && results.results.map((res: any, i: number) => (
                                <div key={i} className={`p-6 rounded-[24px] border transition-all ${res.passed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-rose-500/5 border-rose-500/10"}`}>
                                <div className="flex justify-between mb-4 text-xs font-bold">
                                    <span className={res.passed ? "text-emerald-500" : "text-rose-500"}>Test Case {i + 1}</span>
                                    {res.runtime && <span className="text-zinc-600">{res.runtime}ms</span>}
                                </div>
                                {res.input && (
                                    <div className="grid grid-cols-2 gap-6 text-xs font-mono">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Input</p>
                                            <pre className="bg-black/40 p-3 rounded-xl text-zinc-400 border border-white/5 overflow-x-auto">{JSON.stringify(res.input)}</pre>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Expected</p>
                                            <pre className="bg-black/40 p-3 rounded-xl text-zinc-400 border border-white/5 overflow-x-auto">{JSON.stringify(res.expected)}</pre>
                                        </div>
                                    </div>
                                )}
                                {res.message && <p className="text-zinc-500 text-xs italic font-medium">{res.message}</p>}
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className="text-zinc-700 font-medium h-full flex items-center justify-center italic">Ready for execution.</div>
                        )}
                        </div>
                    </div>
                    </Panel>
                </>
                )}
            </PanelGroup>
            </Panel>
        </PanelGroup>

        {/* Mobile View Content */}
        <div className="lg:hidden h-full flex flex-col">
            {mobileView === "description" ? (
                <div className="flex-1 overflow-y-auto p-6 md:p-10 prose prose-invert max-w-none custom-scrollbar">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight m-0">{problem.title}</h2>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Easy</span>
                    </div>
                    <ReactMarkdown>{problem.description}</ReactMarkdown>

                    <div className="mt-12 space-y-4 pt-12 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            Rank-up Assistant
                        </div>
                        {hintIndex >= 0 && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-6 rounded-[24px] bg-orange-500/5 border border-orange-500/10 text-zinc-300 text-sm font-medium leading-relaxed"
                            >
                                {hints[hintIndex]}
                            </motion.div>
                        )}
                        <button 
                            onClick={() => setHintIndex(prev => (prev + 1) % hints.length)}
                            className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors"
                        >
                            <Lightbulb className="w-4 h-4" />
                            {hintIndex === -1 ? "Get a Hint" : "Next Hint"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 min-h-0 bg-zinc-950">
                        <Editor
                            height="100%"
                            language={language}
                            theme={theme}
                            value={code}
                            onChange={(val) => setCode(val || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                fontFamily: "var(--font-geist-mono)",
                                lineNumbers: "on",
                            }}
                        />
                    </div>
                    {showConsole && (
                        <div className="h-1/2 bg-zinc-900 border-t border-zinc-800 flex flex-col overflow-hidden">
                             <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <Terminal className="w-3.5 h-3.5 text-orange-500" />
                                    Console
                                </div>
                                <button onClick={() => setShowConsole(false)} className="text-zinc-600 hover:text-zinc-300 text-[10px] font-bold uppercase tracking-widest">Hide</button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-zinc-300 custom-scrollbar">
                                {isRunning ? (
                                    <div className="flex items-center gap-3 text-zinc-500 font-medium">
                                        <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                        Running tests...
                                    </div>
                                ) : results ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 font-bold text-xs">
                                            {results.allPassed ? (
                                                <span className="text-emerald-500 flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Accepted
                                                </span>
                                            ) : (
                                                <span className="text-rose-500 flex items-center gap-2">
                                                    <XCircle className="w-4 h-4" /> Error
                                                </span>
                                            )}
                                        </div>
                                        {results.results && results.results.map((res: any, i: number) => (
                                            <div key={i} className={`p-4 rounded-2xl border ${res.passed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-rose-500/5 border-rose-500/10"}`}>
                                                <div className="flex justify-between mb-2 text-[10px] font-bold">
                                                    <span className={res.passed ? "text-emerald-500" : "text-rose-500"}>Case {i + 1}</span>
                                                    {res.runtime && <span className="text-zinc-600">{res.runtime}ms</span>}
                                                </div>
                                                {res.message && <p className="text-zinc-500 text-[11px] italic font-medium">{res.message}</p>}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-zinc-700 font-medium h-full flex items-center justify-center italic text-xs">Ready.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900 p-3 md:p-4 px-4 md:px-6 flex justify-between items-center z-10 shadow-2xl relative shrink-0">
        <button onClick={() => {
            setShowConsole(!showConsole);
            if (!showConsole) setMobileView("code");
        }} className="px-3 md:px-4 py-2 text-zinc-500 hover:text-white text-[11px] md:text-xs font-semibold flex items-center gap-2 transition-all group">
          <Terminal className="w-4 h-4 group-hover:text-orange-500 transition-colors" /> <span className="hidden xs:inline">Console</span>
        </button>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => handleExecute(false)} 
            disabled={isRunning} 
            className="px-6 md:px-8 py-2 md:py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[11px] md:text-xs font-semibold border border-white/5 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
          >
            {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500" /> : <Play className="w-3.5 h-3.5 text-orange-500 fill-current" />} Run
          </button>
          <button 
            onClick={() => handleExecute(true)} 
            disabled={isRunning}
            className="px-8 md:px-10 py-2 md:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[11px] md:text-xs font-semibold shadow-2xl shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;