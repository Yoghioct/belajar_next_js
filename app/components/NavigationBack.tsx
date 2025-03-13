"use client";

import { useRouter } from "next/navigation";

export default function NavigationBack() {
  const router = useRouter();
  return (
    <>
      <div>
        {/* button back */}
        <div className="flex justify-between items-center px-4 py-4 bg-teal-50 ">
          <button
            className="text-sm font-semibold text-gray-900"
            onClick={() => router.back()}
          >
            <svg
              className="h-6 w-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
