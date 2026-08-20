import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const INVALID_REQUEST = "ข้อมูลไม่ถูกต้อง";
const SEND_FAILED = "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่ภายหลัง";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: INVALID_REQUEST }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: INVALID_REQUEST,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot filled → pretend success, never send an email.
  if (website) {
    return NextResponse.json({ message: "ส่งข้อความเรียบร้อยแล้ว" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Missing contact email environment variables");
    return NextResponse.json({ message: SEND_FAILED }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[ติดต่อจากเว็บไซต์] ${subject}`,
    text: [
      `ชื่อผู้ติดต่อ: ${name}`,
      `อีเมล: ${email}`,
      `หัวข้อ: ${subject}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ message: SEND_FAILED }, { status: 500 });
  }

  return NextResponse.json({ message: "ส่งข้อความเรียบร้อยแล้ว" });
}