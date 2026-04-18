import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import { LeadsTable } from "@/components/admin/leads-table";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminPage() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          리드 관리{" "}
          <span className="text-base font-normal text-gray-500">
            ({allLeads.length}건)
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← 메인으로
          </a>
          <LogoutButton />
        </div>
      </div>
      <LeadsTable leads={allLeads} />
    </main>
  );
}
