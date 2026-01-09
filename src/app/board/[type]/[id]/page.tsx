"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Eye, User } from "lucide-react";
import { getPostById, boardTypeLabels } from "@/data/boards";
import { BoardType } from "@/types";

export default function BoardDetailPage() {
  const params = useParams();
  const type = params.type as BoardType;
  const id = Number(params.id);

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
          <Link href={`/board/${type}`} className="btn-primary">
            목록으로
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background-alt">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          href={`/board/${type}`}
          className="inline-flex items-center gap-1 text-text-muted hover:text-primary mb-6"
        >
          <ChevronLeft size={18} />
          {boardTypeLabels[type]} 목록으로
        </Link>

        {/* Post Content */}
        <article className="bg-white rounded-xl border border-border-light overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border-light">
            <div className="flex items-center gap-2 mb-3">
              {post.isNotice && (
                <span className="badge bg-primary text-white">공지</span>
              )}
              {post.category && (
                <span className="badge badge-secondary">{post.category}</span>
              )}
              <span className="badge bg-background-alt text-text-muted">
                {boardTypeLabels[type]}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                조회 {post.views}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            <div className="prose max-w-none text-text-secondary whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Answer (for QnA/FAQ) */}
          {post.answer && (
            <div className="mx-6 mb-6 bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-primary text-white">답변</span>
                {post.answeredAt && (
                  <span className="text-sm text-text-muted">
                    {formatDate(post.answeredAt)}
                  </span>
                )}
              </div>
              <div className="text-text-secondary whitespace-pre-wrap">
                {post.answer}
              </div>
            </div>
          )}
        </article>

        {/* Navigation */}
        <div className="mt-6 flex justify-center">
          <Link
            href={`/board/${type}`}
            className="btn-outline"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
