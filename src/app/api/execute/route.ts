import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language, problemSlug } = await req.json();

    // Mock test cases for "two-sum"
    const testCases = [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ];

    if (language !== "javascript") {
      return NextResponse.json({ error: "Only JavaScript is supported in prototype" }, { status: 400 });
    }

    const results = [];
    let allPassed = true;

    for (const testCase of testCases) {
      try {
        // Create a function from the user's code and execute it
        // In a production environment, this should be done in a secure sandbox like isolated-vm
        const fn = new Function(`
          ${code}
          return twoSum(...arguments);
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
        results.push({
          error: err.message,
          passed: false,
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      allPassed,
    });
  } catch (error) {
    return NextResponse.json({ error: "Execution failed" }, { status: 500 });
  }
}
