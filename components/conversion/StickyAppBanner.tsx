"use client";

import { useState } from "react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/constants";

export default function StickyAppBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/90 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
          한
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-gray-900">
            Learn Korean - AI Tutor
          </p>
          <p className="text-xs text-gray-500">
            10,000+ words with native voice
          </p>
        </div>

        <div className="flex shrink-0 gap-1.5">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 hover:bg-gray-700"
          >
            iOS
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 hover:bg-gray-700"
          >
            Android
          </a>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss banner"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
