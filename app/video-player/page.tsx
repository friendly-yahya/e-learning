"use client";
import { FileAttachment, FileAttachmentGroup } from "@/components/file-attachment";
import { Badge } from "@/components/ui/badge";
import { CommentInput } from "@/components/comment-input";
import { CourseModule } from "@/components/course-module";
import { FileText } from "lucide-react";

export default function Page() {
  const currentStatus = 'playing';
  
  return (
    <div className="flex flex-row items-center gap-4 text-center sm:items-start sm:text-left w-full">
      <div className="flex-3 flex flex-col gap-6 min-w-0">
        <div className="relative w-full aspect-video overflow-hidden rounded-3xl bg-zinc-900">
        </div>
        <div className="py-5 flex flex-col px-5 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:border-neutral-500-30 dark:bg-neutral-500-5 border gap-6">
          <div className="flex flex-rows justify-between">
            <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50">
              Fundamentals
            </h2>
            <Badge
              variant="secondary"
              className="rounded-sm text-xs font-medium w-fit self-start">
              Mechanics
            </Badge>
          </div>
          <p>Understanding the basics of forces and Newton's laws</p>
          <p>In this lesson, we'll explore the fundamental concepts of motion and forces. You'll learn how Newton's laws apply to everyday situations and understand the relationship between force, mass, and acceleration.</p>
          <div>
            <h3>Key takeaways</h3>
            <div>
              <div>
                <p>Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.</p>
              </div>
              <div>
                <p>Newton's Second Law: The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.</p>
              </div>
              <div>
                <p>Newton's Third Law: For every action, there is an equal and opposite reaction.</p>
              </div>
            </div>
          </div>
          <div className="flex-col flex gap-6">
            <h3 className="text-lg font-semibold text-black dark:text-neutral-50 flex items-center gap-2">
              <FileText size="1em" strokeWidth={1.8} className="text-black dark:text-neutral-50" />
              Course Materials
            </h3>
            <FileAttachmentGroup>
              <FileAttachment
                label="Newton's Laws Cheat Sheet"
                detail="2.4 MB"
                iconType="pdf"
                iconColor="red"
                onDownload={() => console.log("download pdf")}
              />
              <FileAttachment
                label="Force Calculation Examples"
                detail="2.4 MB"
                iconType="document"
                iconColor="blue"
                onDownload={() => console.log("download doc")}
              />
              <FileAttachment
                label="Simulation Link"
                detail="2.4 MB"
                iconType="link"
                iconColor="purple"
                onDownload={() => console.log("open link")}
              />
            </FileAttachmentGroup>
          </div>
        </div>
        <div className="py-5 flex flex-col px-5 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:border-neutral-500-30 dark:bg-neutral-500-5 border gap-6">
          <div className="flex flex-rows justify-between">
            <h3 className="text-lg font-semibold text-black dark:text-neutral-50">
              Join the discussion
            </h3>
            <Badge
              variant="secondary"
              className="rounded-sm text-xs font-medium w-fit self-start">
              Mechanics
            </Badge>
          </div>
          <CommentInput
            initials="CN"
            onSubmit={(text) => console.log(text)}
          />
        </div>
      </div>
      
      <div className="flex-1">
        <CourseModule
          title="Mechanics"
          completedSections={2}
          totalSections={10}
          totalMinutes={133}
          groups={[
            {
              id: "g1",
              title: "Fluid Statics part 1",
              videosWatched: 2,
              totalVideos: 10,
              percentComplete: 40,
              chapters: [
                {
                  id: "c1",
                  title: "Fluids",
                  videosWatched: 2,
                  totalVideos: 3,
                  percentComplete: 60,
                  lessons: [
                    { id: "l1", title: "Fundamentals", duration: "40m", status: "completed" },
                    { id: "l2", title: "Fundamentals", duration: "40m", status: "playing" },
                    { id: "l3", title: "Fundamentals", duration: "40m", status: "new" },
                  ],
                },
              ],
            },
            {
              id: "g2",
              title: "Fluid Statics part 2",
              videosWatched: 2,
              totalVideos: 15,
              percentComplete: 10,
              chapters: [],
            },
            {
              id: "g3",
              title: "Quantum Mechanics",
              videosWatched: 0,
              totalVideos: 20,
              percentComplete: 0,
              chapters: [],
            },
          ]}
        />
      </div>
    </div>
  );
}