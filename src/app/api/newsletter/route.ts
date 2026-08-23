import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // TODO: wire up to an email marketing provider (Klaviyo, Mailchimp, etc.).
  console.log("Newsletter signup", email);

  return NextResponse.json({ ok: true });
}
