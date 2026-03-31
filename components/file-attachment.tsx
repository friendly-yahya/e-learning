"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileArchive,
  File,
  Link,
  Download,
  LucideIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type FileAttachmentIconType =
  | "pdf"
  | "document"
  | "image"
  | "video"
  | "audio"
  | "code"
  | "archive"
  | "link"
  | "generic";

export type FileAttachmentIconColor =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "cyan"
  | "yellow";

export type FileAttachmentSize = "sm" | "md" | "lg";

export interface FileAttachmentProps {
  /** Display name / title of the file */
  label: string;
  /** Secondary detail line (e.g. file size, date, description) */
  detail?: string;
  /** Which icon variant to show */
  iconType?: FileAttachmentIconType;
  /** Accent color for the icon */
  iconColor?: FileAttachmentIconColor;
  /** Overall size of the component */
  size?: FileAttachmentSize;
  /** Called when the user clicks the download / action button */
  onDownload?: () => void;
  /** Called when the whole row is clicked */
  onClick?: () => void;
  /** Extra Tailwind classes on the root element */
  className?: string;
  /** Disable interactions */
  disabled?: boolean;
}

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<FileAttachmentIconType, LucideIcon> = {
  pdf: FileText,
  document: FileText,
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  code: FileCode,
  archive: FileArchive,
  link: Link,
  generic: File,
};

// ─── Color map ───────────────────────────────────────────────────────────────

const ICON_COLOR_CLASSES: Record<FileAttachmentIconColor, string> = {
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-emerald-500",
  purple: "text-violet-500",
  orange: "text-orange-500",
  cyan: "text-cyan-500",
  yellow: "text-yellow-400",
};

const ICON_BG_CLASSES: Record<FileAttachmentIconColor, string> = {
  red: "bg-red-500/10",
  blue: "bg-blue-500/10",
  green: "bg-emerald-500/10",
  purple: "bg-violet-500/10",
  orange: "bg-orange-500/10",
  cyan: "bg-cyan-500/10",
  yellow: "bg-yellow-400/10",
};

// ─── Size map ────────────────────────────────────────────────────────────────

const SIZE_CONFIG = {
  sm: {
    root: "px-3 py-2.5 gap-2.5 rounded-xl",
    iconWrap: "w-8 h-8 rounded-lg",
    icon: 15,
    label: "text-xs font-semibold",
    detail: "text-[10px]",
    actionIcon: 14,
  },
  md: {
    root: "px-4 py-3.5 gap-3 rounded-2xl",
    iconWrap: "w-10 h-10 rounded-xl",
    icon: 18,
    label: "text-sm font-semibold",
    detail: "text-xs",
    actionIcon: 16,
  },
  lg: {
    root: "px-5 py-4 gap-4 rounded-2xl",
    iconWrap: "w-12 h-12 rounded-xl",
    icon: 22,
    label: "text-base font-semibold",
    detail: "text-sm",
    actionIcon: 18,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function FileAttachment({
  label,
  detail,
  iconType = "generic",
  iconColor = "blue",
  size = "md",
  onDownload,
  onClick,
  className,
  disabled = false,
}: FileAttachmentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  const Icon = ICON_MAP[iconType];
  const s = SIZE_CONFIG[size];
  const colorCls = ICON_COLOR_CLASSES[iconColor];
  const bgCls = ICON_BG_CLASSES[iconColor];

  // ── Mount animation ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", clearProps: "transform" }
    );
  }, []);

  // ── Hover: root ──────────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (disabled) return;
    gsap.to(rootRef.current, {
      backgroundColor: "rgba(255,255,255,0.06)",
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(iconWrapRef.current, {
      scale: 1.1,
      duration: 0.25,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    gsap.to(rootRef.current, {
      backgroundColor: "rgba(255,255,255,0.03)",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(iconWrapRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // ── Click: ripple-like press ─────────────────────────────────────────────
  const handleRootClick = () => {
    if (disabled || !onClick) return;
    gsap.timeline()
      .to(rootRef.current, { scale: 0.985, duration: 0.08, ease: "power2.in" })
      .to(rootRef.current, { scale: 1, duration: 0.25, ease: "elastic.out(1.2,0.5)" });
    onClick();
  };

  // ── Download button ──────────────────────────────────────────────────────
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || !onDownload) return;
    gsap.timeline()
      .to(actionRef.current, { scale: 0.8, duration: 0.1, ease: "power2.in" })
      .to(actionRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1.5,0.4)" });
    onDownload();
  };

  return (
    <div
      ref={rootRef}
      role={onClick ? "button" : "listitem"}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => e.key === "Enter" && handleRootClick()}
      onClick={handleRootClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex items-center border border-white/[0.07] transition-colors select-none",
        "bg-white/3",
        s.root,
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      {/* Icon */}
      <div
        ref={iconWrapRef}
        className={cn(
          "flex items-center justify-center shrink-0",
          s.iconWrap
        )}
      >
        <Icon size={s.icon} className={colorCls} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-white truncate leading-tight", s.label)}>{label}</p>
        {detail && (
          <p className={cn("text-white/40 truncate mt-0.5 leading-tight", s.detail)}>
            {detail}
          </p>
        )}
      </div>

      {/* Action */}
      {onDownload && (
        <button
          ref={actionRef}
          onClick={handleDownloadClick}
          aria-label="Download"
          className={cn(
            "shrink-0 flex items-center justify-center",
            "w-8 h-8 rounded-lg text-white/40",
            "hover:text-white hover:bg-white/10 transition-colors"
          )}
        >
          <Download size={s.actionIcon} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}

// ─── Group wrapper (staggered mount) ─────────────────────────────────────────

export interface FileAttachmentGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FileAttachmentGroup({ children, className }: FileAttachmentGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const items = groupRef.current.querySelectorAll(":scope > *");
    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "transform",
      }
    );
  }, []);

  return (
    <div ref={groupRef} className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  );
}