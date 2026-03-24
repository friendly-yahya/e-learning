import { Badge } from "@/components/ui/badge";
import { Play, Check, Dot } from "lucide-react"; // Added Dot import

type Status = 'playing' | 'completed' | 'new';

interface LessonItemProps {
    status: Status;
}

const statusConfig = {
    playing: {
        icon: Play,
        iconContainer: 'bg-violet-400 border-2 border-violet-400',
        iconColor:'',
        lessonContainer: 'bg-neutral-900 border border-neutral-800',
        iconStrokeWidth: '',
    },
    new: {
        icon: Play,
        iconContainer: 'bg-transparent border-2 border-neutral-200 dark:border-neutral-700',
        lessonContainer: 'border-transparent bg-transparent',
        iconColor:'',
        iconStrokeWidth: '',
    },
    completed: {
        icon: Check,
        iconContainer: 'bg-transparent border-2 border-violet-400',
        lessonContainer: 'border-transparent bg-transparent',
        iconColor: 'text-violet-400',
        iconStrokeWidth: 3,
    }
}

export function LessonItem({ status }: LessonItemProps) {
    const { 
        icon: Icon, 
        iconContainer, 
        lessonContainer,
        iconColor,
        iconStrokeWidth,
    } = statusConfig[status];
    
    return (
        <div className={`flex flex-row gap-4 items-center justify-start p-4 rounded-xl w-full ${lessonContainer} hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer`}>
            <div className={`p-2 rounded-full ${iconContainer}`}>
                <Icon className={`size-4 ${iconColor}`} strokeWidth={`${iconStrokeWidth}`}/>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-medium">Fundamentals</p>
                <div className="flex flex-row items-center gap-0 text-sm text-neutral-600 dark:text-neutral-400">
                    <Badge 
                        variant={status === 'playing' ? "default" : "secondary"} 
                        className="rounded-md text-xs"
                    >
                        {status === 'playing' ? 'Now playing' : status === 'completed' ? 'Completed' : 'Not started'}
                    </Badge>
                    <Dot className="size-4" />
                    <p>40m</p>
                </div>
            </div>
        </div>
    );
}