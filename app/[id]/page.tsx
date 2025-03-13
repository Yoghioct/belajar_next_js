// import { useState } from "react";
// import NavigationBack from "../components/NavigationBack";
"use client";

import { FormEvent, use, useEffect, useState } from "react";
import NavigationBack from "../components/NavigationBack";
import { useRouter } from "next/navigation";

type AyahDetail = {
  nomorAyat: number;
  teksArab: string | null;
  teksLatin: string | null;
  teksIndonesia: string | null;
  surahId: number;
  readAt: Date | null;
  readBy: string | null;
  completedAt: Date | null;
  namaLatin: string | null;
  surah: {
    namaLatin: string;
  };
};

export default function DetailAyah({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  // Directly access id since the component is async
  const { id } = use(params);
  const ayahId = id;
  const router = useRouter();

  const [ayah, setAyah] = useState<AyahDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/ayah/${ayahId}`);
        const data = await res.json();
        setAyah(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ayahId]);

  // Saat pertama kali load, cek localStorage untuk nama pengguna
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    } else {
      setShowPopup(true);
    }
  }, []);

  // Handler untuk menyimpan nama pengguna dari popup
  function handleNameSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem("username", inputName);
      setUsername(inputName);
      setShowPopup(false);
    }
  }

  async function handleSelesaiBaca() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/ayah/${ayahId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completedAt: new Date(),
          readBy: username,
        }),
      });
      if (!res.ok) {
        throw new Error("Gagal mengupdate completed_at");
      }

      // Show success message
      setSuccessMessage("Ayat berhasil dibaca!");

      // Redirect to home after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Your rest of the component logic here

  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 body">
      <div className="w-full max-w-lg bg-teal-50 min-h-screen shadow-lg">
        <NavigationBack />
        <div
          className="flex flex-col justify-between w-full p-4"
          style={{ minHeight: "calc(-60px + 100vh)" }}
        >
          <div>
            {/* Popup untuk memasukkan nama jika belum ada */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg min-w-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Masukkan nama kamu
                  </h2>
                  <form onSubmit={handleNameSubmit}>
                    <input
                      type="text"
                      placeholder="John doe"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="w-full bg-teal-700 hover:bg-teal-900 text-white font-semibold py-2 rounded-full mt-4"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            )}

            <h2 className="text-[22px] text-center mb-12">
              {ayah?.surah?.namaLatin} {ayah?.nomorAyat}
            </h2>
            <p
              className="text-center text-[32px] font-arabic leading-[200%] "
              style={{ unicodeBidi: "isolate", direction: "rtl" }}
            >
              {ayah?.teksArab}
            </p>
            <p className="text-center text-teal-700 mt-5">{ayah?.teksLatin}</p>
            {/* <p className="text-left font-light text-sm text-gray-600 mt-5">
              {ayah?.teksIndonesia}
            </p> */}
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleSelesaiBaca}
              className="w-full bg-teal-700 hover:bg-teal-900 text-white font-semibold my-5 py-3 px-5 rounded-full"
              disabled={loading}
            >
              {loading
                ? "Memproses..."
                : successMessage
                ? successMessage
                : "Selesai Baca"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
