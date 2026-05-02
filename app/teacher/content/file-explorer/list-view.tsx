"use client"

import { RenameInput } from "./rename-input"
import { FileItem, Level } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Folder, BookOpen, Video, Pencil, Trash2, GripVertical } from "lucide-react"
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
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"  // ← correct import

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
  onDeleteItem: (id: string) => void
  onReorder: (reorderedItems: FileItem[]) => void
}

const itemIcons = {
  topics: Folder,
  chapters: BookOpen,
  videos: Video,
}

function getCount(item: any, level: Level) {
  if (level === "topics") return `${item.chapters?.length ?? 0} chapters`
  if (level === "chapters") return `${item.videos?.length ?? 0} videos`
  if (level === "videos") {
    const mins = Math.floor(item.duration / 60)
    return `${mins} min`
  }
}

// ============================================================
// SORTABLE ROW — separate component because useSortable
// is a hook and hooks can only be called inside components
// if we put this inside ListView's .map() it would crash
// each row needs its own hook instance
// ============================================================
function SortableRow({
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
}: Omit<ListViewProps, "items" | "onReorder" | "onDelete"> & { item: FileItem }) {

  const Icon = itemIcons[level]

  // useSortable gives this specific row drag superpowers
  // id must match what's in SortableContext items array
  const {
    attributes,   // accessibility props like aria-roledescription
    listeners,    // mouse/touch/keyboard events that START the drag
    setNodeRef,   // attach this to the DOM element you want draggable
    transform,    // x/y offset while dragging
    transition,   // smooth animation when other rows shift to make space
    isDragging,   // true while THIS row is being dragged
  } = useSortable({ id: item.id })

  // convert dnd-kit's transform object to a CSS string
  // without this the row wouldn't actually move on screen
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <tr
          ref={setNodeRef}   // ← dnd-kit tracks this element's position
          style={style}      // ← applies the drag movement
          className={cn(
            "border-b border-neutral-800 cursor-pointer transition-colors",
            "hover:bg-neutral-900",
            isSelected(item.id) && "bg-purple-600/20 hover:bg-purple-600/30",
            // dim the row while it's being dragged
            // gives visual feedback that it's "picked up"
            isDragging && "opacity-50 bg-neutral-800"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(item.id, e)
          }}
          onDoubleClick={() => onOpen(item)}
          // accessibility attributes — allows keyboard drag
          {...attributes}
        >

          {/* DRAG HANDLE
              listeners go HERE not on the whole row
              this means ONLY grabbing the grip starts a drag
              clicking anywhere else on the row still just selects it */}
          <td className="p-3 text-neutral-600 hover:text-neutral-400 cursor-grab active:cursor-grabbing">
            <GripVertical
              className="size-4"
              {...listeners}
            />
          </td>

          {/* CHECKBOX */}
          <td className="p-3">
            <Checkbox
              checked={isSelected(item.id)}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={() => {
                // fake a ctrl+click so it toggles without clearing others
                onSelect(item.id, { ctrlKey: true } as React.MouseEvent)
              }}
              className="border-neutral-600"
            />
          </td>

          {/* NAME + ICON
              swaps between plain text and RenameInput when F2 is pressed */}
          <td className="p-3">
            <div className="flex items-center gap-2">
              <Icon className={cn(
                "size-5 shrink-0",
                level === "topics" && "text-purple-400",
                level === "chapters" && "text-blue-400",
                level === "videos" && "text-zinc-400",
              )} />
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

          {/* TYPE — slice removes the "s": "topics" → "topic" */}
          <td className="p-3 text-neutral-400 capitalize">
            {level.slice(0, -1)}
          </td>

          {/* STATUS BADGE */}
          <td className="p-3">
            <Badge className={cn(
              "capitalize",
              item.status === "published"
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                : "bg-neutral-500/20 text-neutral-400 hover:bg-neutral-500/20"
            )}>
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
                  // select first so handleRename in index.tsx
                  // can find this item in selectedIds
                  onSelect(item.id, e)
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
                  // onDeleteItem bypasses selectedIds check
                  // so it works even when this row isn't selected
                  onDeleteItem(item.id)
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
}  // ← SortableRow ends here

// ============================================================
// MAIN LIST VIEW
// DndContext and SortableContext live here
// they wrap all the rows and coordinate the drag
// ============================================================
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
  onRenameCancel,
  onDeleteItem,
  onReorder,
}: ListViewProps) {

  // sensors = how drag is initiated
  // PointerSensor handles mouse and touch
  // KeyboardSensor handles accessibility (space/enter to grab, arrows to move)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // called when user drops a dragged item
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    // over is null if dropped outside the list
    // active.id === over.id means dropped in same spot
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex(i => i.id === active.id)
    const newIndex = items.findIndex(i => i.id === over.id)

    // arrayMove([a,b,c,d], 0, 2) → [b,c,a,d]
    // returns a NEW array, never mutates the original
    const reordered = arrayMove(items, oldIndex, newIndex)
    onReorder(reordered)
  }

  return (
    <div className="rounded-lg border border-neutral-800 overflow-hidden">

      {/* DndContext = the arena that coordinates all drag events
          closestCenter = collision algorithm: 
          "snap to whichever item's center is closest to my cursor" */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full text-sm">

          {/* HEADER — outside SortableContext so it never moves */}
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

          {/* SortableContext = the rulebook
              items must be IDs in the same order as rendered
              strategy = how items animate when reordering
              verticalListSortingStrategy = optimized for vertical lists */}
          <SortableContext
            items={items.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-neutral-500 py-12">
                    No {level} yet. Create one to get started.
                  </td>
                </tr>
              )}

              {/* each item gets its own SortableRow component
                  which internally calls useSortable */}
              {items.map((item) => (
                <SortableRow
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
            </tbody>
          </SortableContext>
        </table>
      </DndContext>
    </div>
  )
}