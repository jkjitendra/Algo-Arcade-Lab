import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TopicPageProps {
  params: Promise<{ locale: string; topic: string }>;
}

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

export function generateStaticParams() {
  return validTopics.map((topic) => ({ topic }));
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { locale, topic } = await params;
  setRequestLocale(locale);

  if (!validTopics.includes(topic as typeof validTopics[number])) {
    notFound();
  }

  return <TopicContent locale={locale} topic={topic} />;
}

const arraysTiers = [
  {
    name: "Tier 1: Basic Operations",
    description: "Fundamental array operations with complexity analysis",
    algorithms: ["array-operations"],
  },
  {
    name: "Tier 2: Patterns & Techniques",
    description: "Common patterns for solving array problems efficiently",
    algorithms: ["two-pointers", "sliding-window", "prefix-sum"],
  },
  {
    name: "Tier 3: Classic Algorithms",
    description: "Essential array algorithms for interviews and competitive programming",
    algorithms: ["kadanes", "dutch-national-flag", "moores-voting", "merge-sorted-arrays", "rotate-array", "array-rearrangement", "next-permutation"],
  },
];

const sortingTiers = [
  {
    name: "Tier 1: Fundamentals",
    description: "Simple O(n²) algorithms - great for learning",
    algorithms: ["bubble-sort", "selection-sort", "insertion-sort", "cocktail-shaker-sort"],
  },
  {
    name: "Tier 2: Improved Simple",
    description: "Optimized versions of simple sorts",
    algorithms: ["shell-sort", "cycle-sort"],
  },
  {
    name: "Tier 3: Divide & Conquer",
    description: "O(n log n) algorithms using recursion",
    algorithms: ["merge-sort", "quick-sort", "heap-sort"],
  },
  {
    name: "Tier 4: Hybrid",
    description: "Best of multiple algorithms combined",
    algorithms: ["tim-sort", "intro-sort"],
  },
  {
    name: "Tier 5: Non-Comparison",
    description: "Linear time for specific inputs",
    algorithms: ["counting-sort", "radix-sort", "bucket-sort", "pigeonhole-sort"],
  },
];

const stringsTiers = [
  {
    name: "Tier 1: Core Operations",
    description: "Fundamental string operations and analysis",
    algorithms: ["string-operations", "character-frequency"],
  },
  {
    name: "Tier 2: Pattern Matching",
    description: "Efficient algorithms to find patterns in text",
    algorithms: ["brute-force-search", "kmp-algorithm", "rabin-karp", "z-algorithm", "boyer-moore"],
  },
  {
    name: "Tier 3: String Manipulation",
    description: "Common string processing problems",
    algorithms: ["anagram-detection", "longest-palindromic-substring", "longest-common-substring", "string-rotation", "remove-duplicates"],
  },
];

const searchingTiers = [
  {
    name: "Tier 1: Linear Search Variants",
    description: "Simple sequential searching algorithms",
    algorithms: ["linear-search", "sentinel-linear-search", "bidirectional-search"],
  },
  {
    name: "Tier 2: Binary Search Variants",
    description: "Efficient O(log n) searching for sorted arrays",
    algorithms: ["binary-search", "lower-bound", "upper-bound", "search-insert-position", "peak-element", "rotated-array-search", "rotated-array-min"],
  },
  {
    name: "Tier 3: Specialized Search",
    description: "Advanced searching techniques for specific use cases",
    algorithms: ["jump-search", "interpolation-search", "exponential-search", "fibonacci-search", "ternary-search", "matrix-binary-search"],
  },
];

const stacksTiers = [
  {
    name: "Tier 1: Core Operations",
    description: "Fundamental LIFO stack operations",
    algorithms: ["stack-operations"],
  },
  {
    name: "Tier 2: Expression Handling",
    description: "Stack-based parsing and evaluation",
    algorithms: ["balanced-parentheses", "infix-to-postfix", "infix-to-prefix", "postfix-evaluation", "prefix-evaluation"],
  },
  {
    name: "Tier 3: Monotonic Stack Applications",
    description: "Advanced problems using monotonic stack pattern",
    algorithms: ["next-greater-element", "next-smaller-element", "stock-span", "largest-rectangle-histogram", "valid-stack-sequences"],
  },
];

const queuesTiers = [
  {
    name: "Tier 1: Core Operations",
    description: "Fundamental FIFO queue operations",
    algorithms: ["queue-operations"],
  },
  {
    name: "Tier 2: Queue Variants",
    description: "Specialized queue implementations",
    algorithms: ["circular-queue", "deque", "priority-queue"],
  },
  {
    name: "Tier 3: Dual-Structure Implementations",
    description: "Implementing one structure using another",
    algorithms: ["queue-using-two-stacks", "stack-using-two-queues"],
  },
  {
    name: "Tier 4: Advanced Applications",
    description: "Real-world queue-based problems",
    algorithms: ["lru-cache", "sliding-window-maximum", "first-non-repeating-character", "generate-binary-numbers", "circular-tour"],
  },
];

const linkedListsTiers = [
  {
    name: "Tier 1: Core Data Structures",
    description: "Fundamental linked list types and operations",
    algorithms: ["singly-linked-list", "doubly-linked-list", "circular-linked-list", "circular-doubly-linked-list"],
  },
  {
    name: "Tier 2: Basic Algorithms",
    description: "Essential pointer manipulation techniques",
    algorithms: ["reverse-linked-list", "find-middle", "merge-sorted-lists"],
  },
  {
    name: "Tier 3: Cycle Detection",
    description: "Floyd's algorithm and cycle-related problems",
    algorithms: ["detect-cycle", "find-cycle-start"],
  },
  {
    name: "Tier 4: Advanced Problems",
    description: "Complex linked list manipulations",
    algorithms: ["remove-nth-from-end", "palindrome-linked-list", "intersection-point", "rotate-list", "flatten-multilevel-list"],
  },
];

const recursionTiers = [
  {
    name: "Tier 1: Basic Recursion",
    description: "Fundamental recursive concepts",
    algorithms: ["factorial-recursion", "fibonacci-recursion", "sum-digits-recursion", "power-recursion", "gcd-recursion"],
  },
  {
    name: "Tier 2: Classic Problems",
    description: "Standard recursion problems",
    algorithms: ["hanoi-recursion", "binary-search-recursion"],
  },
  {
    name: "Tier 3: Backtracking",
    description: "Solving problems by building candidates and backtracking",
    algorithms: ["n-queens", "sudoku-solver", "rat-in-maze", "generate-permutations"],
  },
];

const algorithmNames: Record<string, string> = {
  // Arrays
  "array-operations": "Array Operations",
  "two-pointers": "Two Pointers",
  "sliding-window": "Sliding Window",
  "prefix-sum": "Prefix Sum",
  "kadanes": "Kadane's Algorithm",
  "dutch-national-flag": "Dutch National Flag",
  "moores-voting": "Moore's Voting",
  "merge-sorted-arrays": "Merge Sorted Arrays",
  "rotate-array": "Rotate Array",
  "array-rearrangement": "Rearrangement",
  "next-permutation": "Next Permutation",
  // Sorting
  "bubble-sort": "Bubble Sort",
  "selection-sort": "Selection Sort",
  "insertion-sort": "Insertion Sort",
  "cocktail-shaker-sort": "Cocktail Shaker",
  "shell-sort": "Shell Sort",
  "cycle-sort": "Cycle Sort",
  "merge-sort": "Merge Sort",
  "quick-sort": "Quick Sort",
  "heap-sort": "Heap Sort",
  "tim-sort": "Tim Sort",
  "intro-sort": "Intro Sort",
  "counting-sort": "Counting Sort",
  "radix-sort": "Radix Sort",
  "bucket-sort": "Bucket Sort",
  "pigeonhole-sort": "Pigeonhole Sort",
  // Strings
  "string-operations": "String Operations",
  "character-frequency": "Character Frequency",
  "brute-force-search": "Brute Force Search",
  "kmp-algorithm": "KMP Algorithm",
  "rabin-karp": "Rabin-Karp",
  "z-algorithm": "Z-Algorithm",
  "boyer-moore": "Boyer-Moore",
  "anagram-detection": "Anagram Detection",
  "longest-palindromic-substring": "Longest Palindrome",
  "longest-common-substring": "Longest Common Substr",
  "string-rotation": "String Rotation",
  "remove-duplicates": "Remove Duplicates",
  // Searching
  "linear-search": "Linear Search",
  "sentinel-linear-search": "Sentinel Linear Search",
  "bidirectional-search": "Bidirectional Search",
  "binary-search": "Binary Search",
  "lower-bound": "Lower Bound",
  "upper-bound": "Upper Bound",
  "search-insert-position": "Search Insert Position",
  "peak-element": "Peak Element",
  "rotated-array-search": "Rotated Array Search",
  "rotated-array-min": "Rotated Array Minimum",
  "jump-search": "Jump Search",
  "interpolation-search": "Interpolation Search",
  "exponential-search": "Exponential Search",
  "fibonacci-search": "Fibonacci Search",
  "ternary-search": "Ternary Search",
  "matrix-binary-search": "Matrix Binary Search",
  // Stacks
  "stack-operations": "Stack Operations",
  "balanced-parentheses": "Balanced Parentheses",
  "infix-to-postfix": "Infix to Postfix",
  "infix-to-prefix": "Infix to Prefix",
  "postfix-evaluation": "Postfix Evaluation",
  "prefix-evaluation": "Prefix Evaluation",
  "next-greater-element": "Next Greater Element",
  "next-smaller-element": "Next Smaller Element",
  "stock-span": "Stock Span",
  "largest-rectangle-histogram": "Largest Rectangle",
  "valid-stack-sequences": "Valid Stack Sequences",
  // Queues
  "queue-operations": "Queue Operations",
  "circular-queue": "Circular Queue",
  "deque": "Deque",
  "priority-queue": "Priority Queue",
  "queue-using-two-stacks": "Queue Using Two Stacks",
  "stack-using-two-queues": "Stack Using Two Queues",
  "lru-cache": "LRU Cache",
  "sliding-window-maximum": "Sliding Window Maximum",
  "first-non-repeating-character": "First Non-Repeating Char",
  "generate-binary-numbers": "Generate Binary Numbers",
  "circular-tour": "Circular Tour",
  // Linked Lists
  "singly-linked-list": "Singly Linked List",
  "doubly-linked-list": "Doubly Linked List",
  "circular-linked-list": "Circular Linked List",
  "circular-doubly-linked-list": "Circular Doubly Linked List",
  "reverse-linked-list": "Reverse Linked List",
  "find-middle": "Find Middle Element",
  "merge-sorted-lists": "Merge Sorted Lists",
  "detect-cycle": "Detect Cycle",
  "find-cycle-start": "Find Cycle Start",
  "remove-nth-from-end": "Remove N-th from End",
  "palindrome-linked-list": "Palindrome Check",
  "intersection-point": "Intersection Point",
  "rotate-list": "Rotate List",
  "flatten-multilevel-list": "Flatten Multilevel List",
  // Recursion & Backtracking
  "factorial-recursion": "Factorial",
  "fibonacci-recursion": "Fibonacci Sequence",
  "sum-digits-recursion": "Sum of Digits",
  "power-recursion": "Power Function",
  "gcd-recursion": "GCD (Euclidean)",
  "hanoi-recursion": "Tower of Hanoi",
  "binary-search-recursion": "Binary Search (Rec)",
  "n-queens": "N-Queens",
  "sudoku-solver": "Sudoku Solver",
  "rat-in-maze": "Rat in a Maze",
  "generate-permutations": "Generate Permutations",
};

const algorithmDescriptions: Record<string, string> = {
  "array-operations": "Insert, Delete, Update, Search, Traverse",
  "two-pointers": "Find pair sum in sorted array",
  "sliding-window": "Max sum subarray of size k",
  "prefix-sum": "O(1) range sum queries",
  "kadanes": "Maximum subarray sum in O(n)",
  "dutch-national-flag": "Sort 0s, 1s, 2s with 3 pointers",
  "moores-voting": "Find majority element (>n/2)",
  "merge-sorted-arrays": "Merge two sorted arrays",
  "rotate-array": "Rotate by k using reversal",
  "array-rearrangement": "Alternate positives and negatives",
  "next-permutation": "Next lexicographic order",
  // Strings
  "string-operations": "Traverse, Reverse, Palindrome, Compare",
  "character-frequency": "Count character occurrences",
  "brute-force-search": "O(n×m) pattern matching",
  "kmp-algorithm": "O(n+m) with LPS array",
  "rabin-karp": "Rolling hash pattern search",
  "z-algorithm": "Z-array pattern matching",
  "boyer-moore": "O(n/m) best case matching",
  "anagram-detection": "Check if strings are anagrams",
  "longest-palindromic-substring": "Find longest palindrome",
  "longest-common-substring": "DP-based common substring",
  "string-rotation": "Check if one is rotation of other",
  "remove-duplicates": "Keep first occurrence only",
  // Searching
  "linear-search": "Sequential check each element",
  "sentinel-linear-search": "Optimized with sentinel value",
  "bidirectional-search": "Search from both ends",
  "binary-search": "O(log n) divide and conquer",
  "lower-bound": "Find first occurrence",
  "upper-bound": "Find last occurrence",
  "search-insert-position": "Find insertion index",
  "peak-element": "Find local maximum",
  "rotated-array-search": "Search in rotated array",
  "rotated-array-min": "Find rotation point",
  "jump-search": "√n block jumping",
  "interpolation-search": "Probe position estimation",
  "exponential-search": "Range finding + binary search",
  "fibonacci-search": "Fibonacci number division",
  "ternary-search": "Three-way division",
  "matrix-binary-search": "2D staircase search O(m+n)",
  // Stacks
  "stack-operations": "Push, Pop, Peek, isEmpty, isFull",
  "balanced-parentheses": "Check if brackets match correctly",
  "infix-to-postfix": "Shunting Yard algorithm",
  "infix-to-prefix": "Reverse processing approach",
  "postfix-evaluation": "Evaluate RPN expressions",
  "prefix-evaluation": "Right-to-left evaluation",
  "next-greater-element": "Monotonic stack pattern",
  "next-smaller-element": "Increasing stack approach",
  "stock-span": "Consecutive days calculation",
  "largest-rectangle-histogram": "Maximum area in histogram",
  "valid-stack-sequences": "Simulate push/pop sequence",
  // Queues
  "queue-operations": "Enqueue, Dequeue, Front, Rear, isEmpty",
  "circular-queue": "Fixed-size with wrap-around",
  "deque": "Insert/delete from both ends",
  "priority-queue": "Priority-based dequeue order",
  "queue-using-two-stacks": "Amortized O(1) queue with stacks",
  "stack-using-two-queues": "LIFO using FIFO structures",
  "lru-cache": "Least Recently Used eviction",
  "sliding-window-maximum": "Deque-based O(n) solution",
  "first-non-repeating-character": "Stream unique character finder",
  "generate-binary-numbers": "BFS-style binary generation",
  "circular-tour": "Gas station starting point",
  // Linked Lists
  "singly-linked-list": "Insert, Delete, Traverse, Search operations",
  "doubly-linked-list": "Bidirectional traversal with prev/next",
  "circular-linked-list": "Last node points back to head",
  "circular-doubly-linked-list": "Full circular bidirectional list",
  "reverse-linked-list": "Iterative/recursive pointer reversal",
  "find-middle": "Two-pointer slow & fast technique",
  "merge-sorted-lists": "Combine two sorted lists",
  "detect-cycle": "Floyd's cycle detection",
  "find-cycle-start": "Find where cycle begins",
  "remove-nth-from-end": "Two-pointer with gap technique",
  "palindrome-linked-list": "Reverse half and compare",
  "intersection-point": "Find where two lists meet",
  "rotate-list": "Rotate list by k positions",
  "flatten-multilevel-list": "Flatten nested doubly linked list",
  // Recursion & Backtracking
  "factorial-recursion": "Calculate n!",
  "fibonacci-recursion": "Generate nth Fibonacci number",
  "sum-digits-recursion": "Sum of all digits in number",
  "power-recursion": "Calculate x^n efficiently",
  "gcd-recursion": "Find Greatest Common Divisor",
  "hanoi-recursion": "Solve Tower of Hanoi puzzle",
  "binary-search-recursion": "Recursive implementation",
  "n-queens": "Place N queens without conflicts",
  "sudoku-solver": "Solve 9x9 Sudoku grid",
  "rat-in-maze": "Find path from start to end",
  "generate-permutations": "Generate all perms of string",
};

function TopicContent({ locale, topic }: { locale: string; topic: string }) {
  const t = useTranslations();

  if (topic === "arrays") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📦</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.arrays")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master fundamental array operations and common problem-solving patterns
          </p>
        </div>

        <div className="space-y-10">
          {arraysTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=arrays`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "sorting") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button - Top Left */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📊</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.sorting")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore sorting algorithms organized by complexity
          </p>
        </div>

        <div className="space-y-10">
          {sortingTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=sorting`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (topic === "strings") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">#️⃣</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.strings")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master string algorithms from pattern matching to manipulation
          </p>
        </div>

        <div className="space-y-10">
          {stringsTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=strings`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "searching") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.searching")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master searching algorithms from linear to advanced binary search variants
          </p>
        </div>

        <div className="space-y-10">
          {searchingTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=searching`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "stacks") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📚</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.stacks")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master the LIFO data structure - from basic operations to advanced applications
          </p>
        </div>

        <div className="space-y-10">
          {stacksTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=stacks`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "queues") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🔄</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.queues")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master the FIFO data structure - from basic operations to advanced applications
          </p>
        </div>

        <div className="space-y-10">
          {queuesTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=queues`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "linked-lists") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🔗</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.linked-lists")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master linked list data structures and algorithms - from basic operations to advanced problems
          </p>
        </div>

        <div className="space-y-10">
          {linkedListsTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=linkedlists`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (topic === "recursion") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🔁</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.recursion")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master recursion and backtracking - from basic calls to complex state-space search
          </p>
        </div>

        <div className="space-y-10">
          {recursionTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=recursion`}
                    className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] transition-all duration-300 hover:shadow-lg"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-primary-500)]">
                      {algorithmNames[algo]}
                    </h3>
                    {algorithmDescriptions[algo] && (
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        {algorithmDescriptions[algo]}
                      </p>
                    )}
                    <p className="text-xs text-[var(--text-secondary)] mt-2">Visualize →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Other topics - coming soon
  const topicIcons: Record<string, string> = {
    searching: "🔍",
    stacks: "📚",
    queues: "🔄",
    "linked-lists": "🔗",
    recursion: "🔁",
    trees: "🌳",
    heaps: "⛰️",
    hashing: "#️⃣",
    graphs: "🕸️",
    "dynamic-programming": "📋",
    "greedy-algorithms": "⚡",
  };

  const topicDescriptions: Record<string, string> = {
    searching: "Finding elements efficiently in data structures",
    stacks: "LIFO data structure - Push, Pop, and more",
    queues: "FIFO data structure - Enqueue, Dequeue operations",
    "linked-lists": "Dynamic linear structures with nodes and pointers",
    recursion: "Self-referential problem solving techniques",
    trees: "Hierarchical data structures and traversals",
    heaps: "Complete binary tree structure for priority queues",
    hashing: "O(1) average-case operations with hash tables",
    graphs: "Networks and relationships - BFS, DFS, and more",
    "dynamic-programming": "Optimized recursive solutions with memoization",
    "greedy-algorithms": "Locally optimal choices for global solutions",
  };

  const topicExamples: Record<string, string[]> = {
    searching: ["Linear Search", "Binary Search", "Jump Search"],
    stacks: ["Push/Pop", "Balanced Parentheses", "Expression Evaluation"],
    queues: ["Enqueue/Dequeue", "Circular Queue", "Priority Queue"],
    "linked-lists": ["Singly Linked", "Doubly Linked", "Circular"],
    recursion: ["Factorial", "Fibonacci", "Tower of Hanoi"],
    trees: ["Binary Tree", "BST", "AVL Tree"],
    heaps: ["Min Heap", "Max Heap", "Heapify"],
    hashing: ["Hash Tables", "Collision Handling", "Hash Maps"],
    graphs: ["BFS", "DFS", "Dijkstra"],
    "dynamic-programming": ["Memoization", "Tabulation", "Knapsack"],
    "greedy-algorithms": ["Activity Selection", "Huffman Coding", "Fractional Knapsack"],
  };
  const topicName = topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <span className="text-6xl mb-4 block">{topicIcons[topic] || "📦"}</span>
      <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
        {topicName}
      </h1>
      <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
        {topicDescriptions[topic] || "Explore algorithms and data structures"}
      </p>

      {/* Preview of upcoming algorithms */}
      {topicExamples[topic] && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {topicExamples[topic].map((example) => (
            <span
              key={example}
              className="px-3 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm"
            >
              {example}
            </span>
          ))}
        </div>
      )}

      <div className="inline-block px-6 py-3 rounded-xl bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/30">
        <p className="text-[var(--color-primary-500)] font-medium">🚧 Coming Soon</p>
        <p className="text-xs text-[var(--text-tertiary)] mt-1">Algorithms will be added in future updates</p>
      </div>

      <div className="mt-8">
        <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline">
          ← Back to Topics
        </Link>
      </div>
    </div>
  );
}

