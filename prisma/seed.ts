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
      ],
    },
    {
      title: "Palindrome Number",
      slug: "is-palindrome",
      difficulty: Difficulty.EASY,
      category: "Math",
      order: 3,
      description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
      starterCode: `function isPalindrome(x) {
  // Write your code here
};`,
      testCases: [
        { input: [121], expected: true },
        { input: [-121], expected: false },
        { input: [10], expected: false },
      ],
    },
    {
      title: "Valid Parentheses",
      slug: "is-valid",
      difficulty: Difficulty.EASY,
      category: "String",
      order: 4,
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      starterCode: `function isValid(s) {
  // Write your code here
};`,
      testCases: [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
      ],
    },
    {
      title: "Longest Common Prefix",
      slug: "longest-common-prefix",
      difficulty: Difficulty.EASY,
      category: "String",
      order: 5,
      description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
      starterCode: `function longestCommonPrefix(strs) {
  // Write your code here
};`,
      testCases: [
        { input: [["flower","flow","flight"]], expected: "fl" },
        { input: [["dog","racecar","car"]], expected: "" },
      ],
    }
  ];

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: { slug: problem.slug },
      update: {
        description: problem.description,
        testCases: problem.testCases as any,
      },
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

  console.log("Database seeded with 4 problems successfully!");
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
