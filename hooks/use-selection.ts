/* 
Plain click       → [A, B, C, D]  click C    → selected: [C]
Ctrl+click        → [A, B, C, D]  ctrl+C     → selected: [A, C]  (A was already selected)
Shift+click       → [A, B, C, D]  shift+D    → selected: [C, D]  (C was last clicked)
Ctrl+A            → [A, B, C, D]             → selected: [A, B, C, D]
Click empty space → [A, B, C, D]             → selected: []
*/
//NOTES FOR FUTURE SELF
  // a Set is like an array but:
  // 1. no duplicates ever
  // 2. faster to check if something is in it
  // perfect for selected IDs

import React, { useState } from "react";

export function useSelection(items: { id: string }[]) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [lastClickedId, setLastClickedId] = useState<string | null>(null)
    function handleClick(id: string, event: React.MouseEvent) {
        if (event.ctrlKey || event.metaKey) {
            setSelectedIds(prev => {
                const next = new Set(prev)
                if (next.has(id)) {
                    next.delete(id)     
                } else {
                    next.add(id)
                }
                return next
            })
        } else if (event.shiftKey && lastClickedId) {
            
            const ids = items.map(item => item.id)
            const lastIndex = ids.indexOf(lastClickedId)
            const currentIndex = ids.indexOf(id)
            const start = Math.min(lastIndex, currentIndex)
            const end = Math.max(lastIndex, currentIndex)
            const rangeIds = ids.slice(start, end + 1)
            setSelectedIds(new Set(rangeIds))
        } else {
            setSelectedIds(new Set([id]))
        }
        setLastClickedId(id)
    }

    function selectAll() {
        setSelectedIds(new Set(items.map(item => item.id)))
    }

    function clearSelection() {
        setSelectedIds(new Set())
        setLastClickedId(null)
    }
    function isSelected(id: string) {
        return selectedIds.has(id)
    }

    return {
        selectedIds,
        handleClick,
        selectAll,
        clearSelection,
        isSelected,
    }
}