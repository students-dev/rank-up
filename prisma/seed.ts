import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const problems = [
    {
      title: "Two Sum",
      slug: "two-sum",
      difficulty: Difficulty.EASY,
      category: "Array",
      order: 1,
      description: `
Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

### Example 1:
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].
      `,
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
      description: `
Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

### Example 1:
**Input:** x = 123
**Output:** 321
      `,
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
      create: problem,
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
    await prisma.$disconnect();
  });