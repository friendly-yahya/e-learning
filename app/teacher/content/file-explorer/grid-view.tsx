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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,  // ← grid uses this, not vertical
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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

// ============================================================
// SORTABLE CARD — same reason as SortableRow in list-view
// useSortable is a hook, hooks can't be called inside .map()
// each card needs to be its own component
// ============================================================
function SortableCard({
  item,
  level,
  isSelected,
  onSelect,
  onOpen,
  onRename,
  renamingId,
  onRenameConfirm,
  onRenameCancel,
  onDeleteItem,
}: Omit<GridViewProps, "items" | "onReorder" | "onDelete"> & { item: FileItem }) {

  const Icon = itemIcons[level]
  const iconColor = itemColors[level]

  const {
    attributes,
    listeners,    // goes on the whole card — no separate handle in grid view
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={setNodeRef}   // ← dnd-kit tracks this card
          style={style}      // ← applies drag movement
          className={cn(
            "flex flex-col items-center gap-2 p-3 rounded-lg",
            "w-28 cursor-pointer select-none",
            "hover:bg-neutral-800 transition-colors",
            isSelected(item.id)
              ? "bg-purple-600/20 ring-1 ring-purple-500"
              : "bg-transparent",
            // while dragging — lift effect
            // scale up slightly and add shadow to feel "picked up"
            isDragging && "opacity-50 scale-105 shadow-xl z-50"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(item.id, e)
          }}
          onDoubleClick={() => onOpen(item)}
          // accessibility props
          {...attributes}
        >
          {/* ICON + STATUS DOT
              in grid view the whole card is the drag handle
              so listeners go on the icon area */}
          <div
            className="relative cursor-grab active:cursor-grabbing"
            {...listeners}  // ← drag starts from icon area
          >
            <Icon className={cn("size-14", iconColor)} />

            {/* STATUS DOT — small colored dot on top right of icon */}
            <div className={cn(
              "absolute top-0 right-0 size-2.5 rounded-full border-2 border-neutral-900",
              item.status === "published" ? "bg-green-400" : "bg-neutral-500"
            )} />
          </div>

          {/* NAME — swaps to input when renaming */}
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
          Open <ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => {
          onSelect(item.id, {} as React.MouseEvent)
          onRename()
        }}>
          Rename <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => onDeleteItem(item.id)}
          className="text-red-400"
        >
          Delete <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

// ============================================================
// MAIN GRID VIEW
// ============================================================
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
  onReorder,
}: GridViewProps) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex(i => i.id === active.id)
    const newIndex = items.findIndex(i => i.id === over.id)

    const reordered = arrayMove(items, oldIndex, newIndex)
    onReorder(reordered)
  }

  return (
    // DndContext wraps everything
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* rectSortingStrategy is optimized for 2D grids
          it calculates which card you're hovering based on
          the rectangle of each card, not just vertical position */}
      <SortableContext
        items={items.map(i => i.id)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-wrap gap-2 p-2">

          {/* EMPTY STATE */}
          {items.length === 0 && (
            <div className="w-full text-center text-neutral-500 py-12">
              No {level} yet. Create one to get started.
            </div>
          )}

          {items.map((item) => (
            <SortableCard
              key={item.id}
              item={item}
              level={level}
              isSelected={isSelected}
              onSelect={onSelect}
              onOpen={onOpen}
              onRename={onRename}
              renamingId={renamingId}
              onRenameConfirm={onRenameConfirm}
              onRenameCancel={onRenameCancel}
              onDeleteItem={onDeleteItem}
            />
          ))}

        </div>
      </SortableContext>
    </DndContext>
  )
}