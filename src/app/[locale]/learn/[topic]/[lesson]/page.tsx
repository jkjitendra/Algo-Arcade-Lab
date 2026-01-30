import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, Play } from "lucide-react";
import {
  LearnCard,
  ComplexityTable,
  ExampleBox,
  CodeTabs,
  Callout,
  Analogy,
  StepByStep,
  ArrayDiagram,
  VisualizeLink,
  LessonCompleteButton,
} from "@/ui/components/learn";
import { getLessonMetadata, getAdjacentLessons } from "@/data/learnLessons";

interface LessonPageProps {
  params: Promise<{ locale: string; topic: string; lesson: string }>;
}

// Lesson content metadata
const lessonContent: Record<string, {
  title: string;
  duration: string;
  description: string;
}> = {
  // Sorting
  "bubble-sort": {
    title: "Bubble Sort",
    duration: "15 min",
    description: "The simplest sorting algorithm that repeatedly steps through the list and swaps adjacent elements if they are in the wrong order.",
  },
  "selection-sort": {
    title: "Selection Sort",
    duration: "12 min",
    description: "Find the minimum element in the unsorted part and swap it with the first unsorted position.",
  },
  "insertion-sort": {
    title: "Insertion Sort",
    duration: "12 min",
    description: "Build a sorted array one element at a time by inserting each element in its correct position.",
  },
  "merge-sort": {
    title: "Merge Sort",
    duration: "20 min",
    description: "A divide-and-conquer algorithm that splits the array, sorts each half, and merges them back together.",
  },
  "quick-sort": {
    title: "Quick Sort",
    duration: "25 min",
    description: "An efficient in-place sorting algorithm that uses partitioning around a pivot element.",
  },
  // Searching
  "binary-search": {
    title: "Binary Search",
    duration: "18 min",
    description: "Efficiently find an element in a sorted array by repeatedly dividing the search space in half.",
  },
  "linear-search": {
    title: "Linear Search",
    duration: "8 min",
    description: "The simplest search algorithm that checks each element sequentially until the target is found.",
  },
  // Arrays
  "two-pointers": {
    title: "Two Pointers Technique",
    duration: "18 min",
    description: "A powerful pattern using two pointers to solve array problems efficiently.",
  },
  "array-operations": {
    title: "Array Operations",
    duration: "15 min",
    description: "Fundamental operations: insert, delete, update, search, and traverse.",
  },
  "sliding-window": {
    title: "Sliding Window",
    duration: "20 min",
    description: "A technique for finding subarrays that satisfy certain conditions efficiently.",
  },
  "prefix-sum": {
    title: "Prefix Sum",
    duration: "15 min",
    description: "Precompute cumulative sums for O(1) range sum queries.",
  },
  "kadanes": {
    title: "Kadane's Algorithm",
    duration: "18 min",
    description: "Find the maximum sum subarray in O(n) time using dynamic programming.",
  },
  "dutch-national-flag": {
    title: "Dutch National Flag",
    duration: "15 min",
    description: "Three-way partitioning to sort an array of 0s, 1s, and 2s in a single pass.",
  },
  "moores-voting": {
    title: "Moore's Voting Algorithm",
    duration: "12 min",
    description: "Find the majority element (appearing more than n/2 times) in linear time.",
  },
  "merge-sorted-arrays": {
    title: "Merge Sorted Arrays",
    duration: "15 min",
    description: "Efficiently merge two sorted arrays into one sorted array.",
  },
  "rotate-array": {
    title: "Rotate Array",
    duration: "12 min",
    description: "Rotate array elements by k positions using multiple techniques.",
  },
  "rearrangement": {
    title: "Array Rearrangement",
    duration: "15 min",
    description: "Rearrange array elements in specific patterns like positive/negative alternating.",
  },
  "next-permutation": {
    title: "Next Permutation",
    duration: "18 min",
    description: "Find the next lexicographically greater permutation of an array.",
  },
  // Strings
  "string-operations": {
    title: "String Operations",
    duration: "12 min",
    description: "Fundamental string operations: traversal, reversal, comparison, and manipulation.",
  },
  "character-frequency": {
    title: "Character Frequency",
    duration: "10 min",
    description: "Count character occurrences using arrays or hash maps.",
  },
  "brute-force-search": {
    title: "Brute Force Pattern Matching",
    duration: "12 min",
    description: "Simple pattern matching by checking every possible position.",
  },
  "kmp-algorithm": {
    title: "KMP Algorithm",
    duration: "25 min",
    description: "Efficient pattern matching using the Longest Proper Prefix-Suffix (LPS) array.",
  },
  "anagram-detection": {
    title: "Anagram Detection",
    duration: "15 min",
    description: "Check if two strings are anagrams using sorting or frequency counting.",
  },
  // Searching (additional)
  "lower-bound": {
    title: "Lower Bound",
    duration: "12 min",
    description: "Find the first position where an element could be inserted to keep the array sorted.",
  },
  "upper-bound": {
    title: "Upper Bound",
    duration: "12 min",
    description: "Find the position after the last occurrence of a value in a sorted array.",
  },
  "peak-element": {
    title: "Peak Element",
    duration: "15 min",
    description: "Find a local maximum in an array using binary search in O(log n) time.",
  },
  // Stacks
  "stack-operations": {
    title: "Stack Operations",
    duration: "12 min",
    description: "Push, pop, peek — master the LIFO (Last-In-First-Out) data structure.",
  },
  "balanced-parentheses": {
    title: "Balanced Parentheses",
    duration: "15 min",
    description: "Use a stack to check if brackets are properly matched.",
  },
  "infix-to-postfix": {
    title: "Infix to Postfix",
    duration: "20 min",
    description: "Convert infix expressions using the Shunting Yard algorithm.",
  },
  "next-greater-element": {
    title: "Next Greater Element",
    duration: "18 min",
    description: "Find the next larger element using a monotonic stack.",
  },
  // Queues
  "queue-operations": {
    title: "Queue Operations",
    duration: "12 min",
    description: "Enqueue, dequeue, front — master the FIFO (First-In-First-Out) data structure.",
  },
  "circular-queue": {
    title: "Circular Queue",
    duration: "15 min",
    description: "Efficient queue using a circular array with fixed capacity.",
  },
  "priority-queue": {
    title: "Priority Queue",
    duration: "18 min",
    description: "Elements dequeued by priority, not arrival order. Uses a heap internally.",
  },
  "lru-cache": {
    title: "LRU Cache",
    duration: "22 min",
    description: "Least Recently Used cache using a hash map and doubly linked list.",
  },
  // Linked Lists
  "singly-linked-list": {
    title: "Singly Linked List",
    duration: "15 min",
    description: "Nodes connected by pointers — the foundation of dynamic data structures.",
  },
  "reverse-linked-list": {
    title: "Reverse Linked List",
    duration: "12 min",
    description: "Reverse a linked list iteratively and recursively.",
  },
  "detect-cycle": {
    title: "Detect Cycle",
    duration: "15 min",
    description: "Floyd's Tortoise and Hare algorithm to detect loops.",
  },
  "find-middle": {
    title: "Find Middle Element",
    duration: "10 min",
    description: "Use the slow and fast pointer technique.",
  },
  // Recursion
  "factorial": {
    title: "Factorial",
    duration: "10 min",
    description: "The classic introduction to recursion — n! = n × (n-1)!",
  },
  "fibonacci": {
    title: "Fibonacci Sequence",
    duration: "15 min",
    description: "Generate Fibonacci numbers recursively and understand overlapping subproblems.",
  },
  "tower-of-hanoi": {
    title: "Tower of Hanoi",
    duration: "18 min",
    description: "Classic puzzle demonstrating the power of recursive thinking.",
  },
  "n-queens": {
    title: "N-Queens Problem",
    duration: "25 min",
    description: "Place N queens on an N×N board using backtracking.",
  },
  // Trees
  "binary-tree": {
    title: "Binary Tree Basics",
    duration: "15 min",
    description: "Node-based tree structure where each node has at most two children.",
  },
  "tree-traversals": {
    title: "Tree Traversals",
    duration: "20 min",
    description: "Inorder, Preorder, Postorder — master all three DFS traversal patterns.",
  },
  "bst-operations": {
    title: "BST Operations",
    duration: "22 min",
    description: "Insert, search, and delete in a Binary Search Tree.",
  },
  "tree-height-depth": {
    title: "Height and Depth",
    duration: "12 min",
    description: "Calculate tree height and node depth recursively.",
  },
  // Heaps
  "heap-structure": {
    title: "Heap Structure",
    duration: "15 min",
    description: "Complete binary tree with heap property — max-heap or min-heap.",
  },
  "heapify": {
    title: "Heapify Operation",
    duration: "18 min",
    description: "Convert an array into a heap in O(n) time.",
  },
  "heap-sort": {
    title: "Heap Sort",
    duration: "20 min",
    description: "O(n log n) in-place sorting using a max-heap.",
  },
  "kth-largest": {
    title: "K-th Largest Element",
    duration: "15 min",
    description: "Find the k-th largest element efficiently using a min-heap.",
  },
  // Hashing Lessons
  "hash-functions": {
    title: "Hash Functions",
    duration: "12 min",
    description: "Learn how hash functions convert data into fixed-size values for efficient lookups.",
  },
  "hash-tables": {
    title: "Hash Tables",
    duration: "15 min",
    description: "Master the hash table data structure for O(1) average-time operations.",
  },
  "collision-resolution": {
    title: "Collision Resolution",
    duration: "15 min",
    description: "Explore different strategies to handle hash collisions: chaining and open addressing.",
  },
  "two-sum": {
    title: "Two Sum Problem",
    duration: "10 min",
    description: "Solve the classic Two Sum problem using hash tables for optimal efficiency.",
  },
  // Graphs Lessons
  "graph-representation": {
    title: "Graph Representation",
    duration: "15 min",
    description: "Learn how to represent graphs using adjacency matrices and adjacency lists.",
  },
  "bfs": {
    title: "Breadth-First Search (BFS)",
    duration: "18 min",
    description: "Explore graphs level by level using a queue-based traversal approach.",
  },
  "dfs": {
    title: "Depth-First Search (DFS)",
    duration: "18 min",
    description: "Explore graphs by going as deep as possible before backtracking.",
  },
  "cycle-detection": {
    title: "Cycle Detection",
    duration: "15 min",
    description: "Detect cycles in directed and undirected graphs using DFS and coloring.",
  },
  // Dynamic Programming Lessons
  "fibonacci-dp": {
    title: "Fibonacci with DP",
    duration: "15 min",
    description: "Learn memoization and tabulation techniques using the classic Fibonacci problem.",
  },
  "knapsack-01": {
    title: "0/1 Knapsack Problem",
    duration: "20 min",
    description: "Maximize value with limited capacity using dynamic programming.",
  },
  "lcs": {
    title: "Longest Common Subsequence",
    duration: "18 min",
    description: "Find the longest subsequence common to two sequences using DP.",
  },
  "coin-change": {
    title: "Coin Change Problem",
    duration: "15 min",
    description: "Find minimum coins needed to make a target amount using DP.",
  },
  // Greedy Algorithms Lessons
  "activity-selection": {
    title: "Activity Selection",
    duration: "12 min",
    description: "Select maximum non-overlapping activities using the greedy approach.",
  },
  "fractional-knapsack": {
    title: "Fractional Knapsack",
    duration: "15 min",
    description: "Maximize value by taking fractions of items using greedy selection.",
  },
  "huffman-coding": {
    title: "Huffman Coding",
    duration: "20 min",
    description: "Build optimal prefix codes for data compression using a greedy algorithm.",
  },
  "job-sequencing": {
    title: "Job Sequencing with Deadlines",
    duration: "15 min",
    description: "Schedule jobs to maximize profit while meeting deadlines.",
  },
};



export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, topic, lesson } = await params;
  setRequestLocale(locale);

  // Get lesson metadata from centralized config
  const lessonData = getLessonMetadata(lesson);
  // Also check old lessonContent for backward compatibility with existing lesson components
  const content = lessonContent[lesson] || (lessonData ? {
    title: lessonData.title,
    duration: lessonData.duration,
    description: lessonData.description,
  } : null);
  const hasLessonComponent = lessonContent[lesson] !== undefined;
  const adjacentLessons = getAdjacentLessons(topic, lesson);

  // Show Coming Soon for lessons without a dedicated component
  if (!content || !hasLessonComponent) {
    const displayContent = content || { title: lesson, duration: "TBD", description: "" };
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/${locale}/learn/${topic}`}
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Topic
        </Link>

        {/* Lesson Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-[var(--color-primary-500)]/20 text-[var(--color-primary-400)] text-sm font-medium capitalize">
              {topic.replace("-", " ")}
            </span>
            <span className="flex items-center gap-1 text-sm text-[var(--text-tertiary)]">
              <Clock className="w-3.5 h-3.5" />
              {displayContent.duration}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
            {displayContent.title}
          </h1>
          {displayContent.description && (
            <p className="text-[var(--text-secondary)]">{displayContent.description}</p>
          )}
        </div>

        <div className="text-center py-20 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Lesson Coming Soon
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            This lesson content is being prepared. Check back soon!
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--border-primary)]">
          <div className="flex items-center justify-between">
            {adjacentLessons.prev ? (
              <Link
                href={`/${locale}/learn/${topic}/${adjacentLessons.prev}`}
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </Link>
            ) : (
              <div />
            )}

            {adjacentLessons.next ? (
              <Link
                href={`/${locale}/learn/${topic}/${adjacentLessons.next}`}
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/${locale}/topics/${topic}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors"
              >
                <Play className="w-4 h-4" />
                Try Visualizer
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href={`/${locale}/learn/${topic}`}
        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Topic
      </Link>

      {/* Lesson Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-[var(--color-primary-500)]/20 text-[var(--color-primary-400)] text-sm font-medium capitalize">
            {topic.replace("-", " ")}
          </span>
          <span className="flex items-center gap-1 text-sm text-[var(--text-tertiary)]">
            <Clock className="w-3.5 h-3.5" />
            {content.duration}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
          {content.title}
        </h1>
        <p className="text-[var(--text-secondary)]">{content.description}</p>
      </div>

      {/* Demo lesson content using our components */}
      {lesson === "bubble-sort" && <BubbleSortLesson locale={locale} />}
      {lesson === "selection-sort" && <SelectionSortLesson locale={locale} />}
      {lesson === "insertion-sort" && <InsertionSortLesson locale={locale} />}
      {lesson === "merge-sort" && <MergeSortLesson locale={locale} />}
      {lesson === "quick-sort" && <QuickSortLesson locale={locale} />}
      {lesson === "binary-search" && <BinarySearchLesson locale={locale} />}
      {lesson === "two-pointers" && <TwoPointersLesson locale={locale} />}
      {lesson === "array-operations" && <ArrayOperationsLesson locale={locale} />}
      {lesson === "sliding-window" && <SlidingWindowLesson locale={locale} />}
      {lesson === "prefix-sum" && <PrefixSumLesson locale={locale} />}
      {lesson === "kadanes" && <KadanesLesson locale={locale} />}
      {lesson === "dutch-national-flag" && <DutchNationalFlagLesson locale={locale} />}
      {lesson === "moores-voting" && <MooresVotingLesson locale={locale} />}
      {lesson === "merge-sorted-arrays" && <MergeSortedArraysLesson locale={locale} />}
      {lesson === "rotate-array" && <RotateArrayLesson locale={locale} />}
      {lesson === "rearrangement" && <RearrangementLesson locale={locale} />}
      {lesson === "next-permutation" && <NextPermutationLesson locale={locale} />}
      {lesson === "string-operations" && <StringOperationsLesson locale={locale} />}
      {lesson === "character-frequency" && <CharacterFrequencyLesson locale={locale} />}
      {lesson === "brute-force-search" && <BruteForceSearchLesson locale={locale} />}
      {lesson === "kmp-algorithm" && <KMPAlgorithmLesson locale={locale} />}
      {lesson === "anagram-detection" && <AnagramDetectionLesson locale={locale} />}
      {lesson === "linear-search" && <LinearSearchLesson locale={locale} />}
      {lesson === "lower-bound" && <LowerBoundLesson locale={locale} />}
      {lesson === "upper-bound" && <UpperBoundLesson locale={locale} />}
      {lesson === "peak-element" && <PeakElementLesson locale={locale} />}
      {lesson === "stack-operations" && <StackOperationsLesson locale={locale} />}
      {lesson === "balanced-parentheses" && <BalancedParenthesesLesson locale={locale} />}
      {lesson === "infix-to-postfix" && <InfixToPostfixLesson locale={locale} />}
      {lesson === "next-greater-element" && <NextGreaterElementLesson locale={locale} />}
      {lesson === "queue-operations" && <QueueOperationsLesson locale={locale} />}
      {lesson === "circular-queue" && <CircularQueueLesson locale={locale} />}
      {lesson === "priority-queue" && <PriorityQueueLesson locale={locale} />}
      {lesson === "lru-cache" && <LRUCacheLesson locale={locale} />}
      {lesson === "singly-linked-list" && <SinglyLinkedListLesson locale={locale} />}
      {lesson === "reverse-linked-list" && <ReverseLinkedListLesson locale={locale} />}
      {lesson === "detect-cycle" && <DetectCycleLesson locale={locale} />}
      {lesson === "find-middle" && <FindMiddleLesson locale={locale} />}
      {lesson === "factorial" && <FactorialLesson locale={locale} />}
      {lesson === "fibonacci" && <FibonacciLesson locale={locale} />}
      {lesson === "tower-of-hanoi" && <TowerOfHanoiLesson locale={locale} />}
      {lesson === "n-queens" && <NQueensLesson locale={locale} />}
      {lesson === "binary-tree" && <BinaryTreeLesson locale={locale} />}
      {lesson === "tree-traversals" && <TreeTraversalsLesson locale={locale} />}
      {lesson === "bst-operations" && <BSTOperationsLesson locale={locale} />}
      {lesson === "tree-height-depth" && <TreeHeightDepthLesson locale={locale} />}
      {lesson === "heap-structure" && <HeapStructureLesson locale={locale} />}
      {lesson === "heapify" && <HeapifyLesson locale={locale} />}
      {lesson === "heap-sort" && <HeapSortLesson locale={locale} />}
      {lesson === "kth-largest" && <KthLargestLesson locale={locale} />}
      {lesson === "hash-functions" && <HashFunctionsLesson locale={locale} />}
      {lesson === "hash-tables" && <HashTablesLesson locale={locale} />}
      {lesson === "collision-resolution" && <CollisionResolutionLesson locale={locale} />}
      {lesson === "two-sum" && <TwoSumLesson locale={locale} />}
      {lesson === "graph-representation" && <GraphRepresentationLesson locale={locale} />}
      {lesson === "bfs" && <BFSLesson locale={locale} />}
      {lesson === "dfs" && <DFSLesson locale={locale} />}
      {lesson === "cycle-detection" && <CycleDetectionLesson locale={locale} />}
      {lesson === "fibonacci-dp" && <FibonacciDPLesson locale={locale} />}
      {lesson === "knapsack-01" && <Knapsack01Lesson locale={locale} />}
      {lesson === "lcs" && <LCSLesson locale={locale} />}
      {lesson === "coin-change" && <CoinChangeLesson locale={locale} />}
      {lesson === "activity-selection" && <ActivitySelectionLesson locale={locale} />}
      {lesson === "fractional-knapsack" && <FractionalKnapsackLesson locale={locale} />}
      {lesson === "huffman-coding" && <HuffmanCodingLesson locale={locale} />}
      {lesson === "job-sequencing" && <JobSequencingLesson locale={locale} />}

      {/* Lesson Navigation */}
      <div className="mt-12 pt-8 border-t border-[var(--border-primary)]">
        {/* Mark Complete Button */}
        <div className="flex justify-center mb-6">
          <LessonCompleteButton topic={topic} lesson={lesson} />
        </div>

        <div className="flex items-center justify-between">
          {adjacentLessons.prev ? (
            <Link
              href={`/${locale}/learn/${topic}/${adjacentLessons.prev}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Lesson
            </Link>
          ) : (
            <div />
          )}

          {adjacentLessons.next ? (
            <Link
              href={`/${locale}/learn/${topic}/${adjacentLessons.next}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors"
            >
              Next Lesson
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/${locale}/topics/${topic}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors"
            >
              <Play className="w-4 h-4" />
              Try Visualizer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Bubble Sort demo lesson using all our Learn components
function BubbleSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      {/* What is Bubble Sort */}
      <LearnCard title="What is Bubble Sort?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Bubble Sort</strong> is the simplest sorting algorithm.
          It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them
          if they are in the wrong order. The process repeats until no swaps are needed.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The algorithm gets its name because smaller elements &quot;bubble&quot; to the top of the list
          (beginning), while larger elements sink to the bottom (end) — like bubbles rising in water.
        </p>
      </LearnCard>

      {/* Real-World Analogy */}
      <Analogy emoji="🃏" title="Sorting Playing Cards">
        Imagine you have a hand of playing cards that you want to sort from lowest to highest.
        You compare the first two cards and swap them if they&apos;re in the wrong order. Then you move
        to the next pair, and the next, until you reach the end. You repeat this process until
        all cards are in order. That&apos;s exactly how Bubble Sort works!
      </Analogy>

      {/* How It Works */}
      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Start at the beginning",
              description: "Begin with the first element of the array.",
            },
            {
              title: "Compare adjacent elements",
              description: "Compare the current element with the next one.",
            },
            {
              title: "Swap if needed",
              description: "If the current element is greater than the next, swap them.",
            },
            {
              title: "Move to next pair",
              description: "Move one position forward and repeat the comparison.",
            },
            {
              title: "Complete one pass",
              description: "After one complete pass, the largest element is at the end.",
            },
            {
              title: "Repeat until sorted",
              description: "Repeat the process for remaining elements until no swaps are needed.",
            },
          ]}
        />
      </LearnCard>

      {/* Examples Section */}
      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Basic Sorting"
          input="[64, 34, 25, 12]"
          output="[12, 25, 34, 64]"
        >
          <div className="space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Let&apos;s walk through each pass:
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-2">Pass 1: 64 bubbles to the end</p>
                <ArrayDiagram
                  values={[64, 34, 25, 12]}
                  highlights={[3]}
                  pointers={[{ index: 0, label: "i" }]}
                />
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-2">After Pass 1:</p>
                <ArrayDiagram values={[34, 25, 12, 64]} highlights={[3]} />
              </div>
            </div>
          </div>
        </ExampleBox>

        <ExampleBox
          number={2}
          title="Already Sorted (Best Case)"
          input="[1, 2, 3, 4]"
          output="[1, 2, 3, 4]"
          defaultOpen={false}
        >
          <p className="text-sm text-[var(--text-secondary)]">
            When the array is already sorted, Bubble Sort with optimization (checking if any swaps occurred)
            can complete in O(n) time — just one pass with no swaps needed!
          </p>
        </ExampleBox>

        <ExampleBox
          number={3}
          title="Reverse Sorted (Worst Case)"
          input="[5, 4, 3, 2, 1]"
          output="[1, 2, 3, 4, 5]"
          defaultOpen={false}
        >
          <p className="text-sm text-[var(--text-secondary)]">
            When the array is in reverse order, Bubble Sort needs maximum passes (n-1) and maximum
            comparisons. Each element has to &quot;bubble&quot; all the way to its correct position.
          </p>
        </ExampleBox>
      </LearnCard>

      {/* Complexity Analysis */}
      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n)", description: "Already sorted (with optimization)" },
          { case: "Average Case", time: "O(n²)", description: "Random order" },
          { case: "Worst Case", time: "O(n²)", description: "Reverse sorted" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses a temp variable for swapping"
        isStable={true}
        isInPlace={true}
      />

      {/* Key Insight */}
      <Callout type="insight" title="Why is Bubble Sort O(n²)?">
        In the worst case, we make (n-1) passes through the array. On each pass, we compare
        up to (n-1) pairs. This gives us (n-1) × (n-1) ≈ n² comparisons. That&apos;s why we say
        Bubble Sort has O(n²) time complexity.
      </Callout>

      {/* Code Implementation */}
      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`}
          python={`def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        swapped = False
        
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps, array is sorted
        if not swapped:
            break
    
    return arr`}
          java={`public static void bubbleSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!swapped) break;
    }
}`}
        />
      </LearnCard>

      {/* Common Mistakes */}
      <Callout type="warning" title="Common Mistakes">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Forgetting to reduce the inner loop range (n - i - 1)</li>
          <li>Not using the swapped flag optimization</li>
          <li>Off-by-one errors in loop bounds</li>
        </ul>
      </Callout>

      {/* When to Use */}
      <Callout type="tip" title="When to Use Bubble Sort">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Learning:</strong> Perfect for understanding sorting concepts</li>
          <li><strong>Small datasets:</strong> Fine for arrays with less than 50 elements</li>
          <li><strong>Nearly sorted data:</strong> O(n) best case with optimization</li>
          <li><strong>When stability matters:</strong> It preserves order of equal elements</li>
        </ul>
      </Callout>

      {/* Try It Yourself */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          🚀 Try It Yourself
        </h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Ready to see Bubble Sort in action? Try the interactive visualization or practice with code!
        </p>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="bubble-sort" category="sorting" locale={locale} />
          <Link
            href={`/${locale}/playground?algorithm=bubble-sort`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-primary)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            💻 Code Playground
          </Link>
        </div>
      </div>
    </div>
  );
}

// Selection Sort lesson
function SelectionSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Selection Sort?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Selection Sort</strong> works by repeatedly
          finding the minimum element from the unsorted part of the array and putting it at the beginning.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Unlike Bubble Sort which swaps adjacent elements, Selection Sort finds the absolute minimum
          and places it directly in its final position with just one swap per pass.
        </p>
      </LearnCard>

      <Analogy emoji="🎯" title="Finding the Shortest Person">
        Imagine lining up students by height. You scan the entire line to find the shortest person,
        then swap them with whoever is at the front. Next, you scan the remaining students (excluding
        the first), find the shortest, and swap with the second position. You repeat until everyone is
        sorted by height!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Set minimum index", description: "Start with the first unsorted element as the assumed minimum." },
            { title: "Scan unsorted part", description: "Compare with each remaining element to find the actual minimum." },
            { title: "Update minimum", description: "If a smaller element is found, update the minimum index." },
            { title: "Swap", description: "Swap the minimum element with the first unsorted position." },
            { title: "Move boundary", description: "The sorted portion grows by one element." },
            { title: "Repeat", description: "Continue until the entire array is sorted." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Basic Sorting" input="[64, 25, 12, 22]" output="[12, 22, 25, 64]">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Pass 1: Find minimum (12), swap with 64</p>
              <ArrayDiagram values={[64, 25, 12, 22]} highlights={[2]} pointers={[{ index: 0, label: "i" }, { index: 2, label: "min" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">After Pass 1:</p>
              <ArrayDiagram values={[12, 25, 64, 22]} highlights={[0]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n²)", description: "Always scans entire array" },
          { case: "Average Case", time: "O(n²)", description: "Same for all inputs" },
          { case: "Worst Case", time: "O(n²)", description: "Same for all inputs" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses indices and temp variables"
        isStable={false}
        isInPlace={true}
      />

      <Callout type="insight" title="Why O(n²) even for sorted arrays?">
        Selection Sort always makes (n-1) + (n-2) + ... + 1 = n(n-1)/2 comparisons, regardless
        of whether the array is sorted or not. It doesn&apos;t have the early-exit optimization
        that Bubble Sort can have.
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find minimum in unsorted part
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap if minimum is not at position i
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`}
          python={`def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min_idx = i
        
        # Find minimum in unsorted part
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap if minimum is not at position i
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="selection-sort" category="sorting" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Binary Search lesson
function BinarySearchLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Binary Search?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Binary Search</strong> is an efficient algorithm
          for finding an element in a <strong>sorted</strong> array. It works by repeatedly dividing
          the search interval in half.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Instead of checking each element one by one (like Linear Search), Binary Search eliminates
          half of the remaining elements with each comparison, achieving O(log n) time complexity.
        </p>
      </LearnCard>

      <Analogy emoji="📖" title="Finding a Word in a Dictionary">
        When looking up a word in a dictionary, you don&apos;t start from page 1. You open the
        dictionary somewhere in the middle. If your word comes before the current page alphabetically,
        you look in the first half; otherwise, the second half. You keep halving until you find it!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Initialize pointers", description: "Set left = 0, right = n-1 to cover the entire array." },
            { title: "Find middle", description: "Calculate mid = left + (right - left) / 2." },
            { title: "Compare", description: "Compare the target with arr[mid]." },
            { title: "Found?", description: "If arr[mid] == target, return mid (found!)." },
            { title: "Go left", description: "If target < arr[mid], search left half: right = mid - 1." },
            { title: "Go right", description: "If target > arr[mid], search right half: left = mid + 1." },
            { title: "Repeat", description: "Continue until left > right (not found)." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Finding 23" input="[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]" output="Index: 5">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 1: mid = 4, arr[4] = 16 &lt; 23, go right</p>
              <ArrayDiagram values={[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]} highlights={[4]} pointers={[{ index: 0, label: "L" }, { index: 9, label: "R" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 2: mid = 7, arr[7] = 56 &gt; 23, go left</p>
              <ArrayDiagram values={[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]} highlights={[7]} pointers={[{ index: 5, label: "L" }, { index: 9, label: "R" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 3: mid = 5, arr[5] = 23 ✓ Found!</p>
              <ArrayDiagram values={[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]} highlights={[5]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(1)", description: "Target is at middle" },
          { case: "Average Case", time: "O(log n)", description: "Halves search space each step" },
          { case: "Worst Case", time: "O(log n)", description: "Element at boundary or not found" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Iterative version uses constant space"
      />

      <Callout type="insight" title="Why O(log n)?">
        With each comparison, we eliminate half of the remaining elements. For n elements,
        we can halve at most log₂(n) times before we&apos;re left with 1 element. For 1 billion
        elements, that&apos;s only about 30 comparisons!
      </Callout>

      <Callout type="warning" title="Common Mistakes">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Using (left + right) / 2 — can overflow! Use left + (right - left) / 2</li>
          <li>Forgetting that the array MUST be sorted</li>
          <li>Infinite loops from incorrect boundary updates</li>
        </ul>
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;  // Found!
    } else if (arr[mid] < target) {
      left = mid + 1;  // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}`}
          python={`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid  # Found!
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="binary-search" category="searching" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Two Pointers lesson
function TwoPointersLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the Two Pointers Technique?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Two Pointers</strong> is a pattern where
          you use two index variables to traverse an array, often from opposite ends or at different speeds.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This technique can reduce O(n²) brute force solutions to O(n) by avoiding redundant comparisons.
          It&apos;s especially powerful for sorted arrays and problems involving pairs or subarrays.
        </p>
      </LearnCard>

      <Analogy emoji="🤝" title="Two People Searching">
        Imagine two friends searching for a book on a long shelf. Instead of both starting from the
        left, one starts from the left and one from the right. They move toward each other, checking
        books along the way. They cover the entire shelf in half the time!
      </Analogy>

      <LearnCard title="Common Patterns" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Opposite Ends</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Start with left = 0 and right = n-1. Move inward based on conditions.
              Used for: Two Sum (sorted), Container with Most Water, Valid Palindrome.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Same Direction (Fast & Slow)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Both pointers start at 0, but move at different speeds or conditions.
              Used for: Remove Duplicates, Cycle Detection, Partition Array.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Example: Two Sum in Sorted Array" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Find pair with sum 9" input="[1, 2, 3, 4, 6], target = 9" output="[2, 4] (indices of 3 and 6)">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 1: 1 + 6 = 7 &lt; 9, move left pointer right</p>
              <ArrayDiagram values={[1, 2, 3, 4, 6]} pointers={[{ index: 0, label: "L", color: "text-blue-400" }, { index: 4, label: "R", color: "text-red-400" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 2: 2 + 6 = 8 &lt; 9, move left pointer right</p>
              <ArrayDiagram values={[1, 2, 3, 4, 6]} pointers={[{ index: 1, label: "L", color: "text-blue-400" }, { index: 4, label: "R", color: "text-red-400" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Step 3: 3 + 6 = 9 ✓ Found!</p>
              <ArrayDiagram values={[1, 2, 3, 4, 6]} highlights={[2, 4]} pointers={[{ index: 2, label: "L", color: "text-blue-400" }, { index: 4, label: "R", color: "text-red-400" }]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(1)", description: "Pair found immediately" },
          { case: "Average Case", time: "O(n)", description: "Single pass through array" },
          { case: "Worst Case", time: "O(n)", description: "Pointers meet at center" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses two index variables"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];  // Found pair!
    } else if (sum < target) {
      left++;  // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  
  return [-1, -1]; // No pair found
}`}
          python={`def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]  # Found pair!
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return [-1, -1]  # No pair found`}
        />
      </LearnCard>

      <Callout type="tip" title="When to Use Two Pointers">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Array/string is sorted or can be sorted</li>
          <li>Looking for pairs that satisfy a condition</li>
          <li>Partitioning elements (like Dutch National Flag)</li>
          <li>Comparing elements from both ends</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="two-pointers" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Insertion Sort lesson
function InsertionSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Insertion Sort?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Insertion Sort</strong> builds the sorted array
          one element at a time. It picks each element and inserts it into its correct position among
          the already-sorted elements.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Think of how you sort playing cards in your hand — you pick up cards one by one and insert
          each card in the right position relative to the cards you already hold.
        </p>
      </LearnCard>

      <Analogy emoji="🃏" title="Sorting Cards in Your Hand">
        When playing cards, you don&apos;t sort your entire hand at once. You pick up one card at a time
        and slide it into the correct position among the cards you&apos;re already holding. By the time
        you&apos;ve picked up all cards, your hand is sorted!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Start from index 1", description: "Consider the first element as already sorted." },
            { title: "Pick the key", description: "Take the current element to be inserted." },
            { title: "Compare backwards", description: "Compare with elements in the sorted portion." },
            { title: "Shift elements", description: "Move larger elements one position right." },
            { title: "Insert key", description: "Place the key in its correct position." },
            { title: "Repeat", description: "Move to the next element until all are sorted." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Basic Sorting" input="[5, 2, 4, 6, 1]" output="[1, 2, 4, 5, 6]">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Insert 2: Compare with 5, shift 5, insert 2</p>
              <ArrayDiagram values={[5, 2, 4, 6, 1]} highlights={[1]} pointers={[{ index: 1, label: "key" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">After inserting 2:</p>
              <ArrayDiagram values={[2, 5, 4, 6, 1]} highlights={[0, 1]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n)", description: "Already sorted array" },
          { case: "Average Case", time: "O(n²)", description: "Random order" },
          { case: "Worst Case", time: "O(n²)", description: "Reverse sorted" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="In-place sorting"
        isStable={true}
        isInPlace={true}
      />

      <Callout type="tip" title="When Insertion Sort Shines">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Nearly sorted data:</strong> O(n) performance!</li>
          <li><strong>Small arrays:</strong> Low overhead makes it fast</li>
          <li><strong>Online sorting:</strong> Can sort as elements arrive</li>
          <li><strong>Used in hybrid sorts:</strong> Tim Sort uses it for small runs</li>
        </ul>
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Shift elements greater than key
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  return arr;
}`}
          python={`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Shift elements greater than key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert key at correct position
        arr[j + 1] = key
    
    return arr`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="insertion-sort" category="sorting" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Merge Sort lesson
function MergeSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Merge Sort?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Merge Sort</strong> is a divide-and-conquer algorithm
          that divides the array into halves, recursively sorts each half, and then merges the sorted halves.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          It guarantees O(n log n) performance in ALL cases — best, average, and worst. This makes it
          reliable and predictable, unlike Quick Sort which can degrade to O(n²).
        </p>
      </LearnCard>

      <Analogy emoji="📚" title="Sorting a Deck of Cards">
        Split your deck in half, give each half to a friend to sort. Once both friends return their
        sorted halves, merge them by comparing the top cards and taking the smaller one each time.
        If your friends use the same strategy (splitting further), eventually each person has just
        one card — which is already sorted!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Divide", description: "Split the array into two halves." },
            { title: "Conquer (left)", description: "Recursively sort the left half." },
            { title: "Conquer (right)", description: "Recursively sort the right half." },
            { title: "Base case", description: "Arrays of size 1 are already sorted." },
            { title: "Merge", description: "Combine two sorted halves into one sorted array." },
            { title: "Compare & pick", description: "Always pick the smaller element from either half." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Divide and Merge" input="[38, 27, 43, 3]" output="[3, 27, 38, 43]">
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p><strong>Divide:</strong> [38, 27, 43, 3] → [38, 27] + [43, 3]</p>
            <p><strong>Divide more:</strong> [38] + [27] and [43] + [3]</p>
            <p><strong>Merge pairs:</strong> [27, 38] and [3, 43]</p>
            <p><strong>Final merge:</strong> [3, 27, 38, 43]</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n log n)", description: "Same for all inputs" },
          { case: "Average Case", time: "O(n log n)", description: "Consistent performance" },
          { case: "Worst Case", time: "O(n log n)", description: "Guaranteed!" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="Requires auxiliary array for merging"
        isStable={true}
        isInPlace={false}
      />

      <Callout type="insight" title="Why O(n log n)?">
        We divide the array log(n) times (halving until size 1). At each level, we do O(n) work
        to merge. Total: O(n) × O(log n) = O(n log n). This is the best possible for comparison-based sorting!
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`}
          python={`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="merge-sort" category="sorting" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Quick Sort lesson
function QuickSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Quick Sort?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Quick Sort</strong> is a highly efficient
          divide-and-conquer algorithm that picks a &quot;pivot&quot; element and partitions the array
          around it — smaller elements go left, larger go right.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          It&apos;s often faster than Merge Sort in practice due to better cache performance and
          in-place partitioning, though its worst case is O(n²).
        </p>
      </LearnCard>

      <Analogy emoji="⚖️" title="Organizing Books by Height">
        Pick a random book as your &quot;pivot.&quot; Put all shorter books to the left and taller books
        to the right. Now the pivot is in its final position! Repeat this process for the left and
        right groups until everything is sorted.
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Choose pivot", description: "Select an element (often last, first, or random)." },
            { title: "Partition", description: "Rearrange so elements < pivot are left, > pivot are right." },
            { title: "Pivot in place", description: "The pivot is now in its final sorted position." },
            { title: "Recurse left", description: "Quick sort the left partition." },
            { title: "Recurse right", description: "Quick sort the right partition." },
            { title: "Base case", description: "Arrays of size 0 or 1 are already sorted." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Partitioning Around Pivot" input="[10, 7, 8, 9, 1, 5]" output="[1, 5, 7, 8, 9, 10]">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Pivot = 5 (last element)</p>
              <ArrayDiagram values={[10, 7, 8, 9, 1, 5]} highlights={[5]} pointers={[{ index: 5, label: "pivot" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">After partition: 1 &lt; 5, rest &gt; 5</p>
              <ArrayDiagram values={[1, 5, 8, 9, 7, 10]} highlights={[1]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n log n)", description: "Balanced partitions" },
          { case: "Average Case", time: "O(n log n)", description: "Random pivot helps" },
          { case: "Worst Case", time: "O(n²)", description: "Already sorted + bad pivot" },
        ]}
        spaceComplexity="O(log n)"
        spaceDescription="Recursion stack depth"
        isStable={false}
        isInPlace={true}
      />

      <Callout type="warning" title="Avoiding Worst Case">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Random pivot:</strong> Randomize to avoid O(n²) on sorted data</li>
          <li><strong>Median-of-three:</strong> Pick median of first, middle, last</li>
          <li><strong>Intro Sort:</strong> Switch to Heap Sort if recursion is too deep</li>
        </ul>
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
          python={`def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="quick-sort" category="sorting" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Array Operations lesson
function ArrayOperationsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What are Array Operations?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Arrays are the most fundamental data structure. They store elements in contiguous memory
          locations, enabling <strong className="text-[var(--text-primary)]">O(1) access</strong> to
          any element using its index.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Mastering basic operations (traversal, insertion, deletion, search) is crucial before
          learning advanced array techniques like two pointers and sliding window.
        </p>
      </LearnCard>

      <Analogy emoji="📦" title="A Row of Boxes">
        Imagine a row of numbered boxes. Each box can hold one item, and you can instantly find
        any box by its number. That&apos;s an array! The downside? If you want to insert a box in
        the middle, you have to shift all the boxes after it.
      </Analogy>

      <LearnCard title="Core Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Access - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Access any element directly using its index: <code>arr[i]</code>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Traversal - O(n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Visit each element once, typically with a for loop.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">3. Search - O(n) or O(log n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Linear search for unsorted, binary search for sorted arrays.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">4. Insert/Delete - O(n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Requires shifting elements (except at the end, which is O(1)).
            </p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Access", time: "O(1)", description: "Direct index lookup" },
          { case: "Search", time: "O(n)", description: "Linear scan (unsorted)" },
          { case: "Insert/Delete", time: "O(n)", description: "Shift elements" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n elements stored"
      />

      <LearnCard title="Code Examples" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Access
const value = arr[2];

// Traversal
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Insert at index
arr.splice(index, 0, element);

// Delete at index
arr.splice(index, 1);

// Search
const idx = arr.indexOf(target);`}
          python={`# Access
value = arr[2]

# Traversal
for element in arr:
    print(element)

# Insert at index
arr.insert(index, element)

# Delete at index
arr.pop(index)

# Search
idx = arr.index(target) if target in arr else -1`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="array-operations" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Sliding Window lesson
function SlidingWindowLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the Sliding Window Technique?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Sliding Window</strong> is a technique for
          processing contiguous sequences (subarrays or substrings) efficiently by maintaining a
          &quot;window&quot; that slides across the data.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Instead of recomputing from scratch for each position, you update the window by adding
          the new element and removing the old one — turning O(n×k) into O(n).
        </p>
      </LearnCard>

      <Analogy emoji="🪟" title="A Window on a Train">
        Imagine looking through a train window at passing scenery. As the train moves, new scenery
        enters your view on one side while old scenery exits on the other. You don&apos;t need to
        look at the entire journey again — just update what changed!
      </Analogy>

      <LearnCard title="Two Types of Windows" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Fixed-Size Window</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Window size k is constant. Add right element, remove left element, slide forward.
              Example: Maximum sum of k consecutive elements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Variable-Size Window</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Window expands/shrinks based on conditions. Expand right, shrink left until valid.
              Example: Smallest subarray with sum ≥ target.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Example: Maximum Sum Subarray of Size K" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Fixed Window" input="[2, 1, 5, 1, 3, 2], k = 3" output="9 (subarray [5, 1, 3])">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Window [0-2]: sum = 2+1+5 = 8</p>
              <ArrayDiagram values={[2, 1, 5, 1, 3, 2]} highlights={[0, 1, 2]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Slide: -2, +1 → sum = 8 - 2 + 1 = 7</p>
              <ArrayDiagram values={[2, 1, 5, 1, 3, 2]} highlights={[1, 2, 3]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Slide: -1, +3 → sum = 7 - 1 + 3 = 9 ✓ Maximum!</p>
              <ArrayDiagram values={[2, 1, 5, 1, 3, 2]} highlights={[2, 3, 4]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Fixed Window", time: "O(n)", description: "Single pass" },
          { case: "Variable Window", time: "O(n)", description: "Each element visited max twice" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Just maintain window bounds and sum"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];  // Add right
    
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1];  // Remove left
    }
  }
  
  return maxSum;
}`}
          python={`def max_sum_subarray(arr, k):
    window_sum = 0
    max_sum = float('-inf')
    
    for i in range(len(arr)):
        window_sum += arr[i]  # Add right
        
        if i >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[i - k + 1]  # Remove left
    
    return max_sum`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="sliding-window" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Prefix Sum lesson
function PrefixSumLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Prefix Sum?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Prefix Sum</strong> (or Cumulative Sum)
          is a preprocessing technique where you compute the running total up to each index.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Once computed, you can answer any range sum query in <strong>O(1)</strong> time instead
          of O(n). It&apos;s a classic space-time tradeoff!
        </p>
      </LearnCard>

      <Analogy emoji="💰" title="Bank Balance History">
        Imagine your bank shows your cumulative balance after each transaction. To find how much
        you spent in a specific period, you just subtract the balance before that period from the
        balance after — no need to add up each transaction!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Build prefix array", description: "prefix[i] = sum of arr[0] to arr[i]" },
            { title: "prefix[0] = arr[0]", description: "First element is itself." },
            { title: "prefix[i] = prefix[i-1] + arr[i]", description: "Add current to previous sum." },
            { title: "Range sum query", description: "sum(l, r) = prefix[r] - prefix[l-1]" },
            { title: "Edge case", description: "If l = 0, sum = prefix[r]" },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Build Prefix Sum" input="[3, 1, 4, 1, 5]" output="prefix = [3, 4, 8, 9, 14]">
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>prefix[0] = 3</p>
            <p>prefix[1] = 3 + 1 = 4</p>
            <p>prefix[2] = 4 + 4 = 8</p>
            <p>prefix[3] = 8 + 1 = 9</p>
            <p>prefix[4] = 9 + 5 = 14</p>
          </div>
        </ExampleBox>
        <ExampleBox number={2} title="Range Sum Query" input="Sum from index 1 to 3" output="6" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            sum(1, 3) = prefix[3] - prefix[0] = 9 - 3 = 6<br />
            Verify: arr[1] + arr[2] + arr[3] = 1 + 4 + 1 = 6 ✓
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Build Prefix", time: "O(n)", description: "One pass" },
          { case: "Range Query", time: "O(1)", description: "Just subtraction!" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="Store prefix array"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function buildPrefixSum(arr) {
  const prefix = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}

function rangeSum(prefix, l, r) {
  if (l === 0) return prefix[r];
  return prefix[r] - prefix[l - 1];
}`}
          python={`def build_prefix_sum(arr):
    prefix = [arr[0]]
    for i in range(1, len(arr)):
        prefix.append(prefix[-1] + arr[i])
    return prefix

def range_sum(prefix, l, r):
    if l == 0:
        return prefix[r]
    return prefix[r] - prefix[l - 1]`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="prefix-sum" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Kadane's Algorithm lesson
function KadanesLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Kadane's Algorithm?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Kadane&apos;s Algorithm</strong> finds the
          maximum sum contiguous subarray in O(n) time. It&apos;s a beautiful example of dynamic
          programming applied to arrays.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The key insight: at each position, decide whether to extend the previous subarray or
          start fresh from the current element.
        </p>
      </LearnCard>

      <Analogy emoji="🏃" title="Running with a Score">
        Imagine running a race where each step adds or subtracts from your score. At each step,
        you ask: &quot;Should I keep my running total, or would starting fresh give me a better
        score?&quot; You track the best score you&apos;ve ever achieved.
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Initialize", description: "maxCurrent = maxGlobal = arr[0]" },
            { title: "For each element", description: "maxCurrent = max(arr[i], maxCurrent + arr[i])" },
            { title: "Update global max", description: "maxGlobal = max(maxGlobal, maxCurrent)" },
            { title: "The decision", description: "Either extend current subarray or start new one" },
            { title: "Return", description: "maxGlobal is the answer" },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Mixed Array" input="[-2, 1, -3, 4, -1, 2, 1, -5, 4]" output="6 (subarray [4, -1, 2, 1])">
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>At index 3 (value 4): max(4, -2+4) = 4, start fresh!</p>
            <p>At index 4: max(-1, 4+(-1)) = 3, extend</p>
            <p>At index 5: max(2, 3+2) = 5, extend</p>
            <p>At index 6: max(1, 5+1) = 6 ✓ Maximum reached!</p>
          </div>
        </ExampleBox>
        <ExampleBox number={2} title="All Negative" input="[-3, -1, -4]" output="-1" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            When all elements are negative, the maximum subarray is the least negative element.
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n)", description: "Single pass" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Just two variables"
      />

      <Callout type="insight" title="The DP Recurrence">
        <p className="mt-2">
          <code>maxEndingHere[i] = max(arr[i], maxEndingHere[i-1] + arr[i])</code>
        </p>
        <p className="mt-2 text-sm">
          This says: the max sum ending at position i is either just arr[i] (start fresh) or
          the previous max sum plus arr[i] (extend).
        </p>
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function kadane(arr) {
  let maxCurrent = arr[0];
  let maxGlobal = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    // Extend or start fresh?
    maxCurrent = Math.max(arr[i], maxCurrent + arr[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }
  
  return maxGlobal;
}`}
          python={`def kadane(arr):
    max_current = arr[0]
    max_global = arr[0]
    
    for i in range(1, len(arr)):
        # Extend or start fresh?
        max_current = max(arr[i], max_current + arr[i])
        max_global = max(max_global, max_current)
    
    return max_global`}
        />
      </LearnCard>

      <Callout type="tip" title="Variations">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Track indices:</strong> Store start/end when maxGlobal updates</li>
          <li><strong>Minimum subarray sum:</strong> Flip the comparison</li>
          <li><strong>Circular array:</strong> Total sum minus min subarray sum</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="kadanes-algorithm" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// String Operations lesson
function StringOperationsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What are String Operations?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Strings are sequences of characters. In most languages, strings are <strong className="text-[var(--text-primary)]">immutable</strong> —
          you can&apos;t change individual characters, only create new strings.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Understanding string operations is fundamental for text processing, parsing, and solving
          many interview problems.
        </p>
      </LearnCard>

      <Analogy emoji="📿" title="A String of Beads">
        Think of a string as beads on a necklace. Each bead is a character. You can look at any
        bead by its position, count the beads, or create a new necklace by rearranging them —
        but you can&apos;t change a bead that&apos;s already threaded.
      </Analogy>

      <LearnCard title="Core Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Access - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Get character at index: <code>str[i]</code> or <code>str.charAt(i)</code></p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Length - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Get string length: <code>str.length</code></p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">3. Concatenation - O(n+m)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Join strings: <code>str1 + str2</code></p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">4. Substring - O(n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Extract portion: <code>str.substring(start, end)</code></p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Code Examples" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Traversal
for (let i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// Reverse string
const reversed = str.split('').reverse().join('');

// Check palindrome
function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++; right--;
  }
  return true;
}`}
          python={`# Traversal
for char in s:
    print(char)

# Reverse string
reversed_s = s[::-1]

# Check palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="string-operations" category="strings" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Character Frequency lesson
function CharacterFrequencyLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Character Frequency?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Character frequency</strong> counts how many
          times each character appears in a string. This is foundational for anagram detection,
          permutation checking, and text analysis.
        </p>
      </LearnCard>

      <Analogy emoji="📊" title="Counting Votes">
        Imagine counting votes in an election. You go through each ballot and add a tally mark
        next to the candidate&apos;s name. At the end, you know exactly how many votes each
        candidate received. Character frequency works the same way!
      </Analogy>

      <LearnCard title="Two Approaches" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Array (for lowercase letters)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Use a size-26 array. Index = char - &apos;a&apos;. O(1) access, O(26) space.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Hash Map (for any characters)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Use a hash map/dictionary. Works for Unicode, mixed case, special chars.
            </p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Build Frequency", time: "O(n)", description: "Process each character once" },
          { case: "Lookup", time: "O(1)", description: "Direct access" },
        ]}
        spaceComplexity="O(k)"
        spaceDescription="k = number of unique characters"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Using object/map
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

// Using array (lowercase only)
function charFreqArray(str) {
  const freq = new Array(26).fill(0);
  for (const char of str) {
    freq[char.charCodeAt(0) - 97]++;
  }
  return freq;
}`}
          python={`# Using Counter (most Pythonic)
from collections import Counter
freq = Counter(s)

# Manual approach
def char_frequency(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

# Using array (lowercase only)
def char_freq_array(s):
    freq = [0] * 26
    for char in s:
        freq[ord(char) - ord('a')] += 1
    return freq`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="character-frequency" category="strings" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Brute Force Pattern Matching lesson
function BruteForceSearchLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Brute Force Pattern Matching?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Brute Force</strong> pattern matching checks
          every possible position in the text where the pattern could start. It&apos;s simple but
          can be slow for large inputs.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Also called the &quot;naive&quot; string matching algorithm, it&apos;s the foundation for
          understanding more efficient algorithms like KMP.
        </p>
      </LearnCard>

      <Analogy emoji="🔍" title="Finding a Word in a Book">
        Imagine looking for &quot;algorithm&quot; in a book without an index. You start at page 1,
        check if it matches, move one character forward, check again... until you find it or
        reach the end. That&apos;s brute force!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Start at position 0", description: "Align pattern with start of text." },
            { title: "Compare characters", description: "Match pattern chars with text chars." },
            { title: "All match?", description: "If all pattern chars match, found it!" },
            { title: "Mismatch?", description: "Shift pattern right by 1 position." },
            { title: "Repeat", description: "Continue until pattern found or text exhausted." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(n)", description: "Pattern not in text (first char never matches)" },
          { case: "Worst Case", time: "O(n×m)", description: "Pattern like 'aaa' in text 'aaaa...aaab'" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses indices"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function bruteForceSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  
  for (let i = 0; i <= n - m; i++) {
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }
    if (j === m) {
      return i;  // Found at index i
    }
  }
  return -1;  // Not found
}`}
          python={`def brute_force_search(text, pattern):
    n, m = len(text), len(pattern)
    
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            return i  # Found at index i
    
    return -1  # Not found`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="brute-force-search" category="strings" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// KMP Algorithm lesson
function KMPAlgorithmLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the KMP Algorithm?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Knuth-Morris-Pratt (KMP)</strong> is an efficient
          pattern matching algorithm that avoids re-comparing characters by using information about
          the pattern itself.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          It precomputes a &quot;Longest Proper Prefix which is also Suffix&quot; (LPS) array to
          skip ahead intelligently after a mismatch.
        </p>
      </LearnCard>

      <Analogy emoji="🧠" title="Remembering What You Saw">
        Imagine searching for &quot;ABAB&quot; in text. When you match &quot;AB&quot; then
        mismatch, brute force restarts from scratch. KMP remembers: &quot;I already matched AB,
        and the pattern starts with AB too, so I can skip ahead!&quot;
      </Analogy>

      <LearnCard title="The LPS Array" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <p className="text-[var(--text-secondary)] mb-4">
          LPS[i] = length of the longest proper prefix of pattern[0..i] that is also a suffix.
        </p>
        <ExampleBox number={1} title="LPS for 'ABAB'" input="pattern = 'ABAB'" output="LPS = [0, 0, 1, 2]">
          <div className="text-sm text-[var(--text-secondary)] space-y-1">
            <p>LPS[0] = 0 (&quot;A&quot; has no proper prefix)</p>
            <p>LPS[1] = 0 (&quot;AB&quot;: no prefix=suffix)</p>
            <p>LPS[2] = 1 (&quot;ABA&quot;: &quot;A&quot; is prefix and suffix)</p>
            <p>LPS[3] = 2 (&quot;ABAB&quot;: &quot;AB&quot; is prefix and suffix)</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Preprocessing", time: "O(m)", description: "Build LPS array" },
          { case: "Searching", time: "O(n)", description: "Single pass through text" },
          { case: "Total", time: "O(n + m)", description: "Much better than O(n×m)!" },
        ]}
        spaceComplexity="O(m)"
        spaceDescription="LPS array"
      />

      <Callout type="insight" title="Why KMP is Faster">
        When a mismatch occurs at pattern[j], KMP uses LPS[j-1] to know how many characters
        at the start of the pattern still match. It jumps there instead of starting over!
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function computeLPS(pattern) {
  const m = pattern.length;
  const lps = [0];
  let len = 0, i = 1;
  
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}

function kmpSearch(text, pattern) {
  const lps = computeLPS(pattern);
  let i = 0, j = 0;
  
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++; j++;
      if (j === pattern.length) return i - j;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return -1;
}`}
          python={`def compute_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length, i = 0, 1
    
    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps

def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    i = j = 0
    
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="kmp-algorithm" category="strings" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Anagram Detection lesson
function AnagramDetectionLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is an Anagram?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          An <strong className="text-[var(--text-primary)]">anagram</strong> is a word formed by
          rearranging the letters of another word. For example, &quot;listen&quot; and
          &quot;silent&quot; are anagrams.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Anagram detection is about checking if two strings contain the exact same characters
          with the exact same frequencies.
        </p>
      </LearnCard>

      <Analogy emoji="🧩" title="Same Puzzle Pieces">
        Two anagrams are like two completed puzzles made from the same set of pieces. The final
        pictures look different, but if you count the pieces by color, shape, etc., they&apos;re identical!
      </Analogy>

      <LearnCard title="Two Approaches" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Sorting - O(n log n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Sort both strings. If sorted versions are equal, they&apos;re anagrams.
              Simple but not optimal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Character Counting - O(n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Count character frequencies in both strings. Compare the counts.
              Optimal for this problem!
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Valid Anagram" input="'listen', 'silent'" output="true">
          <p className="text-sm text-[var(--text-secondary)]">
            Both have: e(1), i(1), l(1), n(1), s(1), t(1)
          </p>
        </ExampleBox>
        <ExampleBox number={2} title="Not Anagram" input="'hello', 'world'" output="false" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            Different characters and frequencies.
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Sorting Approach", time: "O(n log n)", description: "Dominated by sorting" },
          { case: "Counting Approach", time: "O(n)", description: "Single pass each" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Fixed 26-char array (for lowercase)"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Optimal: Character counting
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  const count = new Array(26).fill(0);
  
  for (let i = 0; i < s1.length; i++) {
    count[s1.charCodeAt(i) - 97]++;
    count[s2.charCodeAt(i) - 97]--;
  }
  
  return count.every(c => c === 0);
}

// Simple: Sorting
function isAnagramSort(s1, s2) {
  return s1.split('').sort().join('') === 
         s2.split('').sort().join('');
}`}
          python={`# Optimal: Character counting
def is_anagram(s1, s2):
    if len(s1) != len(s2):
        return False
    
    count = [0] * 26
    for c1, c2 in zip(s1, s2):
        count[ord(c1) - ord('a')] += 1
        count[ord(c2) - ord('a')] -= 1
    
    return all(c == 0 for c in count)

# Simple: Sorting
def is_anagram_sort(s1, s2):
    return sorted(s1) == sorted(s2)

# Pythonic: Counter
from collections import Counter
def is_anagram_counter(s1, s2):
    return Counter(s1) == Counter(s2)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="anagram-detection" category="strings" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Linear Search lesson
function LinearSearchLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Linear Search?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Linear Search</strong> (or Sequential Search)
          is the simplest search algorithm. It checks each element one by one until the target is found.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          While not the most efficient, it works on <strong>unsorted</strong> arrays and is easy to implement.
        </p>
      </LearnCard>

      <Analogy emoji="📚" title="Finding a Book on a Shelf">
        Imagine looking for a specific book on an unorganized shelf. You start from one end and
        check each book until you find the one you want. That&apos;s linear search!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Start at index 0", description: "Begin at the first element." },
            { title: "Compare", description: "Check if current element equals target." },
            { title: "Found?", description: "If match, return the current index." },
            { title: "Move forward", description: "Otherwise, proceed to next element." },
            { title: "Repeat", description: "Continue until found or array ends." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Best Case", time: "O(1)", description: "Target is first element" },
          { case: "Average Case", time: "O(n)", description: "Target in middle" },
          { case: "Worst Case", time: "O(n)", description: "Target at end or not found" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses a loop variable"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // Found at index i
    }
  }
  return -1;  // Not found
}`}
          python={`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found at index i
    return -1  # Not found`}
        />
      </LearnCard>

      <Callout type="tip" title="When to Use Linear Search">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Unsorted arrays:</strong> No choice but linear search</li>
          <li><strong>Small arrays:</strong> Overhead of sorting isn&apos;t worth it</li>
          <li><strong>Single search:</strong> Not worth preprocessing</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="linear-search" category="searching" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Lower Bound lesson
function LowerBoundLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Lower Bound?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Lower Bound</strong> finds the first position
          where a value could be inserted to maintain sorted order. It returns the index of the first
          element ≥ target.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This is a variation of binary search commonly used in competitive programming and for
          finding the first occurrence of a value.
        </p>
      </LearnCard>

      <Analogy emoji="📏" title="Finding Your Place in Line">
        Imagine students lined up by height. To find where you belong, you look for the first
        person who is at least as tall as you — that&apos;s your lower bound position!
      </Analogy>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Target Exists" input="[1, 2, 4, 4, 4, 5, 8], target = 4" output="Index: 2">
          <p className="text-sm text-[var(--text-secondary)]">
            The first 4 is at index 2. Lower bound returns the first occurrence.
          </p>
        </ExampleBox>
        <ExampleBox number={2} title="Target Not Present" input="[1, 2, 5, 8], target = 4" output="Index: 2" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            4 is not in the array, but would be inserted at index 2 (before 5).
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(log n)", description: "Binary search variant" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Iterative version"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function lowerBound(arr, target) {
  let left = 0, right = arr.length;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;  // Keep looking left
    }
  }
  return left;  // First position where arr[i] >= target
}`}
          python={`def lower_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Keep looking left
    
    return left  # First position where arr[i] >= target`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="lower-bound" category="searching" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Upper Bound lesson
function UpperBoundLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Upper Bound?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Upper Bound</strong> finds the first position
          <strong> after</strong> all occurrences of a value. It returns the index of the first element
          <strong> greater than</strong> the target.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Combined with lower bound, you can find the count of a value:
          <code>upperBound - lowerBound</code>
        </p>
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Multiple Occurrences" input="[1, 2, 4, 4, 4, 5, 8], target = 4" output="Index: 5">
          <p className="text-sm text-[var(--text-secondary)]">
            The last 4 is at index 4. Upper bound returns 5 (first element &gt; 4).
            <br />Count of 4s = upper_bound(5) - lower_bound(2) = 3
          </p>
        </ExampleBox>
        <ExampleBox number={2} title="Target Not Present" input="[1, 2, 5, 8], target = 4" output="Index: 2" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            Same as lower bound when target is not present.
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(log n)", description: "Binary search variant" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Iterative version"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function upperBound(arr, target) {
  let left = 0, right = arr.length;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] <= target) {  // Note: <= instead of <
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;  // First position where arr[i] > target
}`}
          python={`def upper_bound(arr, target):
    left, right = 0, len(arr)
    
    while left < right:
        mid = left + (right - left) // 2
        if arr[mid] <= target:  # Note: <= instead of <
            left = mid + 1
        else:
            right = mid
    
    return left  # First position where arr[i] > target`}
        />
      </LearnCard>

      <Callout type="insight" title="Lower vs Upper Bound">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Lower Bound: First element <strong>≥</strong> target</li>
          <li>Upper Bound: First element <strong>&gt;</strong> target</li>
          <li>Difference: Count of target in array</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="upper-bound" category="searching" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Peak Element lesson
function PeakElementLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Peak Element?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">peak element</strong> is an element that
          is greater than its neighbors. For corner elements, we only compare with one neighbor.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Surprisingly, we can find a peak in O(log n) time using binary search, even though
          the array is unsorted!
        </p>
      </LearnCard>

      <Analogy emoji="⛰️" title="Finding a Mountain Peak">
        Imagine walking on hilly terrain. You want to find any peak. At any point, if the ground
        rises to your left, go left — there must be a peak that way. If it rises to your right,
        go right. You&apos;ll always find a peak!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Check middle", description: "Look at arr[mid] and its neighbors." },
            { title: "Is it a peak?", description: "If arr[mid] > both neighbors, return mid." },
            { title: "Go uphill", description: "If right neighbor is larger, peak is on right." },
            { title: "Or left", description: "If left neighbor is larger, peak is on left." },
            { title: "Converge", description: "Binary search guarantees we find a peak." },
          ]}
        />
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Single Peak" input="[1, 2, 3, 1]" output="Index: 2 (value 3)">
          <p className="text-sm text-[var(--text-secondary)]">
            3 is greater than both neighbors (2 and 1), so it&apos;s a peak.
          </p>
        </ExampleBox>
        <ExampleBox number={2} title="Multiple Peaks" input="[1, 3, 2, 4, 1]" output="Index: 1 or 3" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">
            Both 3 and 4 are peaks. We only need to find one!
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(log n)", description: "Binary search" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Iterative version"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function findPeakElement(arr) {
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] < arr[mid + 1]) {
      left = mid + 1;  // Peak is on right
    } else {
      right = mid;     // Peak is on left (or mid)
    }
  }
  return left;  // left === right, found peak
}`}
          python={`def find_peak_element(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if arr[mid] < arr[mid + 1]:
            left = mid + 1  # Peak is on right
        else:
            right = mid     # Peak is on left (or mid)
    
    return left  # left == right, found peak`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Does This Work?">
        If arr[mid] &lt; arr[mid+1], we go right because the slope is going up.
        Either we hit a peak, or we reach the end (which is also a valid peak).
        The same logic applies when going left!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="peak-element" category="searching" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Stack Operations lesson
function StackOperationsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Stack?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Stack</strong> is a LIFO (Last-In-First-Out)
          data structure. The last element added is the first one removed — like a stack of plates.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Stacks are fundamental for function calls, undo operations, expression evaluation, and more.
        </p>
      </LearnCard>

      <Analogy emoji="📚" title="Stack of Books">
        Imagine a stack of heavy books. You can only add a new book on top, and you can only remove
        the top book. To get a book at the bottom, you must remove all books above it first!
      </Analogy>

      <LearnCard title="Core Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">push(x) - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Add element x to the top of the stack.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">pop() - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Remove and return the top element.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">peek() / top() - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Return the top element without removing it.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">isEmpty() - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Check if the stack is empty.</p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Push/Pop/Peek", time: "O(1)", description: "Constant time" },
          { case: "Search", time: "O(n)", description: "Must check each element" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n elements stored"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class Stack {
  constructor() {
    this.items = [];
  }
  
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// Usage
const stack = new Stack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.pop());  // 3
console.log(stack.peek()); // 2`}
          python={`# Python list works as a stack!
stack = []

stack.append(1)  # push
stack.append(2)
stack.append(3)

top = stack.pop()     # 3
peek = stack[-1]      # 2
is_empty = len(stack) == 0`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="stack-operations" category="stacks" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Balanced Parentheses lesson
function BalancedParenthesesLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the Balanced Parentheses Problem?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given a string of brackets <code>()[]&#123;&#125;</code>, determine if they are
          <strong className="text-[var(--text-primary)]"> properly matched</strong>. Every opening
          bracket must have a corresponding closing bracket in the correct order.
        </p>
      </LearnCard>

      <Analogy emoji="🚪" title="Opening and Closing Doors">
        Imagine walking through doors. Each time you enter a door, you must exit through the same
        type of door. You can&apos;t exit a round door if you entered a square one!
      </Analogy>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Valid" input="'([]){}'" output="true">
          <p className="text-sm text-[var(--text-secondary)]">Every bracket has its matching pair in correct order.</p>
        </ExampleBox>
        <ExampleBox number={2} title="Invalid - Wrong Order" input="'([)]'" output="false" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">The ] closes ( instead of [.</p>
        </ExampleBox>
        <ExampleBox number={3} title="Invalid - Unmatched" input="'(('" output="false" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">Opening brackets without closing ones.</p>
        </ExampleBox>
      </LearnCard>

      <LearnCard title="Algorithm" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Initialize stack", description: "Empty stack to track opening brackets." },
            { title: "For each character", description: "Process left to right." },
            { title: "Opening bracket?", description: "Push it onto the stack." },
            { title: "Closing bracket?", description: "Pop and check if it matches." },
            { title: "Mismatch?", description: "Return false immediately." },
            { title: "End check", description: "Stack must be empty for valid input." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Cases", time: "O(n)", description: "Single pass" }]}
        spaceComplexity="O(n)"
        spaceDescription="Stack size in worst case"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if (char in map) {
      // Closing bracket
      if (stack.pop() !== map[char]) return false;
    } else {
      // Opening bracket
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}`}
          python={`def is_valid(s):
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    
    for char in s:
        if char in mapping:
            # Closing bracket
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            # Opening bracket
            stack.append(char)
    
    return len(stack) == 0`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="balanced-parentheses" category="stacks" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Infix to Postfix lesson
function InfixToPostfixLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Infix to Postfix Conversion?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Infix</strong>: operators between operands (2 + 3).<br />
          <strong className="text-[var(--text-primary)]">Postfix</strong>: operators after operands (2 3 +).
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Postfix notation removes ambiguity and doesn&apos;t need parentheses. Computers evaluate
          postfix easily using a stack!
        </p>
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Simple" input="'A + B'" output="'A B +'">
          <p className="text-sm text-[var(--text-secondary)]">Move operator to the end.</p>
        </ExampleBox>
        <ExampleBox number={2} title="With Precedence" input="'A + B * C'" output="'A B C * +'" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">* has higher precedence, evaluated first.</p>
        </ExampleBox>
        <ExampleBox number={3} title="With Parentheses" input="'(A + B) * C'" output="'A B + C *'" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">Parentheses change evaluation order.</p>
        </ExampleBox>
      </LearnCard>

      <LearnCard title="Shunting Yard Algorithm" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Operand", description: "Add directly to output." },
            { title: "Opening parenthesis", description: "Push onto stack." },
            { title: "Closing parenthesis", description: "Pop to output until opening parenthesis." },
            { title: "Operator", description: "Pop higher/equal precedence operators, then push." },
            { title: "End", description: "Pop remaining operators to output." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Cases", time: "O(n)", description: "Single pass" }]}
        spaceComplexity="O(n)"
        spaceDescription="Stack for operators"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function infixToPostfix(expr) {
  const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
  const stack = [];
  let output = '';
  
  for (const char of expr) {
    if (/[A-Za-z0-9]/.test(char)) {
      output += char;
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length && stack.at(-1) !== '(') {
        output += stack.pop();
      }
      stack.pop(); // Remove '('
    } else {
      while (stack.length && precedence[stack.at(-1)] >= precedence[char]) {
        output += stack.pop();
      }
      stack.push(char);
    }
  }
  
  return output + stack.reverse().join('');
}`}
          python={`def infix_to_postfix(expr):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    stack = []
    output = []
    
    for char in expr:
        if char.isalnum():
            output.append(char)
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()  # Remove '('
        else:
            while stack and stack[-1] != '(' and precedence.get(stack[-1], 0) >= precedence[char]:
                output.append(stack.pop())
            stack.append(char)
    
    return ''.join(output + stack[::-1])`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="infix-to-postfix" category="stacks" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Next Greater Element lesson
function NextGreaterElementLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Next Greater Element?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          For each element in an array, find the <strong className="text-[var(--text-primary)]">next
            element that is greater</strong> than it (to its right). If none exists, return -1.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This classic problem is solved efficiently using a <strong>monotonic stack</strong> — a
          stack that maintains elements in increasing or decreasing order.
        </p>
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Basic" input="[4, 5, 2, 10]" output="[5, 10, 10, -1]">
          <div className="text-sm text-[var(--text-secondary)] space-y-1">
            <p>NGE of 4 → 5 (next greater)</p>
            <p>NGE of 5 → 10</p>
            <p>NGE of 2 → 10</p>
            <p>NGE of 10 → -1 (no greater element)</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <LearnCard title="Monotonic Stack Approach" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Process right to left", description: "Start from the end of the array." },
            { title: "Pop smaller elements", description: "Remove elements ≤ current from stack." },
            { title: "Stack empty?", description: "No greater element, answer is -1." },
            { title: "Stack not empty?", description: "Top of stack is the NGE." },
            { title: "Push current", description: "Add current element to stack." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Cases", time: "O(n)", description: "Each element pushed/popped once" }]}
        spaceComplexity="O(n)"
        spaceDescription="Stack and result array"
      />

      <Callout type="insight" title="Why O(n)?">
        Although there&apos;s a while loop inside a for loop, each element is pushed and popped
        at most once. Total operations: 2n = O(n).
      </Callout>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function nextGreaterElement(arr) {
  const n = arr.length;
  const result = new Array(n).fill(-1);
  const stack = [];  // Monotonic decreasing stack
  
  // Process from right to left
  for (let i = n - 1; i >= 0; i--) {
    // Pop elements smaller than or equal to current
    while (stack.length && stack.at(-1) <= arr[i]) {
      stack.pop();
    }
    
    // If stack not empty, top is NGE
    if (stack.length) {
      result[i] = stack.at(-1);
    }
    
    // Push current element
    stack.push(arr[i]);
  }
  
  return result;
}`}
          python={`def next_greater_element(arr):
    n = len(arr)
    result = [-1] * n
    stack = []  # Monotonic decreasing stack
    
    # Process from right to left
    for i in range(n - 1, -1, -1):
        # Pop elements smaller than or equal to current
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        
        # If stack not empty, top is NGE
        if stack:
            result[i] = stack[-1]
        
        # Push current element
        stack.append(arr[i])
    
    return result`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="next-greater-element" category="stacks" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Queue Operations lesson
function QueueOperationsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Queue?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Queue</strong> is a FIFO (First-In-First-Out)
          data structure. The first element added is the first one removed — like a line at a store.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Queues are used in BFS traversal, scheduling, buffering, and handling async operations.
        </p>
      </LearnCard>

      <Analogy emoji="🎢" title="Line for a Ride">
        Imagine waiting in line for a roller coaster. The first person who joined the line is
        the first to get on the ride. New people join at the back, and people leave from the front.
      </Analogy>

      <LearnCard title="Core Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">enqueue(x) - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Add element x to the back of the queue.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">dequeue() - O(1)*</h4>
            <p className="text-sm text-[var(--text-secondary)]">Remove and return the front element. (*O(n) for naive array impl)</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">front() / peek() - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Return the front element without removing.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">isEmpty() - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Check if the queue is empty.</p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  
  enqueue(x) { this.items[this.tail++] = x; }
  dequeue() { 
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head++];
    return item;
  }
  front() { return this.items[this.head]; }
  isEmpty() { return this.tail === this.head; }
}`}
          python={`from collections import deque

# Python deque is optimal for queues
queue = deque()

queue.append(1)    # enqueue
queue.append(2)
queue.popleft()    # dequeue -> 1
front = queue[0]   # peek -> 2`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="queue-operations" category="queues" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Circular Queue lesson
function CircularQueueLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Circular Queue?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Circular Queue</strong> uses a fixed-size
          array where the end wraps around to the beginning, forming a circle.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This avoids the &quot;wasted space&quot; problem of linear arrays and achieves O(1)
          enqueue/dequeue without shifting elements.
        </p>
      </LearnCard>

      <Analogy emoji="🔄" title="Circular Track">
        Imagine runners on a circular track. After completing a lap, they&apos;re back at the start.
        The queue works the same way — after reaching the end of the array, it wraps to index 0.
      </Analogy>

      <LearnCard title="Key Concepts" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <p><strong>Front pointer:</strong> Points to the first element</p>
          <p><strong>Rear pointer:</strong> Points to the last element (or next empty)</p>
          <p><strong>Wrap around:</strong> <code>index = (index + 1) % capacity</code></p>
          <p><strong>Full check:</strong> <code>(rear + 1) % capacity === front</code></p>
          <p><strong>Empty check:</strong> <code>front === -1</code> or <code>count === 0</code></p>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Enqueue/Dequeue", time: "O(1)", description: "No shifting needed" },
        ]}
        spaceComplexity="O(k)"
        spaceDescription="k = fixed capacity"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.capacity = k;
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }
  
  enqueue(x) {
    if (this.isFull()) return false;
    this.rear = (this.rear + 1) % this.capacity;
    this.queue[this.rear] = x;
    this.size++;
    return true;
  }
  
  dequeue() {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return true;
  }
  
  isFull() { return this.size === this.capacity; }
  isEmpty() { return this.size === 0; }
}`}
          python={`class CircularQueue:
    def __init__(self, k):
        self.queue = [None] * k
        self.capacity = k
        self.front = 0
        self.rear = -1
        self.size = 0
    
    def enqueue(self, x):
        if self.is_full():
            return False
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = x
        self.size += 1
        return True
    
    def dequeue(self):
        if self.is_empty():
            return False
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return True
    
    def is_full(self): return self.size == self.capacity
    def is_empty(self): return self.size == 0`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="circular-queue" category="queues" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Priority Queue lesson
function PriorityQueueLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Priority Queue?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Priority Queue</strong> is an abstract
          data type where elements are dequeued based on priority, not arrival order.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Typically implemented using a <strong>Binary Heap</strong>, which gives O(log n)
          insert and O(log n) extract-min/max.
        </p>
      </LearnCard>

      <Analogy emoji="🏥" title="Hospital ER">
        In an emergency room, patients aren&apos;t treated in order of arrival. Critical cases
        (highest priority) are seen first, even if they arrived later. That&apos;s a priority queue!
      </Analogy>

      <LearnCard title="Types" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Min-Heap Priority Queue</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Smallest element has highest priority. Used in Dijkstra&apos;s algorithm.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Max-Heap Priority Queue</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Largest element has highest priority. Used in finding top K elements.
            </p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Insert", time: "O(log n)", description: "Bubble up" },
          { case: "Extract Min/Max", time: "O(log n)", description: "Bubble down" },
          { case: "Peek", time: "O(1)", description: "Root element" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n elements"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// JavaScript doesn't have built-in PQ
// Use a library or implement MinHeap

class MinPriorityQueue {
  constructor() { this.heap = []; }
  
  insert(val) {
    this.heap.push(val);
    this._bubbleUp();
  }
  
  extractMin() {
    if (!this.heap.length) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this._bubbleDown();
    }
    return min;
  }
  
  // ... bubbleUp and bubbleDown helpers
}`}
          python={`import heapq

# Python heapq is a min-heap
pq = []

heapq.heappush(pq, 3)
heapq.heappush(pq, 1)
heapq.heappush(pq, 2)

min_val = heapq.heappop(pq)  # 1

# For max-heap, negate values
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -10)
max_val = -heapq.heappop(max_heap)  # 10`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="priority-queue" category="queues" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// LRU Cache lesson
function LRUCacheLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is an LRU Cache?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">LRU (Least Recently Used) Cache</strong> is
          a data structure that evicts the least recently used item when capacity is reached.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          It combines a <strong>hash map</strong> for O(1) lookups with a <strong>doubly linked list</strong>
          for O(1) insertion/deletion at both ends.
        </p>
      </LearnCard>

      <Analogy emoji="📱" title="Browser Tabs">
        Your browser has limited memory. When you open too many tabs, it might close the tab you
        haven&apos;t used in the longest time. Every time you click a tab, it becomes &quot;recently used.&quot;
      </Analogy>

      <LearnCard title="Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">get(key) - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Return value if exists, move to front (most recently used). Return -1 if not found.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">put(key, value) - O(1)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Insert/update key. If at capacity, evict LRU (tail). Move to front.
            </p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Get", time: "O(1)", description: "Hash map lookup + list move" },
          { case: "Put", time: "O(1)", description: "Hash map insert + list operations" },
        ]}
        spaceComplexity="O(capacity)"
        spaceDescription="Fixed capacity"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();  // Maintains insertion order
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict LRU (first item)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}`}
          python={`from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Evict LRU (first item)
            self.cache.popitem(last=False)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="lru-cache" category="queues" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Singly Linked List lesson
function SinglyLinkedListLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Singly Linked List?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Singly Linked List</strong> is a linear
          data structure where each node contains data and a pointer to the next node.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Unlike arrays, linked lists allow O(1) insertion/deletion at any position (if you have
          the reference), but O(n) access by index.
        </p>
      </LearnCard>

      <Analogy emoji="🔗" title="Chain of Paper Clips">
        Imagine paper clips linked together. Each clip holds onto the next one. To find the 5th
        clip, you must start from the first and follow the chain. You can easily add or remove
        a clip anywhere without moving others!
      </Analogy>

      <LearnCard title="Node Structure" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <CodeTabs
          javascript={`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}`}
          python={`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Access by index", time: "O(n)", description: "Must traverse" },
          { case: "Insert at head", time: "O(1)", description: "Just update pointer" },
          { case: "Insert at tail", time: "O(n) or O(1)*", description: "*with tail pointer" },
          { case: "Delete (with ref)", time: "O(1)", description: "Update prev.next" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n nodes"
      />

      <LearnCard title="Basic Operations" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class LinkedList {
  constructor() { this.head = null; }
  
  // Insert at head
  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
  }
  
  // Traverse and print
  print() {
    let curr = this.head;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
}`}
          python={`class LinkedList:
    def __init__(self):
        self.head = None
    
    # Insert at head
    def prepend(self, data):
        node = Node(data)
        node.next = self.head
        self.head = node
    
    # Traverse and print
    def print_list(self):
        curr = self.head
        while curr:
            print(curr.data)
            curr = curr.next`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="singly-linked-list" category="linked-lists" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Reverse Linked List lesson
function ReverseLinkedListLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Reversing a Linked List" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Reversing a linked list</strong> changes
          the direction of all pointers so the last node becomes the new head.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This is a classic interview question with both iterative and recursive solutions.
        </p>
      </LearnCard>

      <Analogy emoji="↩️" title="Flipping a Line of Dominoes">
        Imagine a line of dominoes where each points to the next. Reversing means making each
        domino point to the one behind it instead!
      </Analogy>

      <LearnCard title="Iterative Approach" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Initialize prev = null", description: "Will become the new head." },
            { title: "curr = head", description: "Start at the head." },
            { title: "Save next", description: "Store curr.next before overwriting." },
            { title: "Reverse pointer", description: "curr.next = prev." },
            { title: "Move forward", description: "prev = curr, curr = next." },
            { title: "Repeat", description: "Until curr is null." },
            { title: "Return prev", description: "It's the new head!" },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Iterative", time: "O(n)", description: "Single pass" },
          { case: "Recursive", time: "O(n)", description: "Visit each node" },
        ]}
        spaceComplexity="O(1) / O(n)"
        spaceDescription="Iterative O(1), Recursive O(n) stack"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Iterative
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;  // New head
}

// Recursive
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}`}
          python={`# Iterative
def reverse_list(head):
    prev = None
    curr = head
    
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    
    return prev  # New head

# Recursive
def reverse_list_recursive(head):
    if not head or not head.next:
        return head
    
    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return new_head`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="reverse-linked-list" category="linked-lists" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Detect Cycle lesson
function DetectCycleLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Detecting a Cycle in Linked List" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A cycle exists when a node&apos;s next pointer points to a previous node, creating a loop.
          <strong className="text-[var(--text-primary)]"> Floyd&apos;s Tortoise and Hare</strong>
          algorithm detects this in O(1) space.
        </p>
      </LearnCard>

      <Analogy emoji="🐢🐇" title="Tortoise and Hare">
        Imagine a tortoise and hare on a circular track. The hare moves twice as fast. If there&apos;s
        a loop, they MUST meet eventually. If the track is straight, the hare reaches the end first.
      </Analogy>

      <LearnCard title="Algorithm" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Two pointers", description: "slow (1 step) and fast (2 steps)." },
            { title: "Move both", description: "slow = slow.next, fast = fast.next.next." },
            { title: "They meet?", description: "Cycle detected!" },
            { title: "fast reaches null?", description: "No cycle exists." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Cases", time: "O(n)", description: "At most 2 loops" }]}
        spaceComplexity="O(1)"
        spaceDescription="Just two pointers"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true;  // Cycle detected!
    }
  }
  
  return false;  // No cycle
}`}
          python={`def has_cycle(head):
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True  # Cycle detected!
    
    return False  # No cycle`}
        />
      </LearnCard>

      <Callout type="tip" title="Finding Cycle Start">
        After detection, reset slow to head. Move both one step at a time. They meet at the
        cycle&apos;s start node!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="detect-cycle" category="linked-lists" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Find Middle lesson
function FindMiddleLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Finding the Middle of a Linked List" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Find the middle node in <strong className="text-[var(--text-primary)]">one pass</strong> using
          the slow/fast pointer technique. When fast reaches the end, slow is at the middle!
        </p>
      </LearnCard>

      <Analogy emoji="🏃" title="Racing at Different Speeds">
        Two runners start at the same point. One runs twice as fast. When the fast runner finishes,
        the slow runner is exactly halfway!
      </Analogy>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Odd Length" input="1 → 2 → 3 → 4 → 5" output="3 (middle node)">
          <p className="text-sm text-[var(--text-secondary)]">5 nodes, middle is node 3.</p>
        </ExampleBox>
        <ExampleBox number={2} title="Even Length" input="1 → 2 → 3 → 4" output="3 (second middle)" defaultOpen={false}>
          <p className="text-sm text-[var(--text-secondary)]">For 4 nodes, return second of two middles.</p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Cases", time: "O(n)", description: "Single pass" }]}
        spaceComplexity="O(1)"
        spaceDescription="Two pointers"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;  // Middle node
}`}
          python={`def find_middle(head):
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow  # Middle node`}
        />
      </LearnCard>

      <Callout type="tip" title="Applications">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Starting point for Merge Sort on linked lists</li>
          <li>Checking if a linked list is a palindrome</li>
          <li>Splitting a list into two halves</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="find-middle" category="linked-lists" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Factorial lesson
function FactorialLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Factorial?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Factorial</strong> of n (written n!) is
          the product of all positive integers from 1 to n. It&apos;s the classic introduction
          to recursion!
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <code>n! = n × (n-1) × (n-2) × ... × 2 × 1</code>
        </p>
      </LearnCard>

      <Analogy emoji="🪆" title="Russian Dolls">
        To find how many dolls there are, open one and count it, then count what&apos;s inside.
        When you reach the smallest doll (base case), stop and add up!
      </Analogy>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
          <p>5! = 5 × 4 × 3 × 2 × 1 = 120</p>
          <p>4! = 4 × 3 × 2 × 1 = 24</p>
          <p>1! = 1</p>
          <p>0! = 1 (by definition)</p>
        </div>
      </LearnCard>

      <LearnCard title="Recursive Thinking" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Base case", description: "n = 0 or n = 1 → return 1" },
            { title: "Recursive case", description: "n! = n × (n-1)!" },
            { title: "Trust the recursion", description: "Assume (n-1)! works correctly" },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "Compute n!", time: "O(n)", description: "n multiplications" }]}
        spaceComplexity="O(n)"
        spaceDescription="n stack frames (can be O(1) iteratively)"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Recursive
function factorial(n) {
  if (n <= 1) return 1;  // Base case
  return n * factorial(n - 1);  // Recursive case
}

// Iterative (for comparison)
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`}
          python={`# Recursive
def factorial(n):
    if n <= 1:
        return 1  # Base case
    return n * factorial(n - 1)  # Recursive case

# Iterative (for comparison)
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="factorial" category="recursion" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Fibonacci lesson
function FibonacciLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the Fibonacci Sequence?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Each <strong className="text-[var(--text-primary)]">Fibonacci number</strong> is the sum
          of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <code>F(n) = F(n-1) + F(n-2)</code>, with F(0) = 0, F(1) = 1
        </p>
      </LearnCard>

      <Analogy emoji="🐇" title="Rabbit Population">
        Each pair of rabbits produces a new pair every month. The population follows the Fibonacci
        sequence! This was Fibonacci&apos;s original problem in 1202.
      </Analogy>

      <LearnCard title="The Problem with Naive Recursion" iconEmoji="⚠️" color="from-orange-500 to-red-500">
        <p className="text-[var(--text-secondary)] mb-4">
          Naive recursion recalculates the same values many times. F(5) calls F(4) and F(3),
          but F(4) also calls F(3)!
        </p>
        <p className="text-sm text-[var(--text-tertiary)]">
          This leads to O(2^n) time — exponential and very slow for large n.
        </p>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Naive Recursive", time: "O(2^n)", description: "Exponential!" },
          { case: "Memoized", time: "O(n)", description: "Each value computed once" },
          { case: "Iterative", time: "O(n)", description: "Bottom-up" },
        ]}
        spaceComplexity="O(n) or O(1)"
        spaceDescription="Memoization vs iterative with 2 vars"
      />

      <LearnCard title="Code Implementations" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Naive (slow!)
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// Memoized (fast!)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Iterative (optimal!)
function fibIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`}
          python={`# Naive (slow!)
def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# Memoized with decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1: return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Iterative (optimal!)
def fib_iterative(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="fibonacci" category="recursion" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Tower of Hanoi lesson
function TowerOfHanoiLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Tower of Hanoi?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Move n disks from source peg to destination peg, using an auxiliary peg. Rules:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
          <li>Move only one disk at a time</li>
          <li>Larger disk cannot be placed on smaller disk</li>
          <li>Only the top disk of a peg can be moved</li>
        </ul>
      </LearnCard>

      <Analogy emoji="🗼" title="Moving a Tower">
        To move a tower of n disks: First move the top n-1 disks out of the way, move the
        bottom disk, then put the n-1 disks on top. It&apos;s recursive!
      </Analogy>

      <LearnCard title="Recursive Algorithm" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Base case (n=1)", description: "Move single disk from source to destination." },
            { title: "Move n-1 disks", description: "From source to auxiliary." },
            { title: "Move largest disk", description: "From source to destination." },
            { title: "Move n-1 disks", description: "From auxiliary to destination." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "n disks", time: "O(2^n)", description: "2^n - 1 moves required" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="Recursion depth"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function hanoi(n, source, dest, aux) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${source} to \${dest}\`);
    return;
  }
  
  // Move n-1 disks from source to auxiliary
  hanoi(n - 1, source, aux, dest);
  
  // Move largest disk to destination
  console.log(\`Move disk \${n} from \${source} to \${dest}\`);
  
  // Move n-1 disks from auxiliary to destination
  hanoi(n - 1, aux, dest, source);
}

// Usage: hanoi(3, 'A', 'C', 'B');`}
          python={`def hanoi(n, source, dest, aux):
    if n == 1:
        print(f"Move disk 1 from {source} to {dest}")
        return
    
    # Move n-1 disks from source to auxiliary
    hanoi(n - 1, source, aux, dest)
    
    # Move largest disk to destination
    print(f"Move disk {n} from {source} to {dest}")
    
    # Move n-1 disks from auxiliary to destination
    hanoi(n - 1, aux, dest, source)

# Usage: hanoi(3, 'A', 'C', 'B')`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="tower-of-hanoi" category="recursion" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// N-Queens lesson
function NQueensLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is the N-Queens Problem?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Place N chess queens on an N×N board so that <strong className="text-[var(--text-primary)]">no
            two queens attack each other</strong> (same row, column, or diagonal).
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This classic problem demonstrates <strong>backtracking</strong> — trying choices and
          undoing them when they lead to dead ends.
        </p>
      </LearnCard>

      <Analogy emoji="♛" title="Job Interview Seating">
        Imagine seating interviewers in a grid where certain pairs can&apos;t sit in the same row,
        column, or diagonal. You try placements, and when conflicts arise, you go back and try
        another spot!
      </Analogy>

      <LearnCard title="Backtracking Approach" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Place row by row", description: "Try placing a queen in each column of current row." },
            { title: "Check safety", description: "Is this position safe from attacks?" },
            { title: "Safe?", description: "Recurse to next row." },
            { title: "Not safe?", description: "Try next column." },
            { title: "No valid column?", description: "Backtrack to previous row." },
            { title: "All rows filled?", description: "Solution found!" },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Worst case", time: "O(N!)", description: "Pruned by constraints" },
        ]}
        spaceComplexity="O(N)"
        spaceDescription="Store queen positions"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function solveNQueens(n) {
  const solutions = [];
  const board = Array(n).fill(-1);  // board[row] = column
  
  function isSafe(row, col) {
    for (let r = 0; r < row; r++) {
      const c = board[r];
      if (c === col || Math.abs(r - row) === Math.abs(c - col)) {
        return false;  // Same column or diagonal
      }
    }
    return true;
  }
  
  function solve(row) {
    if (row === n) {
      solutions.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col;
        solve(row + 1);
        board[row] = -1;  // Backtrack
      }
    }
  }
  
  solve(0);
  return solutions;
}`}
          python={`def solve_n_queens(n):
    solutions = []
    board = [-1] * n  # board[row] = column
    
    def is_safe(row, col):
        for r in range(row):
            c = board[r]
            if c == col or abs(r - row) == abs(c - col):
                return False  # Same column or diagonal
        return True
    
    def solve(row):
        if row == n:
            solutions.append(board[:])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                solve(row + 1)
                board[row] = -1  # Backtrack
    
    solve(0)
    return solutions`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="n-queens" category="recursion" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Binary Tree lesson
function BinaryTreeLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Binary Tree?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Binary Tree</strong> is a hierarchical
          data structure where each node has at most two children: left and right.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Trees are used in file systems, databases, expression parsing, and countless algorithms.
        </p>
      </LearnCard>

      <Analogy emoji="🌳" title="Family Tree">
        Think of a family tree. Each person can have at most 2 biological parents connecting
        upward. In a binary tree, each node has at most 2 children connecting downward!
      </Analogy>

      <LearnCard title="Terminology" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <p><strong>Root:</strong> The topmost node (no parent)</p>
          <p><strong>Leaf:</strong> Node with no children</p>
          <p><strong>Parent/Child:</strong> Direct connection between nodes</p>
          <p><strong>Height:</strong> Longest path from root to leaf</p>
          <p><strong>Depth:</strong> Distance from root to a node</p>
        </div>
      </LearnCard>

      <LearnCard title="Node Structure" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Create a tree:    1
//                  / \\
//                 2   3
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);`}
          python={`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Create a tree:    1
#                  / \\
#                 2   3
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="binary-tree" category="trees" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Tree Traversals lesson
function TreeTraversalsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Tree Traversal Patterns" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Traversal</strong> means visiting every
          node in the tree exactly once. The three DFS patterns differ in when you process
          the current node.
        </p>
      </LearnCard>

      <LearnCard title="The Three DFS Patterns" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Inorder (Left → Root → Right)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Visit left subtree, process root, visit right. For BST: gives sorted order!</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Preorder (Root → Left → Right)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Process root first, then subtrees. Good for copying/serializing trees.</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Postorder (Left → Right → Root)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Process children before parent. Good for deleting trees, evaluating expressions.</p>
          </div>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "All Traversals", time: "O(n)", description: "Visit each node once" }]}
        spaceComplexity="O(h)"
        spaceDescription="h = height (recursion stack)"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}`}
          python={`def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def preorder(root):
    if not root: return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def postorder(root):
    if not root: return []
    return postorder(root.left) + postorder(root.right) + [root.val]`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="tree-traversals" category="trees" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// BST Operations lesson
function BSTOperationsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Binary Search Tree?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">BST</strong> is a binary tree where
          for every node: all values in left subtree &lt; node value &lt; all values in right subtree.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This property enables O(log n) search, insert, and delete (when balanced).
        </p>
      </LearnCard>

      <LearnCard title="Core Operations" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Search", description: "Compare with root, go left or right based on value." },
            { title: "Insert", description: "Find correct leaf position, add new node." },
            { title: "Delete", description: "Three cases: leaf, one child, two children." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Search/Insert/Delete (avg)", time: "O(log n)", description: "Balanced tree" },
          { case: "Worst Case (skewed)", time: "O(n)", description: "Unbalanced tree" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n nodes"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function search(root, target) {
  if (!root || root.val === target) return root;
  return target < root.val 
    ? search(root.left, target) 
    : search(root.right, target);
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else {
    root.right = insert(root.right, val);
  }
  return root;
}`}
          python={`def search(root, target):
    if not root or root.val == target:
        return root
    return search(root.left, target) if target < root.val \
           else search(root.right, target)

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="bst-operations" category="trees" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Tree Height and Depth lesson
function TreeHeightDepthLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Height vs Depth" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Height:</strong> Longest path from a
          node down to a leaf. Tree height = height of root.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong className="text-[var(--text-primary)]">Depth:</strong> Distance from the root
          to a node. Root has depth 0.
        </p>
      </LearnCard>

      <LearnCard title="Examples" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox number={1} title="Tree Height" input="Tree: [1, 2, 3, 4, 5]" output="Height = 2">
          <p className="text-sm text-[var(--text-secondary)]">
            Root → left → left-left = 2 edges (longest path to leaf).
          </p>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[{ case: "Calculate Height", time: "O(n)", description: "Visit all nodes" }]}
        spaceComplexity="O(h)"
        spaceDescription="Recursion stack"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`// Height of tree (edges)
function height(root) {
  if (!root) return -1;  // Empty tree
  return 1 + Math.max(height(root.left), height(root.right));
}

// Max depth (nodes on longest path)
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Depth of specific node
function depthOf(root, target, depth = 0) {
  if (!root) return -1;
  if (root.val === target) return depth;
  const left = depthOf(root.left, target, depth + 1);
  return left !== -1 ? left : depthOf(root.right, target, depth + 1);
}`}
          python={`# Height of tree (edges)
def height(root):
    if not root:
        return -1  # Empty tree
    return 1 + max(height(root.left), height(root.right))

# Max depth (nodes on longest path)
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Depth of specific node
def depth_of(root, target, depth=0):
    if not root:
        return -1
    if root.val == target:
        return depth
    left = depth_of(root.left, target, depth + 1)
    return left if left != -1 else depth_of(root.right, target, depth + 1)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="tree-height-depth" category="trees" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Heap Structure lesson
function HeapStructureLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Heap?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">Heap</strong> is a complete binary tree
          stored as an array. It satisfies the heap property:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
          <li><strong>Max-Heap:</strong> Parent ≥ both children</li>
          <li><strong>Min-Heap:</strong> Parent ≤ both children</li>
        </ul>
      </LearnCard>

      <Analogy emoji="🏔️" title="Mountain Peak">
        Think of a max-heap as a mountain — the peak (root) is always the highest point.
        As you go down, values decrease. Every sub-mountain also has this property!
      </Analogy>

      <LearnCard title="Array Representation" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <p>For node at index i (0-indexed):</p>
          <p><strong>Parent:</strong> floor((i - 1) / 2)</p>
          <p><strong>Left child:</strong> 2i + 1</p>
          <p><strong>Right child:</strong> 2i + 2</p>
        </div>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Insert", time: "O(log n)", description: "Bubble up" },
          { case: "Extract Max/Min", time: "O(log n)", description: "Bubble down" },
          { case: "Peek", time: "O(1)", description: "Root element" },
        ]}
        spaceComplexity="O(n)"
        spaceDescription="n elements"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`class MaxHeap {
  constructor() { this.heap = []; }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }
  
  insert(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  
  _bubbleUp(i) {
    while (i > 0 && this.heap[i] > this.heap[this.parent(i)]) {
      [this.heap[i], this.heap[this.parent(i)]] = 
        [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }
}`}
          python={`class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i): return (i - 1) // 2
    def left(self, i): return 2 * i + 1
    def right(self, i): return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)
    
    def _bubble_up(self, i):
        while i > 0 and self.heap[i] > self.heap[self.parent(i)]:
            self.heap[i], self.heap[self.parent(i)] = \\
                self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="heap-structure" category="heaps" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Heapify lesson
function HeapifyLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Heapify?" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Heapify</strong> converts an unsorted
          array into a heap in O(n) time — faster than inserting elements one by one (O(n log n)).
        </p>
      </LearnCard>

      <LearnCard title="Bottom-Up Approach" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Start from last non-leaf", description: "Index: floor(n/2) - 1." },
            { title: "Apply sift-down", description: "Ensure subtree satisfies heap property." },
            { title: "Move backwards", description: "Process each node to index 0." },
          ]}
        />
      </LearnCard>

      <Callout type="insight" title="Why O(n)?">
        Most nodes are near the leaves and require only O(1) work. The math shows that summing
        all sift-down operations gives O(n), not O(n log n)!
      </Callout>

      <ComplexityTable
        timeComplexity={[{ case: "Build Heap", time: "O(n)", description: "Bottom-up heapify" }]}
        spaceComplexity="O(1)"
        spaceDescription="In-place"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
}`}
          python={`def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def build_max_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="heapify" category="heaps" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Heap Sort lesson
function HeapSortLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="How Heap Sort Works" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Heap Sort</strong> uses a max-heap to
          sort in ascending order. It&apos;s in-place and guarantees O(n log n).
        </p>
      </LearnCard>

      <LearnCard title="Algorithm" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Build max-heap", description: "Heapify the array — O(n)." },
            { title: "Swap root with last", description: "Largest element goes to end." },
            { title: "Reduce heap size", description: "Exclude sorted element." },
            { title: "Heapify root", description: "Restore heap property — O(log n)." },
            { title: "Repeat", description: "Until heap size is 1." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n log n)", description: "Build O(n) + n × heapify O(log n)" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="In-place"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function heapSort(arr) {
  const n = arr.length;
  
  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];  // Swap
    heapify(arr, i, 0);  // Heapify reduced heap
  }
  
  return arr;
}`}
          python={`def heap_sort(arr):
    n = len(arr)
    
    # Build max-heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Swap
        heapify(arr, i, 0)  # Heapify reduced heap
    
    return arr`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="heap-sort" category="heaps" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// K-th Largest lesson
function KthLargestLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Finding K-th Largest Element" iconEmoji="📌" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Find the k-th largest element without fully sorting. Use a <strong className="text-[var(--text-primary)]">
            min-heap of size k</strong> — the root is always the k-th largest!
        </p>
      </LearnCard>

      <LearnCard title="Min-Heap Approach" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            { title: "Build min-heap of first k elements", description: "O(k)" },
            { title: "For remaining elements", description: "If larger than root, replace root." },
            { title: "Heapify after replacement", description: "O(log k)" },
            { title: "Result", description: "Root is k-th largest." },
          ]}
        />
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Min-Heap Method", time: "O(n log k)", description: "Best for streaming" },
          { case: "QuickSelect (avg)", time: "O(n)", description: "Alternative method" },
        ]}
        spaceComplexity="O(k)"
        spaceDescription="Heap size"
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function findKthLargest(nums, k) {
  // Use min-heap of size k
  const minHeap = new MinPriorityQueue();
  
  for (const num of nums) {
    minHeap.enqueue(num);
    if (minHeap.size() > k) {
      minHeap.dequeue();  // Remove smallest
    }
  }
  
  return minHeap.front().element;  // k-th largest
}

// Without library (sort-based, simpler)
function kthLargestSimple(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`}
          python={`import heapq

def find_kth_largest(nums, k):
    # Min-heap of size k
    min_heap = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest
    
    return min_heap[0]  # k-th largest

# One-liner using nlargest
def kth_largest_simple(nums, k):
    return heapq.nlargest(k, nums)[-1]`}
        />
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="kth-largest" category="heaps" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Hash Functions Lesson
function HashFunctionsLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What are Hash Functions?" iconEmoji="🔑" color="from-purple-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">hash function</strong> is a mathematical function that
          converts an input (or &quot;key&quot;) of any size into a fixed-size output called a <strong className="text-[var(--text-primary)]">hash value</strong> or
          <strong className="text-[var(--text-primary)]"> hash code</strong>.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Hash functions are the backbone of hash tables, enabling O(1) average-time lookups by converting keys
          directly into array indices. A good hash function distributes keys uniformly across the available slots.
        </p>
      </LearnCard>

      <Analogy emoji="📬" title="Mailbox Sorting">
        Imagine a post office with numbered mailboxes. When a letter arrives, the postal worker uses the
        recipient&apos;s name to calculate which mailbox number to place it in. The &quot;calculation&quot; is like a
        hash function — it takes a name (any length) and produces a mailbox number (fixed range).
        Different names should ideally go to different mailboxes for efficient retrieval.
      </Analogy>

      <LearnCard title="Properties of Good Hash Functions" iconEmoji="✨" color="from-green-500 to-teal-500">
        <StepByStep
          steps={[
            {
              title: "Deterministic",
              description: "Same input always produces the same output. hash('apple') is always the same.",
            },
            {
              title: "Uniform Distribution",
              description: "Hash values should be evenly spread across the output range to minimize collisions.",
            },
            {
              title: "Fast Computation",
              description: "The hash should be computed quickly — ideally O(1) or O(k) where k is key length.",
            },
            {
              title: "Avalanche Effect",
              description: "Small changes in input should cause significant changes in output (for cryptographic hashes).",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Common Hash Techniques" iconEmoji="🧮" color="from-orange-500 to-red-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Division Method</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(k) = k mod m</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Simple and fast. Choose m as a prime number not close to a power of 2 for best distribution.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Multiplication Method</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(k) = ⌊m × (k × A mod 1)⌋</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Uses a constant A (0 &lt; A &lt; 1). Knuth suggests A ≈ 0.6180339887 (golden ratio).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">String Hashing (Polynomial)</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(s) = Σ s[i] × p^i mod m</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              For strings: each character contributes based on its position. Common choices: p=31, m=10^9+9.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Best Case", time: "O(1)", description: "Fixed-size key hashing" },
            { case: "Average Case", time: "O(1)", description: "Variable-length key of length k is O(k)" },
            { case: "Worst Case", time: "O(n)", description: "During collision resolution in hash tables" },
          ]}
          spaceComplexity="O(1)"
          spaceDescription="Only stores the hash value"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Simple hash functions in JavaScript

// Division method hash
function divisionHash(key, tableSize) {
  return key % tableSize;
}

// String hash (polynomial rolling hash)
function stringHash(str, tableSize) {
  const p = 31;  // Prime base
  const m = 1e9 + 9;  // Large prime modulus
  let hash = 0;
  let pPow = 1;
  
  for (let char of str) {
    hash = (hash + (char.charCodeAt(0) - 'a'.charCodeAt(0) + 1) * pPow) % m;
    pPow = (pPow * p) % m;
  }
  
  return hash % tableSize;
}

// djb2 hash (popular string hash)
function djb2Hash(str) {
  let hash = 5381;
  for (let char of str) {
    hash = ((hash << 5) + hash) + char.charCodeAt(0);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Example usage
console.log(divisionHash(42, 10));      // 2
console.log(stringHash("hello", 100));  // Varies
console.log(djb2Hash("hello"));         // 261238937`}
          python={`# Simple hash functions in Python

def division_hash(key: int, table_size: int) -> int:
    """Division method hash."""
    return key % table_size

def string_hash(s: str, table_size: int) -> int:
    """Polynomial rolling hash for strings."""
    p = 31  # Prime base
    m = 10**9 + 9  # Large prime modulus
    hash_value = 0
    p_pow = 1
    
    for char in s:
        hash_value = (hash_value + (ord(char) - ord('a') + 1) * p_pow) % m
        p_pow = (p_pow * p) % m
    
    return hash_value % table_size

def djb2_hash(s: str) -> int:
    """djb2 hash algorithm (popular string hash)."""
    hash_value = 5381
    for char in s:
        hash_value = ((hash_value << 5) + hash_value) + ord(char)
        hash_value &= 0xFFFFFFFF  # Keep as 32-bit
    return hash_value

# Python's built-in hash (for reference)
print(hash("hello"))  # Python's default hash

# Custom implementations
print(division_hash(42, 10))      # 2
print(string_hash("hello", 100))  # Varies
print(djb2_hash("hello"))         # 261238937`}
        />
      </LearnCard>

      <Callout type="insight" title="Hash vs Cryptographic Hash">
        Regular hash functions (like those in hash tables) prioritize speed and uniform distribution.
        Cryptographic hash functions (SHA-256, MD5) add security properties like collision resistance
        and pre-image resistance, but are slower. Don&apos;t use cryptographic hashes for hash tables!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="hash-functions" category="hashing" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Hash Tables Lesson
function HashTablesLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Hash Table?" iconEmoji="📦" color="from-blue-500 to-cyan-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">hash table</strong> (also known as a hash map) is a data
          structure that implements an associative array — a structure that maps keys to values using a hash function.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Hash tables provide <strong className="text-[var(--text-primary)]">O(1) average-time complexity</strong> for
          insertions, deletions, and lookups, making them one of the most efficient data structures for key-value storage.
        </p>
      </LearnCard>

      <Analogy emoji="📚" title="Library Catalog">
        Think of a hash table like a library&apos;s card catalog system. Each book (value) has a unique ISBN
        (key). The catalog uses a system (hash function) to quickly determine exactly which shelf and
        position (array index) a book should be placed in or retrieved from. Instead of searching all shelves,
        you go directly to the right spot!
      </Analogy>

      <LearnCard title="How Hash Tables Work" iconEmoji="⚙️" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Hash the Key",
              description: "Apply a hash function to the key to get an integer hash code.",
            },
            {
              title: "Compute Index",
              description: "Use modulo operation: index = hashCode % arraySize to get a valid array index.",
            },
            {
              title: "Store/Retrieve",
              description: "Store the key-value pair at the computed index, or retrieve the value at that index.",
            },
            {
              title: "Handle Collisions",
              description: "When two keys hash to the same index, use collision resolution (chaining or probing).",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Hash Table Operations" iconEmoji="🔧" color="from-green-500 to-teal-500">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Operation</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Average</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Worst</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4 font-mono">put(key, value)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">Insert or update a key-value pair</td>
              </tr>
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4 font-mono">get(key)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">Retrieve value by key</td>
              </tr>
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4 font-mono">delete(key)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">Remove a key-value pair</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono">contains(key)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">Check if key exists</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LearnCard>

      <LearnCard title="Load Factor & Resizing" iconEmoji="📈" color="from-orange-500 to-amber-500">
        <ExampleBox
          number={1}
          title="Load Factor"
          input="n entries, m table size"
          output="α = n / m"
        >
          <div className="space-y-2">
            <code className="text-[var(--color-primary-400)]">Load Factor (α) = n / m</code>
            <p className="text-sm text-[var(--text-secondary)]">
              Where n = number of entries, m = table size. Higher load factor means more collisions.
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              Typically, tables resize (double capacity) when α exceeds 0.7-0.75 to maintain O(1) performance.
            </p>
          </div>
        </ExampleBox>
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Simple Hash Table with Chaining
class HashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
    this.count = 0;
  }
  
  // Simple hash function
  _hash(key) {
    let hash = 0;
    for (let char of String(key)) {
      hash = (hash * 31 + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }
  
  // Insert or update
  put(key, value) {
    const index = this._hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    
    // Check if key exists, update if so
    for (let pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    
    // Add new key-value pair
    this.table[index].push([key, value]);
    this.count++;
  }
  
  // Retrieve value
  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    
    if (bucket) {
      for (let [k, v] of bucket) {
        if (k === key) return v;
      }
    }
    return undefined;
  }
  
  // Remove key
  delete(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          this.count--;
          return true;
        }
      }
    }
    return false;
  }
  
  // Check if key exists
  has(key) {
    return this.get(key) !== undefined;
  }
}

// Usage
const ht = new HashTable();
ht.put("name", "Alice");
ht.put("age", 25);
console.log(ht.get("name"));  // "Alice"
console.log(ht.has("age"));   // true
ht.delete("age");
console.log(ht.has("age"));   // false`}
          python={`# Simple Hash Table with Chaining
class HashTable:
    def __init__(self, size: int = 53):
        self.size = size
        self.table = [[] for _ in range(size)]
        self.count = 0
    
    def _hash(self, key) -> int:
        """Simple hash function."""
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value * 31 + ord(char)) % self.size
        return hash_value
    
    def put(self, key, value) -> None:
        """Insert or update a key-value pair."""
        index = self._hash(key)
        
        # Check if key exists, update if so
        for pair in self.table[index]:
            if pair[0] == key:
                pair[1] = value
                return
        
        # Add new key-value pair
        self.table[index].append([key, value])
        self.count += 1
    
    def get(self, key):
        """Retrieve value by key."""
        index = self._hash(key)
        
        for k, v in self.table[index]:
            if k == key:
                return v
        return None
    
    def delete(self, key) -> bool:
        """Remove a key-value pair."""
        index = self._hash(key)
        
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index].pop(i)
                self.count -= 1
                return True
        return False
    
    def __contains__(self, key) -> bool:
        """Check if key exists (enables 'in' operator)."""
        return self.get(key) is not None

# Usage
ht = HashTable()
ht.put("name", "Alice")
ht.put("age", 25)
print(ht.get("name"))   # "Alice"
print("age" in ht)      # True
ht.delete("age")
print("age" in ht)      # False

# Python's built-in dict IS a hash table!
d = {"name": "Alice", "age": 25}
print(d["name"])        # "Alice"`}
        />
      </LearnCard>

      <Callout type="tip" title="When to Use Hash Tables">
        Use hash tables when you need fast lookups by key: caching, counting frequencies, implementing sets,
        deduplication, indexing database records, and symbol tables in compilers.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="hash-tables" category="hashing" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Collision Resolution Lesson
function CollisionResolutionLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What are Hash Collisions?" iconEmoji="💥" color="from-red-500 to-orange-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">collision</strong> occurs when two different keys
          produce the same hash value (index). Since hash tables have finite size but potentially infinite keys,
          collisions are inevitable by the Pigeonhole Principle.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Collision resolution strategies determine how to handle these conflicts to ensure all key-value pairs
          can be stored and retrieved correctly.
        </p>
      </LearnCard>

      <Analogy emoji="🏠" title="Two Families, One Address">
        Imagine two families are assigned the same house address by the postal system. There are two ways
        to handle this: <strong>Chaining</strong> — both families live together in the same house (multiple
        entries at same index), or <strong>Open Addressing</strong> — one family looks for the next available
        house on the street (probing for empty slot).
      </Analogy>

      <LearnCard title="1. Separate Chaining" iconEmoji="🔗" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Each bucket contains a linked list (or dynamic array) of all key-value pairs that hash to that index.
        </p>
        <StepByStep
          steps={[
            {
              title: "Insert",
              description: "Hash the key, then append the key-value pair to the list at that index.",
            },
            {
              title: "Search",
              description: "Hash the key, then traverse the list at that index to find the matching key.",
            },
            {
              title: "Delete",
              description: "Hash the key, find and remove the pair from the list.",
            },
          ]}
        />
        <div className="mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong className="text-green-400">Pros:</strong> Simple, never fills up, works well with high load factors<br />
            <strong className="text-red-400">Cons:</strong> Extra memory for pointers, cache-unfriendly due to scattered memory access
          </p>
        </div>
      </LearnCard>

      <LearnCard title="2. Open Addressing" iconEmoji="🔍" color="from-purple-500 to-pink-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          All entries are stored in the hash table array itself. When a collision occurs, we probe for the next empty slot.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Linear Probing</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(k, i) = (h(k) + i) mod m</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Check slots sequentially: index, index+1, index+2... Simple but causes <em>clustering</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Quadratic Probing</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(k, i) = (h(k) + c₁×i + c₂×i²) mod m</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Check slots at quadratic intervals: index, index+1, index+4, index+9... Reduces primary clustering.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Double Hashing</h4>
            <code className="text-sm text-[var(--color-primary-400)]">h(k, i) = (h₁(k) + i×h₂(k)) mod m</code>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Uses a second hash function for step size. Best distribution, minimizes clustering.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Comparison" iconEmoji="📊" color="from-cyan-500 to-teal-500">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Method</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Average</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Worst</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Space</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4">Separate Chaining</td>
                <td className="py-3 px-4 text-green-400">O(1 + α)</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">O(m + n)</td>
              </tr>
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4">Linear Probing</td>
                <td className="py-3 px-4 text-green-400">O(1/(1-α))</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">O(m)</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Double Hashing</td>
                <td className="py-3 px-4 text-green-400">O(1/(1-α))</td>
                <td className="py-3 px-4 text-red-400">O(n)</td>
                <td className="py-3 px-4">O(m)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-3">
          α = load factor (n/m). For open addressing, keep α &lt; 0.7 for good performance.
        </p>
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Hash Table with Linear Probing (Open Addressing)
class HashTableLP {
  constructor(size = 53) {
    this.size = size;
    this.keys = new Array(size).fill(null);
    this.values = new Array(size).fill(null);
    this.count = 0;
  }
  
  _hash(key) {
    let hash = 0;
    for (let char of String(key)) {
      hash = (hash * 31 + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }
  
  // Linear probing: find next available slot
  put(key, value) {
    if (this.count >= this.size * 0.7) {
      throw new Error("Table is too full! Need to resize.");
    }
    
    let index = this._hash(key);
    
    // Probe until empty slot or same key found
    while (this.keys[index] !== null) {
      if (this.keys[index] === key) {
        this.values[index] = value;  // Update existing
        return;
      }
      index = (index + 1) % this.size;  // Linear probe
    }
    
    // Insert new entry
    this.keys[index] = key;
    this.values[index] = value;
    this.count++;
  }
  
  get(key) {
    let index = this._hash(key);
    let probes = 0;
    
    while (this.keys[index] !== null && probes < this.size) {
      if (this.keys[index] === key) {
        return this.values[index];
      }
      index = (index + 1) % this.size;
      probes++;
    }
    return undefined;
  }
  
  // Delete with tombstone (to maintain probe sequence)
  delete(key) {
    let index = this._hash(key);
    
    while (this.keys[index] !== null) {
      if (this.keys[index] === key) {
        this.keys[index] = "DELETED";  // Tombstone
        this.values[index] = null;
        this.count--;
        return true;
      }
      index = (index + 1) % this.size;
    }
    return false;
  }
}

// Usage
const ht = new HashTableLP(10);
ht.put("apple", 5);
ht.put("banana", 3);
ht.put("cherry", 7);
console.log(ht.get("banana"));  // 3`}
          python={`# Hash Table with Linear Probing (Open Addressing)
class HashTableLP:
    DELETED = object()  # Tombstone marker
    
    def __init__(self, size: int = 53):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
        self.count = 0
    
    def _hash(self, key) -> int:
        hash_value = 0
        for char in str(key):
            hash_value = (hash_value * 31 + ord(char)) % self.size
        return hash_value
    
    def put(self, key, value) -> None:
        """Insert with linear probing."""
        if self.count >= self.size * 0.7:
            raise Exception("Table is too full! Need to resize.")
        
        index = self._hash(key)
        
        # Probe until empty or same key
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value  # Update
                return
            if self.keys[index] is self.DELETED:
                break  # Can reuse deleted slot
            index = (index + 1) % self.size
        
        self.keys[index] = key
        self.values[index] = value
        self.count += 1
    
    def get(self, key):
        """Retrieve with linear probing."""
        index = self._hash(key)
        probes = 0
        
        while self.keys[index] is not None and probes < self.size:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.size
            probes += 1
        return None
    
    def delete(self, key) -> bool:
        """Delete with tombstone."""
        index = self._hash(key)
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.keys[index] = self.DELETED
                self.values[index] = None
                self.count -= 1
                return True
            index = (index + 1) % self.size
        return False

# Usage
ht = HashTableLP(10)
ht.put("apple", 5)
ht.put("banana", 3)
print(ht.get("banana"))  # 3`}
        />
      </LearnCard>

      <Callout type="warning" title="Deletion in Open Addressing">
        You cannot simply remove an entry in open addressing — it would break the probe sequence.
        Use <strong>tombstones</strong> (special &quot;DELETED&quot; markers) or <strong>lazy deletion</strong>
        to mark slots as deleted while preserving the probe chain.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="collision-resolution" category="hashing" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Two Sum Problem Lesson
function TwoSumLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="The Two Sum Problem" iconEmoji="🎯" color="from-green-500 to-teal-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Two Sum</strong> is a classic coding interview problem:
          Given an array of integers and a target sum, find two numbers that add up to the target. Return
          their indices.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="nums = [2, 7, 11, 15], target = 9"
          output="[0, 1]"
        >
          <p className="text-sm text-[var(--text-secondary)]">Explanation: nums[0] + nums[1] = 2 + 7 = 9</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="🧩" title="Finding Puzzle Pieces">
        Imagine you have a collection of puzzle pieces, each with a number on it. You need to find two
        pieces that add up to a specific number to complete a section. The naive way is to try every
        combination. The smart way? Keep a &quot;wanted list&quot; — for each piece you see, write down what
        piece you&apos;d need to complete the sum. When you find a match, you&apos;re done!
      </Analogy>

      <LearnCard title="Approach Comparison" iconEmoji="⚖️" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">❌ Brute Force: O(n²)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Check every pair of numbers. For each element, scan the rest of the array.
              Time: O(n²), Space: O(1)
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">✅ Hash Map: O(n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Use a hash map to store seen numbers and their indices. For each number, check if
              (target - number) exists in the map.
              Time: O(n), Space: O(n)
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">✅ Two Pointers: O(n log n)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Sort the array, use two pointers from both ends. Requires returning values, not indices.
              Time: O(n log n), Space: O(1) or O(n) for sorted copy
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Hash Map Solution (Optimal)" iconEmoji="📖" color="from-blue-500 to-indigo-500">
        <StepByStep
          steps={[
            {
              title: "Initialize Hash Map",
              description: "Create an empty hash map to store {number: index} pairs.",
            },
            {
              title: "Iterate Through Array",
              description: "For each number at index i, calculate complement = target - nums[i].",
            },
            {
              title: "Check Hash Map",
              description: "If complement exists in map, return [map[complement], i].",
            },
            {
              title: "Store Current Number",
              description: "If not found, add nums[i] → i to the hash map and continue.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Best Case", time: "O(1)", description: "Target pair found at the start" },
            { case: "Average Case", time: "O(n)", description: "Single pass through array" },
            { case: "Worst Case", time: "O(n)", description: "Target pair at the end" },
          ]}
          spaceComplexity="O(n)"
          spaceDescription="Hash map stores up to n elements"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Two Sum - Hash Map Solution (Optimal)
function twoSum(nums, target) {
  const map = new Map();  // number -> index
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    // Check if complement exists
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    // Store current number with its index
    map.set(nums[i], i);
  }
  
  return [];  // No solution found
}

// Example usage
console.log(twoSum([2, 7, 11, 15], 9));   // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]

// Brute Force (for comparison)
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Two Pointers (returns values, not indices)
function twoSumSorted(nums, target) {
  const sorted = [...nums].sort((a, b) => a - b);
  let left = 0, right = sorted.length - 1;
  
  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) {
      return [sorted[left], sorted[right]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`}
          python={`# Two Sum - Hash Map Solution (Optimal)
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # number -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists
        if complement in seen:
            return [seen[complement], i]
        
        # Store current number with its index
        seen[num] = i
    
    return []  # No solution found

# Example usage
print(two_sum([2, 7, 11, 15], 9))   # [0, 1]
print(two_sum([3, 2, 4], 6))        # [1, 2]
print(two_sum([3, 3], 6))           # [0, 1]

# Brute Force (for comparison)
def two_sum_brute(nums: list[int], target: int) -> list[int]:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Two Pointers (works on sorted array, returns values)
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    sorted_nums = sorted(nums)
    left, right = 0, len(sorted_nums) - 1
    
    while left < right:
        total = sorted_nums[left] + sorted_nums[right]
        if total == target:
            return [sorted_nums[left], sorted_nums[right]]
        elif total < target:
            left += 1
        else:
            right -= 1
    return []`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Hash Maps?">
        The key insight is that for each number x, we need to find (target - x). A hash map gives us
        O(1) lookup for whether we&apos;ve seen the complement before. This transforms O(n²) brute force
        into O(n) — a massive speedup for large arrays!
      </Callout>

      <LearnCard title="Variations & Follow-ups" iconEmoji="🔄" color="from-amber-500 to-orange-500">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Three Sum:</strong>
            <span className="text-[var(--text-secondary)]"> Find three numbers that add to target (sort + two pointers)</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Two Sum II (Sorted):</strong>
            <span className="text-[var(--text-secondary)]"> Input is sorted — use two pointers for O(1) space</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Two Sum - Data Structure:</strong>
            <span className="text-[var(--text-secondary)]"> Design a class with add() and find() operations</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Subarray Sum:</strong>
            <span className="text-[var(--text-secondary)]"> Find subarray with given sum (prefix sums + hash map)</span>
          </div>
        </div>
      </LearnCard>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="two-sum" category="hashing" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Graph Representation Lesson
function GraphRepresentationLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is a Graph?" iconEmoji="🕸️" color="from-purple-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">graph</strong> is a non-linear data structure
          consisting of <strong className="text-[var(--text-primary)]">vertices</strong> (nodes) connected by
          <strong className="text-[var(--text-primary)]"> edges</strong> (links). Graphs are used to model
          relationships between objects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Undirected Graph</h4>
            <p className="text-sm text-[var(--text-secondary)]">Edges have no direction (A—B means both can reach each other)</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Directed Graph (Digraph)</h4>
            <p className="text-sm text-[var(--text-secondary)]">Edges have direction (A→B means only A can reach B)</p>
          </div>
        </div>
      </LearnCard>

      <Analogy emoji="🗺️" title="City Road Map">
        Think of a city as a graph: intersections are vertices, and roads are edges. One-way streets
        are directed edges, while two-way streets are undirected. Finding the shortest route between
        two locations is a classic graph problem (shortest path).
      </Analogy>

      <LearnCard title="Graph Terminology" iconEmoji="📚" color="from-green-500 to-teal-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Vertex (Node):</strong>
            <span className="text-[var(--text-secondary)]"> A point in the graph</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Edge:</strong>
            <span className="text-[var(--text-secondary)]"> Connection between two vertices</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Degree:</strong>
            <span className="text-[var(--text-secondary)]"> Number of edges connected to a vertex</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Path:</strong>
            <span className="text-[var(--text-secondary)]"> Sequence of vertices connected by edges</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Cycle:</strong>
            <span className="text-[var(--text-secondary)]"> Path that starts and ends at the same vertex</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Weighted:</strong>
            <span className="text-[var(--text-secondary)]"> Edges have associated costs/distances</span>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="1. Adjacency Matrix" iconEmoji="📊" color="from-blue-500 to-cyan-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A 2D array where <code className="text-[var(--color-primary-400)]">matrix[i][j] = 1</code> if there&apos;s
          an edge from vertex i to j, and 0 otherwise. For weighted graphs, store the weight instead of 1.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-green-400 mb-2">✅ Pros</h4>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• O(1) edge lookup</li>
              <li>• Simple implementation</li>
              <li>• Good for dense graphs</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-red-400 mb-2">❌ Cons</h4>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• O(V²) space always</li>
              <li>• Wasteful for sparse graphs</li>
              <li>• Adding vertices is expensive</li>
            </ul>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="2. Adjacency List" iconEmoji="📝" color="from-orange-500 to-red-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          An array of lists where each vertex has a list of its neighboring vertices. More space-efficient
          for sparse graphs (most real-world graphs).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-green-400 mb-2">✅ Pros</h4>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• O(V + E) space</li>
              <li>• Efficient for sparse graphs</li>
              <li>• Easy to iterate neighbors</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-red-400 mb-2">❌ Cons</h4>
            <ul className="text-sm text-[var(--text-secondary)] space-y-1">
              <li>• O(degree) edge lookup</li>
              <li>• Slightly complex structure</li>
              <li>• More memory per edge (pointers)</li>
            </ul>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Comparison" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-primary)]">
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Operation</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Adj Matrix</th>
                <th className="text-left py-3 px-4 text-[var(--text-primary)] font-semibold">Adj List</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4">Space</td>
                <td className="py-3 px-4">O(V²)</td>
                <td className="py-3 px-4 text-green-400">O(V + E)</td>
              </tr>
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4">Check edge (u, v)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4">O(degree(u))</td>
              </tr>
              <tr className="border-b border-[var(--border-primary)]/50">
                <td className="py-3 px-4">Add edge</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
                <td className="py-3 px-4 text-green-400">O(1)</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Get all neighbors</td>
                <td className="py-3 px-4">O(V)</td>
                <td className="py-3 px-4 text-green-400">O(degree(u))</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Graph Representation in JavaScript

// 1. Adjacency Matrix
class GraphMatrix {
  constructor(numVertices) {
    this.V = numVertices;
    this.matrix = Array(numVertices)
      .fill(null)
      .map(() => Array(numVertices).fill(0));
  }
  
  addEdge(u, v, directed = false) {
    this.matrix[u][v] = 1;
    if (!directed) {
      this.matrix[v][u] = 1;  // Undirected: add both directions
    }
  }
  
  hasEdge(u, v) {
    return this.matrix[u][v] === 1;
  }
  
  getNeighbors(u) {
    const neighbors = [];
    for (let v = 0; v < this.V; v++) {
      if (this.matrix[u][v]) neighbors.push(v);
    }
    return neighbors;
  }
}

// 2. Adjacency List (more common)
class GraphList {
  constructor() {
    this.adjList = new Map();
  }
  
  addVertex(v) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    }
  }
  
  addEdge(u, v, directed = false) {
    this.addVertex(u);
    this.addVertex(v);
    this.adjList.get(u).push(v);
    if (!directed) {
      this.adjList.get(v).push(u);
    }
  }
  
  getNeighbors(u) {
    return this.adjList.get(u) || [];
  }
  
  hasEdge(u, v) {
    return this.adjList.has(u) && this.adjList.get(u).includes(v);
  }
}

// Example usage
const g = new GraphList();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
console.log(g.getNeighbors(0));  // [1, 2]`}
          python={`# Graph Representation in Python

# 1. Adjacency Matrix
class GraphMatrix:
    def __init__(self, num_vertices: int):
        self.V = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u: int, v: int, directed: bool = False):
        self.matrix[u][v] = 1
        if not directed:
            self.matrix[v][u] = 1  # Undirected
    
    def has_edge(self, u: int, v: int) -> bool:
        return self.matrix[u][v] == 1
    
    def get_neighbors(self, u: int) -> list[int]:
        return [v for v in range(self.V) if self.matrix[u][v]]

# 2. Adjacency List (more common)
from collections import defaultdict

class GraphList:
    def __init__(self):
        self.adj_list = defaultdict(list)
    
    def add_edge(self, u, v, directed: bool = False):
        self.adj_list[u].append(v)
        if not directed:
            self.adj_list[v].append(u)
    
    def get_neighbors(self, u):
        return self.adj_list[u]
    
    def has_edge(self, u, v) -> bool:
        return v in self.adj_list[u]

# Example usage
g = GraphList()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
print(g.get_neighbors(0))  # [1, 2]`}
        />
      </LearnCard>

      <Callout type="tip" title="When to Use Which?">
        Use <strong>adjacency list</strong> for most applications — it&apos;s more space-efficient and most
        graphs are sparse. Use <strong>adjacency matrix</strong> when you need O(1) edge lookups or the
        graph is dense (E ≈ V²).
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="graph-representation" category="graphs" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// BFS Lesson
function BFSLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Breadth-First Search?" iconEmoji="🌊" color="from-blue-500 to-cyan-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Breadth-First Search (BFS)</strong> is a graph
          traversal algorithm that explores vertices level by level, starting from a source node. It visits
          all neighbors at the current depth before moving to the next level.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          BFS uses a <strong className="text-[var(--text-primary)]">queue</strong> to keep track of vertices
          to visit, ensuring FIFO (First-In-First-Out) order. This makes it ideal for finding shortest paths
          in unweighted graphs.
        </p>
      </LearnCard>

      <Analogy emoji="🌊" title="Ripples in a Pond">
        Imagine dropping a pebble into a still pond. The ripples spread outward in concentric circles —
        first the closest water molecules move, then those further away, and so on. BFS works the same way:
        it explores all vertices at distance 1 from the start, then distance 2, then distance 3...
      </Analogy>

      <LearnCard title="How BFS Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Initialize",
              description: "Create a queue, add the starting vertex, and mark it as visited.",
            },
            {
              title: "Dequeue",
              description: "Remove the front vertex from the queue and process it.",
            },
            {
              title: "Explore Neighbors",
              description: "For each unvisited neighbor, mark it visited and add it to the queue.",
            },
            {
              title: "Repeat",
              description: "Continue until the queue is empty. All reachable vertices will be visited.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="BFS Applications" iconEmoji="🎯" color="from-green-500 to-teal-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Shortest Path:</strong>
            <span className="text-[var(--text-secondary)]"> In unweighted graphs</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Level Order:</strong>
            <span className="text-[var(--text-secondary)]"> Tree traversal by levels</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Connected Components:</strong>
            <span className="text-[var(--text-secondary)]"> Find all connected vertices</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Bipartite Check:</strong>
            <span className="text-[var(--text-secondary)]"> Can graph be 2-colored?</span>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Time", time: "O(V + E)", description: "Visit each vertex and edge once" },
          ]}
          spaceComplexity="O(V)"
          spaceDescription="Queue and visited array storage"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Breadth-First Search (BFS)
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();  // Dequeue
    result.push(vertex);
    
    // Explore all neighbors
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);  // Enqueue
      }
    }
  }
  
  return result;
}

// BFS Shortest Path (unweighted graph)
function bfsShortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]];  // [vertex, path]
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    if (vertex === end) {
      return path;  // Found shortest path!
    }
    
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null;  // No path exists
}

// Example with adjacency list
class Graph {
  constructor() {
    this.adjList = new Map();
  }
  addEdge(u, v) {
    if (!this.adjList.has(u)) this.adjList.set(u, []);
    if (!this.adjList.has(v)) this.adjList.set(v, []);
    this.adjList.get(u).push(v);
    this.adjList.get(v).push(u);
  }
  getNeighbors(u) {
    return this.adjList.get(u) || [];
  }
}

const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
console.log(bfs(g, 0));  // [0, 1, 2, 3]
console.log(bfsShortestPath(g, 0, 3));  // [0, 1, 3] or [0, 2, 3]`}
          python={`# Breadth-First Search (BFS)
from collections import deque, defaultdict

def bfs(graph: dict, start) -> list:
    visited = {start}
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()  # Dequeue
        result.append(vertex)
        
        # Explore all neighbors
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # Enqueue
    
    return result

# BFS Shortest Path (unweighted graph)
def bfs_shortest_path(graph: dict, start, end) -> list:
    visited = {start}
    queue = deque([(start, [start])])  # (vertex, path)
    
    while queue:
        vertex, path = queue.popleft()
        
        if vertex == end:
            return path  # Found shortest path!
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path exists

# Example with adjacency list
class Graph:
    def __init__(self):
        self.adj_list = defaultdict(list)
    
    def add_edge(self, u, v):
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)

g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
print(bfs(g.adj_list, 0))  # [0, 1, 2, 3]
print(bfs_shortest_path(g.adj_list, 0, 3))  # [0, 1, 3]`}
        />
      </LearnCard>

      <Callout type="insight" title="BFS vs DFS">
        BFS explores <strong>breadth-wise</strong> (level by level) using a queue, while DFS explores
        <strong> depth-wise</strong> (as deep as possible) using a stack or recursion. BFS guarantees
        shortest path in unweighted graphs; DFS is often simpler and uses less memory for deep graphs.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="bfs" category="graphs" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// DFS Lesson
function DFSLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Depth-First Search?" iconEmoji="🏊" color="from-purple-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Depth-First Search (DFS)</strong> is a graph
          traversal algorithm that explores as far as possible along each branch before backtracking. It
          dives deep into one path before exploring alternatives.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          DFS can be implemented using <strong className="text-[var(--text-primary)]">recursion</strong> (implicit
          call stack) or an explicit <strong className="text-[var(--text-primary)]">stack</strong>. It&apos;s
          fundamental for many graph algorithms like topological sort and cycle detection.
        </p>
      </LearnCard>

      <Analogy emoji="🌲" title="Exploring a Maze">
        Imagine exploring a maze: you walk down a path until you hit a dead end, then backtrack to the
        last junction and try a different path. You keep doing this until you&apos;ve explored the entire maze.
        That&apos;s DFS — go deep, hit a wall, backtrack, repeat.
      </Analogy>

      <LearnCard title="How DFS Works" iconEmoji="📖" color="from-pink-500 to-rose-500">
        <StepByStep
          steps={[
            {
              title: "Start at Source",
              description: "Mark the starting vertex as visited and begin exploration.",
            },
            {
              title: "Go Deep",
              description: "Pick an unvisited neighbor and recursively visit it.",
            },
            {
              title: "Backtrack",
              description: "When no unvisited neighbors remain, return to the previous vertex.",
            },
            {
              title: "Complete",
              description: "Continue until all reachable vertices have been visited.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="DFS Applications" iconEmoji="🎯" color="from-green-500 to-teal-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Cycle Detection:</strong>
            <span className="text-[var(--text-secondary)]"> Find if graph has cycles</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Topological Sort:</strong>
            <span className="text-[var(--text-secondary)]"> Order tasks by dependencies</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Path Finding:</strong>
            <span className="text-[var(--text-secondary)]"> Find any path between nodes</span>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <strong className="text-[var(--text-primary)]">Strongly Connected:</strong>
            <span className="text-[var(--text-secondary)]"> Find SCCs in digraphs</span>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Time", time: "O(V + E)", description: "Visit each vertex and edge once" },
          ]}
          spaceComplexity="O(V)"
          spaceDescription="Recursion stack or explicit stack + visited array"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-orange-500 to-amber-500">
        <CodeTabs
          javascript={`// Depth-First Search (DFS)

// Recursive DFS
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);  // Process vertex
  
  for (const neighbor of graph.getNeighbors(start)) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
  
  return visited;
}

// Iterative DFS (using stack)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();  // Pop from stack
    
    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
      
      // Add neighbors to stack (reverse for consistent order)
      const neighbors = graph.getNeighbors(vertex);
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
      }
    }
  }
  
  return result;
}

// DFS to find path
function dfsPath(graph, start, end, visited = new Set(), path = []) {
  visited.add(start);
  path.push(start);
  
  if (start === end) {
    return [...path];  // Found path!
  }
  
  for (const neighbor of graph.getNeighbors(start)) {
    if (!visited.has(neighbor)) {
      const result = dfsPath(graph, neighbor, end, visited, path);
      if (result) return result;
    }
  }
  
  path.pop();  // Backtrack
  return null;
}

// Example
class Graph {
  constructor() { this.adjList = new Map(); }
  addEdge(u, v) {
    if (!this.adjList.has(u)) this.adjList.set(u, []);
    if (!this.adjList.has(v)) this.adjList.set(v, []);
    this.adjList.get(u).push(v);
    this.adjList.get(v).push(u);
  }
  getNeighbors(u) { return this.adjList.get(u) || []; }
}

const g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
console.log(dfsIterative(g, 0));  // [0, 1, 3, 2] or [0, 2, 3, 1]`}
          python={`# Depth-First Search (DFS)
from collections import defaultdict

# Recursive DFS
def dfs_recursive(graph: dict, start, visited: set = None) -> list:
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
    
    return result

# Iterative DFS (using stack)
def dfs_iterative(graph: dict, start) -> list:
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()  # Pop from stack
        
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            # Add neighbors to stack (reverse for consistent order)
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result

# DFS to find path
def dfs_path(graph: dict, start, end, visited: set = None, path: list = None):
    if visited is None:
        visited = set()
    if path is None:
        path = []
    
    visited.add(start)
    path.append(start)
    
    if start == end:
        return list(path)  # Found path!
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result = dfs_path(graph, neighbor, end, visited, path)
            if result:
                return result
    
    path.pop()  # Backtrack
    return None

# Example
class Graph:
    def __init__(self):
        self.adj_list = defaultdict(list)
    
    def add_edge(self, u, v):
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)

g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
print(dfs_iterative(g.adj_list, 0))  # [0, 1, 3, 2]`}
        />
      </LearnCard>

      <Callout type="warning" title="Watch for Stack Overflow">
        Recursive DFS can cause stack overflow on very deep graphs. For large graphs, use the iterative
        version with an explicit stack, or increase the recursion limit.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="dfs" category="graphs" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Cycle Detection Lesson
function CycleDetectionLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Cycle Detection?" iconEmoji="🔄" color="from-red-500 to-orange-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Cycle detection</strong> determines if a graph
          contains a cycle — a path that starts and ends at the same vertex. This is crucial for detecting
          deadlocks, circular dependencies, and validating DAGs (Directed Acyclic Graphs).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Undirected Graph</h4>
            <p className="text-sm text-[var(--text-secondary)]">A cycle exists if we visit a vertex that&apos;s already visited (and not the parent)</p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">Directed Graph</h4>
            <p className="text-sm text-[var(--text-secondary)]">A cycle exists if we revisit a vertex that&apos;s currently on the recursion stack</p>
          </div>
        </div>
      </LearnCard>

      <Analogy emoji="🚦" title="Traffic Loop">
        Imagine following road signs that eventually lead you back to where you started — you&apos;re stuck
        in a loop! In software, cycles can cause infinite loops in dependency resolution, deadlocks in
        resource allocation, or indicate a bug in course prerequisites.
      </Analogy>

      <LearnCard title="Coloring Approach (Directed Graphs)" iconEmoji="🎨" color="from-purple-500 to-pink-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Use three colors to track vertex states during DFS:
        </p>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-white border border-gray-400"></span>
            <div>
              <strong className="text-[var(--text-primary)]">White (0):</strong>
              <span className="text-[var(--text-secondary)]"> Unvisited — not yet explored</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-gray-500"></span>
            <div>
              <strong className="text-[var(--text-primary)]">Gray (1):</strong>
              <span className="text-[var(--text-secondary)]"> In Progress — currently on recursion stack</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-black border border-gray-400"></span>
            <div>
              <strong className="text-[var(--text-primary)]">Black (2):</strong>
              <span className="text-[var(--text-secondary)]"> Done — fully explored and backtracked</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-4">
          <strong>Cycle detected</strong> when we encounter a <strong>Gray</strong> vertex during DFS!
        </p>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Time", time: "O(V + E)", description: "DFS visits each vertex and edge once" },
          ]}
          spaceComplexity="O(V)"
          spaceDescription="Color array + recursion stack"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Cycle Detection in Graphs

// 1. Undirected Graph - DFS approach
function hasCycleUndirected(graph) {
  const visited = new Set();
  
  function dfs(vertex, parent) {
    visited.add(vertex);
    
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, vertex)) return true;
      } else if (neighbor !== parent) {
        // Found a back edge to a visited non-parent vertex
        return true;
      }
    }
    return false;
  }
  
  // Check all components
  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      if (dfs(vertex, -1)) return true;
    }
  }
  return false;
}

// 2. Directed Graph - Coloring approach (WHITE=0, GRAY=1, BLACK=2)
function hasCycleDirected(graph) {
  const color = new Map();  // 0=white, 1=gray, 2=black
  
  function dfs(vertex) {
    color.set(vertex, 1);  // Mark gray (in progress)
    
    for (const neighbor of graph.getNeighbors(vertex)) {
      if (color.get(neighbor) === 1) {
        return true;  // Back edge to gray = CYCLE!
      }
      if (color.get(neighbor) === 0) {
        if (dfs(neighbor)) return true;
      }
    }
    
    color.set(vertex, 2);  // Mark black (done)
    return false;
  }
  
  // Initialize all vertices as white
  for (const vertex of graph.getVertices()) {
    color.set(vertex, 0);
  }
  
  // Check all components
  for (const vertex of graph.getVertices()) {
    if (color.get(vertex) === 0) {
      if (dfs(vertex)) return true;
    }
  }
  return false;
}

// Example Graph class
class DirectedGraph {
  constructor() { this.adjList = new Map(); }
  addVertex(v) { if (!this.adjList.has(v)) this.adjList.set(v, []); }
  addEdge(u, v) { 
    this.addVertex(u); 
    this.addVertex(v);
    this.adjList.get(u).push(v); 
  }
  getNeighbors(v) { return this.adjList.get(v) || []; }
  getVertices() { return this.adjList.keys(); }
}

// Test
const g = new DirectedGraph();
g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(2, 0);  // Creates cycle!
console.log(hasCycleDirected(g));  // true`}
          python={`# Cycle Detection in Graphs
from collections import defaultdict
from enum import IntEnum

class Color(IntEnum):
    WHITE = 0  # Unvisited
    GRAY = 1   # In progress (on recursion stack)
    BLACK = 2  # Done

# 1. Undirected Graph - DFS approach
def has_cycle_undirected(graph: dict) -> bool:
    visited = set()
    
    def dfs(vertex: int, parent: int) -> bool:
        visited.add(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                if dfs(neighbor, vertex):
                    return True
            elif neighbor != parent:
                # Back edge to visited non-parent
                return True
        return False
    
    # Check all components
    for vertex in graph:
        if vertex not in visited:
            if dfs(vertex, -1):
                return True
    return False

# 2. Directed Graph - Coloring approach
def has_cycle_directed(graph: dict) -> bool:
    color = {v: Color.WHITE for v in graph}
    
    def dfs(vertex: int) -> bool:
        color[vertex] = Color.GRAY  # Mark in progress
        
        for neighbor in graph[vertex]:
            if color[neighbor] == Color.GRAY:
                return True  # Back edge to gray = CYCLE!
            if color[neighbor] == Color.WHITE:
                if dfs(neighbor):
                    return True
        
        color[vertex] = Color.BLACK  # Mark done
        return False
    
    # Check all components
    for vertex in graph:
        if color[vertex] == Color.WHITE:
            if dfs(vertex):
                return True
    return False

# Test
graph = defaultdict(list)
graph[0].append(1)
graph[1].append(2)
graph[2].append(0)  # Creates cycle!
print(has_cycle_directed(graph))  # True

# No cycle
graph2 = defaultdict(list)
graph2[0].append(1)
graph2[1].append(2)
print(has_cycle_directed(graph2))  # False`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Coloring Matters for Directed Graphs">
        In undirected graphs, any back edge indicates a cycle. In directed graphs, a back edge to a
        <strong> fully processed (black)</strong> vertex is fine — it&apos;s just a cross edge or forward edge.
        Only a back edge to a <strong>gray (in-progress)</strong> vertex indicates a cycle!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="cycle-detection" category="graphs" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Fibonacci DP Lesson
function FibonacciDPLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Dynamic Programming Introduction" iconEmoji="🧠" color="from-purple-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Dynamic Programming (DP)</strong> is an optimization
          technique that solves complex problems by breaking them into simpler overlapping subproblems, solving
          each subproblem only once, and storing their solutions.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The Fibonacci sequence is the perfect introduction to DP concepts — it demonstrates how naive
          recursion leads to exponential time, and how memoization/tabulation achieve linear time.
        </p>
      </LearnCard>

      <Analogy emoji="📝" title="Exam Preparation">
        Imagine preparing for an exam where many questions are based on the same core concepts. Instead of
        re-learning each concept every time you encounter a question, you write notes (memoization) or
        prepare a study guide (tabulation) the first time. This saves massive time!
      </Analogy>

      <LearnCard title="The Problem with Naive Recursion" iconEmoji="🐢" color="from-red-500 to-orange-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <code className="text-[var(--color-primary-400)]">fib(n) = fib(n-1) + fib(n-2)</code>
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Naive recursion has <strong className="text-red-400">O(2^n)</strong> time complexity because it
          recomputes the same values repeatedly. <code>fib(5)</code> computes <code>fib(3)</code> twice,
          <code>fib(2)</code> three times, etc.
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <p className="text-sm font-mono text-[var(--text-secondary)]">
            fib(5) → fib(4) + fib(3)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;fib(4) → fib(3) + fib(2) ← fib(3) calculated again!<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fib(3) → fib(2) + fib(1) ← fib(2) calculated again!
          </p>
        </div>
      </LearnCard>

      <LearnCard title="Two DP Approaches" iconEmoji="🔄" color="from-blue-500 to-cyan-500">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Memoization (Top-Down)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Start from the top problem, recursively solve subproblems, and cache results.
              Uses recursion + hash map/array to store computed values.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Tabulation (Bottom-Up)</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Start from the smallest subproblems, iteratively build up solutions.
              Uses iteration + table to fill in values progressively.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Naive Recursion", time: "O(2^n)", description: "Exponential — recalculates subproblems" },
            { case: "Memoization", time: "O(n)", description: "Linear — each subproblem solved once" },
            { case: "Tabulation", time: "O(n)", description: "Linear — iterative, single pass" },
          ]}
          spaceComplexity="O(n) or O(1)"
          spaceDescription="O(n) for memoization/tabulation array, O(1) with space optimization"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Fibonacci with Dynamic Programming

// 1. Naive Recursion - O(2^n) time ❌
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// 2. Memoization (Top-Down) - O(n) time ✅
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  
  if (memo[n] !== undefined) {
    return memo[n];  // Return cached result
  }
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// 3. Tabulation (Bottom-Up) - O(n) time ✅
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 4. Space Optimized - O(1) space ✅
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}

// Test
console.log(fibOptimized(10));  // 55
console.log(fibOptimized(50));  // 12586269025`}
          python={`# Fibonacci with Dynamic Programming
from functools import lru_cache

# 1. Naive Recursion - O(2^n) time ❌
def fib_naive(n: int) -> int:
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2. Memoization (Top-Down) - O(n) time ✅
def fib_memo(n: int, memo: dict = None) -> int:
    if memo is None:
        memo = {}
    if n <= 1:
        return n
    
    if n in memo:
        return memo[n]  # Return cached result
    
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# 2b. Using Python's built-in cache decorator ✅
@lru_cache(maxsize=None)
def fib_cached(n: int) -> int:
    if n <= 1:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)

# 3. Tabulation (Bottom-Up) - O(n) time ✅
def fib_tab(n: int) -> int:
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# 4. Space Optimized - O(1) space ✅
def fib_optimized(n: int) -> int:
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# Test
print(fib_optimized(10))  # 55
print(fib_optimized(50))  # 12586269025`}
        />
      </LearnCard>

      <Callout type="tip" title="DP Problem-Solving Pattern">
        1. <strong>Define subproblems:</strong> What smaller problems can I solve?<br />
        2. <strong>Find recurrence:</strong> How do subproblems relate to the main problem?<br />
        3. <strong>Identify base cases:</strong> What are the smallest solvable problems?<br />
        4. <strong>Choose approach:</strong> Top-down (memoization) or bottom-up (tabulation)?<br />
        5. <strong>Optimize space:</strong> Can I reduce memory usage?
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="fibonacci-dp" category="dynamic-programming" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// 0/1 Knapsack Lesson
function Knapsack01Lesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="The 0/1 Knapsack Problem" iconEmoji="🎒" color="from-green-500 to-teal-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given a set of items, each with a <strong className="text-[var(--text-primary)]">weight</strong> and
          a <strong className="text-[var(--text-primary)]">value</strong>, determine the maximum value you can
          carry in a knapsack of limited capacity. Each item can only be taken once (0 or 1 — hence the name).
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="weights = [1, 3, 4, 5], values = [1, 4, 5, 7], capacity = 7"
          output="9 (take items with weights 3 and 4)"
        >
          <p className="text-sm text-[var(--text-secondary)]">Maximum value = 4 + 5 = 9</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="🏕️" title="Packing for a Hike">
        You&apos;re packing for a hike with a bag that can hold 10kg. You have items like a tent (3kg, high value),
        food (2kg, high value), heavy camera (5kg, medium value), and books (4kg, low value). You can&apos;t take
        everything — you must choose the combination that maximizes value within your weight limit!
      </Analogy>

      <LearnCard title="DP State Definition" iconEmoji="📐" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <code className="text-[var(--color-primary-400)]">dp[i][w]</code> = maximum value achievable using
          first <code>i</code> items with capacity <code>w</code>
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <h4 className="font-semibold text-[var(--text-primary)] mb-2">Transition</h4>
          <p className="text-sm font-mono text-[var(--text-secondary)]">
            If weight[i-1] &gt; w: dp[i][w] = dp[i-1][w] (can&apos;t take item)<br />
            Else: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i-1]] + value[i-1])
          </p>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Standard DP", time: "O(n × W)", description: "n items, W capacity" },
          ]}
          spaceComplexity="O(n × W) or O(W)"
          spaceDescription="2D table or 1D optimized array"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// 0/1 Knapsack Problem

// Standard 2D DP Solution
function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp = Array(n + 1).fill(null)
    .map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Don't take item i
      dp[i][w] = dp[i - 1][w];
      
      // Take item i (if it fits)
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  
  return dp[n][capacity];
}

// Space Optimized 1D DP
function knapsackOptimized(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    // Traverse backwards to avoid using same item twice
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}

// Example
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;
console.log(knapsack(weights, values, capacity));  // 9
console.log(knapsackOptimized(weights, values, capacity));  // 9`}
          python={`# 0/1 Knapsack Problem

# Standard 2D DP Solution
def knapsack(weights: list[int], values: list[int], capacity: int) -> int:
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i
            dp[i][w] = dp[i - 1][w]
            
            # Take item i (if it fits)
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )
    
    return dp[n][capacity]

# Space Optimized 1D DP
def knapsack_optimized(weights: list[int], values: list[int], capacity: int) -> int:
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # Traverse backwards to avoid using same item twice
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

# Example
weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
capacity = 7
print(knapsack(weights, values, capacity))  # 9
print(knapsack_optimized(weights, values, capacity))  # 9`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Traverse Backwards?">
        In the 1D optimization, we iterate capacity <strong>backwards</strong> to ensure each item is used
        at most once. Forward iteration would allow an item to be picked multiple times (which is the
        <strong> Unbounded Knapsack</strong> problem — a different variant).
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="knapsack-01" category="dynamic-programming" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Longest Common Subsequence Lesson
function LCSLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Longest Common Subsequence (LCS)" iconEmoji="🔗" color="from-purple-500 to-pink-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given two strings, find the length of the <strong className="text-[var(--text-primary)]">longest
            subsequence</strong> present in both. A subsequence is a sequence derived by deleting some or no
          elements without changing the order of remaining elements.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input='text1 = "ABCDGH", text2 = "AEDFHR"'
          output='3 (LCS is "ADH")'
        >
          <p className="text-sm text-[var(--text-secondary)]">Common subsequences: A, D, H, AD, AH, DH, ADH</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="🧬" title="DNA Sequence Matching">
        In bioinformatics, LCS is used to find similarities between DNA sequences. If two organisms share
        a long common subsequence in their DNA, they are likely evolutionarily related. The longer the LCS,
        the more similar the sequences.
      </Analogy>

      <LearnCard title="DP State Definition" iconEmoji="📐" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <code className="text-[var(--color-primary-400)]">dp[i][j]</code> = length of LCS of first
          <code>i</code> characters of text1 and first <code>j</code> characters of text2
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <h4 className="font-semibold text-[var(--text-primary)] mb-2">Transition</h4>
          <p className="text-sm font-mono text-[var(--text-secondary)]">
            If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1<br />
            Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
          </p>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Standard DP", time: "O(m × n)", description: "m and n are string lengths" },
          ]}
          spaceComplexity="O(m × n) or O(min(m, n))"
          spaceDescription="2D table or optimized to two rows"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Longest Common Subsequence (LCS)

// Standard 2D DP Solution
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  // dp[i][j] = LCS length of first i chars of text1, first j chars of text2
  const dp = Array(m + 1).fill(null)
    .map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;  // Characters match
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // Take best
      }
    }
  }
  
  return dp[m][n];
}

// Reconstruct the actual LCS string
function getLCS(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null)
    .map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find the LCS string
  let lcs = "";
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (text1[i - 1] === text2[j - 1]) {
      lcs = text1[i - 1] + lcs;
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return lcs;
}

// Example
console.log(longestCommonSubsequence("ABCDGH", "AEDFHR"));  // 3
console.log(getLCS("ABCDGH", "AEDFHR"));  // "ADH"`}
          python={`# Longest Common Subsequence (LCS)

# Standard 2D DP Solution
def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    # dp[i][j] = LCS length of first i chars of text1, first j of text2
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1  # Match
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # Take best
    
    return dp[m][n]

# Reconstruct the actual LCS string
def get_lcs(text1: str, text2: str) -> str:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    # Backtrack to find the LCS string
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if text1[i - 1] == text2[j - 1]:
            lcs.append(text1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(reversed(lcs))

# Example
print(longest_common_subsequence("ABCDGH", "AEDFHR"))  # 3
print(get_lcs("ABCDGH", "AEDFHR"))  # "ADH"`}
        />
      </LearnCard>

      <Callout type="tip" title="Related Problems">
        LCS is a building block for many problems: <strong>Longest Common Substring</strong> (contiguous),
        <strong> Edit Distance</strong> (insertions, deletions, substitutions), <strong>Diff tools</strong>
        (git diff), and <strong>Shortest Common Supersequence</strong>.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="lcs" category="dynamic-programming" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Coin Change Lesson
function CoinChangeLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="The Coin Change Problem" iconEmoji="💰" color="from-yellow-500 to-amber-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given coins of different denominations and a target amount, find the
          <strong className="text-[var(--text-primary)]"> minimum number of coins</strong> needed to make
          that amount. If it&apos;s not possible, return -1. You have infinite supply of each coin.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="coins = [1, 2, 5], amount = 11"
          output="3 (coins: 5 + 5 + 1)"
        >
          <p className="text-sm text-[var(--text-secondary)]">Optimal: 5 + 5 + 1 = 11 using 3 coins</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="🏪" title="Making Change at a Store">
        A cashier needs to return $11 in change using the fewest coins possible. With $5, $2, and $1 coins,
        the greedy approach (always pick largest) gives 5 + 5 + 1 = 3 coins. But greedy doesn&apos;t always work —
        if coins were [1, 3, 4] and amount is 6, greedy gives 4+1+1=3 coins, but 3+3=2 is better!
      </Analogy>

      <LearnCard title="DP State Definition" iconEmoji="📐" color="from-blue-500 to-indigo-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <code className="text-[var(--color-primary-400)]">dp[i]</code> = minimum coins needed to make amount <code>i</code>
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <h4 className="font-semibold text-[var(--text-primary)] mb-2">Transition</h4>
          <p className="text-sm font-mono text-[var(--text-secondary)]">
            dp[i] = min(dp[i - coin] + 1) for each coin where coin &le; i<br />
            Base case: dp[0] = 0 (0 coins for amount 0)
          </p>
        </div>
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "DP Solution", time: "O(n × amount)", description: "n coins, each amount checked" },
          ]}
          spaceComplexity="O(amount)"
          spaceDescription="1D DP array of size amount+1"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Coin Change Problem

// Minimum coins to make amount
function coinChange(coins, amount) {
  // dp[i] = min coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;  // Base case: 0 coins for amount 0
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Count total ways to make amount (Coin Change 2)
function countWays(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;  // One way to make 0: use no coins
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  
  return dp[amount];
}

// Get the actual coins used
function getCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  const parent = new Array(amount + 1).fill(-1);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        parent[i] = coin;
      }
    }
  }
  
  if (dp[amount] === Infinity) return [];
  
  // Backtrack to get coins
  const result = [];
  let curr = amount;
  while (curr > 0) {
    result.push(parent[curr]);
    curr -= parent[curr];
  }
  return result;
}

// Example
console.log(coinChange([1, 2, 5], 11));  // 3
console.log(countWays([1, 2, 5], 5));    // 4 ways
console.log(getCoins([1, 2, 5], 11));    // [5, 5, 1]`}
          python={`# Coin Change Problem

# Minimum coins to make amount
def coin_change(coins: list[int], amount: int) -> int:
    # dp[i] = min coins needed to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins for amount 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Count total ways to make amount (Coin Change 2)
def count_ways(coins: list[int], amount: int) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1  # One way to make 0: use no coins
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]

# Get the actual coins used
def get_coins(coins: list[int], amount: int) -> list[int]:
    dp = [float('inf')] * (amount + 1)
    parent = [-1] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                parent[i] = coin
    
    if dp[amount] == float('inf'):
        return []
    
    # Backtrack to get coins
    result = []
    curr = amount
    while curr > 0:
        result.append(parent[curr])
        curr -= parent[curr]
    return result

# Example
print(coin_change([1, 2, 5], 11))  # 3
print(count_ways([1, 2, 5], 5))    # 4 ways
print(get_coins([1, 2, 5], 11))    # [5, 5, 1]`}
        />
      </LearnCard>

      <Callout type="warning" title="Greedy Doesn't Always Work!">
        For coin systems like [1, 3, 4] with amount 6: Greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins.
        DP considers all possibilities. However, for canonical coin systems (like US coins), greedy works.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="coin-change" category="dynamic-programming" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Activity Selection Lesson
function ActivitySelectionLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Greedy Algorithm?" iconEmoji="🎯" color="from-green-500 to-teal-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          A <strong className="text-[var(--text-primary)]">greedy algorithm</strong> makes the locally
          optimal choice at each step, hoping to find a global optimum. Unlike dynamic programming, it
          doesn&apos;t reconsider previous choices — it commits and moves forward.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Greedy works when the problem has <strong>optimal substructure</strong> (optimal solution contains
          optimal solutions to subproblems) and <strong>greedy choice property</strong> (local optimal
          leads to global optimal).
        </p>
      </LearnCard>

      <LearnCard title="The Activity Selection Problem" iconEmoji="📅" color="from-blue-500 to-cyan-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given n activities with start and end times, select the <strong className="text-[var(--text-primary)]">
            maximum number of non-overlapping activities</strong> that can be performed by a single person.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="activities = [(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)]"
          output="4 activities: (1,4), (5,7), (8,11), (12,16)"
        >
          <p className="text-sm text-[var(--text-secondary)]">Maximum non-overlapping set</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="📺" title="Scheduling TV Shows">
        Imagine you want to watch as many TV shows as possible in one evening. Each show has a start and
        end time. To maximize shows watched, you should always pick the show that ends earliest — this
        leaves maximum time for remaining shows!
      </Analogy>

      <LearnCard title="Greedy Strategy" iconEmoji="💡" color="from-yellow-500 to-orange-500">
        <StepByStep
          steps={[
            {
              title: "Sort by End Time",
              description: "Arrange activities in ascending order of their finish times.",
            },
            {
              title: "Select First Activity",
              description: "Always select the first activity (earliest finish).",
            },
            {
              title: "Check Compatibility",
              description: "For each remaining activity, select it only if its start time ≥ last selected end time.",
            },
            {
              title: "Repeat",
              description: "Continue until all activities are processed.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Time", time: "O(n log n)", description: "Dominated by sorting" },
          ]}
          spaceComplexity="O(1)"
          spaceDescription="Only need to track the last selected activity"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Activity Selection Problem - Greedy

function activitySelection(activities) {
  // Sort by end time (finish time)
  activities.sort((a, b) => a[1] - b[1]);
  
  const selected = [];
  let lastEnd = -1;
  
  for (const [start, end] of activities) {
    // If this activity starts after last one ends
    if (start >= lastEnd) {
      selected.push([start, end]);
      lastEnd = end;
    }
  }
  
  return selected;
}

// Return just the count
function maxActivities(activities) {
  activities.sort((a, b) => a[1] - b[1]);
  
  let count = 0;
  let lastEnd = -Infinity;
  
  for (const [start, end] of activities) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  
  return count;
}

// Example
const activities = [
  [1, 4], [3, 5], [0, 6], [5, 7], [3, 9],
  [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]
];
console.log(activitySelection(activities));
// [[1, 4], [5, 7], [8, 11], [12, 16]]
console.log(maxActivities(activities));  // 4`}
          python={`# Activity Selection Problem - Greedy

def activity_selection(activities: list[tuple[int, int]]) -> list[tuple[int, int]]:
    # Sort by end time (finish time)
    activities.sort(key=lambda x: x[1])
    
    selected = []
    last_end = -1
    
    for start, end in activities:
        # If this activity starts after last one ends
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected

# Return just the count
def max_activities(activities: list[tuple[int, int]]) -> int:
    activities.sort(key=lambda x: x[1])
    
    count = 0
    last_end = float('-inf')
    
    for start, end in activities:
        if start >= last_end:
            count += 1
            last_end = end
    
    return count

# Example
activities = [
    (1, 4), (3, 5), (0, 6), (5, 7), (3, 9),
    (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)
]
print(activity_selection(activities))
# [(1, 4), (5, 7), (8, 11), (12, 16)]
print(max_activities(activities))  # 4`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Earliest Finish Time?">
        Selecting the activity that finishes earliest leaves the maximum remaining time for other activities.
        This greedy choice is proven to be optimal — it never hurts to finish early!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="activity-selection" category="greedy" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Fractional Knapsack Lesson
function FractionalKnapsackLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Fractional Knapsack Problem" iconEmoji="🎒" color="from-purple-500 to-pink-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given items with weights and values, fill a knapsack of capacity W to maximize value. Unlike 0/1
          Knapsack, you can take <strong className="text-[var(--text-primary)]">fractions</strong> of items.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="items = [(60, 10), (100, 20), (120, 30)], capacity = 50"
          output="Maximum value = 240"
        >
          <p className="text-sm text-[var(--text-secondary)]">Take all of items 1 & 2, and 20/30 of item 3</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="⛽" title="Filling Up Gas">
        Imagine you&apos;re at a gas station with multiple fuel types. Each type has a different price per liter
        and availability. You want to fill your tank while minimizing cost. Since gas is liquid (fractional),
        you always buy the cheapest gas first until it runs out, then move to the next cheapest.
      </Analogy>

      <LearnCard title="Greedy Strategy" iconEmoji="💡" color="from-yellow-500 to-orange-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          The key insight: <strong className="text-[var(--text-primary)]">maximize value per unit weight</strong>.
        </p>
        <StepByStep
          steps={[
            {
              title: "Calculate Value Density",
              description: "For each item, compute value/weight ratio.",
            },
            {
              title: "Sort by Ratio",
              description: "Sort items in descending order of value/weight.",
            },
            {
              title: "Fill Greedily",
              description: "Take items with highest ratio first, taking fractions if needed.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Time", time: "O(n log n)", description: "Dominated by sorting" },
          ]}
          spaceComplexity="O(1)"
          spaceDescription="Only need to store total value and remaining capacity"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Fractional Knapsack Problem - Greedy

function fractionalKnapsack(items, capacity) {
  // items = [[value, weight], ...]
  // Calculate and sort by value density (value/weight)
  const itemsWithRatio = items.map(([value, weight], i) => ({
    value, weight,
    ratio: value / weight,
    index: i
  }));
  
  itemsWithRatio.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remaining = capacity;
  const taken = [];
  
  for (const item of itemsWithRatio) {
    if (remaining === 0) break;
    
    if (item.weight <= remaining) {
      // Take the whole item
      taken.push({ ...item, fraction: 1 });
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      // Take a fraction
      const fraction = remaining / item.weight;
      taken.push({ ...item, fraction });
      totalValue += item.value * fraction;
      remaining = 0;
    }
  }
  
  return { totalValue, taken };
}

// Example
const items = [[60, 10], [100, 20], [120, 30]];
const capacity = 50;
const result = fractionalKnapsack(items, capacity);
console.log("Max Value:", result.totalValue);  // 240
console.log("Items taken:", result.taken);`}
          python={`# Fractional Knapsack Problem - Greedy

def fractional_knapsack(items: list[tuple[int, int]], capacity: int) -> tuple[float, list]:
    """
    items = [(value, weight), ...]
    Returns (max_value, [(value, weight, fraction), ...])
    """
    # Calculate and sort by value density (value/weight)
    items_with_ratio = [
        (value, weight, value / weight, i)
        for i, (value, weight) in enumerate(items)
    ]
    items_with_ratio.sort(key=lambda x: x[2], reverse=True)
    
    total_value = 0
    remaining = capacity
    taken = []
    
    for value, weight, ratio, idx in items_with_ratio:
        if remaining == 0:
            break
        
        if weight <= remaining:
            # Take the whole item
            taken.append((value, weight, 1.0))
            total_value += value
            remaining -= weight
        else:
            # Take a fraction
            fraction = remaining / weight
            taken.append((value, weight, fraction))
            total_value += value * fraction
            remaining = 0
    
    return total_value, taken

# Example
items = [(60, 10), (100, 20), (120, 30)]
capacity = 50
max_value, taken = fractional_knapsack(items, capacity)
print(f"Max Value: {max_value}")  # 240.0
print(f"Items taken: {taken}")`}
        />
      </LearnCard>

      <Callout type="warning" title="Greedy Works Here, Not for 0/1!">
        Fractional Knapsack can be solved greedily because we can take fractions. For 0/1 Knapsack
        (all-or-nothing), greedy fails and we need dynamic programming.
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="fractional-knapsack" category="greedy" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Huffman Coding Lesson
function HuffmanCodingLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Huffman Coding" iconEmoji="🗜️" color="from-indigo-500 to-purple-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          <strong className="text-[var(--text-primary)]">Huffman Coding</strong> is a lossless data compression
          algorithm that assigns variable-length codes to characters based on their frequencies. More frequent
          characters get shorter codes.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          It creates an optimal <strong className="text-[var(--text-primary)]">prefix-free code</strong> — no
          code is a prefix of another, allowing unambiguous decoding.
        </p>
      </LearnCard>

      <Analogy emoji="📱" title="Text Message Abbreviations">
        When texting, we naturally use shorter abbreviations for common words: &quot;u&quot; for &quot;you&quot;, &quot;r&quot; for
        &quot;are&quot;, &quot;lol&quot; for a long phrase. Huffman coding automates this — it figures out which characters
        appear most often and gives them the shortest codes!
      </Analogy>

      <LearnCard title="Building the Huffman Tree" iconEmoji="🌳" color="from-green-500 to-teal-500">
        <StepByStep
          steps={[
            {
              title: "Count Frequencies",
              description: "Count how often each character appears in the text.",
            },
            {
              title: "Create Leaf Nodes",
              description: "Create a node for each character with its frequency.",
            },
            {
              title: "Build Tree (Greedy)",
              description: "Repeatedly merge the two lowest-frequency nodes into a parent node.",
            },
            {
              title: "Assign Codes",
              description: "Traverse the tree: left edge = 0, right edge = 1. Codes are paths from root to leaves.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Building Tree", time: "O(n log n)", description: "n characters, using min-heap" },
          ]}
          spaceComplexity="O(n)"
          spaceDescription="Store tree nodes and code table"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Huffman Coding - Greedy Algorithm

class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(text) {
  // Count frequencies
  const freq = {};
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Create nodes & use array as priority queue (less efficient but clearer)
  let nodes = Object.entries(freq).map(
    ([char, f]) => new HuffmanNode(char, f)
  );
  
  while (nodes.length > 1) {
    // Sort by frequency (min-heap simulation)
    nodes.sort((a, b) => a.freq - b.freq);
    
    // Take two smallest
    const left = nodes.shift();
    const right = nodes.shift();
    
    // Merge into parent
    const parent = new HuffmanNode(null, left.freq + right.freq);
    parent.left = left;
    parent.right = right;
    
    nodes.push(parent);
  }
  
  return nodes[0];
}

function generateCodes(node, code = "", codes = {}) {
  if (!node) return codes;
  
  if (node.char !== null) {
    codes[node.char] = code || "0";  // Handle single character case
  }
  
  generateCodes(node.left, code + "0", codes);
  generateCodes(node.right, code + "1", codes);
  
  return codes;
}

// Example
const text = "ABRACADABRA";
const tree = buildHuffmanTree(text);
const codes = generateCodes(tree);
console.log(codes);
// Example: { A: '0', B: '10', R: '110', C: '1110', D: '1111' }

// Encode
const encoded = text.split('').map(c => codes[c]).join('');
console.log(encoded);  // Much shorter than fixed-length!`}
          python={`# Huffman Coding - Greedy Algorithm
import heapq
from collections import Counter

class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
    
    # For heap comparison
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(text: str) -> HuffmanNode:
    # Count frequencies
    freq = Counter(text)
    
    # Create nodes and min-heap
    heap = [HuffmanNode(char, f) for char, f in freq.items()]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        # Take two smallest
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        # Merge into parent
        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left = left
        parent.right = right
        
        heapq.heappush(heap, parent)
    
    return heap[0]

def generate_codes(node, code="", codes=None):
    if codes is None:
        codes = {}
    if node is None:
        return codes
    
    if node.char is not None:
        codes[node.char] = code or "0"  # Handle single char
    
    generate_codes(node.left, code + "0", codes)
    generate_codes(node.right, code + "1", codes)
    
    return codes

# Example
text = "ABRACADABRA"
tree = build_huffman_tree(text)
codes = generate_codes(tree)
print(codes)
# Example: {'A': '0', 'B': '10', 'R': '110', 'C': '1110', 'D': '1111'}

# Encode
encoded = ''.join(codes[c] for c in text)
print(f"Encoded: {encoded}")
print(f"Original bits: {len(text) * 8}")
print(f"Compressed bits: {len(encoded)}")`}
        />
      </LearnCard>

      <Callout type="tip" title="Real-World Applications">
        Huffman coding is used in many compression formats: <strong>JPEG</strong> (images),
        <strong> MP3</strong> (audio), <strong>ZIP/GZIP</strong> (file compression), and
        <strong> DEFLATE</strong> algorithm. It&apos;s the foundation of many compression techniques!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="huffman-coding" category="greedy" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// Job Sequencing Lesson
function JobSequencingLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="Job Sequencing with Deadlines" iconEmoji="⏰" color="from-orange-500 to-red-500">
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
          Given n jobs with profits and deadlines, find the sequence that maximizes profit. Each job takes
          1 unit of time and must be completed before its deadline. Only one job can run at a time.
        </p>
        <ExampleBox
          number={1}
          title="Example"
          input="jobs = [(100, 2), (19, 1), (27, 2), (25, 1), (15, 3)] (profit, deadline)"
          output="Maximum profit: 142 (jobs with profit 100, 27, 15)"
        >
          <p className="text-sm text-[var(--text-secondary)]">Schedule: Job(27) at t=2, Job(100) at t=1, Job(15) at t=3</p>
        </ExampleBox>
      </LearnCard>

      <Analogy emoji="💼" title="Freelance Work">
        You&apos;re a freelancer with multiple project offers. Each project has a payment and a deadline.
        You can only work on one project per day. To maximize earnings, you prioritize high-paying
        projects and schedule each as late as possible before its deadline.
      </Analogy>

      <LearnCard title="Greedy Strategy" iconEmoji="💡" color="from-yellow-500 to-orange-500">
        <StepByStep
          steps={[
            {
              title: "Sort by Profit",
              description: "Arrange jobs in descending order of profit.",
            },
            {
              title: "Schedule Each Job",
              description: "For each job, find the latest available slot before its deadline.",
            },
            {
              title: "Fill Slots",
              description: "If a slot is available, schedule the job; otherwise, skip it.",
            },
            {
              title: "Sum Profits",
              description: "Total profit is the sum of all scheduled jobs.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Complexity Analysis" iconEmoji="📊" color="from-cyan-500 to-blue-500">
        <ComplexityTable
          timeComplexity={[
            { case: "Naive", time: "O(n²)", description: "Linear slot search for each job" },
            { case: "With Union-Find", time: "O(n log n)", description: "Optimized slot finding" },
          ]}
          spaceComplexity="O(max_deadline)"
          spaceDescription="Array to track occupied time slots"
        />
      </LearnCard>

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-pink-500 to-rose-500">
        <CodeTabs
          javascript={`// Job Sequencing with Deadlines - Greedy

function jobSequencing(jobs) {
  // jobs = [[profit, deadline], ...]
  // Sort by profit (descending)
  jobs.sort((a, b) => b[0] - a[0]);
  
  const maxDeadline = Math.max(...jobs.map(j => j[1]));
  const slots = new Array(maxDeadline + 1).fill(null);
  
  let totalProfit = 0;
  const scheduledJobs = [];
  
  for (const [profit, deadline] of jobs) {
    // Find the latest available slot before deadline
    for (let slot = deadline; slot >= 1; slot--) {
      if (slots[slot] === null) {
        slots[slot] = { profit, deadline };
        totalProfit += profit;
        scheduledJobs.push({ profit, deadline, slot });
        break;
      }
    }
  }
  
  return { 
    totalProfit, 
    jobs: scheduledJobs,
    schedule: slots.slice(1).filter(s => s !== null)
  };
}

// Example
const jobs = [
  [100, 2],  // profit 100, deadline 2
  [19, 1],   // profit 19, deadline 1
  [27, 2],   // profit 27, deadline 2
  [25, 1],   // profit 25, deadline 1
  [15, 3]    // profit 15, deadline 3
];

const result = jobSequencing(jobs);
console.log("Total Profit:", result.totalProfit);  // 142
console.log("Scheduled:", result.jobs);
// [{ profit: 100, deadline: 2, slot: 2 },
//  { profit: 27, deadline: 2, slot: 1 },   (slot 2 taken, use 1)
//  { profit: 15, deadline: 3, slot: 3 }]`}
          python={`# Job Sequencing with Deadlines - Greedy

def job_sequencing(jobs: list[tuple[int, int]]) -> tuple[int, list]:
    """
    jobs = [(profit, deadline), ...]
    Returns (total_profit, scheduled_jobs)
    """
    # Sort by profit (descending)
    jobs = sorted(jobs, key=lambda x: x[0], reverse=True)
    
    max_deadline = max(job[1] for job in jobs)
    slots = [None] * (max_deadline + 1)  # 1-indexed
    
    total_profit = 0
    scheduled_jobs = []
    
    for profit, deadline in jobs:
        # Find the latest available slot before deadline
        for slot in range(deadline, 0, -1):
            if slots[slot] is None:
                slots[slot] = (profit, deadline)
                total_profit += profit
                scheduled_jobs.append((profit, deadline, slot))
                break
    
    return total_profit, scheduled_jobs

# Example
jobs = [
    (100, 2),  # profit 100, deadline 2
    (19, 1),   # profit 19, deadline 1
    (27, 2),   # profit 27, deadline 2
    (25, 1),   # profit 25, deadline 1
    (15, 3)    # profit 15, deadline 3
]

total_profit, scheduled = job_sequencing(jobs)
print(f"Total Profit: {total_profit}")  # 142
print(f"Scheduled: {scheduled}")
# [(100, 2, 2), (27, 2, 1), (15, 3, 3)]`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Schedule Late?">
        By scheduling jobs as late as possible (right before their deadline), we leave earlier slots
        available for other high-profit jobs that might have tighter deadlines. This maximizes our
        flexibility!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="job-sequencing" category="greedy" locale={locale} />
        </div>
      </div>
    </div>
  );
}

// ==================== PHASE 1: ARRAYS LESSONS ====================

function DutchNationalFlagLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Dutch National Flag?" iconEmoji="🇳🇱" color="from-red-500 to-blue-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          The Dutch National Flag algorithm, proposed by Edsger Dijkstra, is a three-way partitioning
          algorithm that sorts an array containing only three distinct values (commonly 0, 1, and 2)
          in a single pass. It&apos;s named after the Dutch flag which has three horizontal stripes.
        </p>
      </LearnCard>

      <Analogy emoji="🎨" title="Think of it like sorting colored balls">
        Imagine you have a mixed bag of red, white, and blue balls. You want to arrange them so all
        red balls are on the left, white in the middle, and blue on the right. Instead of multiple
        passes, you can do it in one sweep using three pointers!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Initialize three pointers",
              description: "low = 0 (end of 0s), mid = 0 (current element), high = n-1 (start of 2s)",
            },
            {
              title: "Process current element",
              description: "Look at arr[mid] and decide what to do based on its value.",
            },
            {
              title: "If arr[mid] = 0",
              description: "Swap arr[low] and arr[mid], increment both low and mid.",
            },
            {
              title: "If arr[mid] = 1",
              description: "It's already in the correct position, just increment mid.",
            },
            {
              title: "If arr[mid] = 2",
              description: "Swap arr[mid] and arr[high], decrement high (don't increment mid yet!).",
            },
            {
              title: "Repeat until mid > high",
              description: "Continue until all elements are processed.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Example" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Sort Array of 0s, 1s, and 2s"
          input="[2, 0, 2, 1, 1, 0]"
          output="[0, 0, 1, 1, 2, 2]"
        >
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Initial: low=0, mid=0, high=5</p>
              <ArrayDiagram values={[2, 0, 2, 1, 1, 0]} highlights={[0]} pointers={[{ index: 0, label: "mid" }, { index: 5, label: "high" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">arr[mid]=2, swap with high, high--</p>
              <ArrayDiagram values={[0, 0, 2, 1, 1, 2]} highlights={[5]} pointers={[{ index: 4, label: "high" }]} />
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">Final sorted array:</p>
              <ArrayDiagram values={[0, 0, 1, 1, 2, 2]} highlights={[0, 1, 2, 3, 4, 5]} />
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n)", description: "Single pass through array" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only uses three pointer variables"
        isStable={false}
        isInPlace={true}
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function dutchNationalFlag(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

// Example: dutchNationalFlag([2, 0, 2, 1, 1, 0])
// Output: [0, 0, 1, 1, 2, 2]`}
          python={`def dutch_national_flag(arr):
    low, mid, high = 0, 0, len(arr) - 1
    
    while mid <= high:
        if arr[mid] == 0:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
    
    return arr

# Example: dutch_national_flag([2, 0, 2, 1, 1, 0])
# Output: [0, 0, 1, 1, 2, 2]`}
          java={`public static void dutchNationalFlag(int[] arr) {
    int low = 0, mid = 0, high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] == 0) {
            int temp = arr[low];
            arr[low] = arr[mid];
            arr[mid] = temp;
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            int temp = arr[mid];
            arr[mid] = arr[high];
            arr[high] = temp;
            high--;
        }
    }
}`}
        />
      </LearnCard>

      <Callout type="warning" title="Why Not Increment mid After Swapping with high?">
        When we swap with high, the element that comes to mid position hasn&apos;t been examined yet.
        It could be 0, 1, or 2, so we need to process it in the next iteration.
      </Callout>

      <Callout type="tip" title="When to Use">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Sorting arrays with exactly 3 distinct values</li>
          <li>Partitioning problems (like QuickSort&apos;s 3-way partition)</li>
          <li>Segregating elements based on a pivot value</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="dutch-national-flag" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

function MooresVotingLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Moore's Voting Algorithm?" iconEmoji="🗳️" color="from-indigo-500 to-purple-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Moore&apos;s Voting Algorithm finds the majority element in an array — an element that appears
          more than n/2 times. It works in O(n) time and O(1) space by cleverly cancelling out
          non-majority elements with the majority element.
        </p>
      </LearnCard>

      <Analogy emoji="⚔️" title="Think of it like a battle">
        Imagine elements are soldiers from different armies. Each soldier eliminates one enemy soldier
        (both disappear). Since the majority army has more than half the soldiers, at least one soldier
        from the majority will remain standing at the end!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Initialize candidate and count",
              description: "Set candidate = first element, count = 1.",
            },
            {
              title: "Iterate through array",
              description: "For each element, update the candidate or count.",
            },
            {
              title: "If element matches candidate",
              description: "Increment count.",
            },
            {
              title: "If element differs",
              description: "Decrement count. If count becomes 0, pick new candidate.",
            },
            {
              title: "Verify the candidate",
              description: "Count occurrences of candidate to confirm it's majority.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Example" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Find Majority Element"
          input="[2, 2, 1, 1, 1, 2, 2]"
          output="2 (appears 4 times out of 7)"
        >
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Start: candidate=2, count=1</p>
            <p>• Index 1: 2==2 → count=2</p>
            <p>• Index 2: 1≠2 → count=1</p>
            <p>• Index 3: 1≠2 → count=0, new candidate=1, count=1</p>
            <p>• Index 4: 1==1 → count=2</p>
            <p>• Index 5: 2≠1 → count=1</p>
            <p>• Index 6: 2≠1 → count=0, new candidate=2</p>
            <p>• Verify: 2 appears 4 times &gt; 7/2 ✓</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n)", description: "Two passes: find candidate + verify" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="Only stores candidate and count"
        isStable={true}
        isInPlace={true}
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function majorityElement(nums) {
  // Phase 1: Find candidate
  let candidate = nums[0], count = 1;
  
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }
  
  // Phase 2: Verify (optional if majority guaranteed)
  count = 0;
  for (const num of nums) {
    if (num === candidate) count++;
  }
  
  return count > nums.length / 2 ? candidate : -1;
}`}
          python={`def majority_element(nums):
    # Phase 1: Find candidate
    candidate, count = nums[0], 1
    
    for i in range(1, len(nums)):
        if count == 0:
            candidate = nums[i]
            count = 1
        elif nums[i] == candidate:
            count += 1
        else:
            count -= 1
    
    # Phase 2: Verify
    if nums.count(candidate) > len(nums) // 2:
        return candidate
    return -1`}
          java={`public static int majorityElement(int[] nums) {
    // Phase 1: Find candidate
    int candidate = nums[0], count = 1;
    
    for (int i = 1; i < nums.length; i++) {
        if (count == 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Phase 2: Verify
    count = 0;
    for (int num : nums) {
        if (num == candidate) count++;
    }
    
    return count > nums.length / 2 ? candidate : -1;
}`}
        />
      </LearnCard>

      <Callout type="insight" title="Why Does This Work?">
        If a majority element exists (count &gt; n/2), it will survive the cancellation process because
        it has more occurrences than all other elements combined!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="moores-voting" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

function MergeSortedArraysLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Merge Sorted Arrays?" iconEmoji="🔗" color="from-green-500 to-teal-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Merging sorted arrays combines two already-sorted arrays into a single sorted array.
          This is the key operation in Merge Sort and appears frequently in interview questions.
          The technique uses two pointers to efficiently traverse both arrays simultaneously.
        </p>
      </LearnCard>

      <Analogy emoji="🃏" title="Think of it like merging card decks">
        Imagine two sorted stacks of cards face up. To merge them, you always pick the smaller
        visible card from either stack and add it to your result. Since both stacks are sorted,
        you&apos;re guaranteed to build a sorted merged deck!
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Initialize pointers",
              description: "Set i = 0 for arr1, j = 0 for arr2, create result array.",
            },
            {
              title: "Compare elements",
              description: "Compare arr1[i] with arr2[j].",
            },
            {
              title: "Add smaller element",
              description: "Push the smaller element to result and advance that pointer.",
            },
            {
              title: "Repeat until one exhausted",
              description: "Continue comparing until one array is fully traversed.",
            },
            {
              title: "Copy remaining elements",
              description: "Append any remaining elements from the non-empty array.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Example" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Merge Two Sorted Arrays"
          input="arr1 = [1, 3, 5], arr2 = [2, 4, 6]"
          output="[1, 2, 3, 4, 5, 6]"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
              <p>• Compare 1 vs 2 → take 1</p>
              <p>• Compare 3 vs 2 → take 2</p>
              <p>• Compare 3 vs 4 → take 3</p>
              <p>• Compare 5 vs 4 → take 4</p>
              <p>• Compare 5 vs 6 → take 5</p>
              <p>• Append remaining: 6</p>
            </div>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n + m)", description: "Visit each element once" },
        ]}
        spaceComplexity="O(n + m)"
        spaceDescription="New array for merged result"
        isStable={true}
        isInPlace={false}
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  // Compare and merge
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Append remaining elements
  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);
  
  return result;
}

// Example: mergeSortedArrays([1, 3, 5], [2, 4, 6])
// Output: [1, 2, 3, 4, 5, 6]`}
          python={`def merge_sorted_arrays(arr1, arr2):
    result = []
    i, j = 0, 0
    
    # Compare and merge
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Append remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result`}
          java={`public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
    int[] result = new int[arr1.length + arr2.length];
    int i = 0, j = 0, k = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result[k++] = arr1[i++];
        } else {
            result[k++] = arr2[j++];
        }
    }
    
    while (i < arr1.length) result[k++] = arr1[i++];
    while (j < arr2.length) result[k++] = arr2[j++];
    
    return result;
}`}
        />
      </LearnCard>

      <Callout type="tip" title="Variations">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>In-place merge:</strong> Merge arr2 into arr1 (when arr1 has extra space)</li>
          <li><strong>K-way merge:</strong> Merge K sorted arrays using a min-heap</li>
          <li><strong>Merge lists:</strong> Same concept works for linked lists</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="merge-sorted-arrays" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

function RotateArrayLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Array Rotation?" iconEmoji="🔄" color="from-orange-500 to-amber-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Array rotation shifts all elements by k positions. In right rotation, elements move right
          and wrap around to the beginning. In left rotation, elements move left. There are multiple
          approaches ranging from O(n) extra space to O(1) in-place solutions.
        </p>
      </LearnCard>

      <Analogy emoji="🎠" title="Think of it like a carousel">
        Imagine people sitting on a carousel. When it rotates 3 positions clockwise, everyone moves
        3 seats to the right, and those at the end wrap around to the front!
      </Analogy>

      <LearnCard title="Three Approaches" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Using Extra Array</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Copy elements to new positions. Simple but uses O(n) space.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Rotate One by One</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Rotate by 1 position k times. O(n×k) time, O(1) space.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">3. Reversal Algorithm ⭐</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Reverse parts of array. O(n) time, O(1) space — the best approach!
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Reversal Algorithm Steps" iconEmoji="🔄" color="from-blue-500 to-indigo-500">
        <StepByStep
          steps={[
            {
              title: "Normalize k",
              description: "Set k = k % n (handle k > n cases).",
            },
            {
              title: "Reverse entire array",
              description: "[1, 2, 3, 4, 5] with k=2 → [5, 4, 3, 2, 1]",
            },
            {
              title: "Reverse first k elements",
              description: "[5, 4, 3, 2, 1] → [4, 5, 3, 2, 1]",
            },
            {
              title: "Reverse remaining elements",
              description: "[4, 5, 3, 2, 1] → [4, 5, 1, 2, 3]",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Example" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Rotate Right by 2"
          input="[1, 2, 3, 4, 5], k = 2"
          output="[4, 5, 1, 2, 3]"
        >
          <div className="space-y-2">
            <ArrayDiagram values={[1, 2, 3, 4, 5]} highlights={[]} />
            <p className="text-xs text-[var(--text-tertiary)]">After reverse all: [5, 4, 3, 2, 1]</p>
            <p className="text-xs text-[var(--text-tertiary)]">After reverse first 2: [4, 5, 3, 2, 1]</p>
            <p className="text-xs text-[var(--text-tertiary)]">After reverse last 3: [4, 5, 1, 2, 3]</p>
            <ArrayDiagram values={[4, 5, 1, 2, 3]} highlights={[0, 1]} />
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Reversal Method", time: "O(n)", description: "Three reversals, each O(n)" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="In-place rotation using reversal"
        isStable={true}
        isInPlace={true}
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n; // Handle k > n
  
  function reverse(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  
  reverse(0, n - 1);      // Reverse all
  reverse(0, k - 1);      // Reverse first k
  reverse(k, n - 1);      // Reverse rest
  
  return arr;
}

// Right rotate: rotateArray([1,2,3,4,5], 2) → [4,5,1,2,3]`}
          python={`def rotate_array(arr, k):
    n = len(arr)
    k = k % n  # Handle k > n
    
    def reverse(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1
    
    reverse(0, n - 1)      # Reverse all
    reverse(0, k - 1)      # Reverse first k
    reverse(k, n - 1)      # Reverse rest
    
    return arr`}
          java={`public static void rotateArray(int[] arr, int k) {
    int n = arr.length;
    k = k % n;
    
    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
}

private static void reverse(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`}
        />
      </LearnCard>

      <Callout type="tip" title="Left Rotation">
        For left rotation by k: reverse first k elements, reverse remaining elements, then reverse all!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="rotate-array" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

function RearrangementLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Array Rearrangement?" iconEmoji="🔀" color="from-violet-500 to-purple-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Array rearrangement involves reordering elements based on specific conditions — like
          alternating positive/negative numbers, segregating odds/evens, or arranging elements
          at their index positions. These patterns appear frequently in interviews.
        </p>
      </LearnCard>

      <Analogy emoji="🎭" title="Think of it like organizing a dance line">
        Imagine arranging dancers so boys and girls alternate. You can&apos;t just sort them —
        you need to interleave them while maintaining some relative order.
      </Analogy>

      <LearnCard title="Common Rearrangement Patterns" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Positive/Negative Alternating</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Arrange as [+, -, +, -, ...] while maintaining relative order.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. Even/Odd Segregation</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              All even numbers first, then all odd numbers.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">3. Rearrange arr[i] = i</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Place element i at index i if present, else -1.
            </p>
          </div>
        </div>
      </LearnCard>

      <LearnCard title="Example: Positive/Negative Alternating" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Alternate Positive and Negative"
          input="[1, 2, 3, -4, -1, 4]"
          output="[1, -4, 2, -1, 3, 4] or similar valid arrangement"
        >
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Separate positives: [1, 2, 3, 4]</p>
            <p>• Separate negatives: [-4, -1]</p>
            <p>• Interleave: [1, -4, 2, -1, 3, 4]</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "Most Rearrangements", time: "O(n)", description: "Single or two passes" },
        ]}
        spaceComplexity="O(1) to O(n)"
        spaceDescription="Depends on whether stable order is required"
        isStable={false}
        isInPlace={true}
      />

      <LearnCard title="Code: Positive/Negative Alternating" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function rearrangeAlternate(arr) {
  // Separate positives and negatives
  const pos = arr.filter(x => x >= 0);
  const neg = arr.filter(x => x < 0);
  
  const result = [];
  let i = 0, j = 0;
  let usePositive = true;
  
  while (i < pos.length || j < neg.length) {
    if (usePositive && i < pos.length) {
      result.push(pos[i++]);
    } else if (!usePositive && j < neg.length) {
      result.push(neg[j++]);
    } else if (i < pos.length) {
      result.push(pos[i++]);
    } else {
      result.push(neg[j++]);
    }
    usePositive = !usePositive;
  }
  
  return result;
}`}
          python={`def rearrange_alternate(arr):
    pos = [x for x in arr if x >= 0]
    neg = [x for x in arr if x < 0]
    
    result = []
    i, j = 0, 0
    use_positive = True
    
    while i < len(pos) or j < len(neg):
        if use_positive and i < len(pos):
            result.append(pos[i])
            i += 1
        elif not use_positive and j < len(neg):
            result.append(neg[j])
            j += 1
        elif i < len(pos):
            result.append(pos[i])
            i += 1
        else:
            result.append(neg[j])
            j += 1
        use_positive = not use_positive
    
    return result`}
          java={`public static int[] rearrangeAlternate(int[] arr) {
    List<Integer> pos = new ArrayList<>();
    List<Integer> neg = new ArrayList<>();
    
    for (int x : arr) {
        if (x >= 0) pos.add(x);
        else neg.add(x);
    }
    
    int[] result = new int[arr.length];
    int i = 0, j = 0, k = 0;
    boolean usePositive = true;
    
    while (i < pos.size() || j < neg.size()) {
        if (usePositive && i < pos.size()) {
            result[k++] = pos.get(i++);
        } else if (!usePositive && j < neg.size()) {
            result[k++] = neg.get(j++);
        } else if (i < pos.size()) {
            result[k++] = pos.get(i++);
        } else {
            result[k++] = neg.get(j++);
        }
        usePositive = !usePositive;
    }
    return result;
}`}
        />
      </LearnCard>

      <Callout type="tip" title="Interview Tip">
        Always clarify: Should relative order be maintained? What if counts don&apos;t match?
        Can we use extra space? These questions change the approach significantly!
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="rearrangement" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}

function NextPermutationLesson({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <LearnCard title="What is Next Permutation?" iconEmoji="🔢" color="from-rose-500 to-pink-500">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Given an array of numbers, find the next lexicographically greater permutation. If the
          array is the largest permutation, return the smallest one. This algorithm is used in
          C++&apos;s std::next_permutation and is a classic interview question.
        </p>
      </LearnCard>

      <Analogy emoji="📖" title="Think of it like dictionary ordering">
        If you list all permutations of [1,2,3] in dictionary order: [1,2,3], [1,3,2], [2,1,3],
        [2,3,1], [3,1,2], [3,2,1]. The &quot;next permutation&quot; of [1,2,3] is [1,3,2].
      </Analogy>

      <LearnCard title="How It Works" iconEmoji="📖" color="from-purple-500 to-pink-500">
        <StepByStep
          steps={[
            {
              title: "Find the pivot",
              description: "Scan from right to find first element smaller than its right neighbor.",
            },
            {
              title: "If no pivot exists",
              description: "Array is in descending order — reverse entire array.",
            },
            {
              title: "Find successor",
              description: "Find rightmost element greater than pivot.",
            },
            {
              title: "Swap pivot and successor",
              description: "Exchange these two elements.",
            },
            {
              title: "Reverse suffix",
              description: "Reverse elements after the original pivot position.",
            },
          ]}
        />
      </LearnCard>

      <LearnCard title="Example" iconEmoji="📝" color="from-green-500 to-emerald-500">
        <ExampleBox
          number={1}
          title="Find Next Permutation"
          input="[1, 2, 3]"
          output="[1, 3, 2]"
        >
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Find pivot: index 1 (value 2, since 2 &lt; 3)</p>
            <p>• Find successor: index 2 (value 3, rightmost &gt; 2)</p>
            <p>• Swap: [1, 3, 2]</p>
            <p>• Reverse suffix after pivot: nothing to reverse</p>
            <p>• Result: [1, 3, 2]</p>
          </div>
        </ExampleBox>

        <ExampleBox
          number={2}
          title="Next Permutation of [1, 3, 2]"
          input="[1, 3, 2]"
          output="[2, 1, 3]"
          defaultOpen={false}
        >
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• Find pivot: index 0 (value 1, since 1 &lt; 3)</p>
            <p>• Find successor: index 2 (value 2, rightmost &gt; 1)</p>
            <p>• Swap: [2, 3, 1]</p>
            <p>• Reverse suffix [3, 1] → [1, 3]</p>
            <p>• Result: [2, 1, 3]</p>
          </div>
        </ExampleBox>
      </LearnCard>

      <ComplexityTable
        timeComplexity={[
          { case: "All Cases", time: "O(n)", description: "At most two passes through array" },
        ]}
        spaceComplexity="O(1)"
        spaceDescription="In-place modification"
        isStable={true}
        isInPlace={true}
      />

      <LearnCard title="Code Implementation" iconEmoji="💻" color="from-cyan-500 to-blue-500">
        <CodeTabs
          javascript={`function nextPermutation(nums) {
  const n = nums.length;
  
  // Step 1: Find pivot (first decreasing from right)
  let pivot = -1;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }
  
  if (pivot === -1) {
    // Already largest, return smallest
    nums.reverse();
    return nums;
  }
  
  // Step 2: Find successor (smallest greater than pivot, from right)
  for (let i = n - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      [nums[pivot], nums[i]] = [nums[i], nums[pivot]];
      break;
    }
  }
  
  // Step 3: Reverse suffix after pivot
  let left = pivot + 1, right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  
  return nums;
}

// nextPermutation([1, 2, 3]) → [1, 3, 2]`}
          python={`def next_permutation(nums):
    n = len(nums)
    
    # Step 1: Find pivot
    pivot = -1
    for i in range(n - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            pivot = i
            break
    
    if pivot == -1:
        nums.reverse()
        return nums
    
    # Step 2: Find successor and swap
    for i in range(n - 1, pivot, -1):
        if nums[i] > nums[pivot]:
            nums[pivot], nums[i] = nums[i], nums[pivot]
            break
    
    # Step 3: Reverse suffix
    left, right = pivot + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    
    return nums`}
          java={`public static void nextPermutation(int[] nums) {
    int n = nums.length;
    
    // Step 1: Find pivot
    int pivot = -1;
    for (int i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    if (pivot == -1) {
        reverse(nums, 0, n - 1);
        return;
    }
    
    // Step 2: Find successor and swap
    for (int i = n - 1; i > pivot; i--) {
        if (nums[i] > nums[pivot]) {
            int temp = nums[pivot];
            nums[pivot] = nums[i];
            nums[i] = temp;
            break;
        }
    }
    
    // Step 3: Reverse suffix
    reverse(nums, pivot + 1, n - 1);
}

private static void reverse(int[] nums, int l, int r) {
    while (l < r) {
        int temp = nums[l];
        nums[l++] = nums[r];
        nums[r--] = temp;
    }
}`}
        />
      </LearnCard>

      <Callout type="insight" title="Why This Works">
        The suffix after the pivot is always in descending order. Swapping the pivot with the
        smallest element greater than it, then reversing the suffix, gives us the lexicographically
        next permutation.
      </Callout>

      <Callout type="warning" title="Edge Cases">
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Single element array → same array</li>
          <li>All same elements → same array</li>
          <li>Descending order → reverse to get ascending</li>
        </ul>
      </Callout>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">🚀 Try It Yourself</h3>
        <div className="flex flex-wrap gap-3">
          <VisualizeLink algorithm="next-permutation" category="arrays" locale={locale} />
        </div>
      </div>
    </div>
  );
}









