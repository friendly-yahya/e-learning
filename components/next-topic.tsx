import { Zap, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldDescription, } from "@/components/ui/field";
export default function () {
    return(<div className="flex flex-2 flex-col justify-between items-start py-8 px-10 row-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:bg-neutral-500-5 dark:border-neutral-500-30 border-1">
                <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50">
                  Next Topic Preview
                </h2>
                <div className="px-4">
                  <div className="flex-row gap-2 flex items-center">
                    <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50 ">
                      Energy & Work
                    </h3>
                    <Zap className="fill-black stroke-black dark:fill-neutral-50 dark:stroke-neutral-50"/>
                  </div>
                  <FieldDescription>
                    “Discover how energy powers everything!”
                  </FieldDescription>
                </div>
                <Button className="w-full">Explore Topic</Button>
              </div>
              )
}