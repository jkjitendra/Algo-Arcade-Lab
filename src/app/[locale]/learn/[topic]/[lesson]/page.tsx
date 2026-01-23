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
} from "@/ui/components/learn";

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
};

// Get adjacent lessons for navigation
function getAdjacentLessons(topic: string, currentLesson: string) {
  const topicLessons: Record<string, string[]> = {
    sorting: ["bubble-sort", "selection-sort", "insertion-sort", "merge-sort", "quick-sort"],
    arrays: ["array-operations", "two-pointers", "sliding-window", "prefix-sum", "kadanes"],
    strings: ["string-operations", "character-frequency", "brute-force-search", "kmp-algorithm", "anagram-detection"],
    searching: ["linear-search", "binary-search", "lower-bound", "upper-bound", "peak-element"],
    stacks: ["stack-operations", "balanced-parentheses", "infix-to-postfix", "next-greater-element"],
  };

  const lessons = topicLessons[topic] || [];
  const currentIndex = lessons.indexOf(currentLesson);

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { locale, topic, lesson } = await params;
  setRequestLocale(locale);

  // For now, only show bubble-sort as a demo lesson
  // Other lessons will show "coming soon" until MDX content is added
  const content = lessonContent[lesson];
  const adjacentLessons = getAdjacentLessons(topic, lesson);

  if (!content) {
    // Show a placeholder for lessons that don't have content yet
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/${locale}/learn/${topic}`}
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-400)] transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Topic
        </Link>

        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Lesson Coming Soon
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">
            This lesson content is being prepared. Check back soon!
          </p>
          <Link
            href={`/${locale}/learn/${topic}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-white font-medium hover:bg-[var(--color-primary-600)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {topic.replace("-", " ")}
          </Link>
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

      {/* Lesson Navigation */}
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
