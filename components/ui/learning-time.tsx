import { Timer } from "lucide-react";
export default function () {
    return (<div className="flex flex-col flex-1 border-zinc-200 rounded-3xl bg-zinc-100 border-1 justify-between items-start py-8 px-10">
                    <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">Your Learning Time</h2>
                    <div className="flex-row items-center gap-2 flex ">
                        <Timer className="stroke-black size-10"/>
                        <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                          2.5 Hours
                        </h1>
                        
                    </div>
                  </div>
    )
}