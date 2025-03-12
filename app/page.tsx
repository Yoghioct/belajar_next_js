"use client"; // Mark it as a client component

import { useEffect, useState } from "react";

export default function Home() {
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("api/v1/ayah"); // Call API route
        const data = await res.json();

        console.log(data);
        setAyahs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="flex justify-between bg-teal-50 p-4">
              <div className="flex flex-col flex-1 space-y-1.5">
                <ul role="list" className="divide-y divide-gray-100">
                  <li className="flex justify-between items-center gap-x-6 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold text-gray-900">
                          Ar Rum
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
