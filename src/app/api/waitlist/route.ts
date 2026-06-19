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
      <div style="background:#0c0c0e;color:#f0ede8;font-family:Arial,sans-serif;padding:48px 32px;max-width:480px;margin:0 auto;">
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6860;margin:0 0 32px;">Sonder</p>
        <h1 style="font-size:28px;font-weight:600;margin:0 0 24px;line-height:1.3;">Your spot is saved.</h1>
        <p style="color:#6b6860;font-size:14px;line-height:1.8;margin:0 0 24px;">
          Sonder is two questions a day.<br>
          One in the morning. One at night.<br><br>
          A year from now, you'll look back and be glad you started here.
        </p>
        <p style="color:#6b6860;font-size:14px;line-height:1.8;margin:0 0 32px;">
          We'll let you know when doors open.
        </p>
        <p style="color:#3d3d42;font-size:12px;margin:0;">— The Sonder Team</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
