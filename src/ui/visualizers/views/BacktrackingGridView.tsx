"use client";

import { BacktrackingData } from "@/core/events/events";

interface BacktrackingGridViewProps {
  backtrackingData: BacktrackingData;
}

export function BacktrackingGridView({ backtrackingData }: BacktrackingGridViewProps) {
  const { grid, rows, cols, currentCell, message } = backtrackingData;

  // Dynamic grid style
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
    gap: '4px',
    maxWidth: '100%',
    width: 'fit-content',
    margin: '0 auto'
  };

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">Backtracking Grid</h3>
        <div className="text-sm text-[var(--text-secondary)]">{message || "Processing..."}</div>
      </div>

      <div style={gridStyle} className="p-2 bg-[var(--bg-card)] rounded-lg border border-[var(--border-secondary)]">
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            // Determine cell styling based on status
            const isCurrent = currentCell && currentCell.row === rIdx && currentCell.col === cIdx;

            let bgClass = "bg-[var(--bg-secondary)]";
            let textClass = "text-[var(--text-primary)]";
            let borderClass = "border-[var(--border-primary)]";

            if (isCurrent) {
              borderClass = "border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-500)] z-10";
            } else if (cell.status === 'placed') {
              bgClass = "bg-[var(--color-accent-compare)]/20";
              textClass = "text-[var(--color-accent-compare)]";
              borderClass = "border-[var(--color-accent-compare)]";
            } else if (cell.status === 'solution') {
              bgClass = "bg-[var(--color-accent-sorted)]/20";
              textClass = "text-[var(--color-accent-sorted)]";
              borderClass = "border-[var(--color-accent-sorted)]";
            } else if (cell.status === 'conflict') {
              bgClass = "bg-red-500/20";
              textClass = "text-red-500";
              borderClass = "border-red-500";
            } else if (cell.status === 'blocked') {
              bgClass = "bg-[var(--text-disabled)]";
              borderClass = "border-transparent";
            } else if (cell.status === 'visited') {
              bgClass = "bg-[var(--color-primary-500)]/10";
              textClass = "text-[var(--text-secondary)]";
            }

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg rounded-md
                  transition-all duration-300 border-2
                  ${bgClass} ${textClass} ${borderClass}
                `}
              >
                {cell.value}
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-accent-compare)]/20 border border-[var(--color-accent-compare)]" />
          <span>Placed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-accent-sorted)]/20 border border-[var(--color-accent-sorted)]" />
          <span>Solution</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500" />
          <span>Conflict</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border-2 border-[var(--color-primary-500)]" />
          <span>Current</span>
        </div>
      </div>
    </div>
  );
}
