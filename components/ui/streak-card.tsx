import { Flame, Check } from "lucide-react";

type DayStatus = "completed" | "partial" | "missed" | "upcoming";

interface StreakDay {
  label: string;
  status: DayStatus;
}

interface StreakCardProps {
  streakCount?: number;
  days?: StreakDay[];
  message?: string;
}

const statusStyles: Record<DayStatus, string> = {
  completed: "bg-black",
  partial: "bg-zinc-600",
  missed: "bg-zinc-300",
  upcoming: "bg-zinc-300",
};

const DEFAULT_DAYS: StreakDay[] = [
  { label: "M", status: "completed" },
  { label: "T", status: "completed" },
  { label: "W", status: "completed" },
  { label: "T", status: "completed" },
  { label: "F", status: "partial" },
  { label: "S", status: "upcoming" },
  { label: "S", status: "upcoming" },
];

function DayBadge({ label, status }: StreakDay) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h3 className="text-xl font-semibold leading-10 tracking-tight text-black">
        {label}
      </h3>
      <div className={`flex justify-center items-center w-8 h-8 rounded-full ${statusStyles[status]}`}>
        <Check className="stroke-zinc-100 size-4" />
      </div>
    </div>
  );
}

export default function StreakCard({
  streakCount = 33,
  days = DEFAULT_DAYS,
  message = "Every day, every hour counts. Come back soon!",
}: StreakCardProps) {
  return (
    <div className="flex flex-3 flex-col border-zinc-200 rounded-3xl bg-zinc-100 border-1 justify-between items-start py-8 px-10">
      <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black">
        Your Streak
      </h2>
      <div>
        <div className="flex flex-row items-center gap-2">
          <Flame className="fill-black stroke-black size-10" />
          <h1 className="text-4xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {streakCount} Days
          </h1>
        </div>
        <p className="my-4 mx-2">{message}</p>
        <div className="flex flex-row gap-4">
          {days.map((day, index) => (
            <DayBadge key={index} {...day} />
          ))}
        </div>
      </div>
    </div>
  );
}