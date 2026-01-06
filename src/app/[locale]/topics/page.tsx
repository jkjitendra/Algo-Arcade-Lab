import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  BarChart3,
  Network,
  TreePine,
  Layers,
  Search,
  Link2,
  Triangle,
  Calculator,
  Hash,
  GitBranch,
  Repeat,
  Box,
  Puzzle,
  Zap,
} from "lucide-react";

interface TopicsPageProps {
  params: Promise<{ locale: string }>;
}

// Topics ordered from basic to advanced (learning path)
const topics = [
  // === BEGINNER ===
  {
    key: "arrays",
    icon: Box,
    color: "from-slate-500 to-gray-500",
    level: "Beginner",
    algorithms: ["Array Basics", "Two Pointers", "Sliding Window", "Prefix Sum"],
    description: "Foundation of all data structures",
  },
  {
    key: "strings",
    icon: Hash,
    color: "from-amber-500 to-yellow-500",
    level: "Beginner",
    algorithms: ["String Manipulation", "Pattern Matching", "Anagrams"],
    description: "Text processing fundamentals",
  },
  {
    key: "sorting",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    level: "Beginner",
    algorithms: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
    description: "Essential sorting algorithms",
  },
  {
    key: "searching",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
    level: "Beginner",
    algorithms: ["Linear Search", "Binary Search", "Jump Search", "Interpolation Search"],
    description: "Finding elements efficiently",
  },
  // === INTERMEDIATE ===
  {
    key: "stacks",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
    level: "Intermediate",
    algorithms: ["Push/Pop", "Balanced Parentheses", "Expression Evaluation", "Next Greater Element"],
    description: "LIFO data structure",
  },
  {
    key: "queues",
    icon: Repeat,
    color: "from-pink-500 to-rose-500",
    level: "Intermediate",
    algorithms: ["Enqueue/Dequeue", "Circular Queue", "Priority Queue", "Deque"],
    description: "FIFO data structure",
  },
  {
    key: "linked-lists",
    icon: Link2,
    color: "from-rose-500 to-red-500",
    level: "Intermediate",
    algorithms: ["Singly Linked", "Doubly Linked", "Circular", "Reverse", "Detect Cycle"],
    description: "Dynamic linear structures",
  },
  {
    key: "recursion",
    icon: GitBranch,
    color: "from-emerald-500 to-teal-500",
    level: "Intermediate",
    algorithms: ["Factorial", "Fibonacci", "Tower of Hanoi", "Backtracking"],
    description: "Self-referential problem solving",
  },
  // === ADVANCED ===
  {
    key: "trees",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    level: "Advanced",
    algorithms: ["Binary Tree", "BST", "AVL Tree", "Tree Traversals", "Segment Tree"],
    description: "Hierarchical data structures",
  },
  {
    key: "heaps",
    icon: Triangle,
    color: "from-violet-500 to-purple-500",
    level: "Advanced",
    algorithms: ["Min Heap", "Max Heap", "Heapify", "Heap Sort", "Priority Queue"],
    description: "Complete binary tree structure",
  },
  {
    key: "hashing",
    icon: Puzzle,
    color: "from-cyan-500 to-sky-500",
    level: "Advanced",
    algorithms: ["Hash Tables", "Collision Handling", "Hash Maps", "Hash Sets"],
    description: "O(1) average-case operations",
  },
  {
    key: "graphs",
    icon: Network,
    color: "from-indigo-500 to-blue-500",
    level: "Advanced",
    algorithms: ["BFS", "DFS", "Dijkstra", "Bellman-Ford", "Floyd-Warshall", "A* Search"],
    description: "Networks and relationships",
  },
  // === EXPERT ===
  {
    key: "dynamic-programming",
    icon: Calculator,
    color: "from-teal-500 to-cyan-500",
    level: "Expert",
    algorithms: ["Memoization", "Tabulation", "Knapsack", "LCS", "LIS", "Matrix Chain"],
    description: "Optimized recursive solutions",
  },
  {
    key: "greedy-algorithms",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    level: "Expert",
    algorithms: ["Activity Selection", "Huffman Coding", "Fractional Knapsack", "Job Sequencing"],
    description: "Locally optimal choices",
  },
];

// Level badge colors
const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/20 text-green-400",
  Intermediate: "bg-blue-500/20 text-blue-400",
  Advanced: "bg-purple-500/20 text-purple-400",
  Expert: "bg-red-500/20 text-red-400",
};

export default async function TopicsPage({ params }: TopicsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TopicsContent locale={locale} />;
}

function TopicsContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Learning Path
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Master Data Structures & Algorithms from basics to advanced topics
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.key}
              href={`/${locale}/topics/${topic.key}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-transparent transition-all duration-300 hover:shadow-xl"
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Step number */}
              <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
                <span className="text-xs font-medium text-[var(--text-tertiary)]">{index + 1}</span>
              </div>

              {/* Level badge */}
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${levelColors[topic.level]}`}>
                  {topic.level}
                </span>
              </div>

              <div className="relative p-6 pt-10">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {t(`topics.${topic.key}`)}
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--text-tertiary)] mb-3">
                  {topic.description}
                </p>

                {/* Algorithm tags */}
                <div className="flex flex-wrap gap-1.5">
                  {topic.algorithms.slice(0, 3).map((algo) => (
                    <span
                      key={algo}
                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                    >
                      {algo}
                    </span>
                  ))}
                  {topic.algorithms.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]">
                      +{topic.algorithms.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
