import { notFound } from "next/navigation";
import Workspace from "@/components/Workspace";
import { prisma } from "@/lib/prisma";

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const problem = await prisma.problem.findUnique({
    where: { slug },
  });

  if (!problem) {
    notFound();
  }

  return (
    <Workspace 
      problem={{
        title: problem.title,
        description: problem.description,
        starterCode: problem.starterCode,
        slug: problem.slug,
      }} 
    />
  );
}