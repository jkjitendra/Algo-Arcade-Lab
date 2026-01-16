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

const treesTiers = [
  {
    name: "Tier 1: Tree Traversals",
    description: "Fundamental ways to visit all nodes in a tree",
    algorithms: ["inorder-traversal", "preorder-traversal", "postorder-traversal", "level-order-traversal"],
  },
  {
    name: "Tier 2: Tree Properties",
    description: "Calculate essential tree metrics",
    algorithms: ["tree-height"],
  },
  {
    name: "Tier 3: Tree Validation",
    description: "Verify tree properties and structure",
    algorithms: ["is-balanced", "is-bst"],
  },
  {
    name: "Tier 4: BST Operations",
    description: "Binary Search Tree algorithms",
    algorithms: ["bst-operations", "lowest-common-ancestor"],
  },
];

const heapsTiers = [
  {
    name: "Tier 1: Core Operations",
    description: "Fundamental heap data structure operations",
    algorithms: ["max-heap", "min-heap", "build-heap"],
  },
  {
    name: "Tier 2: K-th Element Problems",
    description: "Finding k-th largest/smallest using heaps",
    algorithms: ["kth-largest", "kth-smallest"],
  },
  {
    name: "Tier 3: Advanced Applications",
    description: "Complex heap-based algorithms",
    algorithms: ["merge-k-sorted-lists", "top-k-frequent", "median-of-stream"],
  },
];

const hashingTiers = [
  {
    name: "Tier 1: Hash Table Fundamentals",
    description: "Core hash table operations and collision handling",
    algorithms: ["hash-functions", "chaining-hash-table", "open-addressing-hash-table", "rehashing"],
  },
  {
    name: "Tier 2: Hash Applications",
    description: "Using hashing to solve algorithmic problems",
    algorithms: ["two-sum-hashmap", "group-anagrams", "longest-consecutive-sequence", "subarray-zero-sum", "count-distinct-window"],
  },
];

const graphsTiers = [
  {
    name: "Tier 1: Graph Representation",
    description: "Visualize graph data using different memory representations",
    algorithms: ["adjacency-matrix", "adjacency-list"],
  },
  {
    name: "Tier 2: Graph Traversals",
    description: "Fundamental search algorithms for exploring graphs",
    algorithms: ["bfs", "dfs"],
  },
  {
    name: "Tier 3: Shortest Path Algorithms",
    description: "Finding optimal paths in weighted and unweighted graphs",
    algorithms: ["dijkstra", "bellman-ford", "floyd-warshall", "astar"],
  },
  {
    name: "Tier 4: Minimum Spanning Tree",
    description: "Connecting all nodes with minimum total edge weight",
    algorithms: ["kruskal", "prim"],
  },
  {
    name: "Tier 5: Topological Sorting",
    description: "Linear ordering of vertices in Directed Acyclic Graphs",
    algorithms: ["kahns", "dfs-topo-sort"],
  },
  {
    name: "Tier 6: Connectivity & Cycle Detection",
    description: "Detecting cycles, finding connected components, bridges, and SCCs",
    algorithms: ["connected-components", "cycle-undirected", "cycle-directed", "kosaraju", "tarjan"],
  },
];

const dpTiers = [
  {
    name: "Tier 1: 1D DP Problems",
    description: "Simple linear DP with single-dimensional state",
    algorithms: ["fibonacci-dp", "climbing-stairs", "house-robber", "lis", "coin-change"],
  },
  {
    name: "Tier 2: 2D DP Problems",
    description: "Classic problems with two-dimensional state tables",
    algorithms: ["knapsack-01", "lcs", "edit-distance", "matrix-chain-multiplication", "unique-paths", "min-path-sum"],
  },
  {
    name: "Tier 3: Advanced DP",
    description: "Complex DP patterns including subset and partition problems",
    algorithms: ["subset-sum", "partition-equal-subset-sum", "rod-cutting", "word-break"],
  },
];

const greedyTiers = [
  {
    name: "Tier 1: Activity Selection & Scheduling",
    description: "Classic greedy problems with timeline-based solutions",
    algorithms: ["activity-selection", "job-sequencing", "meeting-rooms"],
  },
  {
    name: "Tier 2: Optimization Problems",
    description: "Greedy optimization with value maximization",
    algorithms: ["fractional-knapsack", "huffman-coding", "minimum-platforms"],
  },
  {
    name: "Tier 3: Interval Problems",
    description: "Interval merging and overlap resolution",
    algorithms: ["merge-intervals", "insert-interval", "non-overlapping-intervals"],
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
  // Trees
  "inorder-traversal": "Inorder Traversal",
  "preorder-traversal": "Preorder Traversal",
  "postorder-traversal": "Postorder Traversal",
  "level-order-traversal": "Level Order (BFS)",
  "tree-height": "Tree Height",
  "is-balanced": "Is Balanced?",
  "is-bst": "Is Valid BST?",
  "bst-operations": "BST Operations",
  "lowest-common-ancestor": "Lowest Common Ancestor",
  // Heaps
  "max-heap": "Max Heap",
  "min-heap": "Min Heap",
  "build-heap": "Build Heap",
  "kth-largest": "K-th Largest Element",
  "kth-smallest": "K-th Smallest Element",
  "merge-k-sorted-lists": "Merge K Sorted Lists",
  "top-k-frequent": "Top K Frequent Elements",
  "median-of-stream": "Median of Stream",
  // Hashing
  "hash-functions": "Hash Functions",
  "chaining-hash-table": "Chaining Hash Table",
  "open-addressing-hash-table": "Open Addressing",
  "rehashing": "Rehashing",
  "two-sum-hashmap": "Two Sum (HashMap)",
  "group-anagrams": "Group Anagrams",
  "longest-consecutive-sequence": "Longest Consecutive",
  "subarray-zero-sum": "Subarray Zero Sum",
  "count-distinct-window": "Count Distinct Window",
  // Graphs
  "adjacency-matrix": "Adjacency Matrix",
  "adjacency-list": "Adjacency List",
  "bfs": "Breadth-First Search",
  "dfs": "Depth-First Search",
  "dijkstra": "Dijkstra's Algorithm",
  "bellman-ford": "Bellman-Ford Algorithm",
  "floyd-warshall": "Floyd-Warshall Algorithm",
  "astar": "A* Search Algorithm",
  "kruskal": "Kruskal's Algorithm",
  "prim": "Prim's Algorithm",
  "kahns": "Kahn's Topological Sort",
  "dfs-topo-sort": "DFS Topological Sort",
  "connected-components": "Connected Components",
  "cycle-undirected": "Cycle Detection (Undirected)",
  "cycle-directed": "Cycle Detection (Directed)",
  "kosaraju": "Kosaraju's Algorithm",
  "tarjan": "Tarjan's Algorithm",
  // Dynamic Programming
  "fibonacci-dp": "Fibonacci (DP)",
  "climbing-stairs": "Climbing Stairs",
  "house-robber": "House Robber",
  "lis": "Longest Increasing Subsequence",
  "coin-change": "Coin Change",
  "knapsack-01": "0/1 Knapsack",
  "lcs": "Longest Common Subsequence",
  "edit-distance": "Edit Distance",
  "matrix-chain-multiplication": "Matrix Chain Mult.",
  "unique-paths": "Unique Paths",
  "min-path-sum": "Minimum Path Sum",
  "subset-sum": "Subset Sum",
  "partition-equal-subset-sum": "Partition Equal Subset",
  "rod-cutting": "Rod Cutting",
  "word-break": "Word Break",
  // Greedy Algorithms
  "activity-selection": "Activity Selection",
  "job-sequencing": "Job Sequencing",
  "meeting-rooms": "Meeting Rooms",
  "fractional-knapsack": "Fractional Knapsack",
  "huffman-coding": "Huffman Coding",
  "minimum-platforms": "Minimum Platforms",
  "merge-intervals": "Merge Intervals",
  "insert-interval": "Insert Interval",
  "non-overlapping-intervals": "Non-overlapping Intervals",
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
  // Trees
  "inorder-traversal": "Left → Root → Right (sorted for BST)",
  "preorder-traversal": "Root → Left → Right (copy tree)",
  "postorder-traversal": "Left → Right → Root (delete tree)",
  "level-order-traversal": "BFS level by level traversal",
  "tree-height": "Maximum depth from root to leaf",
  "is-balanced": "Height diff ≤ 1 at every node",
  "is-bst": "Validate BST property with ranges",
  "bst-operations": "Insert, Search, Find Min/Max",
  "lowest-common-ancestor": "Find LCA of two nodes",
  // Heaps
  "max-heap": "Insert, Extract Max, Build Heap operations",
  "min-heap": "Insert, Extract Min, Build Heap operations",
  "build-heap": "Convert array to heap (O(n) bottom-up)",
  "kth-largest": "Find k-th largest using min-heap of size k",
  "kth-smallest": "Find k-th smallest using max-heap of size k",
  "merge-k-sorted-lists": "Merge k sorted lists efficiently",
  "top-k-frequent": "Find k most frequent elements",
  "median-of-stream": "Running median with two heaps",
  // Hashing
  "hash-functions": "Division and multiplication hash methods",
  "chaining-hash-table": "Collision handling with linked lists",
  "open-addressing-hash-table": "Linear, quadratic, double hashing",
  "rehashing": "Resize table when load factor exceeds threshold",
  "two-sum-hashmap": "Find pair with given sum using HashMap",
  "group-anagrams": "Group strings by sorted key pattern",
  "longest-consecutive-sequence": "Find longest consecutive elements",
  "subarray-zero-sum": "Find subarray with prefix sum matching",
  "count-distinct-window": "Distinct elements in sliding window",
  // Graphs
  "adjacency-matrix": "Represent graph as a 2D matrix",
  "adjacency-list": "Represent graph using linked lists/arrays",
  "bfs": "Explore graph layer by layer",
  "dfs": "Explore graph by going deep first",
  "dijkstra": "Shortest path with non-negative weights",
  "bellman-ford": "Shortest path with negative weights support",
  "floyd-warshall": "All-pairs shortest paths",
  "astar": "Heuristic-based shortest path finder",
  "kruskal": "Minimum Spanning Tree using edges",
  "prim": "Minimum Spanning Tree using nodes",
  "kahns": "Topological sort using in-degrees",
  "dfs-topo-sort": "Topological sort using finish times",
  "connected-components": "Find isolated subgraphs",
  "cycle-undirected": "Detect cycles using DFS with parent tracking",
  "cycle-directed": "Detect cycles using three-color DFS",
  "kosaraju": "Strongly Connected Components",
  "tarjan": "Find Bridges in O(V+E)",
  // Dynamic Programming
  "fibonacci-dp": "Tabulation approach O(n)",
  "climbing-stairs": "Ways to climb n stairs (1-2 steps)",
  "house-robber": "Max sum of non-adjacent elements",
  "lis": "Find longest increasing subsequence",
  "coin-change": "Minimum coins to make amount",
  "knapsack-01": "Maximize value within weight limit",
  "lcs": "Longest common subsequence of two strings",
  "edit-distance": "Min operations to transform string",
  "matrix-chain-multiplication": "Optimal matrix multiplication order",
  "unique-paths": "Count paths in grid (right/down only)",
  "min-path-sum": "Minimum cost path in grid",
  "subset-sum": "Check if subset sums to target",
  "partition-equal-subset-sum": "Split into two equal-sum subsets",
  "rod-cutting": "Maximize profit from rod pieces",
  "word-break": "Segment string using dictionary",
  // Greedy Algorithms
  "activity-selection": "Select maximum non-overlapping activities",
  "job-sequencing": "Schedule jobs for maximum profit",
  "meeting-rooms": "Minimum rooms for all meetings",
  "fractional-knapsack": "Maximum value with item fractions",
  "huffman-coding": "Build optimal prefix-free codes",
  "minimum-platforms": "Minimum platforms for trains",
  "merge-intervals": "Merge overlapping intervals",
  "insert-interval": "Insert and merge new interval",
  "non-overlapping-intervals": "Minimum removals for non-overlapping",
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

  if (topic === "trees") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🌳</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.trees")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master hierarchical data structures - traversals, properties, BST operations, and more
          </p>
        </div>

        <div className="space-y-10">
          {treesTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=trees`}
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

  if (topic === "heaps") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">⛰️</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.heaps")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master heap data structures - from basic operations to advanced applications like finding median in a stream
          </p>
        </div>

        <div className="space-y-10">
          {heapsTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=heaps`}
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

  if (topic === "hashing") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🔑</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.hashing")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master hash tables and hashing techniques - from collision handling to solving classic interview problems
          </p>
        </div>

        <div className="space-y-10">
          {hashingTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=hashing`}
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

  // Graphs
  if (topic === "graphs") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">🕸️</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.graphs")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master Graph algorithms - from traversals to shortest paths and connectivity
          </p>
        </div>

        <div className="space-y-10">
          {graphsTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=graphs`}
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

  if (topic === "dynamic-programming") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">📋</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.dynamic-programming")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Optimized recursive solutions with memoization and tabulation
          </p>
        </div>

        <div className="space-y-10">
          {dpTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=dp`}
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

  if (topic === "greedy-algorithms") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href={`/${locale}/topics`} className="text-[var(--color-primary-500)] hover:underline text-sm">
            ← Back to Topics
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="text-6xl mb-4 block">⚡</span>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            {t("topics.greedy-algorithms")}
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Master greedy algorithms - locally optimal choices for globally optimal solutions
          </p>
        </div>

        <div className="space-y-10">
          {greedyTiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier.name}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tier.algorithms.map((algo) => (
                  <Link
                    key={algo}
                    href={`/${locale}/visualize?algorithm=${algo}&category=greedy`}
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

