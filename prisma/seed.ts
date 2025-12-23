import { PrismaClient, Difficulty } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// @ts-ignore
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

async function main() {
  const problems = [
    {
      title: "Two Sum",
      slug: "two-sum",
      difficulty: Difficulty.EASY,
      category: "Array",
      order: 1,
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      starterCode: `function twoSum(nums, target) {
  // Write your code here
};`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
      ],
    },
    {
      title: "Reverse Integer",
      slug: "reverse-integer",
      difficulty: Difficulty.MEDIUM,
      category: "Math",
      order: 2,
      description: "Given a signed 32-bit integer x, return x with its digits reversed.",
      starterCode: `function reverse(x) {
  // Write your code here
};`,
      testCases: [
        { input: [123], expected: 321 },
        { input: [-123], expected: -321 },
        { input: [120], expected: 21 },
      ],
    },
  ];

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: { slug: problem.slug },
      update: {},
      create: {
        title: problem.title,
        slug: problem.slug,
        difficulty: problem.difficulty,
        category: problem.category,
        order: problem.order,
        description: problem.description,
        starterCode: problem.starterCode,
        testCases: problem.testCases as any,
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // @ts-ignore
    await prisma.$disconnect();
  });