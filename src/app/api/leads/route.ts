import { db } from "@/db";
import { leads } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, company, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "이름, 이메일, 문의 내용은 필수입니다." },
      { status: 400 }
    );
  }

  const [lead] = await db
    .insert(leads)
    .values({ name, email, company: company || null, phone: phone || null, message })
    .returning();

  return NextResponse.json({ success: true, lead }, { status: 201 });
}
