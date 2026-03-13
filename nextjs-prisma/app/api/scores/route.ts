import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    NextResponse.json({ message: "Хандах эрхгүй байна" }, { status: 401 });
    return;
  }
  const body = await request.json();
  const { quizId, score } = body;

  try {
    const result = await prisma.userScore.create({
      data: {
        userId,
        quizId,
        score,
      },
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Оноо хадгалах үед алдаа гарлаа" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    NextResponse.json({ message: "Хандах эрхгүй байна" }, { status: 401 });
    return;
  }
  try {
    const scores = await prisma.userScore.findMany({
      where: { userId },
      include: { quiz: true },
    });
    return NextResponse.json({ data: scores });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Оноо авах үед алдаа гарлаа" },
      { status: 500 },
    );
  }
}
