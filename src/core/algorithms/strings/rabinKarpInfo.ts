import type { AlgorithmInfo } from "@/ui/components/AlgorithmInfoCard";

export const rabinKarpInfo: AlgorithmInfo = {
  id: "rabin-karp",
  name: "Rabin-Karp Algorithm",
  description:
    "Uses a rolling hash function to quickly filter out non-matching positions. Hash comparisons are O(1), making the average case efficient.",
  howItWorks:
    "Compute a hash of the pattern and the first window of text. Slide the window across, updating the hash in O(1) using the rolling hash technique. Only verify characters when hashes match.",
  keyInsight:
    "The rolling hash allows O(1) updates: subtract the contribution of the outgoing character and add the contribution of the incoming character, avoiding recalculation.",
  bestFor: [
    "Multiple pattern search (same text)",
    "Plagiarism detection",
    "DNA sequence matching",
    "When average case O(n+m) is sufficient",
  ],
  avoidWhen: [
    "Guaranteed O(n+m) worst case needed",
    "Many hash collisions expected",
    "Single pattern, single search (KMP may be better)",
  ],
  funFact:
    "Rabin-Karp was invented by Richard Karp and Michael Rabin in 1987. It's particularly useful for detecting plagiarism - you can hash every substring of a document and compare!",
  optimizationTips: [
    "Choose a large prime for the modulus to reduce collisions",
    "Use a prime base for better hash distribution",
    "For multiple patterns, store pattern hashes in a hash table",
  ],
  tags: ["Pattern Matching", "Rolling Hash", "O(n+m) avg", "Advanced"],
};
