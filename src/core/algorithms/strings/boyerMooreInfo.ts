import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const boyerMooreInfo: AlgorithmInfo = {
  id: "boyer-moore",
  name: "Boyer-Moore Algorithm",
  description:
    "One of the most efficient string matching algorithms in practice. Uses two heuristics (bad character and good suffix) to skip large portions of text.",
  howItWorks:
    "Compare pattern right-to-left. On mismatch, use the bad character rule to skip ahead: align the pattern so the mismatched text character matches its rightmost occurrence in the pattern, or skip past entirely if not found.",
  keyInsight:
    "By matching right-to-left and using skip tables, Boyer-Moore can achieve O(n/m) performance - actually faster for longer patterns!",
  bestFor: [
    "Long patterns",
    "Large alphabets (DNA, text)",
    "When average case performance matters",
    "Text editors (Ctrl+F)",
  ],
  avoidWhen: [
    "Very short patterns",
    "Small alphabets with repetitive patterns",
    "Guaranteed worst-case O(n) needed",
  ],
  funFact:
    "Boyer-Moore was developed in 1977 and is still the algorithm of choice for many text editors and grep implementations. It's often faster than O(n) in practice!",
  optimizationTips: [
    "Add the good suffix heuristic for even better skipping",
    "For DNA/small alphabets, consider other algorithms",
    "Precompute tables for multiple searches of same pattern",
  ],
  tags: ["Pattern Matching", "Bad Character", "O(n/m) best", "Expert"],
};
