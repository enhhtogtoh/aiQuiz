import { Webhook } from "svix";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ClerkEvent = {
  type: string;
  data: {
    object: {
      first_name: string;
      email_addresses: { email_address: string }[];
      last_name: string;
      id: string;
    };
  };
};

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_KEY;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing webhook secret" },
      { status: 400 },
    );
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing headers" }, { status: 400 });
  }

  const webhook = new Webhook(webhookSecret);

  const body = await req.text();
  try {
    const event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-signature": svixSignature,
      "svix-timestamp": svixTimestamp,
    }) as ClerkEvent;

    if (event.type !== "user.created") {
      return NextResponse.json({ error: "Ignore event" }, { status: 400 });
    }

    const { first_name, email_addresses, last_name, id } = event.data.object;

    await prisma.user.create({
      data: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        clerkId: id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 500 },
    );
  }
}
