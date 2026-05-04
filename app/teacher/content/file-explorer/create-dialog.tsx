"use client"

import { useState, useEffect } from "react"
import { Level } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CreateDialogProps = {
  open: boolean
  level: Level
  onClose: () => void
  onCreate: (data: CreateData) => void
}

// the data shape differs per level
// name is always required
// description is for topics and chapters
// url and duration are for videos
export type CreateData = {
  name: string
  description?: string
  url?: string
  duration?: number
}

// dialog title and fields change per level
const config = {
  topics: {
    title: "New Topic",
    showDescription: true,
    showVideo: false,
  },
  chapters: {
    title: "New Chapter",
    showDescription: true,
    showVideo: false,
  },
  videos: {
    title: "New Video",
    showDescription: false,
    showVideo: true,
  },
}

export function CreateDialog({ open, level, onClose, onCreate }: CreateDialogProps) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  const { title, showDescription, showVideo } = config[level]

  // reset fields every time dialog opens
  // without this the previous values would still be there
  useEffect(() => {
    if (open) {
      setName("")
      setDescription("")
      setUrl("")
    }
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    // prevent browser from reloading the page on form submit
    e.preventDefault()

    // don't submit if name is empty
    if (!name.trim()) return

    onCreate({
      name: name.trim(),
      description: description.trim() || undefined,
      url: url.trim() || undefined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* form so pressing Enter submits naturally */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NAME — always shown */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                level === "topics" ? "e.g. Fluid Mechanics"
                : level === "chapters" ? "e.g. Fluid Statics part 1"
                : "e.g. Introduction to Fluids"
              }
              // auto focus so user can start typing immediately
              autoFocus
            />
          </div>

          {/* DESCRIPTION — topics and chapters only */}
          {showDescription && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">
                Description
                <span className="text-neutral-500 text-xs ml-1">(optional)</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what this covers..."
                rows={3}
              />
            </div>
          )}

          {/* VIDEO URL — videos only */}
          {showVideo && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">
                Video URL
                <span className="text-neutral-500 text-xs ml-1">(optional for now)</span>
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              // disabled if name is empty
              disabled={!name.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}