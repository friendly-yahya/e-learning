import { Dot } from "lucide-react";
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
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    description: "Explore electric fields, magnetic forces, and Maxwell's equations",
    status: "Not Started",
    videoCount: 45,
    chapterCount: 6,
    hours: 13,
    students: "1.1K",
  },
  {
    id: "classical-mechanics",
    title: "Classical Mechanics",
    description: "Master Newton's laws, motion, forces, and the foundations of physics",
    status: "Not Started",
    videoCount: 55,
    chapterCount: 7,
    hours: 16,
    students: "3.4K",
  },
  {
    id: "optics",
    title: "Optics",
    description: "Study the behavior of light, lenses, mirrors, and optical phenomena",
    status: "Not Started",
    videoCount: 30,
    chapterCount: 4,
    hours: 8,
    students: "870",
  },
  {
    id: "relativity",
    title: "Special Relativity",
    description: "Understand Einstein's theory of space, time, and the speed of light",
    status: "Not Started",
    videoCount: 28,
    chapterCount: 4,
    hours: 8,
    students: "1.5K",
  },
  {
    id: "nuclear-physics",
    title: "Nuclear Physics",
    description: "Investigate radioactive decay, fission, fusion, and nuclear forces",
    status: "Not Started",
    videoCount: 32,
    chapterCount: 5,
    hours: 10,
    students: "640",
  },
  {
    id: "fluid-mechanics",
    title: "Fluid Mechanics",
    description: "Analyze the behavior of liquids and gases under various conditions",
    status: "Not Started",
    videoCount: 38,
    chapterCount: 5,
    hours: 11,
    students: "720",
  },
  {
    id: "astrophysics",
    title: "Astrophysics",
    description: "Journey through stars, black holes, galaxies, and the cosmos",
    status: "Not Started",
    videoCount: 42,
    chapterCount: 6,
    hours: 14,
    students: "2.8K",
  },
];


export default function Page() {
  return (
    <div className="flex flex-col self-center">
      <div className="flex flex-col self-center mb-6">
        <h1 className=" text-4xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50 self-center">
          Explore Physics Topics
        </h1>
        <div className="flex flex-row items-center justify-center gap-0 text-neutral-400 ">
              <span> 6 Topics available</span>
              <Dot className="size-8" />
              <span>Choose your learning path</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl self-center">
        {TOPICS.map((topic)=>
          <TopicCard key={topic.id} topic={topic}/> 
        )}
      </div>
    </div>
  );
}