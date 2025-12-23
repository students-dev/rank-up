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

      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full flex flex-col bg-zinc-900/50 border-r border-zinc-800">
            <div className="flex gap-4 px-6 border-b border-zinc-800 bg-zinc-900">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-600 hover:text-zinc-300"
                }`}
              >
                Problem
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`py-4 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-colors ${
                  activeTab === "submissions"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-600 hover:text-zinc-300"
                }`}
              >
                History
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-strong:text-zinc-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-white tracking-tighter m-0">{problem.title}</h2>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">Easy</span>
              </div>
              <ReactMarkdown>{problem.description}</ReactMarkdown>

              <div className="mt-12 space-y-4 pt-12 border-t border-white/5 font-sans">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    Rank-up Assistant
                </div>
                {hintIndex >= 0 && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-6 rounded-[24px] bg-orange-500/5 border border-orange-500/10 text-zinc-300 text-sm font-medium leading-relaxed shadow-inner"
                    >
                        {hints[hintIndex]}
                    </motion.div>
                )}
                <button 
                    onClick={() => setHintIndex(prev => (prev + 1) % hints.length)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors"
                >
                    <Lightbulb className="w-3.5 h-3.5" />
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
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                        {LANGUAGES.find(l => l.id === language)?.name}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-40 glass-darker p-2 rounded-xl shadow-2xl hidden group-hover:block z-50">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => setLanguage(lang.id)}
                            className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative group border-l border-white/5 pl-6">
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                        <Palette className="w-3.5 h-3.5" />
                        Theme
                      </button>
                      <div className="absolute top-full left-6 mt-2 w-40 glass-darker p-2 rounded-xl shadow-2xl hidden group-hover:block z-50">
                        {THEMES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
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
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <Terminal className="w-3.5 h-3.5 text-orange-500" />
                        Console
                      </div>
                      <button onClick={() => setShowConsole(false)} className="text-zinc-600 hover:text-zinc-300 text-[10px] font-black uppercase tracking-widest transition-colors">Hide</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm text-zinc-300">
                      {isRunning ? (
                        <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
                          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                          Executing Test Pipeline...
                        </div>
                      ) : results ? (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2">
                            {results.allPassed ? (
                              <span className="text-emerald-500 flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em]">
                                <CheckCircle2 className="w-4 h-4 shadow-emerald-500/20" /> Accepted
                              </span>
                            ) : (
                              <span className="text-rose-500 flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em]">
                                <XCircle className="w-4 h-4" /> Runtime Error
                              </span>
                            )}
                          </div>
                          {results.results && results.results.map((res: any, i: number) => (
                            <div key={i} className={`p-6 rounded-[24px] border transition-all ${res.passed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-rose-500/5 border-rose-500/10"}`}>
                              <div className="flex justify-between mb-4 text-[10px] font-black uppercase tracking-widest">
                                <span className={res.passed ? "text-emerald-500" : "text-rose-500"}>Test Case {i + 1}</span>
                                {res.runtime && <span className="text-zinc-600">{res.runtime}ms</span>}
                              </div>
                              {res.input && (
                                <div className="grid grid-cols-2 gap-6 text-xs font-bold font-mono">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase text-zinc-600 tracking-widest">Input</p>
                                        <pre className="bg-black/40 p-3 rounded-xl text-zinc-400 border border-white/5 overflow-x-auto">{JSON.stringify(res.input)}</pre>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase text-zinc-600 tracking-widest">Expected</p>
                                        <pre className="bg-black/40 p-3 rounded-xl text-zinc-400 border border-white/5 overflow-x-auto">{JSON.stringify(res.expected)}</pre>
                                    </div>
                                </div>
                              )}
                              {res.message && <p className="text-zinc-500 text-xs italic font-medium">{res.message}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-zinc-700 font-bold uppercase text-[10px] tracking-widest italic opacity-50 flex items-center justify-center h-full">Ready for execution.</div>
                      )}
                    </div>
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>

      <div className="border-t border-zinc-800 bg-zinc-900 p-4 px-6 flex justify-between items-center z-10 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <button onClick={() => setShowConsole(!showConsole)} className="px-4 py-2 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 transition-all group font-sans">
          <Terminal className="w-4 h-4 group-hover:text-orange-500 transition-colors" /> Console
        </button>
        <div className="flex gap-4">
          <button 
            onClick={() => handleExecute(false)} 
            disabled={isRunning} 
            className="px-8 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-[14px] text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95 shadow-xl font-sans"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : <Play className="w-4 h-4 text-orange-500 fill-current" />} Run
          </button>
          <button 
            onClick={() => handleExecute(true)} 
            disabled={isRunning}
            className="px-10 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-[14px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95 font-sans"
          >
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
