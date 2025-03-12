import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");

  let whereClause = {};
  if (statusParam === "completed") {
    whereClause.completedAt = { not: null };
  } else {
    // Active ayahs: completedAt is null
    whereClause.completedAt = null;
  }

  try {
    const ayahs = await prisma.Ayah.findMany({
      include: {
        surah: {
          select: { nama: true, namaLatin: true },
        },
      },
      where: whereClause,
      take: 10,
      orderBy: { id: "asc" },
    });

    const responseData = ayahs.map((ayah) => ({
      id: ayah.id,
      nomorAyat: ayah.nomorAyat,
      readAt: ayah.readAt,
      readBy: ayah.readBy,
      surahName: ayah.surah.namaLatin,
    }));

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(error);
  }
}
