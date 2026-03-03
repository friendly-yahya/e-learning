import {
  Field,
  FieldDescription,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function () {
    return( <div className=" py-8 flex flex-col flex-[2] px-10 col-span-2 border-zinc-200 rounded-3xl bg-zinc-100 dark:border-neutral-500-30 dark:bg-neutral-500-5 border-1">
              <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50">
                Last Course Watched
              </h2>
              <div className="mt-4 mb-4 relative w-full aspect-video overflow-hidden rounded-3xl bg-zinc-900">
              </div>
              <h3 className="max-w-xs text-xl font-semibold leading-10 tracking-tight text-black dark:text-neutral-50">
                Motion & Forces 
              </h3>
              <Field>
                <FieldDescription>
                  Video 2 of 8 • Understanding Acceleration
                </FieldDescription>
                <Progress value={25}/>
                <FieldDescription>
                  25% complete
                </FieldDescription>
                <Button className="w-full">Continue Learning</Button>

              </Field>
            </div>
            )
}