"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ExampleBoxProps {
  number: number;
  title: string;
  input: string;
  output?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Numbered example container with input/output display and walkthrough content.
 * Used to showcase multiple examples in Learn page lessons.
 */
export function ExampleBox({
  number,
  title,
  input,
  output,
  children,
  defaultOpen = true,
}: ExampleBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden mb-4">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center gap-3 hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
      >
        {/* Number badge */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">{number}</span>
        </div>

        {/* Title */}
        <div className="flex-1 text-left">
          <h4 className="font-medium text-[var(--text-primary)]">{title}</h4>
        </div>

        {/* Collapse indicator */}
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-tertiary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-[var(--border-primary)]">
          {/* Input/Output display */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                Input
              </span>
              <code className="block mt-1 text-[var(--text-primary)] font-mono text-sm">
                {input}
              </code>
            </div>
            {output && (
              <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Output
                </span>
                <code className="block mt-1 text-[var(--color-primary-400)] font-mono text-sm">
                  {output}
                </code>
              </div>
            )}
          </div>

          {/* Walkthrough content */}
          <div className="mt-4">{children}</div>
        </div>
      )}
    </div>
  );
}
