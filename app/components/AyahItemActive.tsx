// "use client";
// "use server";

type Ayah = {
  id: number;
  nomorAyat: number;
  readAt: string | null;
  readBy: string | null;
  surahName: string;
};

export default function AyahItemActive({ ayah }: { ayah: Ayah }) {
  return (
    <>
      <div className="group flex justify-between items-center bg-white rounded-full border border-teal-500 my-3 py-3 px-5 hover:border-teal-700 transition-colors duration-300 ease-in-out">
        <p className="text-sm font-semibold text-gray-900">
          {ayah.surahName} - <span>Ayat {ayah.nomorAyat}</span>
        </p>
        <svg
          className="h-6 w-6 text-teal-500 group-hover:text-teal-700 transition-colors duration-300 ease-in-out"
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
    </>
  );
}
