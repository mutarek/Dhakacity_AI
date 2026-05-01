"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl overflow-hidden rounded-xl shadow-xl">
      <div className="flex flex-1 items-center gap-3 bg-white px-4 min-w-0">
        <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Ask anything… biryani, hospitals, pharmacy…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          className="w-full py-4 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="shrink-0 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:bg-gray-300 px-6 py-4 text-sm font-bold text-white transition-colors"
      >
        {isLoading ? "…" : "Ask AI"}
      </button>
    </form>
  );
}
