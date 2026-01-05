import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const longestPalindromicSubstringInfo: AlgorithmInfo = {
  id: "longest-palindromic-substring",
  name: "Longest Palindromic Substring",
  description:
    "Find the longest substring that reads the same forwards and backwards. Uses the expand-around-center technique for O(n²) time with O(1) space.",
  howItWorks:
    "For each position i, try expanding outwards while characters match. Check both odd-length (center at i) and even-length (center between i and i+1) palindromes.",
  keyInsight:
    "Every palindrome has a center. By expanding from each possible center, we find all palindromes in O(n²). Manacher's algorithm further optimizes this to O(n).",
  bestFor: [
    "Finding longest palindrome",
    "String analysis",
    "Interview questions",
    "When O(1) space is important",
  ],
  avoidWhen: [
    "Need O(n) time (use Manacher's)",
    "Finding all palindromic substrings (different problem)",
  ],
  funFact:
    "The longest palindrome in English is disputed, but 'tattarrattat' (coined by James Joyce) and 'detartrated' (a chemistry term) are contenders!",
  optimizationTips: [
    "Manacher's algorithm achieves O(n) time",
    "Early termination if remaining length can't beat current max",
    "Consider case-insensitive comparison if needed",
  ],
  tags: ["Strings", "Palindrome", "Two Pointers", "O(n²)"],
};
