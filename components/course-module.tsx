"use client";

import { useState } from "react";
import { Dot } from "lucide-react";
import { ChapterGroup } from "@/components/chapter-group";
import { Chapter } from "@/components/chapter";
import { LessonItem } from "@/components/lesson-item";

// ─── Types ────────────────────────────────────────────────────────────────────

type LessonStatus = "playing" | "completed" | "new";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;
}

interface ChapterData {
  id: string;
  title: string;
  videosWatched: number;
  totalVideos: number;
  percentComplete: number;
  lessons: Lesson[];
}

interface ChapterGroupData {
  id: string;
  title: string;
  videosWatched: number;
  totalVideos: number;
  percentComplete: number;
  chapters: ChapterData[];
}

interface CourseModuleProps {
  title: string;
  completedSections: number;
  totalSections: number;
  totalMinutes: number;
  groups: ChapterGroupData[];
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-400 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-neutral-500 text-right">{percent}% complete</p>
    </div>
  );
}

// ─── Course Module ────────────────────────────────────────────────────────────

export function CourseModule({
  title,
  completedSections,
  totalSections,
  totalMinutes,
  groups,
}: CourseModuleProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const toggleGroup = (id: string) =>
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleChapter = (id: string) =>
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const overallPercent = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="flex flex-col bg-neutral-950 rounded-2xl overflow-hidden w-full max-w-sm border border-neutral-800/60">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-neutral-800/60">
        <h2 className="text-lg font-semibold text-neutral-100 mb-1">{title}</h2>
        <div className="flex flex-row items-center gap-1 text-sm text-neutral-400 mb-3">
          <span>{completedSections}/{totalSections} completed</span>
          <Dot className="size-4" />
          <span>⏱ {totalMinutes}m total</span>
        </div>
        <ProgressBar percent={overallPercent} />
      </div>

      {/* Groups */}
      <div className="flex flex-col p-2 overflow-y-auto max-h-[600px]">
        {groups.map((group) => (
          <div key={group.id}>
            <div onClick={() => toggleGroup(group.id)}>
              <ChapterGroup />
            </div>

            {expandedGroups.has(group.id) && (
              <div className="ml-4 pl-3">
                {group.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <div onClick={() => toggleChapter(chapter.id)}>
                      <Chapter />
                    </div>

                    {expandedChapters.has(chapter.id) && (
                      <div className="ml-4 pl-3">
                        {chapter.lessons.map((lesson) => (
                          <LessonItem key={lesson.id} status={lesson.status} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}