import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const zAlgorithmInfo: AlgorithmInfo = {
  id: "z-algorithm",
  name: "Z-Algorithm",
  description:
    "Builds a Z-array where Z[i] represents the length of the longest substring starting at position i that matches a prefix of the string. Used for efficient pattern matching.",
  howItWorks:
    "Concatenate pattern + separator + text. Build the Z-array in O(n) time by maintaining a 'Z-box' [left, right] that tracks the rightmost substring matching a prefix. Use this to skip redundant comparisons.",
  keyInsight:
    "The Z-box optimization is similar to KMP's LPS idea but conceptually simpler. Any position where Z[i] equals the pattern length is a match!",
  bestFor: [
    "Pattern matching with preprocessing",
    "Finding all occurrences of a pattern",
    "When both prefix and pattern info needed",
    "String compression problems",
  ],
  avoidWhen: [
    "Memory is very constrained (uses O(n+m) space)",
    "Only need first match (can terminate early with other algorithms)",
  ],
  funFact:
    "The Z-algorithm is often considered more intuitive than KMP for understanding pattern matching. Many competitive programmers prefer it for its conceptual simplicity!",
  optimizationTips: [
    "Use a unique separator (like '$') not in the alphabet",
    "Z-array has other applications like string compression",
    "Can be modified for pattern matching with wildcards",
  ],
  tags: ["Pattern Matching", "Z-Array", "O(n+m)", "Advanced"],
};
