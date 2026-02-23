import StreakCard from "@/components/ui/streak-card";
import LearningTime from "@/components/ui/learning-time";
import NextTopic from "@/components/next-topic";
import LastWatched from "@/components/last-watched";
import {Card,} from "@/components/ui/card"
import Header from "@/components/header";
import Image from "next/image";
import { Sparkles, LibraryBig } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 container bg-zinc-300 dark:bg-black sm:items-start">
       
        <Header/>
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left w-full">
          <div className="flex flex-row gap-4 items-center ">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
             Hey Amin!
            </h1>
            <Sparkles className="fill-violet-400 stroke-violet-400"/>
          </div>
          <p className="max-w-xl text-xls leading-8 text-zinc-600 dark:text-zinc-400">
              Ready to continue your physics journey? Let's pick up where you left off.
          </p>
        </div>
        <div className="h-full w-full grid grid-rows-3">
          <div className="row-span-2 flex h-full w-full gap-6 ">
            <LastWatched></LastWatched>
            <div className="flex flex-1 flex-col gap-6">
              <NextTopic></NextTopic>
              <LearningTime></LearningTime>
              <StreakCard />
            </div>
          </div>
          <div className="row-span-1">
            <div className="flex flex-row gap-4 items-center ">

            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
             Browse Topics 
            </h1>
            <LibraryBig className="stroke-violet-400 size-8 "/>
          </div>
          <div className="flex flex-col py-8 px-10 min-w-[350px] max-h-[400px] border-zinc-200 rounded-3xl bg-zinc-100 border-1">

            <Card>
            <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                Quantum Physics
            </h2>
            </Card>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
