"use client";

import { Check, Circle, Bookmark, BookmarkCheck } from "lucide-react";
import { useLearnProgress, formatLessonPath } from "@/core/hooks/useLearnProgress";
import { useEffect } from "react";

interface LessonCompleteButtonProps {
  topic: string;
  lesson: string;
}

export function LessonCompleteButton({ topic, lesson }: LessonCompleteButtonProps) {
  const lessonPath = formatLessonPath(topic, lesson);
  const {
    isLessonComplete,
    toggleLessonComplete,
    isBookmarked,
    toggleBookmark,
    setLastVisited
  } = useLearnProgress();

  const completed = isLessonComplete(lessonPath);
  const bookmarked = isBookmarked(lessonPath);

  // Track last visited lesson
  useEffect(() => {
    setLastVisited(lessonPath);
  }, [lessonPath, setLastVisited]);

  return (
    <div className="flex items-center gap-3">
      {/* Bookmark Button */}
      <button
        onClick={() => toggleBookmark(lessonPath)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${bookmarked
            ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500"
            : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-yellow-500 hover:border-yellow-500/50"
          }`}
        title={bookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </button>

      {/* Mark Complete Button */}
      <button
        onClick={() => toggleLessonComplete(lessonPath)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all ${completed
            ? "border-green-500/50 bg-green-500/20 text-green-400"
            : "border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-green-400 hover:border-green-500/50"
          }`}
      >
        {completed ? (
          <>
            <Check className="w-4 h-4" />
            <span>Completed</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4" />
            <span>Mark Complete</span>
          </>
        )}
      </button>
    </div>
  );
}

// Progress bar component for topic pages
interface TopicProgressBarProps {
  topic: string;
  lessons: string[];
}

export function TopicProgressBar({ topic, lessons }: TopicProgressBarProps) {
  const { getTopicProgress } = useLearnProgress();
  const { completed, total, percentage } = getTopicProgress(topic, lessons);

  if (total === 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-[var(--text-secondary)]">
          {completed}/{total} lessons completed
        </span>
        <span className="text-[var(--text-tertiary)]">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Overall progress component
export function OverallProgressBar() {
  const { getTotalProgress } = useLearnProgress();
  const { completed, total, percentage } = getTotalProgress();

  return (
    <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[var(--text-primary)]">
          Your Learning Progress
        </span>
        <span className="text-sm text-[var(--text-secondary)]">
          {completed}/{total} lessons
        </span>
      </div>
      <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right text-xs text-[var(--text-tertiary)]">
        {percentage}% complete
      </div>
    </div>
  );
}

// Continue learning component
export function ContinueLearning({ locale }: { locale: string }) {
  const { lastVisitedLesson, completedLessons } = useLearnProgress();

  if (!lastVisitedLesson) return null;

  const [topic, lesson] = lastVisitedLesson.split("/");
  const isCompleted = completedLessons.includes(lastVisitedLesson);

  // Don't show if last lesson is completed and there's no obvious next
  if (isCompleted) return null;

  return (
    <a
      href={`/${locale}/learn/${topic}/${lesson}`}
      className="block p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--color-primary-500)]/50 transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--text-tertiary)] mb-1">Continue where you left off</p>
          <p className="font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary-400)] transition-colors">
            {lesson.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
          <p className="text-xs text-[var(--text-secondary)] capitalize mt-0.5">
            {topic.replace(/-/g, " ")}
          </p>
        </div>
        <div className="text-[var(--color-primary-400)]">→</div>
      </div>
    </a>
  );
}

// Lesson completion badge for lesson cards
interface LessonCompletionBadgeProps {
  topic: string;
  lesson: string;
}

export function LessonCompletionBadge({ topic, lesson }: LessonCompletionBadgeProps) {
  const { isLessonComplete } = useLearnProgress();
  const completed = isLessonComplete(formatLessonPath(topic, lesson));

  if (!completed) return null;

  return (
    <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
      <Check className="w-3 h-3" />
      <span>Completed</span>
    </div>
  );
}
