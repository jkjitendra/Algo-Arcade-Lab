"use client";

import { useState } from "react";

interface CodeTabsProps {
  javascript?: string;
  python?: string;
  java?: string;
  cpp?: string;
  go?: string;
}

type Language = "javascript" | "python" | "java" | "cpp" | "go";

const languageLabels: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
  go: "Go",
};

const languageColors: Record<Language, string> = {
  javascript: "bg-yellow-500/20 text-yellow-400",
  python: "bg-blue-500/20 text-blue-400",
  java: "bg-orange-500/20 text-orange-400",
  cpp: "bg-purple-500/20 text-purple-400",
  go: "bg-cyan-500/20 text-cyan-400",
};

/**
 * Tabbed code display component with syntax highlighting.
 * Shows code in multiple programming languages with easy switching.
 */
export function CodeTabs({ javascript, python, java, cpp, go }: CodeTabsProps) {
  const availableLanguages = Object.entries({ javascript, python, java, cpp, go })
    .filter(([, code]) => code)
    .map(([lang]) => lang as Language);

  const [activeTab, setActiveTab] = useState<Language>(availableLanguages[0] || "javascript");

  const codeMap: Record<Language, string | undefined> = {
    javascript,
    python,
    java,
    cpp,
    go,
  };

  if (availableLanguages.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[var(--border-primary)] overflow-hidden mb-6">
      {/* Tabs */}
      <div className="flex overflow-x-auto bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)]">
        {availableLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === lang
                ? "bg-[var(--bg-card)] text-[var(--text-primary)] border-b-2 border-[var(--color-primary-500)]"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
          >
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${languageColors[lang]}`}
            >
              {languageLabels[lang]}
            </span>
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="p-4 bg-[var(--bg-card)]">
        <pre className="overflow-x-auto">
          <code className="text-sm font-mono text-[var(--text-secondary)] leading-relaxed whitespace-pre">
            {codeMap[activeTab]}
          </code>
        </pre>
      </div>
    </div>
  );
}
