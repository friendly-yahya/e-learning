import { Zap, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldDescription, } from "@/components/ui/field";
export default function () {
    return(<div className="flex flex-2 flex-col justify-between items-start py-8 px-10 row-span-2 border-zinc-200 rounded-3xl bg-zinc-100 border-1">
                <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black">
                  Next Topic Preview
                </h2>
                <div className="px-4">
                  <div className="flex-row gap-2 flex items-center">
                    <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black ">
                      Energy & Work
                    </h3>
                    <Zap className="fill-black stroke-black"/>
                  </div>
                  <FieldDescription>
                    “Discover how energy powers everything!”
                  </FieldDescription>
                </div>
                <Button className="w-full">Explore Topic</Button>
              </div>
              )
}