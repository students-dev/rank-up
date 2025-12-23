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
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-zinc-950 flex flex-col">
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
                    <span className="bg-zinc-800 px-2 py-1 rounded border border-zinc-700 font-mono">index.js</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-500">JavaScript</span>
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
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                        Console Output
                      </div>
                      <button 
                        onClick={() => setShowConsole(false)}
                        className="text-zinc-500 hover:text-zinc-300 text-xs"
                      >
                        Hide
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                      {isRunning ? (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Running test cases...
                        </div>
                      ) : results ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            {results.allPassed ? (
                              <span className="text-emerald-500 flex items-center gap-1.5 font-bold">
                                <CheckCircle2 className="w-4 h-4" /> All Test Cases Passed!
                              </span>
                            ) : (
                              <span className="text-rose-500 flex items-center gap-1.5 font-bold">
                                <XCircle className="w-4 h-4" /> Some Test Cases Failed
                              </span>
                            )}
                          </div>
                          {results.results.map((res: any, i: number) => (
                            <div key={i} className={`p-3 rounded-lg border ${res.passed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}>
                              <div className="flex justify-between mb-2">
                                <span className={`text-xs font-bold uppercase ${res.passed ? "text-emerald-500" : "text-rose-500"}`}>
                                  Case {i + 1}: {res.passed ? "Passed" : "Failed"}
                                </span>
                                {res.runtime && <span className="text-zinc-500 text-xs">{res.runtime}ms</span>}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <p className="text-zinc-500 mb-1">Input:</p>
                                  <pre className="bg-black/30 p-2 rounded text-zinc-300 overflow-x-auto">
                                    {JSON.stringify(res.input)}
                                  </pre>
                                </div>
                                <div>
                                  <p className="text-zinc-500 mb-1">Expected:</p>
                                  <pre className="bg-black/30 p-2 rounded text-zinc-300 overflow-x-auto">
                                    {JSON.stringify(res.expected)}
                                  </pre>
                                </div>
                              </div>
                              {!res.passed && res.actual !== undefined && (
                                <div className="mt-2">
                                  <p className="text-zinc-500 mb-1 text-xs">Actual:</p>
                                  <pre className="bg-rose-500/10 p-2 rounded text-rose-200 overflow-x-auto text-xs">
                                    {JSON.stringify(res.actual)}
                                  </pre>
                                </div>
                              )}
                              {res.error && (
                                <div className="mt-2 p-2 bg-rose-500/10 rounded border border-rose-500/20 text-rose-400 text-xs">
                                  {res.error}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-zinc-600">Click "Run" to execute your code against test cases.</div>
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
      <div className="border-t border-zinc-800 bg-zinc-900 p-3 flex justify-between items-center z-10">
        <button 
          onClick={() => setShowConsole(!showConsole)}
          className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors text-sm font-medium"
        >
          <Terminal className="w-4 h-4" />
          Console
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium border border-zinc-700 disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Run
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm font-medium">
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;