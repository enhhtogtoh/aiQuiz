import  prisma  from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: { quizes: true },
  });
  return NextResponse.json({ data: article });
}
