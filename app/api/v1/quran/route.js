
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const ayahs = await prisma.quranId.findMany(
            {
                take: 10,
                orderBy: { id: "asc" }
            }
        )

        return NextResponse.json(ayahs)
    } catch (error) {
        return NextResponse.json(error)
    }
}
