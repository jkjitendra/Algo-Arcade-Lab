import { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, AlertCircle, Sparkles } from "lucide-react";

type CalloutType = "note" | "tip" | "warning" | "caution" | "insight";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: typeof Info; color: string; bg: string; defaultTitle: string }
> = {
  note: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
    defaultTitle: "Note",
  },
  tip: {
    icon: Lightbulb,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/30",
    defaultTitle: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    defaultTitle: "Warning",
  },
  caution: {
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    defaultTitle: "Caution",
  },
  insight: {
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/30",
    defaultTitle: "Key Insight",
  },
};

/**
 * Alert/callout component for highlighting important information.
 * Supports note, tip, warning, caution, and key insight types.
 */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-xl border-l-4 p-4 mb-6 ${config.bg}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h5 className={`font-semibold ${config.color} mb-1`}>
            {title || config.defaultTitle}
          </h5>
          <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
