"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";

interface LearnCardProps {
  title: string;
  icon?: LucideIcon;
  iconEmoji?: string;
  color?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
}

/**
 * Container card for lesson sections with optional collapsibility.
 * Used to structure content in Learn page lessons.
 */
export function LearnCard({
  title,
  icon: Icon,
  iconEmoji,
  color = "from-blue-500 to-indigo-500",
  children,
  defaultOpen = true,
  collapsible = false,
}: LearnCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden mb-6">
      {/* Header */}
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        disabled={!collapsible}
        className={`w-full p-4 flex items-center gap-3 ${collapsible ? "cursor-pointer hover:bg-[var(--bg-tertiary)]" : "cursor-default"
          } transition-colors`}
      >
        {/* Icon */}
        {(Icon || iconEmoji) && (
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
          >
            {Icon ? (
              <Icon className="w-5 h-5 text-white" />
            ) : (
              <span className="text-xl">{iconEmoji}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--text-primary)] flex-1 text-left">
          {title}
        </h3>

        {/* Collapse indicator */}
        {collapsible && (
          <ChevronDown
            className={`w-5 h-5 text-[var(--text-tertiary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 pb-4 border-t border-[var(--border-primary)] pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
