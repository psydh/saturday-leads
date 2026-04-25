export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leadMemos } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const leadId = parseInt(id);
  if (isNaN(leadId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const memos = await db
    .select()
    .from(leadMemos)
    .where(eq(leadMemos.leadId, leadId))
    .orderBy(asc(leadMemos.createdAt));

  return NextResponse.json({ memos });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const leadId = parseInt(id);
  if (isNaN(leadId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json();
  const content = body.content?.trim();
  if (!content) return NextResponse.json({ error: "내용을 입력해주세요." }, { status: 400 });

  const [memo] = await db.insert(leadMemos).values({ leadId, content }).returning();
  return NextResponse.json({ memo }, { status: 201 });
}
