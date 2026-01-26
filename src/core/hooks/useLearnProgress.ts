"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Types
export interface LearnProgress {
  completedLessons: Set<string>; // e.g., "sorting/bubble-sort"
  bookmarkedLessons: Set<string>;
  lastVisitedLesson: string | null;
  lessonProgress: Record<string, number>; // 0-100 scroll progress
}

// Zustand store for serialization workaround (Sets don't serialize well)
interface LearnProgressState {
  completedLessons: string[];
  bookmarkedLessons: string[];
  lastVisitedLesson: string | null;
  lessonProgress: Record<string, number>;

  // Actions
  markLessonComplete: (lessonPath: string) => void;
  markLessonIncomplete: (lessonPath: string) => void;
  toggleLessonComplete: (lessonPath: string) => void;
  isLessonComplete: (lessonPath: string) => boolean;

  toggleBookmark: (lessonPath: string) => void;
  isBookmarked: (lessonPath: string) => boolean;

  setLastVisited: (lessonPath: string) => void;
  updateScrollProgress: (lessonPath: string, progress: number) => void;

  // Computed
  getTopicProgress: (topic: string, lessonSlugs: string[]) => { completed: number; total: number; percentage: number };
  getTotalProgress: () => { completed: number; total: number; percentage: number };

  // Reset
  resetProgress: () => void;
}

// All lessons by topic
const LESSONS_BY_TOPIC: Record<string, string[]> = {
  sorting: ["bubble-sort", "selection-sort", "insertion-sort", "merge-sort", "quick-sort"],
  arrays: ["array-operations", "two-pointers", "sliding-window", "prefix-sum", "kadanes"],
  strings: ["string-operations", "character-frequency", "brute-force-search", "kmp-algorithm", "anagram-detection"],
  searching: ["linear-search", "binary-search", "lower-bound", "upper-bound", "peak-element"],
  stacks: ["stack-operations", "balanced-parentheses", "infix-to-postfix", "next-greater-element"],
  queues: ["queue-operations", "circular-queue", "priority-queue", "lru-cache"],
  "linked-lists": ["singly-linked-list", "reverse-linked-list", "detect-cycle", "find-middle"],
  recursion: ["factorial", "fibonacci", "tower-of-hanoi", "n-queens"],
  trees: ["binary-tree", "tree-traversals", "bst-operations", "tree-height-depth"],
  heaps: ["heap-structure", "heapify", "heap-sort", "kth-largest"],
  hashing: ["hash-functions", "hash-tables", "collision-resolution", "two-sum"],
  graphs: ["graph-representation", "bfs", "dfs", "cycle-detection"],
  "dynamic-programming": ["fibonacci-dp", "knapsack-01", "lcs", "coin-change"],
  greedy: ["activity-selection", "fractional-knapsack", "huffman-coding", "job-sequencing"],
};

// Total lessons count
const TOTAL_LESSONS = Object.values(LESSONS_BY_TOPIC).reduce((sum, arr) => sum + arr.length, 0);

export const useLearnProgress = create<LearnProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      bookmarkedLessons: [],
      lastVisitedLesson: null,
      lessonProgress: {},

      markLessonComplete: (lessonPath) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonPath)
            ? state.completedLessons
            : [...state.completedLessons, lessonPath],
        })),

      markLessonIncomplete: (lessonPath) =>
        set((state) => ({
          completedLessons: state.completedLessons.filter((l) => l !== lessonPath),
        })),

      toggleLessonComplete: (lessonPath) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonPath)
            ? state.completedLessons.filter((l) => l !== lessonPath)
            : [...state.completedLessons, lessonPath],
        })),

      isLessonComplete: (lessonPath) => get().completedLessons.includes(lessonPath),

      toggleBookmark: (lessonPath) =>
        set((state) => ({
          bookmarkedLessons: state.bookmarkedLessons.includes(lessonPath)
            ? state.bookmarkedLessons.filter((l) => l !== lessonPath)
            : [...state.bookmarkedLessons, lessonPath],
        })),

      isBookmarked: (lessonPath) => get().bookmarkedLessons.includes(lessonPath),

      setLastVisited: (lessonPath) =>
        set({ lastVisitedLesson: lessonPath }),

      updateScrollProgress: (lessonPath, progress) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonPath]: Math.min(100, Math.max(0, progress)),
          },
        })),

      getTopicProgress: (topic, lessonSlugs) => {
        const completed = get().completedLessons.filter((l) =>
          lessonSlugs.some((slug) => l === `${topic}/${slug}`)
        ).length;
        const total = lessonSlugs.length;
        return {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      },

      getTotalProgress: () => {
        const completed = get().completedLessons.length;
        return {
          completed,
          total: TOTAL_LESSONS,
          percentage: TOTAL_LESSONS > 0 ? Math.round((completed / TOTAL_LESSONS) * 100) : 0,
        };
      },

      resetProgress: () =>
        set({
          completedLessons: [],
          bookmarkedLessons: [],
          lastVisitedLesson: null,
          lessonProgress: {},
        }),
    }),
    {
      name: "algo-arcade-learn-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Utility: Get topic lessons
export function getTopicLessons(topic: string): string[] {
  return LESSONS_BY_TOPIC[topic] || [];
}

// Utility: Get all topics
export function getAllTopics(): string[] {
  return Object.keys(LESSONS_BY_TOPIC);
}

// Utility: Format lesson path
export function formatLessonPath(topic: string, lesson: string): string {
  return `${topic}/${lesson}`;
}
