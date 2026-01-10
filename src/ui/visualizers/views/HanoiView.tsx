"use client";

import { HanoiData } from "@/core/events/events";

interface HanoiViewProps {
  hanoiData: HanoiData;
}

export function HanoiView({ hanoiData }: HanoiViewProps) {
  const { pegs, moveCount, message } = hanoiData;

  const pegHeight = 200;
  const baseWidth = 200;
  const pegWidth = 10;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <h3 className="font-semibold text-[var(--text-primary)]">Tower of Hanoi</h3>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-mono text-[var(--text-secondary)]">Moves: <span className="text-[var(--text-primary)] font-bold">{moveCount}</span></span>
          <span className="text-xs text-[var(--text-tertiary)] break-words max-w-[200px] text-right">{message}</span>
        </div>
      </div>

      <div className="flex justify-around items-end w-full max-w-3xl gap-8 px-8 py-4 relative" style={{ height: pegHeight + 40 }}>
        {/* Render 3 Pegs */}
        {[0, 1, 2].map((pegIndex) => (
          <div key={pegIndex} className="relative flex flex-col items-center justify-end h-full flex-1">
            {/* Peg Pole */}
            <div
              className="absolute w-3 bg-[var(--text-disabled)] rounded-t-full"
              style={{ bottom: 0, height: pegHeight, width: pegWidth, zIndex: 0 }}
            />

            {/* Base Label */}
            <div className="absolute -bottom-8 font-mono text-sm text-[var(--text-secondary)] font-bold">
              {pegIndex === 0 ? 'SOURCE' : pegIndex === 1 ? 'AUX' : 'DEST'}
            </div>

            {/* Disks */}
            <div className="flex flex-col-reverse items-center justify-end w-full relative z-10 mb-1">
              {pegs[pegIndex].map((disk, diskIndex) => (
                <div
                  key={`${pegIndex}-${diskIndex}-${disk.size}`}
                  className="h-6 rounded-md shadow-sm border border-black/20 transition-all duration-300 transform"
                  style={{
                    width: `${Math.min(100, 30 + disk.size * 15)}%`,
                    backgroundColor: disk.color,
                    marginBottom: '2px', // slight gap
                  }}
                >
                  <span className="sr-only">Disk {disk.size}</span>
                </div>
              ))}
            </div>

            {/* Base Plate */}
            <div className="w-full h-2 bg-[var(--border-primary)] rounded-full mt-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
