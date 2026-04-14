import Header from "@/components/header";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
      <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 bg-zinc-50 dark:bg-neutral-950 sm:items-start">
        <Header />
        {children}
      </main>
    </div>
  );
}