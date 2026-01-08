"use client";

interface AlgorithmInfo {
  id: string;
  name: string;
  description: string;
  howItWorks: string;
  example?: string; // Optional step-by-step example
  keyInsight: string;
  bestFor: string[];
  avoidWhen: string[];
  funFact: string;
  optimizationTips: string[];
  tags: string[];
}

interface AlgorithmInfoCardProps {
  info: AlgorithmInfo;
}

export function AlgorithmInfoCard({ info }: AlgorithmInfoCardProps) {
  return (
    <div className="space-y-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          About {info.name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {info.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-primary-500)]/20 text-[var(--color-primary-400)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)]">{info.description}</p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* How It Works */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-[var(--color-primary-400)] flex items-center gap-1">
            <span>⚙️</span> How It Works
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">{info.howItWorks}</p>
        </div>

        {/* Key Insight */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-[var(--color-secondary-400)] flex items-center gap-1">
            <span>💡</span> Key Insight
          </h4>
          <p className="text-sm text-[var(--text-secondary)] italic">&quot;{info.keyInsight}&quot;</p>
        </div>
      </div>

      {/* Example (optional) */}
      {info.example && (
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)]">
          <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-1">
            <span>📝</span> Example Walkthrough
          </h4>
          <pre className="text-xs text-[var(--text-secondary)] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {info.example}
          </pre>
        </div>
      )}

      {/* Best For / Avoid When */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <h4 className="text-sm font-medium text-green-400 mb-2">✓ Best For</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            {info.bestFor.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-green-400">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <h4 className="text-sm font-medium text-red-400 mb-2">✗ Avoid When</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            {info.avoidWhen.map((item, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-red-400">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optimization Tips */}
      {info.optimizationTips.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
          <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">🚀 Optimization Tips</h4>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            {info.optimizationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-[var(--color-primary-400)]">{i + 1}.</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fun Fact */}
      <div className="p-3 rounded-lg bg-[var(--color-secondary-500)]/10 border border-[var(--color-secondary-500)]/20">
        <p className="text-sm text-[var(--text-secondary)]">
          <span className="text-[var(--color-secondary-400)] font-medium">🎯 Did you know? </span>
          {info.funFact}
        </p>
      </div>
    </div>
  );
}

// Export the AlgorithmInfo type for use in algorithm definitions
export type { AlgorithmInfo };
