import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, BookOpen, Clock, Play } from "lucide-react";
import { TopicProgressBar, LessonCompletionBadge } from "@/ui/components/learn";
import { validTopics, getLessonsByTopic, isValidTopic, type Lesson } from "@/data/learnLessons";

interface TopicPageProps {
  params: Promise<{ locale: string; topic: string }>;
}



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

  if (!isValidTopic(topic)) {
    notFound();
  }

  const lessons = getLessonsByTopic(topic);

  return <TopicContent locale={locale} topic={topic} lessons={lessons} />;
}

function TopicContent({
  locale,
  topic,
  lessons,
}: {
  locale: string;
  topic: string;
  lessons: Lesson[];
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

      {/* Progress Bar */}
      <div className="mb-6">
        <TopicProgressBar topic={topic} lessons={lessons.map(l => l.slug)} />
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
                <LessonCompletionBadge topic={topic} lesson={lesson.slug} />
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
