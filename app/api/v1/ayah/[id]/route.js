// File: /app/api/v2/ayah/[id]/route.js (or pages/api/v2/ayah/[id].js)
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  const ayahId = parseInt(id);

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
