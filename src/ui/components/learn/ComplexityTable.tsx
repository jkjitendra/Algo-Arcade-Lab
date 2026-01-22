import { Check, X } from "lucide-react";

interface ComplexityRow {
  case: string;
  time: string;
  description?: string;
}

interface ComplexityTableProps {
  timeComplexity: ComplexityRow[];
  spaceComplexity: string;
  spaceDescription?: string;
  isStable?: boolean;
  isInPlace?: boolean;
}

/**
 * Visual complexity analysis table for algorithm lessons.
 * Shows time complexity for all cases, space complexity, and algorithm properties.
 */
export function ComplexityTable({
  timeComplexity,
  spaceComplexity,
  spaceDescription,
  isStable,
  isInPlace,
}: ComplexityTableProps) {
  return (
    <div className="rounded-xl border border-[var(--border-primary)] overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-[var(--bg-tertiary)] px-4 py-3 border-b border-[var(--border-primary)]">
        <h4 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="text-lg">⏱️</span>
          Complexity Analysis
        </h4>
      </div>

      {/* Time Complexity */}
      <div className="p-4 border-b border-[var(--border-primary)]">
        <h5 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          Time Complexity
        </h5>
        <div className="space-y-2">
          {timeComplexity.map((row) => (
            <div
              key={row.case}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-[var(--bg-tertiary)]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${row.case.toLowerCase().includes("best")
                      ? "bg-green-500"
                      : row.case.toLowerCase().includes("worst")
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                />
                <span className="text-[var(--text-secondary)]">{row.case}</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--color-primary-400)] font-mono text-sm">
                  {row.time}
                </code>
                {row.description && (
                  <span className="text-xs text-[var(--text-tertiary)] hidden sm:inline">
                    {row.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Space Complexity */}
      <div className="p-4 border-b border-[var(--border-primary)]">
        <h5 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
          Space Complexity
        </h5>
        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-[var(--bg-tertiary)]">
          <span className="text-[var(--text-secondary)]">Auxiliary Space</span>
          <div className="flex items-center gap-3">
            <code className="px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--color-primary-400)] font-mono text-sm">
              {spaceComplexity}
            </code>
            {spaceDescription && (
              <span className="text-xs text-[var(--text-tertiary)] hidden sm:inline">
                {spaceDescription}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Properties */}
      {(isStable !== undefined || isInPlace !== undefined) && (
        <div className="p-4">
          <h5 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
            Properties
          </h5>
          <div className="flex flex-wrap gap-3">
            {isStable !== undefined && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isStable
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}
              >
                {isStable ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Stable
              </div>
            )}
            {isInPlace !== undefined && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isInPlace
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}
              >
                {isInPlace ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                In-Place
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
