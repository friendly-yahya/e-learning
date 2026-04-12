"use client";

import { useRef } from "react";
import { Dot } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface KeyTakeawaysProps {
  items: string[];
}

function TakeawayItem({ item }: { item: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGSVGElement>(null);

  // Mount animation
  useGSAP(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", clearProps: "transform" }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(rootRef.current, {
      backgroundColor: "rgba(245,158,11,0.08)",
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      scale: 1.3,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(rootRef.current, {
      backgroundColor: "rgba(245,158,11,0.05)",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-row items-start gap-2 p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 cursor-default transition-colors"
    >
      <Dot ref={dotRef} className="size-5 text-neutral-200 shrink-0 mt-0.5" />
      <p className="text-sm text-neutral-200 leading-relaxed">{item}</p>
    </div>
  );
}


export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <TakeawayItem key={index} item={item} />
      ))}
    </div>
  );
}