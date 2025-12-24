import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contests = await prisma.contest.findMany({
      orderBy: { startTime: "asc" },
      include: {
        _count: {
          select: { participants: true }
        }
      }
    });
    return NextResponse.json(contests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 });
  }
}
