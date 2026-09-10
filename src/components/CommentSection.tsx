"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Comment = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentSection({
  initialComments,
}: {
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedNickname = nickname.trim();
    const trimmedContent = content.trim();

    if (!trimmedNickname || !trimmedContent) {
      setError("닉네임과 댓글 내용을 모두 입력해주세요.");
      return;
    }
    if (trimmedNickname.length > 20) {
      setError("닉네임은 20자 이내로 입력해주세요.");
      return;
    }
    if (trimmedContent.length > 500) {
      setError("댓글은 500자 이내로 입력해주세요.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { data, error: insertError } = await supabase
      .from("comments")
      .insert({ nickname: trimmedNickname, content: trimmedContent })
      .select()
      .single();

    setSubmitting(false);

    if (insertError || !data) {
      setError("댓글 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setComments((prev) => [data as Comment, ...prev]);
    setContent("");
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-navy">방명록</h2>
      <p className="mt-1 text-sm text-muted">
        닉네임을 자유롭게 정하고 인사를 남겨주세요.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          maxLength={20}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-navy-light focus:ring-2 focus:ring-navy-light/20"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="남기고 싶은 말을 적어주세요"
          maxLength={500}
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-navy-light focus:ring-2 focus:ring-navy-light/20"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-light disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "댓글 남기기"}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-border">
        {comments.length === 0 && (
          <li className="py-4 text-sm text-muted">
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </li>
        )}
        {comments.map((c) => (
          <li key={c.id} className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-navy">
                {c.nickname}
              </span>
              <span className="text-xs text-muted">
                {formatDate(c.created_at)}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {c.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
