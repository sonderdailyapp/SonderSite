import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const { error: dbError } = await supabase
    .from("waitlist")
    .insert([{ email }]);

  if (dbError) {
    console.error("Supabase error:", dbError);
    if (dbError.code === "23505") {
      return NextResponse.json({ error: "You're already in." }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  await resend.emails.send({
    from: "Sonder <hello@sonderdaily.app>",
    to: email,
    subject: "You're in.",
    html: `
      <div style="background:#0d0c0b;font-family:Georgia,serif;padding:56px 40px;max-width:480px;margin:0 auto;">
        <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#4a4540;margin:0 0 48px;font-family:Arial,sans-serif;">Sonder</p>
        <h1 style="font-size:36px;font-weight:400;margin:0 0 16px;line-height:1.1;color:#ede8e0;">You're in.</h1>
        <p style="font-style:italic;font-size:20px;color:#c4b49a;margin:0 0 40px;font-weight:400;">We'll see you on the other side.</p>
        <div style="height:1px;background:linear-gradient(to right,transparent,#2a2620,transparent);margin:0 0 40px;"></div>
        <p style="color:#4a4540;font-size:12px;margin:0;font-family:Arial,sans-serif;letter-spacing:0.05em;">— The Sonder Team</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
