import { Play, BookOpenText, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TopicStatus = "In Progress" | "Not Started" | "Completed";

export interface Topic {
  id: string;
  title: string;
  description: string;
  status: TopicStatus;
  videoCount: number;
  chapterCount: number;
  hours: number;
  students: string;
}

function StatusBadge({ status }: { status: TopicStatus }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-sm text-xs font-medium w-fit",
        status === "In Progress" && "bg-zinc-200 text-zinc-700 hover:bg-zinc-200",
        status === "Completed" && "bg-zinc-800 text-zinc-100 hover:bg-zinc-800",
        status === "Not Started" && "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </Badge>
  );
}

export function TopicCard({ topic }: { topic: Topic }) {
  const isInProgress = topic.status === "In Progress";

  return (
    <Card className="rounded-2xl border border-zinc-200 dark:bg-neutral-500-5 dark:border-neutral-500-30 shadow-sm h-full">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        <h2 className="text-xl font-semibold leading-snug text-zinc-900 dark:text-neutral-50">
          {topic.title}
        </h2>

        <div className="relative w-full h-24 overflow-hidden rounded-xl bg-zinc-800" />

        <p className="text-sm leading-5 text-zinc-500 flex-1">{topic.description}</p>

        <StatusBadge status={topic.status} />

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-xs gap-1 font-normal">
            <Play size={10} /> {topic.videoCount}
          </Badge>
          <Badge variant="outline" className="text-xs gap-1 font-normal">
            <BookOpenText size={10} /> {topic.chapterCount} chapters
          </Badge>
          <Badge variant="outline" className="text-xs gap-1 font-normal">
            <Clock size={10} /> {topic.hours} hours
          </Badge>
          <Badge variant="outline" className="text-xs gap-1 font-normal">
            <User size={10} /> {topic.students}
          </Badge>
        </div>

        <Button
          size="sm"
          className="w-full rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-700 text-white"
        >
          {isInProgress ? "Continue Topic" : "Explore Topic"}
        </Button>
      </CardContent>
    </Card>
  );
}