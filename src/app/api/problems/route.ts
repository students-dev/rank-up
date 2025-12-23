import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Difficulty } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const difficulty = searchParams.get("difficulty") as Difficulty | "ALL" || "ALL";

  try {
    const problems = await prisma.problem.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { category: { contains: search, mode: 'insensitive' } },
            ]
          },
          difficulty !== "ALL" ? { difficulty } : {}
        ]
      },
      orderBy: { order: "asc" }
    });

    return NextResponse.json(problems);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 });
  }
}
