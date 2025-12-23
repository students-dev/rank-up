import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { code, language, problemSlug } = await req.json();

    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    // In a real system, we'd fetch these from the DB
    const testCases = problem.testCases as any[];

    const results = [];
    let allPassed = true;

    // Execution logic (JavaScript only for real validation in this prototype)
    if (language === "javascript") {
      for (const testCase of testCases) {
        try {
          const fn = new Function(`
            ${code}
            return ${problemSlug.replace(/-/g, '')}(...arguments);
          `);

          const start = performance.now();
          const actual = fn(...testCase.input);
          const end = performance.now();

          const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected);
          if (!passed) allPassed = false;

          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual,
            passed,
            runtime: Math.round(end - start),
          });
        } catch (err: any) {
          allPassed = false;
          results.push({ error: err.message, passed: false });
        }
      }
    } else {
      // Mock pass for other languages
      allPassed = true;
      results.push({ passed: true, message: "Simulated execution" });
    }

    // Save Submission and Update User Stats if authenticated
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user && allPassed) {
        const xpGain = problem.difficulty === "EASY" ? 50 : problem.difficulty === "MEDIUM" ? 100 : 200;
        
        // Simple streak logic
        const now = new Date();
        const lastSolved = user.lastSolved ? new Date(user.lastSolved) : null;
        let newStreak = user.streak;

        if (!lastSolved || now.getDate() !== lastSolved.getDate()) {
            newStreak += 1;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            xp: { increment: xpGain },
            streak: newStreak,
            lastSolved: now,
            submissions: {
              create: {
                problemId: problem.id,
                code,
                language,
                status: "Accepted",
                runtime: results[0]?.runtime || 0,
              },
            },
          },
        });
      } else if (user) {
        await prisma.submission.create({
          data: {
            userId: user.id,
            problemId: problem.id,
            code,
            language,
            status: "Failed",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      allPassed,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Execution failed" }, { status: 500 });
  }
}
