import { useEffect } from "react";

type KeyboardOptions = {
    onDelete: () => void
    onRename: () => void
    onSelectAll: () => void
    onClearSelection: () => void
    onGoUp: () => void
    onGoBack: () => void
    onGoForward: () => void
    onDuplicate: () => void
    onOpen: () => void
    selectedCount: number
}

export function useKeyboard({
 onDelete,
 onRename,
 onSelectAll,
 onClearSelection,
 onGoUp,
 onGoBack,
 onGoForward,
 onDuplicate,
 onOpen,
 selectedCount,
}: KeyboardOptions) {
    useEffect(() => {
        function handler(e:KeyboardEvent) {
            const target= e.target as HTMLElement
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
            switch (true) {
                case e.key === "Delete" && selectedCount > 0:
                    e.preventDefault()
                    onDelete
                    break
                case e.key === "F2" && selectedCount === 1:
                    e.preventDefault()
                    onRename()
                    break
                case e.key === "Escape":
                    e.preventDefault()
                    onClearSelection()
                    break
                case e.key === "Enter" && selectedCount === 1:
                    e.preventDefault()
                    onOpen()
                    break
                case e.key === "Backspace":
                    e.preventDefault()
                    onGoUp()
                    break
                case (e.ctrlKey || e.metaKey) && e.key === "a":
                    e.preventDefault()
                    onSelectAll()
                    break
                case (e.ctrlKey || e.metaKey) && e.key === "d" && selectedCount > 0:
                    e.preventDefault()
                    onDuplicate()
                    break
                case e.altKey && e.key === "ArrowLeft":
                    e.preventDefault()
                    onGoBack()
                    break
                case e.altKey && e.key === "ArrowRight":
                    e.preventDefault()
                    onGoForward()
                    break
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown",handler)

    }, [
        onDelete, onRename, onSelectAll, onClearSelection,onGoUp, onGoBack, onGoForward, onDuplicate, onOpen,selectedCount
    ])
}