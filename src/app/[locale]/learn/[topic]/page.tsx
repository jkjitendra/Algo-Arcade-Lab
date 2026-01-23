import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, BookOpen, Clock, Play } from "lucide-react";

interface TopicPageProps {
  params: Promise<{ locale: string; topic: string }>;
}

// Valid topics
const validTopics = [
  "arrays",
  "strings",
  "sorting",
  "searching",
  "stacks",
  "queues",
  "linked-lists",
  "recursion",
  "trees",
  "heaps",
  "hashing",
  "graphs",
  "dynamic-programming",
  "greedy-algorithms",
] as const;

// Lessons for each topic
const topicLessons: Record<string, { slug: string; title: string; duration: string; description: string }[]> = {
  sorting: [
    { slug: "bubble-sort", title: "Bubble Sort", duration: "15 min", description: "The simplest sorting algorithm - compare and swap adjacent elements" },
    { slug: "selection-sort", title: "Selection Sort", duration: "12 min", description: "Find the minimum element and place it at the beginning" },
    { slug: "insertion-sort", title: "Insertion Sort", duration: "12 min", description: "Build sorted array one element at a time" },
    { slug: "merge-sort", title: "Merge Sort", duration: "20 min", description: "Divide and conquer with O(n log n) guarantee" },
    { slug: "quick-sort", title: "Quick Sort", duration: "25 min", description: "Efficient in-place sorting using partitioning" },
  ],
  arrays: [
    { slug: "array-operations", title: "Array Operations", duration: "15 min", description: "Insert, delete, update, and traverse arrays" },
    { slug: "two-pointers", title: "Two Pointers", duration: "18 min", description: "Solve array problems using two pointer technique" },
    { slug: "sliding-window", title: "Sliding Window", duration: "20 min", description: "Find subarrays or substrings efficiently" },
    { slug: "prefix-sum", title: "Prefix Sum", duration: "15 min", description: "O(1) range sum queries with preprocessing" },
    { slug: "kadanes", title: "Kadane's Algorithm", duration: "18 min", description: "Find maximum subarray sum in linear time" },
  ],
  strings: [
    { slug: "string-operations", title: "String Operations", duration: "12 min", description: "Traverse, reverse, and compare strings" },
    { slug: "character-frequency", title: "Character Frequency", duration: "10 min", description: "Count occurrences of characters" },
    { slug: "brute-force-search", title: "Brute Force Search", duration: "12 min", description: "Simple pattern matching algorithm" },
    { slug: "kmp-algorithm", title: "KMP Algorithm", duration: "25 min", description: "Efficient pattern matching with LPS array" },
    { slug: "anagram-detection", title: "Anagram Detection", duration: "15 min", description: "Check if strings are anagrams" },
  ],
  searching: [
    { slug: "linear-search", title: "Linear Search", duration: "8 min", description: "Sequential search through all elements" },
    { slug: "binary-search", title: "Binary Search", duration: "18 min", description: "O(log n) search in sorted arrays" },
    { slug: "lower-bound", title: "Lower Bound", duration: "12 min", description: "Find first occurrence of target" },
    { slug: "upper-bound", title: "Upper Bound", duration: "12 min", description: "Find last occurrence of target" },
    { slug: "peak-element", title: "Peak Element", duration: "15 min", description: "Find local maximum in array" },
  ],
  stacks: [
    { slug: "stack-operations", title: "Stack Operations", duration: "12 min", description: "Push, pop, peek - LIFO fundamentals" },
    { slug: "balanced-parentheses", title: "Balanced Parentheses", duration: "15 min", description: "Check if brackets are balanced" },
    { slug: "infix-to-postfix", title: "Infix to Postfix", duration: "20 min", description: "Convert expressions using Shunting Yard" },
    { slug: "next-greater-element", title: "Next Greater Element", duration: "18 min", description: "Monotonic stack pattern" },
  ],
  queues: [
    { slug: "queue-operations", title: "Queue Operations", duration: "12 min", description: "Enqueue, dequeue - FIFO fundamentals" },
    { slug: "circular-queue", title: "Circular Queue", duration: "15 min", description: "Fixed-size queue with wrap-around" },
    { slug: "priority-queue", title: "Priority Queue", duration: "18 min", description: "Priority-based dequeue order" },
    { slug: "lru-cache", title: "LRU Cache", duration: "25 min", description: "Least recently used eviction policy" },
  ],
  "linked-lists": [
    { slug: "singly-linked-list", title: "Singly Linked List", duration: "18 min", description: "Insert, delete, traverse operations" },
    { slug: "reverse-linked-list", title: "Reverse Linked List", duration: "15 min", description: "Iterative and recursive reversal" },
    { slug: "detect-cycle", title: "Detect Cycle", duration: "15 min", description: "Floyd's cycle detection algorithm" },
    { slug: "find-middle", title: "Find Middle Element", duration: "12 min", description: "Two-pointer slow & fast technique" },
  ],
  recursion: [
    { slug: "factorial", title: "Factorial", duration: "10 min", description: "Classic recursive calculation" },
    { slug: "fibonacci", title: "Fibonacci Sequence", duration: "15 min", description: "Generate nth Fibonacci number" },
    { slug: "tower-of-hanoi", title: "Tower of Hanoi", duration: "20 min", description: "Classic recursion puzzle" },
    { slug: "n-queens", title: "N-Queens", duration: "30 min", description: "Place N queens without conflicts" },
  ],
  trees: [
    { slug: "tree-traversals", title: "Tree Traversals", duration: "25 min", description: "Inorder, preorder, postorder, level-order" },
    { slug: "tree-height", title: "Tree Height", duration: "12 min", description: "Calculate maximum depth" },
    { slug: "bst-operations", title: "BST Operations", duration: "25 min", description: "Insert, search, find min/max" },
    { slug: "lowest-common-ancestor", title: "Lowest Common Ancestor", duration: "20 min", description: "Find LCA of two nodes" },
  ],
  heaps: [
    { slug: "max-heap", title: "Max Heap", duration: "20 min", description: "Insert, extract max, heapify" },
    { slug: "min-heap", title: "Min Heap", duration: "18 min", description: "Insert, extract min operations" },
    { slug: "build-heap", title: "Build Heap", duration: "15 min", description: "O(n) bottom-up heapification" },
    { slug: "kth-largest", title: "K-th Largest Element", duration: "18 min", description: "Find k-th largest using min-heap" },
    { slug: "median-of-stream", title: "Median of Stream", duration: "25 min", description: "Running median with two heaps" },
  ],
  hashing: [
    { slug: "hash-functions", title: "Hash Functions", duration: "15 min", description: "Division and multiplication methods" },
    { slug: "chaining", title: "Chaining Hash Table", duration: "18 min", description: "Collision handling with linked lists" },
    { slug: "open-addressing", title: "Open Addressing", duration: "20 min", description: "Linear, quadratic, double hashing" },
    { slug: "two-sum-hashmap", title: "Two Sum (HashMap)", duration: "15 min", description: "Find pair with given sum" },
  ],
  graphs: [
    { slug: "graph-representations", title: "Graph Representations", duration: "18 min", description: "Adjacency matrix and list" },
    { slug: "bfs", title: "Breadth-First Search", duration: "22 min", description: "Explore graph layer by layer" },
    { slug: "dfs", title: "Depth-First Search", duration: "22 min", description: "Explore graph by going deep first" },
    { slug: "dijkstra", title: "Dijkstra's Algorithm", duration: "30 min", description: "Shortest path with non-negative weights" },
    { slug: "bellman-ford", title: "Bellman-Ford Algorithm", duration: "25 min", description: "Shortest path with negative weights" },
  ],
  "dynamic-programming": [
    { slug: "fibonacci-dp", title: "Fibonacci (DP)", duration: "15 min", description: "Tabulation approach O(n)" },
    { slug: "climbing-stairs", title: "Climbing Stairs", duration: "15 min", description: "Ways to climb n stairs" },
    { slug: "coin-change", title: "Coin Change", duration: "25 min", description: "Minimum coins to make amount" },
    { slug: "knapsack-01", title: "0/1 Knapsack", duration: "30 min", description: "Maximize value within weight limit" },
    { slug: "lcs", title: "Longest Common Subsequence", duration: "28 min", description: "LCS of two strings" },
    { slug: "edit-distance", title: "Edit Distance", duration: "30 min", description: "Min operations to transform string" },
  ],
  "greedy-algorithms": [
    { slug: "activity-selection", title: "Activity Selection", duration: "20 min", description: "Select max non-overlapping activities" },
    { slug: "fractional-knapsack", title: "Fractional Knapsack", duration: "18 min", description: "Maximum value with item fractions" },
    { slug: "huffman-coding", title: "Huffman Coding", duration: "30 min", description: "Build optimal prefix-free codes" },
    { slug: "merge-intervals", title: "Merge Intervals", duration: "18 min", description: "Merge overlapping intervals" },
  ],
};

// Topic introductions with emoji, description, key concepts, and prerequisites
const topicIntros: Record<string, {
  emoji: string;
  intro: string;
  keyTopics: string[];
  prerequisites: string[];
  realWorldUses: string[];
}> = {
  arrays: {
    emoji: "📦",
    intro: "Arrays are the foundation of all data structures. They store elements in contiguous memory locations, allowing quick access to any element using its index. Understanding arrays is essential before learning any other data structure.",
    keyTopics: ["Index-based access", "Traversal patterns", "In-place modifications", "Subarray problems"],
    prerequisites: ["Basic programming knowledge", "Loop concepts"],
    realWorldUses: ["Image pixels", "Database records", "Spreadsheet cells", "Memory management"],
  },
  strings: {
    emoji: "#️⃣",
    intro: "Strings are sequences of characters used to represent text. In programming, strings require special handling because they're immutable in many languages. String algorithms are fundamental for text processing, search engines, and data validation.",
    keyTopics: ["Character encoding", "Pattern matching", "String manipulation", "Palindromes & anagrams"],
    prerequisites: ["Arrays basics", "Character sets (ASCII/Unicode)"],
    realWorldUses: ["Text editors", "Search engines", "DNA sequencing", "Spell checkers"],
  },
  sorting: {
    emoji: "📊",
    intro: "Sorting arranges elements in a specific order (ascending or descending). It's one of the most studied problems in computer science because sorted data enables efficient searching, merging, and analysis. Every programmer should know multiple sorting algorithms.",
    keyTopics: ["Comparison-based sorting", "Divide & conquer", "Stability", "In-place vs extra space"],
    prerequisites: ["Arrays", "Basic recursion"],
    realWorldUses: ["Database indexing", "Organizing files", "Leaderboards", "Priority systems"],
  },
  searching: {
    emoji: "🔍",
    intro: "Searching algorithms find specific elements within a collection. The efficiency of your search can mean the difference between instant results and waiting forever. Binary search alone is used in countless applications from databases to autocomplete.",
    keyTopics: ["Linear vs binary search", "Search space reduction", "Boundary finding", "Peak finding"],
    prerequisites: ["Arrays", "Sorting basics"],
    realWorldUses: ["Database queries", "Autocomplete", "Dictionary lookup", "Finding duplicates"],
  },
  stacks: {
    emoji: "📚",
    intro: "A stack is a Last-In-First-Out (LIFO) data structure — like a stack of plates where you can only add or remove from the top. Stacks are used everywhere from your browser's back button to evaluating mathematical expressions.",
    keyTopics: ["Push/Pop operations", "LIFO principle", "Expression evaluation", "Monotonic stacks"],
    prerequisites: ["Arrays or Linked Lists"],
    realWorldUses: ["Undo/Redo functionality", "Browser history", "Function call stack", "Syntax parsing"],
  },
  queues: {
    emoji: "🔄",
    intro: "A queue is a First-In-First-Out (FIFO) data structure — like a line at a store where the first person to arrive is served first. Queues are essential for managing tasks, scheduling, and breadth-first algorithms.",
    keyTopics: ["Enqueue/Dequeue", "FIFO principle", "Circular queues", "Priority queues"],
    prerequisites: ["Arrays or Linked Lists"],
    realWorldUses: ["Print spoolers", "Task scheduling", "Message queues", "Breadth-first search"],
  },
  "linked-lists": {
    emoji: "🔗",
    intro: "Linked lists store elements in nodes connected by pointers. Unlike arrays, they don't need contiguous memory and can grow/shrink dynamically. They're the building blocks for many advanced data structures like stacks, queues, and graphs.",
    keyTopics: ["Node structure", "Pointer manipulation", "Singly vs doubly linked", "Cycle detection"],
    prerequisites: ["Pointers/References", "Memory concepts"],
    realWorldUses: ["Music playlists", "Image viewers", "Memory allocation", "Blockchain"],
  },
  recursion: {
    emoji: "🔁",
    intro: "Recursion is when a function calls itself to solve smaller subproblems. It's a powerful technique that simplifies complex problems by breaking them into manageable pieces. Mastering recursion is crucial for trees, graphs, and dynamic programming.",
    keyTopics: ["Base case & recursive case", "Call stack", "Backtracking", "Divide & conquer"],
    prerequisites: ["Functions", "Stack memory understanding"],
    realWorldUses: ["File system traversal", "Fractal generation", "Puzzle solving", "Parsing expressions"],
  },
  trees: {
    emoji: "🌳",
    intro: "Trees are hierarchical data structures with a root node and child nodes forming branches. They model real-world hierarchies like file systems and org charts. Binary Search Trees enable O(log n) operations, making them essential for databases.",
    keyTopics: ["Tree traversals", "Binary trees", "BST operations", "Tree properties"],
    prerequisites: ["Recursion", "Linked Lists"],
    realWorldUses: ["File systems", "HTML DOM", "Database indexes", "Decision trees"],
  },
  heaps: {
    emoji: "🏔️",
    intro: "A heap is a complete binary tree where each parent is greater (max-heap) or smaller (min-heap) than its children. Heaps power priority queues and enable O(n log n) sorting. They're used whenever you need quick access to the maximum or minimum element.",
    keyTopics: ["Heap property", "Heapify operation", "Priority queues", "K-th element problems"],
    prerequisites: ["Trees basics", "Arrays"],
    realWorldUses: ["Task schedulers", "Dijkstra's algorithm", "Median finding", "Event-driven simulation"],
  },
  hashing: {
    emoji: "🔐",
    intro: "Hashing transforms data into fixed-size values for O(1) average-case lookups. Hash tables are among the most useful data structures, enabling instant access to data. They power everything from database indexing to caching systems.",
    keyTopics: ["Hash functions", "Collision handling", "Load factor", "Hash map applications"],
    prerequisites: ["Arrays", "Basic math (modulo)"],
    realWorldUses: ["Database indexing", "Caching", "Password storage", "Deduplication"],
  },
  graphs: {
    emoji: "🕸️",
    intro: "Graphs model relationships between objects using nodes (vertices) and connections (edges). They represent networks like social connections, roads, and the internet. Graph algorithms solve problems from finding shortest paths to detecting communities.",
    keyTopics: ["Graph representations", "BFS & DFS", "Shortest paths", "Cycle detection"],
    prerequisites: ["Queues", "Recursion", "Trees"],
    realWorldUses: ["Social networks", "GPS navigation", "Recommendation systems", "Network routing"],
  },
  "dynamic-programming": {
    emoji: "🧩",
    intro: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing results to avoid redundant calculations. It transforms exponential-time solutions into polynomial-time. DP is essential for optimization problems.",
    keyTopics: ["Memoization", "Tabulation", "State definition", "Recurrence relations"],
    prerequisites: ["Recursion", "Arrays", "Basic math"],
    realWorldUses: ["Route optimization", "Resource allocation", "Text comparison", "Financial modeling"],
  },
  "greedy-algorithms": {
    emoji: "⚡",
    intro: "Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. They're fast and simple, but don't always give the best solution. When they work, they're often the most efficient approach to optimization problems.",
    keyTopics: ["Greedy choice property", "Optimal substructure", "Activity scheduling", "Interval problems"],
    prerequisites: ["Sorting", "Basic optimization concepts"],
    realWorldUses: ["Huffman encoding", "Job scheduling", "Coin change (some currencies)", "Network routing"],
  },
};

export function generateStaticParams() {
  return validTopics.map((topic) => ({ topic }));
}

export default async function LearnTopicPage({ params }: TopicPageProps) {
  const { locale, topic } = await params;
  setRequestLocale(locale);

  if (!validTopics.includes(topic as typeof validTopics[number])) {
    notFound();
  }

  const lessons = topicLessons[topic] || [];

  return <TopicContent locale={locale} topic={topic} lessons={lessons} />;
}

function TopicContent({
  locale,
  topic,
  lessons,
}: {
  locale: string;
  topic: string;
  lessons: { slug: string; title: string; duration: string; description: string }[];
}) {
  const t = useTranslations();

  const totalDuration = lessons.reduce((acc, l) => {
    const mins = parseInt(l.duration);
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href={`/${locale}/learn`}
        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Learn
      </Link>

      {/* Topic Header */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{topicIntros[topic]?.emoji || "📘"}</span>
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              {t(`topics.${topic}`)}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {lessons.length} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                ~{totalDuration} min total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Introduction */}
      {topicIntros[topic] && (
        <div className="mb-10 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
            {topicIntros[topic].intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Key Topics */}
            <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
              <h4 className="text-sm font-semibold text-[var(--color-primary-400)] mb-2 flex items-center gap-2">
                <span>🎯</span> Key Topics
              </h4>
              <ul className="space-y-1">
                {topicIntros[topic].keyTopics.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
              <h4 className="text-sm font-semibold text-[var(--color-secondary-400)] mb-2 flex items-center gap-2">
                <span>📚</span> Prerequisites
              </h4>
              <ul className="space-y-1">
                {topicIntros[topic].prerequisites.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>

            {/* Real-World Uses */}
            <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <span>🌍</span> Real-World Uses
              </h4>
              <ul className="space-y-1">
                {topicIntros[topic].realWorldUses.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Lessons Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Lessons</h2>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/${locale}/learn/${topic}/${lesson.slug}`}
            className="group block rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--color-primary-500)] transition-all duration-200 hover:shadow-lg overflow-hidden"
          >
            <div className="p-5 flex items-center gap-4">
              {/* Lesson Number */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{index + 1}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-400)] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] mt-0.5">
                  {lesson.description}
                </p>
              </div>

              {/* Duration & Action */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-sm text-[var(--text-tertiary)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-500)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary-500)] transition-colors">
                  <Play className="w-4 h-4 text-[var(--color-primary-400)] group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick link to Visualizer */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">
              Ready to see it in action?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Practice with interactive visualizations after completing the lessons.
            </p>
          </div>
          <Link
            href={`/${locale}/topics/${topic}`}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Visualize
          </Link>
        </div>
      </div>
    </div>
  );
}
