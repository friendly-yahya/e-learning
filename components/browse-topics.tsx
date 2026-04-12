"use client";

import { LibraryBig } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { TopicCard, type Topic } from "@/components/topic-card";

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
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-zinc-50 dark:from-neutral-950 to-transparent" />
      </div>
    </section>
  );
}