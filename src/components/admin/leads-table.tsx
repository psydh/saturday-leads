"use client";

import { useState } from "react";
import { EditModal } from "./edit-modal";
import { MemoModal } from "./memo-modal";

type Lead = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  createdAt: Date;
};

type Props = {
  leads: Lead[];
};

export function LeadsTable({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [memoLead, setMemoLead] = useState<Lead | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);

  const handleSave = (updated: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updated.id ? updated : l))
    );
    setEditingLead(null);
  };

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    setErrorId(null);

    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });

    setLoadingId(null);

    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setDeletingId(null);
    } else {
      setErrorId(id);
      setDeletingId(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-500">
        아직 수집된 리드가 없습니다.
      </div>
    );
  }

  return (
    <>
      {editingLead && (
        <EditModal
          lead={editingLead}
          onSave={handleSave}
          onClose={() => setEditingLead(null)}
        />
      )}
      {memoLead && (
        <MemoModal lead={memoLead} onClose={() => setMemoLead(null)} />
      )}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3 w-12">ID</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">이메일</th>
                <th className="px-4 py-3">회사명</th>
                <th className="px-4 py-3">연락처</th>
                <th className="px-4 py-3">문의 내용</th>
                <th className="px-4 py-3 whitespace-nowrap">접수 일시</th>
                <th className="px-4 py-3 w-32">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{lead.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.company ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.phone ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs">
                    <span title={lead.message}>
                      {lead.message.length > 50
                        ? lead.message.slice(0, 50) + "…"
                        : lead.message}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    {deletingId === lead.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">삭제?</span>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={loadingId === lead.id}
                          className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          {loadingId === lead.id ? "..." : "확인"}
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setMemoLead(lead)}
                          className="text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          메모
                        </button>
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            setErrorId(null);
                            setDeletingId(lead.id);
                          }}
                          className="text-xs font-medium text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                    {errorId === lead.id && (
                      <p className="text-xs text-red-500 mt-1">오류 발생</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
