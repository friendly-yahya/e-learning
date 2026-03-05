import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning",
  description: "E-Learning App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950">
            <main className="flex min-h-screen w-full container flex-col items-center gap-16 py-8 bg-zinc-50 dark:bg-neutral-950 sm:items-start">
              <Header />
              {children} {/* ← each page's content goes here */}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}