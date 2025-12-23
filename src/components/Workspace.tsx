"use client";

import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { Play, Send, Settings, Terminal, CheckCircle2, XCircle, Loader2, ChevronDown, History } from "lucide-react";
import confetti from "canvas-confetti";

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

const Workspace = ({ problem }: WorkspaceProps) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(problem.starterCode);
  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showConsole, setShowConsole] = useState(false);

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
      }
    } catch (error) {
      console.error("Execution error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-zinc-950 flex flex-col font-sans">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full flex flex-col bg-zinc-900/50 border-r border-zinc-800">
            <div className="flex gap-4 px-4 border-b border-zinc-800 bg-zinc-900">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-3 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`py-3 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 transition-colors ${
                  activeTab === "submissions"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-2">
                    <History className="w-3 h-3" />
                    Submissions
                </div>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-strong:text-zinc-200">
              <h2 className="text-2xl font-bold mb-4 tracking-tight">{problem.title}</h2>
              <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-orange-500/50 transition-colors cursor-col-resize" />

        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800 bg-zinc-900">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <button className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:bg-zinc-700 transition-colors">
                        {LANGUAGES.find(l => l.id === language)?.name}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute top-full left-0 mt-1 w-40 bg-zinc-900 border border-white/5 rounded-xl shadow-2xl hidden group-hover:block z-50 overflow-hidden">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => setLanguage(lang.id)}
                            className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Settings className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                </div>

                <div className="flex-1 bg-zinc-950">
                  <Editor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 20 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  />
                </div>
              </div>
            </Panel>

            {showConsole && (
              <>
                <PanelResizeHandle className="h-1 bg-zinc-800 hover:bg-orange-500/50 transition-colors cursor-row-resize" />
                <Panel defaultSize={30} minSize={10}>
                  <div className="h-full bg-zinc-900 border-t border-zinc-800 flex flex-col">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                        Console Output
                      </div>
                      <button onClick={() => setShowConsole(false)} className="text-zinc-500 hover:text-zinc-300 text-xs font-bold">Hide</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-zinc-300">
                      {isRunning ? (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                          Running test cases...
                        </div>
                      ) : results ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            {results.allPassed ? (
                              <span className="text-emerald-500 flex items-center gap-1.5 font-black uppercase text-xs tracking-widest">
                                <CheckCircle2 className="w-4 h-4" /> Passed!
                              </span>
                            ) : (
                              <span className="text-rose-500 flex items-center gap-1.5 font-black uppercase text-xs tracking-widest">
                                <XCircle className="w-4 h-4" /> Failed
                              </span>
                            )}
                          </div>
                          {results.results && results.results.map((res: any, i: number) => (
                            <div key={i} className={`p-4 rounded-xl border ${res.passed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-rose-500/5 border-rose-500/10"}`}>
                              <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                                <span className={res.passed ? "text-emerald-500" : "text-rose-500"}>Case {i + 1}: {res.passed ? "Passed" : "Failed"}</span>
                                {res.runtime && <span className="text-zinc-600">{res.runtime}ms</span>}
                              </div>
                              {res.input && (
                                <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                                    <pre className="bg-black/40 p-2.5 rounded-lg text-zinc-400 border border-white/5">{JSON.stringify(res.input)}</pre>
                                    <pre className="bg-black/40 p-2.5 rounded-lg text-zinc-400 border border-white/5">{JSON.stringify(res.expected)}</pre>
                                </div>
                              )}
                              {res.message && <p className="text-zinc-500 text-xs italic">{res.message}</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-zinc-700 font-medium italic">Click "Run" to test or "Submit" to record progress.</div>
                      )}
                    </div>
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>

      <div className="border-t border-zinc-800 bg-zinc-900 p-3 flex justify-between items-center z-10 shadow-2xl">
        <button onClick={() => setShowConsole(!showConsole)} className="px-4 py-2 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Console
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => handleExecute(false)} 
            disabled={isRunning} 
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : <Play className="w-4 h-4 text-orange-500 fill-current" />} Run
          </button>
          <button 
            onClick={() => handleExecute(true)} 
            disabled={isRunning}
            className="px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
