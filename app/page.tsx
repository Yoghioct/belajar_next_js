"use client"; // Mark it as a client component

import { useEffect, useState } from "react";

export default function Home() {
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/v1/quran"); // Call API route
        const data = await res.json();
        setAyahs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-2xl font-bold text-center my-4">
          Al-Qur&apos;an Ayahs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {ayahs.map((ayah: any) => (
            <div
              key={ayah.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">
                Surah {ayah.id_sura}, Ayah {ayah.id_verse}
              </h2>
              <p className="text-right text-2xl font-arabic my-2">
                {ayah.text_ayah}
              </p>
              <p className="text-gray-600 italic">"{ayah.text_read}"</p>
              <p className="text-gray-800">{ayah.text_indo}</p>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}
