import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  Box,
  Hash,
  BarChart3,
  Search,
  Layers,
  Repeat,
  Link2,
  GitBranch,
  TreePine,
  Triangle,
  Puzzle,
  Network,
  Calculator,
  Zap,
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { OverallProgressBar, ContinueLearning } from "@/ui/components/learn";

interface LearnPageProps {
  params: Promise<{ locale: string }>;
}

// Learning topics with lesson counts (matching the topics from Topics page)
const learnTopics = [
  // Beginner
  {
    key: "arrays",
    icon: Box,
    color: "from-slate-500 to-gray-500",
    level: "Beginner",
    lessonCount: 5,
    estimatedTime: "2 hours",
    description: "Foundation of all data structures",
  },
  {
    key: "strings",
    icon: Hash,
    color: "from-amber-500 to-yellow-500",
    level: "Beginner",
    lessonCount: 5,
    estimatedTime: "2 hours",
    description: "Text processing fundamentals",
  },
  {
    key: "sorting",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    level: "Beginner",
    lessonCount: 5,
    estimatedTime: "3 hours",
    description: "Essential sorting algorithms",
  },
  {
    key: "searching",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
    level: "Beginner",
    lessonCount: 5,
    estimatedTime: "2 hours",
    description: "Finding elements efficiently",
  },
  // Intermediate
  {
    key: "stacks",
    icon: Layers,
    color: "from-orange-500 to-amber-500",
    level: "Intermediate",
    lessonCount: 4,
    estimatedTime: "2 hours",
    description: "LIFO data structure",
  },
  {
    key: "queues",
    icon: Repeat,
    color: "from-pink-500 to-rose-500",
    level: "Intermediate",
    lessonCount: 4,
    estimatedTime: "2 hours",
    description: "FIFO data structure",
  },
  {
    key: "linked-lists",
    icon: Link2,
    color: "from-rose-500 to-red-500",
    level: "Intermediate",
    lessonCount: 4,
    estimatedTime: "2.5 hours",
    description: "Dynamic linear structures",
  },
  {
    key: "recursion",
    icon: GitBranch,
    color: "from-emerald-500 to-teal-500",
    level: "Intermediate",
    lessonCount: 4,
    estimatedTime: "3 hours",
    description: "Self-referential problem solving",
  },
  // Advanced
  {
    key: "trees",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    level: "Advanced",
    lessonCount: 4,
    estimatedTime: "3 hours",
    description: "Hierarchical data structures",
  },
  {
    key: "heaps",
    icon: Triangle,
    color: "from-violet-500 to-purple-500",
    level: "Advanced",
    lessonCount: 5,
    estimatedTime: "2.5 hours",
    description: "Complete binary tree structure",
  },
  {
    key: "hashing",
    icon: Puzzle,
    color: "from-cyan-500 to-sky-500",
    level: "Advanced",
    lessonCount: 4,
    estimatedTime: "2 hours",
    description: "O(1) average-case operations",
  },
  {
    key: "graphs",
    icon: Network,
    color: "from-indigo-500 to-blue-500",
    level: "Advanced",
    lessonCount: 5,
    estimatedTime: "4 hours",
    description: "Networks and relationships",
  },
  // Expert
  {
    key: "dynamic-programming",
    icon: Calculator,
    color: "from-teal-500 to-cyan-500",
    level: "Expert",
    lessonCount: 6,
    estimatedTime: "5 hours",
    description: "Optimized recursive solutions",
  },
  {
    key: "greedy-algorithms",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    level: "Expert",
    lessonCount: 4,
    estimatedTime: "3 hours",
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

// Group topics by level
const groupedTopics = {
  Beginner: learnTopics.filter((t) => t.level === "Beginner"),
  Intermediate: learnTopics.filter((t) => t.level === "Intermediate"),
  Advanced: learnTopics.filter((t) => t.level === "Advanced"),
  Expert: learnTopics.filter((t) => t.level === "Expert"),
};

export default async function LearnPage({ params }: LearnPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LearnContent locale={locale} />;
}

function LearnContent({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-400)] mb-4">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Interactive Lessons</span>
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.learn")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Comprehensive lessons with theory, examples, and diagrams to help you
          understand DSA concepts deeply before visualizing them
        </p>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <OverallProgressBar />
        <ContinueLearning locale={locale} />
      </div>

      {/* Topics by Level */}
      {Object.entries(groupedTopics).map(([level, topics]) => (
        <div key={level} className="mb-12">
          {/* Level Header */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[level]}`}
            >
              {level}
            </span>
            <div className="flex-1 h-px bg-[var(--border-primary)]" />
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.key}
                  href={`/${locale}/learn/${topic.key}`}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-transparent transition-all duration-300 hover:shadow-xl p-5"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary-400)] transition-colors">
                      {t(`topics.${topic.key}`)}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-tertiary)] mb-3">
                      {topic.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {topic.lessonCount} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {topic.estimatedTime}
                      </span>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="absolute top-1/2 right-0 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
