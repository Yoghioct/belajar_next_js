import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // Await params before accessing its properties
  const { id } = await params;
  const ayahId = parseInt(id, 10);

  try {
    const ayahDetail = await prisma.Ayah.findUnique({
      include: {
        surah: true,
      },
      where: { id: ayahId },
    });

    if (!ayahDetail) {
      return NextResponse.json({ error: "Ayah not found" }, { status: 404 });
    }

    return NextResponse.json(ayahDetail);
  } catch (error) {
    return NextResponse.json(error);
  }
}
