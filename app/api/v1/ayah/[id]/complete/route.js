import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  const { id } = await params;
  const ayahId = parseInt(id, 10);

  try {
    const updatedAyah = await prisma.Ayah.update({
      where: { id: ayahId },
      data: {
        completedAt: new Date(),
      },
    });
    return NextResponse.json(updatedAyah);
  } catch (error) {
    console.error("Error updating ayah:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate data" },
      { status: 500 }
    );
  }
}
