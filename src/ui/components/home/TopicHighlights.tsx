"use client";

import Link from "next/link";
import { ArrowRight, Lock, Unlock } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  algoCount: number;
  freeCount: number;
  color: string;
}

interface TopicHighlightsProps {
  locale: string;
  topics?: Topic[];
}

export function TopicHighlights({ locale, topics = [] }: TopicHighlightsProps) {
  const displayTopics = topics.length > 0 ? topics : [
    {
      id: "arrays",
      title: "Arrays & Strings",
      description: "Fundamental data structures. Learn Kadane's Algorithm, Sliding Window, and Two Pointers.",
      algoCount: 15,
      freeCount: 15, // All free
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "sorting",
      title: "Sorting Algorithms",
      description: "Visualizations for Bubble, Merge, Quick, Heap, and more complex sorting techniques.",
      algoCount: 10,
      freeCount: 1,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "graphs",
      title: "Graph Algorithms",
      description: "Master BFS, DFS, Dijkstra, Prim's, and Kruskal's with interactive graph builders.",
      algoCount: 12,
      freeCount: 1,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      description: "Demystify DP with step-by-step table filling for Knapsack, LCS, and more.",
      algoCount: 20,
      freeCount: 1,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "trees",
      title: "Trees & BST",
      description: "Visualize tree traversals, balancing (AVL/Red-Black), and lowest common ancestor.",
      algoCount: 8,
      freeCount: 1,
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "greedy-algorithms",
      title: "Greedy Algorithms",
      description: "Learn optimization strategies including Huffman Coding and Activity Selection.",
      algoCount: 6,
      freeCount: 1,
      color: "from-yellow-500 to-amber-600",
    },
  ];

  return (
    <section className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Explore Interactive Topics
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Dive into our extensive library of algorithms. Arrays are completely free!
            </p>
          </div>
          <Link
            href={`/${locale}/topics`}
            className="hidden md:inline-flex items-center font-semibold text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors"
          >
            View all topics <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTopics.map((topic) => (
            <Link
              href={`/${locale}/topics/${topic.id}`}
              key={topic.id}
              className="group flex flex-col bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-primary)] hover:border-[var(--color-primary-500)] hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-32 bg-gradient-to-br ${topic.color} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {topic.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-[var(--text-secondary)] mb-6 line-clamp-2">
                  {topic.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="font-semibold">{topic.algoCount} Algos</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {topic.freeCount === topic.algoCount ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 font-medium text-xs">
                        <Unlock className="w-3 h-3" />
                        Free
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-medium text-xs">
                        <Unlock className="w-3 h-3 text-[var(--color-primary-500)]" />
                        {topic.freeCount} Free
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href={`/${locale}/topics`}
            className="inline-flex items-center font-semibold text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] transition-colors"
          >
            View all topics <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
