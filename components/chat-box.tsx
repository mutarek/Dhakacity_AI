"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ChatBoxProps {
  onSubmit?: (message: string) => Promise<void> | void;
  isLoading?: boolean;
}

export function ChatBox({ onSubmit, isLoading = false }: ChatBoxProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSubmit?.(message);
      setMessage("");
    }
  };

  return (
    <Card className="w-full max-w-3xl rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.7)] backdrop-blur-sm md:p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Ask about restaurants, hospitals, or diagnostics..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="h-12 flex-1 text-base"
        />
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="h-12 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 px-8 text-white hover:from-cyan-500 hover:to-emerald-500"
        >
          {isLoading ? "Thinking..." : "Ask"}
        </Button>
      </form>
    </Card>
  );
}
