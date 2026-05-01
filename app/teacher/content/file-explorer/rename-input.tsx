"use client"

import { useState, useEffect, useRef } from "react"

type RenameInputProps = {
  initialValue: string
  onConfirm: (value: string) => void
  onCancel: () => void
}

export function RenameInput({ initialValue, onConfirm, onCancel }: RenameInputProps) {

  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // focus and select all text on mount
    // so user can just start typing the new name immediately
    // without having to manually select the old name
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    // stop ALL keyboard events from bubbling up
    // without this, pressing Delete while typing would
    // trigger the delete shortcut in use-keyboard.ts
    e.stopPropagation()

    if (e.key === "Enter") {
      if (value.trim()) {
        onConfirm(value.trim())
      }
    }

    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      // click outside = confirm
      onBlur={() => {
        if (value.trim()) {
          onConfirm(value.trim())
        } else {
          onCancel()
        }
      }}
      className="
        bg-neutral-800 text-white text-sm
        border border-purple-500 rounded px-2 py-0.5
        outline-none w-full
      "
    />
  )
}