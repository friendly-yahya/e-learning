"use client";

import { LibraryBig, Play, BookOpenText, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type TopicStatus = "In Progress" | "Not Started" | "Completed";

interface Topic {
  id: string;
  title: string;
  description: string;

  status: TopicStatus;
  videoCount: number;
  chapterCount: number;
  hours: number;
  students: string;
}

const TOPICS: Topic[] = [
  {
    id: "quantum-physics",
    title: "Quantum Physics",
    description: "Delve into the principles of quantum mechanics and wave-particle duality",
    status: "Completed",
    videoCount: 50,
    chapterCount: 6,
    hours: 15,
    students: "2K",
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Delve into the world of atoms, molecules, and their interactions",
    status: "In Progress",
    videoCount: 40,
    chapterCount: 5,
    hours: 12,
    students: "1.2K",
  },
  {
    id: "waves",
    title: "Waves",
    description: "Explore the composition, structure, properties, and reactions of matter",
    status: "In Progress",
    videoCount: 40,
    chapterCount: 5,
    hours: 12,
    students: "1.2K",
  },
  {
    id: "atomic-structure",
    title: "Atomic Structure",
    description: "Dive into the molecular dynamics and atomic theory fundamentals",
    status: "Not Started",
    videoCount: 40,
    chapterCount: 5,
    hours: 10,
    students: "980",
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    description: "Understand heat, energy transfer, and the laws governing physical systems",
    status: "Not Started",
    videoCount: 35,
    chapterCount: 4,
    hours: 9,
    students: "750",
  },
];

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

function TopicCard({ topic }: { topic: Topic }) {
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

export default function BrowseTopics() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Browse Topics
        </h1>
        <LibraryBig className="stroke-violet-400 size-8" />
      </div>

      <div className="relative w-full">
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {TOPICS.map((topic) => (
              <CarouselItem key={topic.id} className="pl-4 basis-[28%]">
                <TopicCard topic={topic} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden sm:flex absolute -top-12 right-0 border-zinc-200" />
        </Carousel>
        {/* Right fog effect */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-neutral-950 to-transparent " />
      </div>
    </section>
  );
}