import { ChevronDown ,Dot, BookOpen } from "lucide-react"; 


export function ChapterGroup() {
    return(
        <div className="flex flex-row gap-4 items-center justify-start p-4 rounded-xl w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
            <ChevronDown className="size-6"/>
            <div className="p-2"><BookOpen/></div>

            <div className="flex flex-col gap-1">
                <p className="font-medium">Fundamentals</p>
                <div className="flex flex-row items-center gap-0 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>2/3 videos</p>
                    <Dot className="size-4" />
                    <p>60% complete</p>
                </div>
            </div>
        </div>
    );
}