import StreakCard from "@/components/ui/streak-card";
import LearningTime from "@/components/ui/learning-time";
import NextTopic from "@/components/next-topic";
import LastWatched from "@/components/last-watched";
import Header from "@/components/header";
import BrowseTopics from "@/components/browse-topics";
import { Sparkles } from "lucide-react";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
      <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 bg-zinc-50 dark:bg-neutral-950 sm:items-start">
        <Header />

        {/* Greeting */}
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left w-full">
          <div className="flex flex-row gap-4 items-center">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Hey Amin!
            </h1>
            <Sparkles className="fill-violet-400 stroke-violet-400" />
          </div>
          <p className="max-w-xl text-xls leading-8 text-zinc-600 dark:text-zinc-400">
            Ready to continue your physics journey? Let's pick up where you left off.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="h-full w-full flex flex-col gap-16">
          <div className="flex h-full w-full gap-6">
            <LastWatched />
            <div className="flex flex-1 flex-col gap-6">
              <NextTopic />
              <LearningTime />
              <StreakCard />
            </div>
          </div>

          <BrowseTopics />
        </div>

      </main>
    </div>
  );
}