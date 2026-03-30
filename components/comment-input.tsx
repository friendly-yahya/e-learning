"use client";


import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentInputProps {
  initials?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

export function CommentInput({
  initials = "CN",
  placeholder = "Share your thoughts or ask questions...",
  onSubmit,
}: CommentInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div className="flex flex-row gap-3 items-start w-full">
      {/* Avatar */}
      <Avatar className="size-8 mt-1 shrink-0">
        <AvatarFallback className="text-xs font-medium bg-neutral-700 text-neutral-200">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Input + Button */}
      <div className="flex flex-col gap-2 flex-1">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="resize-none bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-500 rounded-xl focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-colors"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="bg-violet-400 hover:bg-violet-500 text-white rounded-xl px-4 gap-2 disabled:opacity-40 transition-colors"
          >
            <Send className="size-3.5" />
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}