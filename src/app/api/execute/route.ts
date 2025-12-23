import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

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

    const testCases = problem.testCases as any[];
    const results = [];
    let allPassed = true;

    if (language === "javascript") {
      const functionName = toCamelCase(problemSlug);
      for (const testCase of testCases) {
        try {
          // Robust function execution
          const fn = new Function(`
            ${code}
            if (typeof ${functionName} !== 'function') {
                throw new Error("Function ${functionName} is not defined. Please check your code.");
            }
            return ${functionName}(...arguments);
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
      allPassed = true;
      results.push({ passed: true, message: `Simulated ${language} execution` });
    }

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        if (allPassed) {
          const xpGain = problem.difficulty === "EASY" ? 50 : problem.difficulty === "MEDIUM" ? 100 : 200;
          const now = new Date();
          const lastSolvedDate = user.lastSolved ? new Date(user.lastSolved).toDateString() : null;
          const todayDate = now.toDateString();
          
          let newStreak = user.streak;
          if (!lastSolvedDate) {
              newStreak = 1;
          } else if (lastSolvedDate !== todayDate) {
              const yesterday = new Date(now);
              yesterday.setDate(now.getDate() - 1);
              if (lastSolvedDate === yesterday.toDateString()) {
                  newStreak += 1;
              } else {
                  newStreak = 1;
              }
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
        } else {
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
    }

    return NextResponse.json({
      success: true,
      results,
      allPassed,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Execution failed" }, { status: 500 });
  }
}