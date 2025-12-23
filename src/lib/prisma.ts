import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as { prisma: any };

// In Prisma 7, when using Accelerate, you must pass the accelerateUrl 
// to the constructor if you're not using a direct database connection.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // @ts-ignore - Prisma 7 specific constructor property
    accelerateUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;