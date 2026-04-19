"use client"
import { useHistory } from "@/hooks/use-history"
import { useSelection } from "@/hooks/use-selection"
import { useKeyboard } from "@/hooks/use-keyboard"
import { mockSubject } from "@/lib/mock-data"
import { CurrentPath, FileItem, Level, Topic, Chapter, Video } from "@/lib/types"
import { useState, useMemo, useCallback } from "react"
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
    //
    const { current, push, goBack, goForward, canGoForward, canGoBack } = useHistory({ subjectId: mockSubject.id})
    const [viewMode, setViewMode] = useState<"list" | "grid">("list")
    const { items, level } = useMemo(() => {
        if (!current.topicId) {
            return {
                items: mockSubject.topics as FileItem[],
                level: "topics" as Level,
            }
        }
        if (!current.chapterId) {
            const topic = mockSubject.topics.find(t => t.id === current.topicId)
            return {
                items: (topic?.chapters ?? []) as FileItem[],
                level: "chapters" as Level,
            }
        }
        const topic = mockSubject.topics.find(t => t.id === current.topicId)
        const chapter = topic?.chapters.find(c => c.id === current.chapterId)
        return {
            items: (chapter?.videos ?? []) as FileItem[],
            level: "videos" as Level,  
        }
    }, [current])

    const { selectedIds, handleClick, selectAll, clearSelection, isSelected } = useSelection(items)

    const handleOpen = useCallback((item: FileItem)=>{
        if (level === "topics") {
            push({ subjectId: current.subjectId, topicId: item.id })
        } else if (level === "chapters") {
            push({subjectId: current.subjectId, topicId: current.topicId, chapterId: item.id})
        }
        clearSelection()
    }, [level, current, push, clearSelection])

    const handleGoUp = useCallback(() => {
        if (current.chapterId) {
            push({ subjectId: current.subjectId, topicId: current.topicId })
        } else if (current.topicId) {
            push({ subjectId: current.subjectId })
        }
        clearSelection()
    },[current, push, clearSelection])

    const handleOpenSelected = useCallback(() =>{
        if (selectedIds.size !==1) return
        const id = Array.from(selectedIds)[0]
        const item = items.find(i => i.id === id)
        if (item) handleOpen(item)
    }, [selectedIds, items, handleOpen])
    
    const handleDelete = useCallback(() => {
        console.log("delete", Array.from(selectedIds))
    },[selectedIds])
    const handleRename = useCallback(() => {
        if (selectedIds.size !== 1 ) return
        const id = Array.from(selectedIds)[0]
        console.log("rename", id)
    }, [selectedIds])
    const handleDuplicate = useCallback(() => {
    console.log("duplicate", Array.from(selectedIds))
    }, [selectedIds])
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

    const breadcrumbItems = useMemo(() => {
        const crumbs = []
        crumbs.push({
            label: `${mockSubject.name} ${mockSubject.level}`,
            onClick: () => {
                push({subjectId: mockSubject.id})
                clearSelection()
            },
            isCurrent: !current.topicId,
        })
        if (current.topicId) {
            const topic = mockSubject.topics.find(t => t.id === current.topicId)
            crumbs.push({
                label: topic?.name ?? "",
                onClick: () => {
                    push({ subjectId: current.subjectId, topicId: current.topicId })
                    clearSelection()
                },
                isCurrent: !current.chapterId,
            })
        }
        if (current.chapterId) {
          const topic = mockSubject.topics.find(t => t.id === current.topicId)
          const chapter = topic?.chapters.find(c => c.id === current.chapterId)
          crumbs.push({
            label: chapter?.name ?? "",
            onClick: () => {},   // already here, clicking does nothing
            isCurrent: true,
          })
        }  
        return crumbs      
    }, [current, push, clearSelection])
    return(
        <div className="flex flex-col gap-4 p-6" onClick={() => clearSelection}>
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
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((crumb, i) => (
                  <BreadcrumbItem key={crumb.label}>
                    {crumb.isCurrent ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink
                          className="cursor-pointer"
                          onClick={crumb.onClick}
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>            
            {viewMode === "list" ? (
                <ListView
                  items={items}
                  level={level}
                  isSelected={isSelected}
                  onSelect={handleClick}
                  onOpen={handleOpen}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              ) : (
                <GridView
                  items={items}
                  level={level}
                  isSelected={isSelected}
                  onSelect={handleClick}
                  onOpen={handleOpen}
                />
            )}  
        </div>
    )
}