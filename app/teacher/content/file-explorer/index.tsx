"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React, { useState, useMemo, useCallback } from "react"
import { useHistory } from "@/hooks/use-history"
import { useSelection } from "@/hooks/use-selection"
import { useKeyboard } from "@/hooks/use-keyboard"
import { mockSubject } from "@/lib/mock-data"
import { CurrentPath, FileItem, Level, Topic, Chapter, Video } from "@/lib/types"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Toolbar } from "./toolbar"
import { ListView } from "./list-view"
import { GridView } from "./grid-view"

export function FileExplorer() {

    // ============================================================
    // HISTORY — where are we, where have we been
    // ============================================================
    const { current, push, goBack, goForward, canGoForward, canGoBack } = useHistory({ subjectId: mockSubject.id })

    // ============================================================
    // VIEW MODE — list or grid
    // ============================================================
    const [viewMode, setViewMode] = useState<"list" | "grid">("list")

    // ============================================================
    // SUBJECTS — local state wrapping mock data
    // will be replaced by Supabase later
    // ============================================================
    const [subjects, setSubjects] = useState(mockSubject)

    // ============================================================
    // CURRENT ITEMS — what to show based on where we are
    // ============================================================
    const { items, level } = useMemo(() => {
        if (!current.topicId) {
            return { items: subjects.topics as FileItem[], level: "topics" as Level }
        }
        if (!current.chapterId) {
            const topic = subjects.topics.find(t => t.id === current.topicId)
            return { items: (topic?.chapters ?? []) as FileItem[], level: "chapters" as Level }
        }
        const topic = subjects.topics.find(t => t.id === current.topicId)
        const chapter = topic?.chapters.find(c => c.id === current.chapterId)
        return { items: (chapter?.videos ?? []) as FileItem[], level: "videos" as Level }
    }, [current, subjects])

    // ============================================================
    // SELECTION — needs items so it can do shift+click ranges
    // ============================================================
    const { selectedIds, handleClick, selectAll, clearSelection, isSelected } = useSelection(items)

    // ============================================================
    // RENAMING — which item is currently being renamed
    // null means nothing is being renamed
    // ============================================================
    const [renamingId, setRenamingId] = useState<string | null>(null)

    const handleRename = useCallback(() => {
        if (selectedIds.size !== 1) return
        const id = Array.from(selectedIds)[0]
        setRenamingId(id)
    }, [selectedIds])

    // will update DB here later
    const handleRenameConfirm = useCallback((id: string, newName: string) => {
        console.log("rename", id, "to", newName)
        setRenamingId(null)
    }, [])

    const handleRenameCancel = useCallback(() => {
        setRenamingId(null)
    }, [])

    // ============================================================
    // NAVIGATION FUNCTIONS
    // ============================================================
    const handleOpen = useCallback((item: FileItem) => {
        if (level === "topics") {
            push({ subjectId: current.subjectId, topicId: item.id })
        } else if (level === "chapters") {
            push({ subjectId: current.subjectId, topicId: current.topicId, chapterId: item.id })
        }
        // videos don't navigate — they open a player instead
        // we'll handle that later
        clearSelection()
    }, [level, current, push, clearSelection])

    // go up one level — backspace key or back button
    const handleGoUp = useCallback(() => {
        if (current.chapterId) {
            push({ subjectId: current.subjectId, topicId: current.topicId })
        } else if (current.topicId) {
            push({ subjectId: current.subjectId })
        }
        clearSelection()
    }, [current, push, clearSelection])

    // open the currently selected single item (Enter key)
    const handleOpenSelected = useCallback(() => {
        if (selectedIds.size !== 1) return
        const id = Array.from(selectedIds)[0]
        const item = items.find(i => i.id === id)
        if (item) handleOpen(item)
    }, [selectedIds, items, handleOpen])

    // ============================================================
    // DELETE — two paths:
    // 1. toolbar/keyboard → uses selectedIds (bulk)
    // 2. row trash button → uses deleteTargetId (single)
    // ============================================================
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

    // called from toolbar delete button or keyboard Delete key
    const handleDelete = useCallback(() => {
        if (selectedIds.size === 0) return
        setShowDeleteDialog(true)
    }, [selectedIds])

    // called from row trash button — bypasses selection
    const handleDeleteItem = useCallback((id: string) => {
        setDeleteTargetId(id)
        setShowDeleteDialog(true)
    }, [])

    // actual deletion — called when user confirms in dialog
    const handleDeleteConfirm = useCallback(() => {
        const ids = deleteTargetId
            ? [deleteTargetId]        // single item from row button
            : Array.from(selectedIds) // bulk from toolbar/keyboard

        setSubjects(prev => {
            const next = structuredClone(prev)
            // filter out deleted items at all levels
            next.topics = next.topics.filter(t => !ids.includes(t.id))
            for (const topic of next.topics) {
                topic.chapters = topic.chapters.filter(c => !ids.includes(c.id))
                for (const chapter of topic.chapters) {
                    chapter.videos = chapter.videos.filter(v => !ids.includes(v.id))
                }
            }
            return next
        })
        clearSelection()
        setDeleteTargetId(null)
        setShowDeleteDialog(false)
    }, [selectedIds, deleteTargetId, clearSelection])

    // ============================================================
    // DUPLICATE PLACEHOLDER
    // real implementation comes when we wire Supabase
    // ============================================================
    const handleDuplicate = useCallback(() => {
        console.log("duplicate", Array.from(selectedIds))
    }, [selectedIds])

    // ============================================================
    // KEYBOARD — wires all shortcuts to the functions above
    // ============================================================
    useKeyboard({
        onDelete: handleDelete,
        onRename: handleRename,
        onSelectAll: selectAll,
        onClearSelection: clearSelection,
        onGoUp: handleGoUp,
        onGoBack: goBack,
        onGoForward: goForward,
        onDuplicate: handleDuplicate,
        onOpen: handleOpenSelected,
        selectedCount: selectedIds.size,
    })

    // ============================================================
    // BREADCRUMB DATA
    // build the path labels from current path IDs
    // ============================================================
    const breadcrumbItems = useMemo(() => {
        const crumbs = []

        // root is always there
        crumbs.push({
            label: `${subjects.name} ${subjects.level}`,
            onClick: () => {
                push({ subjectId: subjects.id })
                clearSelection()
            },
            isCurrent: !current.topicId,
        })

        // topic level
        if (current.topicId) {
            const topic = subjects.topics.find(t => t.id === current.topicId)
            crumbs.push({
                label: topic?.name ?? "",
                onClick: () => {
                    push({ subjectId: current.subjectId, topicId: current.topicId })
                    clearSelection()
                },
                isCurrent: !current.chapterId,
            })
        }

        // chapter level
        if (current.chapterId) {
            const topic = subjects.topics.find(t => t.id === current.topicId)
            const chapter = topic?.chapters.find(c => c.id === current.chapterId)
            crumbs.push({
                label: chapter?.name ?? "",
                onClick: () => {}, // already here, clicking does nothing
                isCurrent: true,
            })
        }

        return crumbs
    }, [current, subjects, push, clearSelection])

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div
            className="flex flex-col gap-4 p-6"
            onClick={(e) => {
                // only clear selection when clicking the background,
                // not when clicking a child element
                if (e.target === e.currentTarget) clearSelection()
            }}
        >

            {/* TOOLBAR */}
            <Toolbar
                level={level}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedCount={selectedIds.size}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                onGoBack={goBack}
                onGoForward={goForward}
                onDelete={handleDelete}
            />

            {/* BREADCRUMB */}
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbItems.map((crumb) => (
                        <React.Fragment key={crumb.label}>
                            <BreadcrumbItem>
                                {crumb.isCurrent ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        className="cursor-pointer"
                                        onClick={crumb.onClick}
                                    >
                                        {crumb.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {/* separator only between items, not after the last one */}
                            {!crumb.isCurrent && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            {/* DELETE CONFIRMATION DIALOG */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete {deleteTargetId ? 1 : selectedIds.size}{" "}
                            {(deleteTargetId ? 1 : selectedIds.size) === 1 ? "item" : "items"}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. All content inside will also be deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteTargetId(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* CONTENT — list or grid based on viewMode */}
            {viewMode === "list" ? (
                <ListView
                    items={items}
                    level={level}
                    isSelected={isSelected}
                    onSelect={handleClick}
                    onOpen={handleOpen}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    renamingId={renamingId}
                    onRenameConfirm={handleRenameConfirm}
                    onRenameCancel={handleRenameCancel}
                    onDeleteItem={handleDeleteItem}
                />
            ) : (
                <GridView
                    items={items}
                    level={level}
                    isSelected={isSelected}
                    onSelect={handleClick}
                    onOpen={handleOpen}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    renamingId={renamingId}
                    onRenameConfirm={handleRenameConfirm}
                    onRenameCancel={handleRenameCancel}
                    onDeleteItem={handleDeleteItem}
                />
            )}

        </div>
    )
}