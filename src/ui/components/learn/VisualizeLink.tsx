import Link from "next/link";
import { Play } from "lucide-react";

interface VisualizeLinkProps {
  algorithm: string;
  category: string;
  locale?: string;
  label?: string;
}

/**
 * CTA button linking to the Visualize page with algorithm pre-selected.
 */
export function VisualizeLink({
  algorithm,
  category,
  locale = "en",
  label = "Try it in Visualizer",
}: VisualizeLinkProps) {
  return (
    <Link
      href={`/${locale}/visualize?algorithm=${algorithm}&category=${category}`}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
    >
      <Play className="w-5 h-5" />
      {label}
    </Link>
  );
}
