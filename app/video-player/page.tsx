import { Badge } from "@/components/ui/badge";
import { LessonItem } from "@/components/lesson-item";
import { Chapter } from "@/components/chapter";
import { ChapterGroup } from "@/components/chapter-group";
export default function Page() {
  const currentStatus = 'playing';
  return (
    <div className="flex flex-row items-center gap-4 text-center sm:items-start sm:text-left w-full">
      <div className="flex-3 flex flex-col gap-6 min-w-0">
        <div className="mt-4 mb-4 relative w-full aspect-video overflow-hidden rounded-3xl bg-zinc-900">
        </div>
        <div className=" py-5 flex flex-col px-5 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:border-neutral-500-30 dark:bg-neutral-500-5 border gap-6">
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
          <div>
            <h3>Course Materials</h3>
            <div>
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 flex flex-col px-5 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:border-neutral-500-30 dark:bg-neutral-500-5 border gap-6">
          <div className="flex flex-rows justify-between">
            <h3>
              Join the discussion
            </h3>
            <Badge
              variant="secondary"
              className="rounded-sm text-xs font-medium w-fit self-start">
            Mechanics
            </Badge>
          </div>

        </div>
      </div>
      
      <div className="flex-1">
        <ChapterGroup/>
        <Chapter/>
        <LessonItem status="completed"/>
        <LessonItem status="playing"/>
        <LessonItem status="new"/>
      </div>
    </div>
  );
}