import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await prisma.user.create({
      data: {
        email: "test1@gmail.com",
        id: "1",
        name: "asd",
      },
    });
    console.log(user);
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 },
    );
  } catch (error) {
    return new Response("Error creating user", { status: 500 });
  }
}
