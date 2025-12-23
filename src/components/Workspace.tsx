"use client";

import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { Play, Send, Settings, Terminal, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface WorkspaceProps {
  problem: {
    title: string;
    description: string;
    starterCode: string;
    slug: string;
  };
}

const Workspace = ({ problem }: WorkspaceProps) => {
  const [code, setCode] = useState(problem.starterCode);
  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showConsole, setShowConsole] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setShowConsole(true);
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: "javascript",
          problemSlug: problem.slug,
        }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Execution error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-zinc-950 flex flex-col font-sans">
      <PanelGroup direction="horizontal">
        {/* Left Panel: Problem Description */}
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full flex flex-col bg-zinc-900/50 border-r border-zinc-800">
            <div className="flex gap-4 px-4 border-b border-zinc-800 bg-zinc-900">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "submissions"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Submissions
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
              <ReactMarkdown>{problem.description}</ReactMarkdown>
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-zinc-800 hover:bg-orange-500/50 transition-colors cursor-col-resize" />

        {/* Right Panel: Code Editor & Console */}
        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={70} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center px-4 py-2 border-b border-zinc-800 bg-zinc-900">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="bg-zinc-800 px-2 py-1 rounded border border-zinc-700 font-mono text-[10px]">index.js</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">JavaScript</span>
                  </div>
                  <Settings className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-300" />
                </div>

                <div className="flex-1 bg-zinc-950">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
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
                      lineNumbers: "on",
                      glyphMargin: false,
                      folding: true,
                      lineDecorationsWidth: 10,
                      lineNumbersMinChars: 3,
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
                      <button 
                        onClick={() => setShowConsole(false)}
                        className="text-zinc-500 hover:text-zinc-300 text-xs font-bold"
                      >
                        Hide
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
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
                                <CheckCircle2 className="w-4 h-4" /> All Test Cases Passed!
                              </span>
                            ) : (
                              <span className="text-rose-500 flex items-center gap-1.5 font-black uppercase text-xs tracking-widest">
                                <XCircle className="w-4 h-4" /> Some Test Cases Failed
                              </span>
                            )}
                          </div>
                          {results.results.map((res: any, i: number) => (
                            <div key={i} className={`p-4 rounded-xl border ${res.passed ? "bg-emerald-500/5 border-emerald-500/10" : "bg-rose-500/5 border-rose-500/10"}`}>
                              <div className="flex justify-between mb-3">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${res.passed ? "text-emerald-500" : "text-rose-500"}`}>
                                  Case {i + 1}: {res.passed ? "Passed" : "Failed"}
                                </span>
                                {res.runtime && <span className="text-zinc-600 text-[10px] font-bold">{res.runtime}ms</span>}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-widest mb-1.5">Input</p>
                                  <pre className="bg-black/40 p-2.5 rounded-lg text-zinc-400 overflow-x-auto border border-zinc-800/50">
                                    {JSON.stringify(res.input)}
                                  </pre>
                                </div>
                                <div>
                                  <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-widest mb-1.5">Expected</p>
                                  <pre className="bg-black/40 p-2.5 rounded-lg text-zinc-400 overflow-x-auto border border-zinc-800/50">
                                    {JSON.stringify(res.expected)}
                                  </pre>
                                </div>
                              </div>
                              {!res.passed && res.actual !== undefined && (
                                <div className="mt-3">
                                  <p className="text-rose-500/50 font-bold uppercase text-[9px] tracking-widest mb-1.5">Actual Output</p>
                                  <pre className="bg-rose-500/10 p-2.5 rounded-lg text-rose-200 overflow-x-auto text-xs border border-rose-500/20">
                                    {JSON.stringify(res.actual)}
                                  </pre>
                                </div>
                              )}
                              {res.error && (
                                <div className="mt-3 p-3 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400 text-xs font-medium">
                                  {res.error}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-zinc-700 font-medium italic">Click "Run" to execute your code against test cases.</div>
                      )}
                    </div>
                  </div>
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>

      {/* Editor Footer */}
      <div className="border-t border-zinc-800 bg-zinc-900 p-3 flex justify-between items-center z-10 shadow-2xl">
        <button 
          onClick={() => setShowConsole(!showConsole)}
          className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Terminal className="w-4 h-4" />
          Console
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all text-xs font-bold uppercase tracking-widest border border-zinc-700 disabled:opacity-50 active:scale-95"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : <Play className="w-4 h-4" />}
            Run
          </button>
          <button className="flex items-center gap-2 px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95">
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
