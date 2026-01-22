import { ReactNode } from "react";

interface AnalogyProps {
  emoji: string;
  title: string;
  children: ReactNode;
}

/**
 * Real-world analogy card for making concepts relatable.
 * Uses emoji and simple explanations accessible to all ages.
 */
export function Analogy({ emoji, title, children }: AnalogyProps) {
  return (
    <div className="rounded-xl border border-[var(--border-primary)] bg-gradient-to-br from-[var(--color-primary-500)]/5 to-[var(--color-secondary-500)]/5 p-5 mb-6">
      <div className="flex items-start gap-4">
        {/* Emoji */}
        <div className="text-4xl flex-shrink-0">{emoji}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
            <span className="text-[var(--color-primary-400)]">💡</span>
            Think of it like... {title}
          </h4>
          <div className="text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
