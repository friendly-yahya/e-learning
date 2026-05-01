"use client"
import { RenameInput } from "./rename-input"
import { FileItem, Level } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  BookOpen,
  Video,
  Pencil,
  Trash2,
  GripVertical,
} from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"

type ListViewProps = {
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
}

// icon per level — topics look like folders, chapters like books, videos like videos
const itemIcons = {
  topics: Folder,
  chapters: BookOpen,
  videos: Video,
}

// what the count column shows per level
function getCount(item: any, level: Level) {
  if (level === "topics") return `${item.chapters?.length ?? 0} chapters`
  if (level === "chapters") return `${item.videos?.length ?? 0} videos`
  if (level === "videos") {
    const mins = Math.floor(item.duration / 60)
    return `${mins} min`
  }
}

export function ListView({
  items,
  level,
  isSelected,
  onSelect,
  onOpen,
  onDelete,
  onRename,
  renamingId,          
  onRenameConfirm,     
  onRenameCancel
}: ListViewProps) {

  const Icon = itemIcons[level]

  return (
    <div className="rounded-lg border border-neutral-800 overflow-hidden">
      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="border-b border-neutral-800 text-neutral-400">
          <tr>
            <th className="w-8 p-3" />
            <th className="w-8 p-3" />
            <th className="text-left p-3 font-medium">Name</th>
            <th className="text-left p-3 font-medium">Type</th>
            <th className="text-left p-3 font-medium">Status</th>
            <th className="text-left p-3 font-medium">
              {level === "videos" ? "Duration" : level === "topics" ? "Chapters" : "Videos"}
            </th>
            <th className="text-left p-3 font-medium">Actions</th>
          </tr>
        </thead>

        {/* ROWS */}
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-neutral-500 py-12">
                No {level} yet. Create one to get started.
              </td>
            </tr>
          )}

          {items.map((item) => (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <tr
                  className={cn(
                    "border-b border-neutral-800 cursor-pointer transition-colors",
                    "hover:bg-neutral-900",
                    isSelected(item.id) && "bg-purple-600/20 hover:bg-purple-600/30"
                  )}
                  // single click → select
                  onClick={(e) => {
                    e.stopPropagation() // prevents clearing selection from parent div
                    onSelect(item.id, e)
                  }}
                  // double click → enter/open
                  onDoubleClick={() => onOpen(item)}
                >
                  {/* DRAG HANDLE — visible on hover */}
                  <td className="p-3 text-neutral-600 hover:text-neutral-400">
                    <GripVertical className="size-4" />
                  </td>

                  {/* CHECKBOX */}
                  <td className="p-3">
                    <Checkbox
                      checked={isSelected(item.id)}
                      // stopPropagation so clicking checkbox
                      // doesn't also trigger the row onClick
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => {
                        onSelect(item.id, { ctrlKey: true } as React.MouseEvent)
                      }}
                      className="border-neutral-600"
                    />
                  </td>

                  {/* NAME + ICON */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        "size-5 shrink-0",
                        level === "topics" && "text-purple-400",
                        level === "chapters" && "text-blue-400",
                        level === "videos" && "text-zinc-400",
                      )} />

                      {/* swap between text and input based on renamingId */}
                      {renamingId === item.id ? (
                        <RenameInput
                          initialValue={item.name}
                          onConfirm={(newName) => onRenameConfirm(item.id, newName)}
                          onCancel={onRenameCancel}
                        />
                      ) : (
                        <span className="font-medium text-white">{item.name}</span>
                      )}
                    </div>
                  </td>

                  {/* TYPE BADGE */}
                  <td className="p-3 text-neutral-400 capitalize">
                    {/* slice removes the last "s" — "topics" → "topic" */}
                    {level.slice(0, -1)}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="p-3">
                    <Badge
                      className={cn(
                        "capitalize",
                        item.status === "published"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                          : "bg-neutral-500/20 text-neutral-400 hover:bg-neutral-500/20"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </td>

                  {/* COUNT */}
                  <td className="p-3 text-neutral-400">
                    {getCount(item, level)}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-neutral-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRename()
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-neutral-400 hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete()
                        }}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </ContextMenuTrigger>

              {/* RIGHT CLICK MENU */}
              <ContextMenuContent className="w-48">
                <ContextMenuItem onSelect={() => onOpen(item)}>
                  Open
                  <ContextMenuShortcut>↵</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onSelect={onRename}>
                  Rename
                  <ContextMenuShortcut>F2</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onSelect={onDelete} className="text-red-400">
                  Delete
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </tbody>
      </table>
    </div>
  )
}