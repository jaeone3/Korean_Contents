"use client";

import { useState } from "react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/constants";

export default function FakeAudioPlayer({ term }: { term: string }) {
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePlay = () => {
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 2) {
      setShowModal(true);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handlePlay}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition active:scale-95 hover:bg-blue-700"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="font-semibold">Listen to Pronunciation</span>
      </button>

      {clickCount === 1 && (
        <p className="mt-2 animate-pulse text-sm text-gray-500">
          Tap again to hear more examples...
        </p>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75a.75.75 0 01-.75-.75V6a.75.75 0 011.28-.53l4.72 4.72a.75.75 0 010 1.06l-4.72 4.72a.75.75 0 01-.53.22z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Unlock Full Audio
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Download our free app to hear native pronunciation of &ldquo;
              {term}&rdquo; and practice with AI conversation.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-gray-900 py-3 font-bold text-white transition hover:bg-gray-700"
              >
                App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-gray-900 py-3 font-bold text-white transition hover:bg-gray-700"
              >
                Google Play
              </a>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
