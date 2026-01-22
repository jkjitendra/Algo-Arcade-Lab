import { ReactNode } from "react";

interface StaticDiagramProps {
  children: ReactNode;
  caption?: string;
}

/**
 * Container for static SVG diagrams with optional caption.
 * Used for annotated algorithm step visualizations (non-animated).
 */
export function StaticDiagram({ children, caption }: StaticDiagramProps) {
  return (
    <div className="mb-6">
      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] p-4 overflow-x-auto">
        <div className="min-w-fit flex items-center justify-center">
          {children}
        </div>
      </div>
      {caption && (
        <p className="text-center text-sm text-[var(--text-tertiary)] mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
}

// Pre-built diagram components for common algorithm visualizations

interface ArrayDiagramProps {
  values: (number | string)[];
  highlights?: number[];
  pointers?: { index: number; label: string; color?: string }[];
  swapIndices?: [number, number];
}

/**
 * Static array visualization with optional highlights and pointers.
 */
export function ArrayDiagram({
  values,
  highlights = [],
  pointers = [],
  swapIndices,
}: ArrayDiagramProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Swap arrows */}
      {swapIndices && (
        <div className="flex items-center gap-1">
          {values.map((_, i) => (
            <div key={i} className="w-12 h-6 flex items-center justify-center">
              {i === swapIndices[0] && (
                <span className="text-[var(--color-primary-400)] text-xl">↔</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Array boxes */}
      <div className="flex items-center gap-1">
        {values.map((val, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-lg border-2 transition-colors ${highlights.includes(i)
                ? "bg-[var(--color-primary-500)] text-white border-[var(--color-primary-500)]"
                : swapIndices?.includes(i)
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500"
                  : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-primary)]"
              }`}
          >
            {val}
          </div>
        ))}
      </div>

      {/* Index labels */}
      <div className="flex items-center gap-1">
        {values.map((_, i) => (
          <div
            key={i}
            className="w-12 h-5 flex items-center justify-center text-xs text-[var(--text-tertiary)]"
          >
            [{i}]
          </div>
        ))}
      </div>

      {/* Pointers */}
      {pointers.length > 0 && (
        <div className="flex items-center gap-1 mt-1">
          {values.map((_, i) => {
            const pointer = pointers.find((p) => p.index === i);
            return (
              <div
                key={i}
                className="w-12 flex flex-col items-center"
              >
                {pointer && (
                  <>
                    <span className={`text-lg ${pointer.color || "text-[var(--color-primary-400)]"}`}>
                      ↑
                    </span>
                    <span
                      className={`text-xs font-medium ${pointer.color || "text-[var(--color-primary-400)]"
                        }`}
                    >
                      {pointer.label}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
