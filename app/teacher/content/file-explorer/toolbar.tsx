"use client"

import { Level } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  LayoutList,
  LayoutGrid,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FolderPlus,
  BookPlus,
  FilePlus,
} from "lucide-react"

type ToolbarProps = {
  level: Level
  viewMode: "list" | "grid"
  setViewMode: (mode: "list" | "grid") => void
  selectedCount: number
  canGoBack: boolean
  canGoForward: boolean
  onGoBack: () => void
  onGoForward: () => void
  onDelete: () => void
  onNew: () => void
}

const newButtonConfig = {
  topics: { label: "New Topic", icon: FolderPlus },
  chapters: { label: "New Chapter", icon: BookPlus },
  videos: { label: "New Video", icon: FilePlus },
}

export function Toolbar({
  level,
  viewMode,
  setViewMode,
  selectedCount,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onDelete,
  onNew,
}: ToolbarProps) {

  // grab the right label and icon for current level
  const { label, icon: Icon } = newButtonConfig[level]

  return (
    <div className="flex items-center justify-between gap-2">

      {/* LEFT SIDE — navigation + new + upload */}
      <div className="flex items-center gap-2">

        {/* BACK / FORWARD — disabled when you can't go there */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoBack}
          disabled={!canGoBack}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onGoForward}
          disabled={!canGoForward}
        >
          <ChevronRight className="size-4" />
        </Button>

        {/* NEW BUTTON — label and icon change per level */}
        <Button 
          className="bg-purple-400 hover:bg-purple-500 text-white gap-2"
          onClick={onNew}
        >
          <Icon className="size-4" />
          {label}
        </Button>

        {/* BULK UPLOAD */}
        <Button variant="outline" className="gap-2">
          <Upload className="size-4" />
          Bulk Upload
        </Button>

      </div>

      {/* RIGHT SIDE — bulk actions + view toggle */}
      <div className="flex items-center gap-2">

        {/* DELETE — only appears when something is selected */}
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            className="gap-2"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
            Delete {selectedCount} {selectedCount === 1 ? "item" : "items"}
          </Button>
        )}

        {/* VIEW TOGGLE — list/grid switch */}
        <div className="flex items-center rounded-md border border-neutral-900">
          <Button
            variant="ghost"
            size="icon"
            // active state — purple if current view
            className={viewMode === "list" ? "text-purple-400" : "text-neutral-400"}
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={viewMode === "grid" ? "text-purple-400" : "text-neutral-400"}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="size-4" />
          </Button>
        </div>

      </div>

    </div>
  )
}