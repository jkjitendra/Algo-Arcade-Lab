import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const longestCommonSubstringInfo: AlgorithmInfo = {
  id: "longest-common-substring",
  name: "Longest Common Substring",
  description:
    "Find the longest contiguous sequence of characters that appears in both strings using dynamic programming.",
  howItWorks:
    "Build a 2D DP table where dp[i][j] represents the length of the longest common suffix ending at str1[i-1] and str2[j-1]. If characters match, dp[i][j] = dp[i-1][j-1] + 1.",
  keyInsight:
    "Unlike Longest Common Subsequence (LCS), this requires contiguous characters. The DP recurrence is simpler: reset to 0 on mismatch.",
  bestFor: [
    "Finding exact common phrases",
    "Plagiarism detection",
    "DNA sequence analysis",
    "Diff algorithms",
  ],
  avoidWhen: [
    "Non-contiguous matches needed (use LCS instead)",
    "Space is critical (can optimize to O(min(n,m)))",
  ],
  funFact:
    "The longest common substring problem appears in computational biology for comparing DNA sequences. Similar sequences often indicate common ancestry!",
  optimizationTips: [
    "Use only two rows of DP table to reduce space to O(m)",
    "Suffix arrays can solve this in O(n + m) time",
    "For multiple strings, use suffix tree",
  ],
  tags: ["Strings", "Dynamic Programming", "O(n×m)", "Intermediate"],
};
