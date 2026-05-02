"use client"
import { RenameInput } from "./rename-input"
import { FileItem, Level } from "@/lib/types"
import { Folder, BookOpen, Video } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"

type GridViewProps = {
  items: FileItem[]
  level: Level
  isSelected: (id: string) => boolean
  onSelect: (id: string, event: React.MouseEvent) => void
  onOpen: (item: FileItem) => void
  onDelete: () => void
  onRename: () => void
  renamingId: string | null
  onRenameConfirm: (id: string, newName: string) => void
  onRenameCancel: () => void
  onDeleteItem: (id: string) => void
  onReorder: (reorderedItems: FileItem[]) => void
}

const itemIcons = {
  topics: Folder,
  chapters: BookOpen,
  videos: Video,
}

const itemColors = {
  topics: "text-purple-400",
  chapters: "text-blue-400",
  videos: "text-neutral-400",
}

export function GridView({
  items,
  level,
  isSelected,
  onSelect,
  onOpen,
  onDelete,
  onRename,
  renamingId,
  onRenameConfirm,
  onRenameCancel,
  onDeleteItem,
}: GridViewProps) {

  const Icon = itemIcons[level]
  const iconColor = itemColors[level]

  return (
    <div className="flex flex-wrap gap-2 p-2">

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="w-full text-center text-neutral-500 py-12">
          No {level} yet. Create one to get started.
        </div>
      )}

      {items.map((item) => (
        <ContextMenu key={item.id}>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg",
                "w-28 cursor-pointer select-none",
                "hover:bg-neutral-800 transition-colors",
                isSelected(item.id)
                  ? "bg-purple-600/20 ring-1 ring-purple-500"
                  : "bg-transparent"
              )}
              // single click → select
              onClick={(e) => {
                e.stopPropagation()
                onSelect(item.id, e)
              }}
              // double click → open
              onDoubleClick={() => onOpen(item)}
            >
              {/* ICON — big, centered */}
              <div className="relative">
                <Icon className={cn("size-14", iconColor)} />

                {/* STATUS DOT */}
                <div className={cn(
                  "absolute top-0 right-0 size-2.5 rounded-full border-2 border-neutral-900",
                  item.status === "published" ? "bg-green-400" : "bg-neutral-500"
                )} />
              </div>

              {/* NAME — swap to input when renaming */}
              {renamingId === item.id ? (
                <RenameInput
                  initialValue={item.name}
                  onConfirm={(newName) => onRenameConfirm(item.id, newName)}
                  onCancel={onRenameCancel}
                />
              ) : (
                <span className="text-xs text-center text-white leading-tight line-clamp-2 w-full">
                  {item.name}
                </span>
              )}

              {/* TYPE LABEL */}
              <span className="text-[10px] text-neutral-500 capitalize">
                {level.slice(0, -1)}
              </span>

            </div>
          </ContextMenuTrigger>

          {/* RIGHT CLICK MENU */}
          <ContextMenuContent className="w-48">
            <ContextMenuItem onSelect={() => onOpen(item)}>
              Open
              <ContextMenuShortcut>↵</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => {
              // select first so onRename can find it in selectedIds
              onSelect(item.id, {} as React.MouseEvent)
              onRename()
            }}>
              Rename
              <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            {/* use onDeleteItem, not onDelete — bypasses selectedIds check */}
            <ContextMenuItem onSelect={() => onDeleteItem(item.id)} className="text-red-400">
              Delete
              <ContextMenuShortcut>⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}

    </div>
  )
}