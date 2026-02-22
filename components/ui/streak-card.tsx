import { Flame, Check, } from "lucide-react";

export default function StreakCard () {
    return (
        <div className="flex flex-3 flex-col border-zinc-200 rounded-3xl bg-zinc-100 border-1 justify-between items-start py-8 px-10">
    <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">Your Streak</h2>
    <div>
      <div className="flex-row items-center gap-2 flex ">
        <Flame className="fill-black stroke-black size-10"/>
        <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          33 Days
        </h1>
      </div>
      <p className="my-4 mx-2">
        Every day, Every hour counts. Come back soon!
      </p>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">M</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">T</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">W</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-black rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">T</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-zinc-800 rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">F</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-zinc-700 rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">S</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-zinc-600 rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black">S</h3>
          <div className="flex justify-center items-center w-8 h-8  bg-zinc-500 rounded-full">
            <Check className="stroke-zinc-100 size-4"/>
          </div>
        </div>
      </div>
    </div>
</div>
    )
}