import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const quizzes = await prisma.quiz.findMany({
    where: {
      articleId: params.id,
    },
  });

  return NextResponse.json({ data: quizzes });
}
