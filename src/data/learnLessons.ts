/**
 * Centralized Learn Lesson Configuration
 * This is the SINGLE SOURCE OF TRUTH for all lesson data.
 * 
 * To add a new algorithm:
 * 1. Add entry to the appropriate topic array
 * 2. If lesson content exists, set hasContent: true
 * 3. Navigation order follows array order
 */

// =============================================================================
// Types
// =============================================================================

export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  hasContent?: boolean; // true if full lesson component exists
}

export type TopicKey =
  | "arrays"
  | "strings"
  | "sorting"
  | "searching"
  | "stacks"
  | "queues"
  | "linked-lists"
  | "recursion"
  | "trees"
  | "heaps"
  | "hashing"
  | "graphs"
  | "dynamic-programming"
  | "greedy-algorithms";

export const validTopics: TopicKey[] = [
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
];

// =============================================================================
// Lesson Definitions by Topic
// =============================================================================

export const topicLessons: Record<TopicKey, Lesson[]> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // ARRAYS
  // ─────────────────────────────────────────────────────────────────────────────
  arrays: [
    { slug: "array-operations", title: "Array Operations", duration: "15 min", description: "Insert, delete, update, and traverse arrays", hasContent: true },
    { slug: "two-pointers", title: "Two Pointers", duration: "18 min", description: "Solve array problems using two pointer technique", hasContent: true },
    { slug: "sliding-window", title: "Sliding Window", duration: "20 min", description: "Find subarrays or substrings efficiently", hasContent: true },
    { slug: "prefix-sum", title: "Prefix Sum", duration: "15 min", description: "O(1) range sum queries with preprocessing", hasContent: true },
    { slug: "kadanes", title: "Kadane's Algorithm", duration: "18 min", description: "Find maximum subarray sum in linear time", hasContent: true },
    { slug: "dutch-national-flag", title: "Dutch National Flag", duration: "15 min", description: "Three-way partitioning for sorting 0s, 1s, and 2s", hasContent: false },
    { slug: "moores-voting", title: "Moore's Voting", duration: "12 min", description: "Find majority element in linear time", hasContent: false },
    { slug: "merge-sorted-arrays", title: "Merge Sorted Arrays", duration: "15 min", description: "Merge two sorted arrays efficiently", hasContent: false },
    { slug: "rotate-array", title: "Rotate Array", duration: "12 min", description: "Rotate array elements by k positions", hasContent: false },
    { slug: "rearrangement", title: "Rearrangement", duration: "15 min", description: "Rearrange array elements in specific patterns", hasContent: false },
    { slug: "next-permutation", title: "Next Permutation", duration: "18 min", description: "Find next lexicographically greater permutation", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // STRINGS
  // ─────────────────────────────────────────────────────────────────────────────
  strings: [
    { slug: "string-operations", title: "String Operations", duration: "12 min", description: "Traverse, reverse, and compare strings", hasContent: true },
    { slug: "character-frequency", title: "Character Frequency", duration: "10 min", description: "Count occurrences of characters", hasContent: true },
    { slug: "brute-force-search", title: "Brute Force Search", duration: "12 min", description: "Simple pattern matching algorithm", hasContent: true },
    { slug: "kmp-algorithm", title: "KMP Algorithm", duration: "25 min", description: "Efficient pattern matching with LPS array", hasContent: true },
    { slug: "anagram-detection", title: "Anagram Detection", duration: "15 min", description: "Check if strings are anagrams", hasContent: true },
    { slug: "rabin-karp", title: "Rabin-Karp", duration: "20 min", description: "Pattern matching using rolling hash", hasContent: false },
    { slug: "z-algorithm", title: "Z-Algorithm", duration: "18 min", description: "Linear time pattern matching using Z-array", hasContent: false },
    { slug: "boyer-moore", title: "Boyer-Moore", duration: "22 min", description: "Efficient pattern matching with bad character rule", hasContent: false },
    { slug: "longest-palindrome", title: "Longest Palindrome", duration: "20 min", description: "Find longest palindromic substring", hasContent: false },
    { slug: "longest-common-substr", title: "Longest Common Substring", duration: "18 min", description: "Find longest common substring of two strings", hasContent: false },
    { slug: "string-rotation", title: "String Rotation", duration: "10 min", description: "Check if one string is rotation of another", hasContent: false },
    { slug: "remove-duplicates", title: "Remove Duplicates", duration: "12 min", description: "Remove duplicate characters from string", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // SORTING
  // ─────────────────────────────────────────────────────────────────────────────
  sorting: [
    { slug: "bubble-sort", title: "Bubble Sort", duration: "15 min", description: "The simplest sorting algorithm - compare and swap adjacent elements", hasContent: true },
    { slug: "selection-sort", title: "Selection Sort", duration: "12 min", description: "Find the minimum element and place it at the beginning", hasContent: true },
    { slug: "insertion-sort", title: "Insertion Sort", duration: "12 min", description: "Build sorted array one element at a time", hasContent: true },
    { slug: "merge-sort", title: "Merge Sort", duration: "20 min", description: "Divide and conquer with O(n log n) guarantee", hasContent: true },
    { slug: "quick-sort", title: "Quick Sort", duration: "25 min", description: "Efficient in-place sorting using partitioning", hasContent: true },
    { slug: "cocktail-shaker", title: "Cocktail Shaker", duration: "15 min", description: "Bidirectional bubble sort variation", hasContent: false },
    { slug: "shell-sort", title: "Shell Sort", duration: "18 min", description: "Generalized insertion sort with gap sequences", hasContent: false },
    { slug: "cycle-sort", title: "Cycle Sort", duration: "15 min", description: "Optimal in terms of memory writes", hasContent: false },
    { slug: "heap-sort", title: "Heap Sort", duration: "20 min", description: "O(n log n) in-place sorting using heaps", hasContent: false },
    { slug: "tim-sort", title: "Tim Sort", duration: "25 min", description: "Hybrid stable sorting used in Python and Java", hasContent: false },
    { slug: "intro-sort", title: "Intro Sort", duration: "22 min", description: "Hybrid of quicksort, heapsort, and insertion sort", hasContent: false },
    { slug: "counting-sort", title: "Counting Sort", duration: "15 min", description: "Non-comparison O(n+k) sorting for integers", hasContent: false },
    { slug: "radix-sort", title: "Radix Sort", duration: "18 min", description: "Sort integers digit by digit", hasContent: false },
    { slug: "bucket-sort", title: "Bucket Sort", duration: "15 min", description: "Distribute elements into buckets then sort", hasContent: false },
    { slug: "pigeonhole-sort", title: "Pigeonhole Sort", duration: "12 min", description: "Sorting when key range is small", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // SEARCHING
  // ─────────────────────────────────────────────────────────────────────────────
  searching: [
    { slug: "linear-search", title: "Linear Search", duration: "8 min", description: "Sequential search through all elements", hasContent: true },
    { slug: "binary-search", title: "Binary Search", duration: "18 min", description: "O(log n) search in sorted arrays", hasContent: true },
    { slug: "lower-bound", title: "Lower Bound", duration: "12 min", description: "Find first occurrence of target", hasContent: true },
    { slug: "upper-bound", title: "Upper Bound", duration: "12 min", description: "Find last occurrence of target", hasContent: true },
    { slug: "peak-element", title: "Peak Element", duration: "15 min", description: "Find local maximum in array", hasContent: true },
    { slug: "sentinel-linear-search", title: "Sentinel Linear Search", duration: "10 min", description: "Optimized linear search with sentinel", hasContent: false },
    { slug: "bidirectional-search", title: "Bidirectional Search", duration: "15 min", description: "Search from both ends simultaneously", hasContent: false },
    { slug: "search-insert-position", title: "Search Insert Position", duration: "12 min", description: "Find position to insert in sorted array", hasContent: false },
    { slug: "rotated-array-search", title: "Rotated Array Search", duration: "18 min", description: "Binary search in rotated sorted array", hasContent: false },
    { slug: "rotated-array-minimum", title: "Rotated Array Minimum", duration: "15 min", description: "Find minimum in rotated sorted array", hasContent: false },
    { slug: "jump-search", title: "Jump Search", duration: "12 min", description: "Block-based searching algorithm", hasContent: false },
    { slug: "interpolation-search", title: "Interpolation Search", duration: "15 min", description: "Improved binary search for uniform distribution", hasContent: false },
    { slug: "exponential-search", title: "Exponential Search", duration: "15 min", description: "Find range then binary search", hasContent: false },
    { slug: "fibonacci-search", title: "Fibonacci Search", duration: "18 min", description: "Divide array by Fibonacci numbers", hasContent: false },
    { slug: "ternary-search", title: "Ternary Search", duration: "15 min", description: "Find maximum/minimum in unimodal function", hasContent: false },
    { slug: "matrix-binary-search", title: "Matrix Binary Search", duration: "18 min", description: "Search in row and column sorted matrix", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // STACKS
  // ─────────────────────────────────────────────────────────────────────────────
  stacks: [
    { slug: "stack-operations", title: "Stack Operations", duration: "12 min", description: "Push, pop, peek - LIFO fundamentals", hasContent: true },
    { slug: "balanced-parentheses", title: "Balanced Parentheses", duration: "15 min", description: "Check if brackets are balanced", hasContent: true },
    { slug: "infix-to-postfix", title: "Infix to Postfix", duration: "20 min", description: "Convert expressions using Shunting Yard", hasContent: true },
    { slug: "next-greater-element", title: "Next Greater Element", duration: "18 min", description: "Monotonic stack pattern", hasContent: true },
    { slug: "postfix-evaluation", title: "Postfix Evaluation", duration: "15 min", description: "Evaluate postfix expressions using stack", hasContent: false },
    { slug: "prefix-evaluation", title: "Prefix Evaluation", duration: "15 min", description: "Evaluate prefix expressions using stack", hasContent: false },
    { slug: "infix-to-prefix", title: "Infix to Prefix", duration: "18 min", description: "Convert infix to prefix notation", hasContent: false },
    { slug: "next-smaller-element", title: "Next Smaller Element", duration: "15 min", description: "Find next smaller element for each position", hasContent: false },
    { slug: "stock-span", title: "Stock Span", duration: "18 min", description: "Calculate stock span using stack", hasContent: false },
    { slug: "largest-rectangle", title: "Largest Rectangle", duration: "22 min", description: "Largest rectangle in histogram", hasContent: false },
    { slug: "valid-stack-sequences", title: "Valid Stack Sequences", duration: "15 min", description: "Validate push and pop sequences", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // QUEUES
  // ─────────────────────────────────────────────────────────────────────────────
  queues: [
    { slug: "queue-operations", title: "Queue Operations", duration: "12 min", description: "Enqueue, dequeue - FIFO fundamentals", hasContent: true },
    { slug: "circular-queue", title: "Circular Queue", duration: "15 min", description: "Fixed-size queue with wrap-around", hasContent: true },
    { slug: "priority-queue", title: "Priority Queue", duration: "18 min", description: "Priority-based dequeue order", hasContent: true },
    { slug: "lru-cache", title: "LRU Cache", duration: "25 min", description: "Least recently used eviction policy", hasContent: true },
    { slug: "deque", title: "Deque", duration: "15 min", description: "Double-ended queue operations", hasContent: false },
    { slug: "queue-using-two-stacks", title: "Queue using Two Stacks", duration: "15 min", description: "Implement queue using two stacks", hasContent: false },
    { slug: "stack-using-two-queues", title: "Stack using Two Queues", duration: "15 min", description: "Implement stack using two queues", hasContent: false },
    { slug: "sliding-window-maximum", title: "Sliding Window Maximum", duration: "20 min", description: "Find maximum in each sliding window", hasContent: false },
    { slug: "first-non-repeating-char", title: "First Non-Repeating Char", duration: "15 min", description: "Find first non-repeating character in stream", hasContent: false },
    { slug: "generate-binary-numbers", title: "Generate Binary Numbers", duration: "12 min", description: "Generate binary numbers using queue", hasContent: false },
    { slug: "circular-tour", title: "Circular Tour", duration: "18 min", description: "Find starting point for circular tour", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LINKED LISTS
  // ─────────────────────────────────────────────────────────────────────────────
  "linked-lists": [
    { slug: "singly-linked-list", title: "Singly Linked List", duration: "18 min", description: "Insert, delete, traverse operations", hasContent: true },
    { slug: "reverse-linked-list", title: "Reverse Linked List", duration: "15 min", description: "Iterative and recursive reversal", hasContent: true },
    { slug: "detect-cycle", title: "Detect Cycle", duration: "15 min", description: "Floyd's cycle detection algorithm", hasContent: true },
    { slug: "find-middle", title: "Find Middle Element", duration: "12 min", description: "Two-pointer slow & fast technique", hasContent: true },
    { slug: "doubly-linked-list", title: "Doubly Linked List", duration: "20 min", description: "Bidirectional linked list operations", hasContent: false },
    { slug: "circular-linked-list", title: "Circular Linked List", duration: "15 min", description: "Linked list with tail pointing to head", hasContent: false },
    { slug: "circular-doubly-linked-list", title: "Circular Doubly Linked List", duration: "18 min", description: "Circular list with bidirectional links", hasContent: false },
    { slug: "merge-sorted-lists", title: "Merge Sorted Lists", duration: "15 min", description: "Merge two sorted linked lists", hasContent: false },
    { slug: "find-cycle-start", title: "Find Cycle Start", duration: "15 min", description: "Find starting node of cycle", hasContent: false },
    { slug: "remove-nth-from-end", title: "Remove N-th from End", duration: "12 min", description: "Remove nth node from end in one pass", hasContent: false },
    { slug: "palindrome-check", title: "Palindrome Check", duration: "15 min", description: "Check if linked list is palindrome", hasContent: false },
    { slug: "intersection-point", title: "Intersection Point", duration: "15 min", description: "Find intersection of two linked lists", hasContent: false },
    { slug: "rotate-list", title: "Rotate List", duration: "12 min", description: "Rotate linked list by k positions", hasContent: false },
    { slug: "flatten-multilevel-list", title: "Flatten Multilevel List", duration: "20 min", description: "Flatten a multilevel doubly linked list", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // RECURSION
  // ─────────────────────────────────────────────────────────────────────────────
  recursion: [
    { slug: "factorial", title: "Factorial", duration: "10 min", description: "Classic recursive calculation", hasContent: true },
    { slug: "fibonacci", title: "Fibonacci Sequence", duration: "15 min", description: "Generate nth Fibonacci number", hasContent: true },
    { slug: "tower-of-hanoi", title: "Tower of Hanoi", duration: "20 min", description: "Classic recursion puzzle", hasContent: true },
    { slug: "n-queens", title: "N-Queens", duration: "30 min", description: "Place N queens without conflicts", hasContent: true },
    { slug: "sum-of-digits", title: "Sum of Digits", duration: "10 min", description: "Calculate sum of digits recursively", hasContent: false },
    { slug: "power-function", title: "Power Function", duration: "12 min", description: "Calculate power using recursion", hasContent: false },
    { slug: "gcd-euclidean", title: "GCD (Euclidean)", duration: "12 min", description: "Find GCD using Euclidean algorithm", hasContent: false },
    { slug: "binary-search-recursive", title: "Binary Search (Recursive)", duration: "15 min", description: "Recursive binary search implementation", hasContent: false },
    { slug: "sudoku-solver", title: "Sudoku Solver", duration: "30 min", description: "Solve Sudoku using backtracking", hasContent: false },
    { slug: "rat-in-maze", title: "Rat in a Maze", duration: "25 min", description: "Find path in maze using backtracking", hasContent: false },
    { slug: "generate-permutations", title: "Generate Permutations", duration: "20 min", description: "Generate all permutations of array", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // TREES
  // ─────────────────────────────────────────────────────────────────────────────
  trees: [
    { slug: "tree-traversals", title: "Tree Traversals", duration: "25 min", description: "Inorder, preorder, postorder, level-order", hasContent: true },
    { slug: "tree-height", title: "Tree Height", duration: "12 min", description: "Calculate maximum depth", hasContent: true },
    { slug: "bst-operations", title: "BST Operations", duration: "25 min", description: "Insert, search, find min/max", hasContent: true },
    { slug: "lowest-common-ancestor", title: "Lowest Common Ancestor", duration: "20 min", description: "Find LCA of two nodes", hasContent: true },
    { slug: "is-balanced", title: "Is Balanced", duration: "15 min", description: "Check if tree is height-balanced", hasContent: false },
    { slug: "is-valid-bst", title: "Is Valid BST", duration: "15 min", description: "Validate binary search tree property", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // HEAPS
  // ─────────────────────────────────────────────────────────────────────────────
  heaps: [
    { slug: "heap-structure", title: "Heap Structure", duration: "15 min", description: "Complete binary tree with heap property", hasContent: true },
    { slug: "heapify", title: "Heapify Operation", duration: "18 min", description: "Convert an array into a heap in O(n)", hasContent: true },
    { slug: "max-heap", title: "Max Heap", duration: "20 min", description: "Insert, extract max, heapify", hasContent: true },
    { slug: "min-heap", title: "Min Heap", duration: "18 min", description: "Insert, extract min operations", hasContent: true },
    { slug: "build-heap", title: "Build Heap", duration: "15 min", description: "O(n) bottom-up heapification", hasContent: true },
    { slug: "heap-sort", title: "Heap Sort", duration: "20 min", description: "O(n log n) in-place sorting using heaps", hasContent: true },
    { slug: "kth-largest", title: "K-th Largest Element", duration: "18 min", description: "Find k-th largest using min-heap", hasContent: true },
    { slug: "kth-smallest", title: "K-th Smallest Element", duration: "18 min", description: "Find k-th smallest using max-heap", hasContent: false },
    { slug: "merge-k-sorted-lists", title: "Merge K Sorted Lists", duration: "22 min", description: "Merge k sorted lists using heap", hasContent: false },
    { slug: "median-of-stream", title: "Median of Stream", duration: "25 min", description: "Running median with two heaps", hasContent: true },
    { slug: "top-k-frequent", title: "Top K Frequent Elements", duration: "20 min", description: "Find k most frequent elements", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // HASHING
  // ─────────────────────────────────────────────────────────────────────────────
  hashing: [
    { slug: "hash-functions", title: "Hash Functions", duration: "15 min", description: "Division and multiplication methods", hasContent: true },
    { slug: "chaining", title: "Chaining Hash Table", duration: "18 min", description: "Collision handling with linked lists", hasContent: true },
    { slug: "open-addressing", title: "Open Addressing", duration: "20 min", description: "Linear, quadratic, double hashing", hasContent: true },
    { slug: "rehashing", title: "Rehashing", duration: "15 min", description: "Dynamic resizing of hash tables", hasContent: false },
    { slug: "two-sum-hashmap", title: "Two Sum (HashMap)", duration: "15 min", description: "Find pair with given sum", hasContent: true },
    { slug: "group-anagrams", title: "Group Anagrams", duration: "18 min", description: "Group strings that are anagrams", hasContent: false },
    { slug: "longest-consecutive", title: "Longest Consecutive", duration: "18 min", description: "Find longest consecutive sequence", hasContent: false },
    { slug: "subarray-zero-sum", title: "Subarray Zero Sum", duration: "15 min", description: "Find subarray with zero sum", hasContent: false },
    { slug: "count-distinct-window", title: "Count Distinct Window", duration: "18 min", description: "Count distinct elements in window", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // GRAPHS
  // ─────────────────────────────────────────────────────────────────────────────
  graphs: [
    { slug: "graph-representation", title: "Graph Representations", duration: "18 min", description: "Adjacency matrix and list", hasContent: true },
    { slug: "bfs", title: "Breadth-First Search", duration: "22 min", description: "Explore graph layer by layer", hasContent: true },
    { slug: "dfs", title: "Depth-First Search", duration: "22 min", description: "Explore graph by going deep first", hasContent: true },
    { slug: "cycle-detection", title: "Cycle Detection", duration: "18 min", description: "Detect cycles in graphs", hasContent: true },
    { slug: "dijkstra", title: "Dijkstra's Algorithm", duration: "30 min", description: "Shortest path with non-negative weights", hasContent: true },
    { slug: "bellman-ford", title: "Bellman-Ford Algorithm", duration: "25 min", description: "Shortest path with negative weights", hasContent: true },
    { slug: "floyd-warshall", title: "Floyd-Warshall Algorithm", duration: "25 min", description: "All-pairs shortest paths", hasContent: false },
    { slug: "a-star", title: "A* Search Algorithm", duration: "28 min", description: "Heuristic-based pathfinding", hasContent: false },
    { slug: "kruskals", title: "Kruskal's Algorithm", duration: "22 min", description: "Minimum spanning tree using edges", hasContent: false },
    { slug: "prims", title: "Prim's Algorithm", duration: "22 min", description: "Minimum spanning tree using vertices", hasContent: false },
    { slug: "kahns-topological", title: "Kahn's Topological Sort", duration: "20 min", description: "BFS-based topological sorting", hasContent: false },
    { slug: "dfs-topological", title: "DFS Topological Sort", duration: "18 min", description: "DFS-based topological sorting", hasContent: false },
    { slug: "connected-components", title: "Connected Components", duration: "18 min", description: "Find connected components in graph", hasContent: false },
    { slug: "cycle-detection-undirected", title: "Cycle Detection (Undirected)", duration: "18 min", description: "Detect cycle in undirected graph", hasContent: false },
    { slug: "cycle-detection-directed", title: "Cycle Detection (Directed)", duration: "18 min", description: "Detect cycle in directed graph", hasContent: false },
    { slug: "kosarajus", title: "Kosaraju's Algorithm", duration: "25 min", description: "Find strongly connected components", hasContent: false },
    { slug: "tarjans", title: "Tarjan's Algorithm", duration: "28 min", description: "Find SCCs and bridges", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // DYNAMIC PROGRAMMING
  // ─────────────────────────────────────────────────────────────────────────────
  "dynamic-programming": [
    { slug: "fibonacci-dp", title: "Fibonacci (DP)", duration: "15 min", description: "Tabulation approach O(n)", hasContent: true },
    { slug: "climbing-stairs", title: "Climbing Stairs", duration: "15 min", description: "Ways to climb n stairs", hasContent: true },
    { slug: "knapsack-01", title: "0/1 Knapsack", duration: "30 min", description: "Maximize value within weight limit", hasContent: true },
    { slug: "lcs", title: "Longest Common Subsequence", duration: "28 min", description: "LCS of two strings", hasContent: true },
    { slug: "edit-distance", title: "Edit Distance", duration: "30 min", description: "Min operations to transform string", hasContent: true },
    { slug: "coin-change", title: "Coin Change", duration: "25 min", description: "Minimum coins to make amount", hasContent: true },
    { slug: "house-robber", title: "House Robber", duration: "18 min", description: "Maximum robbery without adjacent houses", hasContent: false },
    { slug: "lis", title: "Longest Increasing Subsequence", duration: "22 min", description: "Find LIS length and sequence", hasContent: false },
    { slug: "matrix-chain", title: "Matrix Chain Multiplication", duration: "28 min", description: "Optimal matrix multiplication order", hasContent: false },
    { slug: "unique-paths", title: "Unique Paths", duration: "18 min", description: "Count paths in grid", hasContent: false },
    { slug: "minimum-path-sum", title: "Minimum Path Sum", duration: "18 min", description: "Find minimum path sum in grid", hasContent: false },
    { slug: "subset-sum", title: "Subset Sum", duration: "22 min", description: "Check if subset with given sum exists", hasContent: false },
    { slug: "partition-equal-subset", title: "Partition Equal Subset", duration: "22 min", description: "Partition array into equal sum subsets", hasContent: false },
    { slug: "rod-cutting", title: "Rod Cutting", duration: "22 min", description: "Maximize profit from rod cutting", hasContent: false },
    { slug: "word-break", title: "Word Break", duration: "20 min", description: "Segment string into dictionary words", hasContent: false },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // GREEDY ALGORITHMS
  // ─────────────────────────────────────────────────────────────────────────────
  "greedy-algorithms": [
    { slug: "activity-selection", title: "Activity Selection", duration: "20 min", description: "Select max non-overlapping activities", hasContent: true },
    { slug: "fractional-knapsack", title: "Fractional Knapsack", duration: "18 min", description: "Maximum value with item fractions", hasContent: true },
    { slug: "huffman-coding", title: "Huffman Coding", duration: "30 min", description: "Build optimal prefix-free codes", hasContent: true },
    { slug: "merge-intervals", title: "Merge Intervals", duration: "18 min", description: "Merge overlapping intervals", hasContent: true },
    { slug: "job-sequencing", title: "Job Sequencing", duration: "20 min", description: "Maximize profit with job deadlines", hasContent: false },
    { slug: "meeting-rooms", title: "Meeting Rooms", duration: "15 min", description: "Minimum rooms for all meetings", hasContent: false },
    { slug: "minimum-platforms", title: "Minimum Platforms", duration: "18 min", description: "Minimum platforms for train schedule", hasContent: false },
    { slug: "insert-interval", title: "Insert Interval", duration: "18 min", description: "Insert and merge new interval", hasContent: false },
    { slug: "non-overlapping-intervals", title: "Non-Overlapping Intervals", duration: "18 min", description: "Remove minimum intervals to avoid overlap", hasContent: false },
  ],
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get lessons for a specific topic
 */
export function getLessonsByTopic(topic: string): Lesson[] {
  return topicLessons[topic as TopicKey] || [];
}

/**
 * Get lesson metadata by slug (searches all topics)
 */
export function getLessonMetadata(slug: string): Lesson | undefined {
  for (const lessons of Object.values(topicLessons)) {
    const found = lessons.find(l => l.slug === slug);
    if (found) return found;
  }
  return undefined;
}

/**
 * Get adjacent lessons for navigation
 */
export function getAdjacentLessons(topic: string, currentLesson: string): { prev: string | null; next: string | null } {
  const lessons = topicLessons[topic as TopicKey];
  if (!lessons) return { prev: null, next: null };

  const currentIndex = lessons.findIndex(l => l.slug === currentLesson);
  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1].slug : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1].slug : null,
  };
}

/**
 * Get total lesson count for a topic
 */
export function getLessonCount(topic: string): number {
  return topicLessons[topic as TopicKey]?.length || 0;
}

/**
 * Check if a topic is valid
 */
export function isValidTopic(topic: string): topic is TopicKey {
  return validTopics.includes(topic as TopicKey);
}
