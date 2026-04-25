"use client";

import { useEffect, useState, useRef } from "react";

type Memo = {
  id: number;
  leadId: number;
  content: string;
  createdAt: string;
};

type Lead = {
  id: number;
  name: string;
};

type Props = {
  lead: Lead;
  onClose: () => void;
};

export function MemoModal({ lead, onClose }: Props) {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/leads/${lead.id}/memos`)
      .then((r) => r.json())
      .then(({ memos }) => setMemos(memos))
      .finally(() => setLoading(false));
  }, [lead.id]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/leads/${lead.id}/memos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim() }),
    });
    if (res.ok) {
      const { memo } = await res.json();
      setMemos((prev) => [...prev, memo]);
      setContent("");
      textareaRef.current?.focus();
    }
    setSubmitting(false);
  };

  const handleDelete = async (memoId: number) => {
    setDeletingId(memoId);
    await fetch(`/api/leads/${lead.id}/memos/${memoId}`, { method: "DELETE" });
    setMemos((prev) => prev.filter((m) => m.id !== memoId));
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {lead.name}님 메모
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-6">불러오는 중...</p>
          ) : memos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              아직 메모가 없습니다.
            </p>
          ) : (
            memos.map((memo) => (
              <div
                key={memo.id}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap flex-1">
                    {memo.content}
                  </p>
                  <button
                    onClick={() => handleDelete(memo.id)}
                    disabled={deletingId === memo.id}
                    className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-40 shrink-0 mt-0.5"
                    title="삭제"
                  >
                    {deletingId === memo.id ? "..." : "✕"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">{formatDate(memo.createdAt)}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAdd} className="px-6 py-4 border-t border-gray-200 space-y-3">
          <textarea
            ref={textareaRef}
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메모 내용을 입력하세요..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "추가 중..." : "메모 추가"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
