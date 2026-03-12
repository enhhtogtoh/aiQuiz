import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { topic, userId } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: `Write a short article about ${topic} and generate 3 quiz questions with 4 options and correct answer in JSON format`,
      },
    ],
  });
  const data = JSON.parse(completion.choices[0].message.content || "{}");

  
}
