"use client";

import { useState, useEffect, useRef } from "react";
import AyahItemActive from "./AyahItemActive";
import AyahItemInactive from "./AyahItemInactive";
import Link from "next/link";

type Ayah = {
  id: number;
  nomorAyat: number;
  readAt: string | null;
  readBy: string | null;
  surahName: string;
};

export default function AyahTabs() {
  const [activeTab, setActiveTab] = useState<"all" | "completed">("all");
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // Set the pageSize used for pagination; should match your API's default pageSize.
  const pageSize = 100;

  // Whenever the active tab changes, reset pagination and data
  useEffect(() => {
    setAyahs([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab]);

  useEffect(() => {
    async function fetchData() {
      if (!hasMore) return;
      setLoading(true);
      try {
        // Adjust your API endpoint to support pagination
        const endpoint =
          activeTab === "all"
            ? `/api/v1/ayah?page=${page}`
            : `/api/v1/ayah?status=completed&page=${page}`;
        const res = await fetch(endpoint);
        const data: Ayah[] = await res.json();

        // If the number of items returned is less than the pageSize, there's no more data.
        if (data.length < pageSize) {
          setHasMore(false);
        }

        if (data.length === 0 && page === 1) {
          setAyahs([]);
        } else {
          setAyahs((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab, page, hasMore]);

  // Intersection Observer to detect when to load more data
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // If the observer element is visible and there is more data, increment the page number
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <>
      <div className="text-xs font-medium text-center text-gray-400 mb-5">
        <ul className="flex flex-wrap -mb-px space-x-4">
          <li>
            <button
              onClick={() => setActiveTab("all")}
              className={`inline-block py-1 border-b-2 rounded-t-lg transition-colors duration-300 ${
                activeTab === "all"
                  ? "text-teal-700 font-bold border-teal-700"
                  : "border-transparent"
              }`}
            >
              Ayat yang belum terbaca
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("completed")}
              className={`inline-block py-1 border-b-2 rounded-t-lg transition-colors duration-300 ${
                activeTab === "completed"
                  ? "text-teal-700 font-bold border-teal-700"
                  : "border-transparent"
              }`}
            >
              Semua ayat
            </button>
          </li>
        </ul>
      </div>
      <div>
        {ayahs.length === 0 && !loading ? (
          <p>Tidak ada data</p>
        ) : (
          <ul>
            {ayahs.map((ayah) =>
              activeTab === "all" ? (
                <Link key={ayah.id} href={`/${ayah.id}`}>
                  <AyahItemActive ayah={ayah} />
                </Link>
              ) : (
                <AyahItemInactive key={ayah.id} ayah={ayah} />
              )
            )}
          </ul>
        )}
        {loading && <p>Memuat...</p>}
        {/* This empty div is observed by IntersectionObserver */}
        <div ref={observerRef} />
      </div>
    </>
  );
}
