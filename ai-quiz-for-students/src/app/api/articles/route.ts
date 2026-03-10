import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    include: {
      quizzes: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const { title, content, summary, userId } = await request.json();
  const article = await prisma.article.create({
    data: { title, content, summary, userId },
  });
  return NextResponse.json(article);
}
