import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE quran_ayah;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE quran_surah;`);
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

    const surasResponse = await fetch("https://equran.id/api/v2/surat");
    const suras = await surasResponse.json();

    for (const sura of suras.data) {
      const createdSura = await prisma.Surah.create({
        data: {
          nomor: sura.nomor,
          nama: sura.nama,
          namaLatin: sura.namaLatin,
          jumlahAyat: sura.jumlahAyat,
          tempatTurun: sura.tempatTurun,
          arti: sura.arti,
          deskripsi: sura.deskripsi,
        },
      });

      const ayahsResponse = await fetch(
        `https://equran.id/api/v2/surat/${sura.nomor}`
      );
      const ayahs = await ayahsResponse.json();
      for (const ayah of ayahs.data.ayat) {
        await prisma.Ayah.create({
          data: {
            nomorAyat: ayah.nomorAyat,
            teksArab: ayah.teksArab,
            teksLatin: ayah.teksLatin,
            teksIndonesia: ayah.teksIndonesia,
            surahId: createdSura.id,
            // readAt: null,
            // readBy: null,
            // completeAt: null,
          },
        });
      }
    }

    return NextResponse.json({ message: "Data Quran Successfully Created" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
