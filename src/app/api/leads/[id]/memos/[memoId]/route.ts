export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leadMemos } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = { params: Promise<{ id: string; memoId: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { memoId } = await params;
  const id = parseInt(memoId);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await db.delete(leadMemos).where(eq(leadMemos.id, id));
  return NextResponse.json({ success: true });
}
