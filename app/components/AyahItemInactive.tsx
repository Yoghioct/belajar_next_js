// "use client";
// "use server";

type Ayah = {
  id: number;
  nomorAyat: number;
  readAt: string | null;
  readBy: string | null;
  surahName: string;
};

export default function AyahItemInactive({ ayah }: { ayah: Ayah }) {
  return (
    <>
      <div className="group flex justify-between items-center bg-white rounded-full border border-gray-400 my-3 py-3 px-5">
        <p className="text-sm font-semibold text-gray-400">
          {ayah.surahName} - <span>Ayat {ayah.nomorAyat}</span>
        </p>
        <p className="text-xs font-medium text-gray-400">Sudah terbaca</p>
      </div>
    </>
  );
}
