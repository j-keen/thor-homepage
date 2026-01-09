"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight, MessageCircle } from "lucide-react";
import { Pagination } from "@/components/ui";
import { getPostsByType, boardTypeLabels } from "@/data/boards";
import { BoardType } from "@/types";

const boardTabs: { type: BoardType; label: string }[] = [
  { type: "notice", label: "공지사항" },
  { type: "qna", label: "Q&A" },
  { type: "faq", label: "FAQ" },
  { type: "event", label: "이벤트" },
];

export default function BoardPage() {
  const params = useParams();
  const type = params.type as BoardType;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const posts = getPostsByType(type);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background-alt">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">고객센터</h1>
          <p className="text-text-muted mt-2">
            궁금하신 점을 빠르게 해결해 드립니다
          </p>
        </div>

        {/* Board Tabs */}
        <div className="bg-white rounded-xl border border-border-light mb-6">
          <div className="flex border-b border-border-light">
            {boardTabs.map((tab) => (
              <Link
                key={tab.type}
                href={`/board/${tab.type}`}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  type === tab.type
                    ? "text-primary border-b-2 border-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-xl border border-border-light overflow-hidden">
          {/* Table Header */}
          <div className="table-header hidden md:grid grid-cols-12 gap-4 px-6 py-4">
            <div className="col-span-7">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
          </div>

          {/* Posts */}
          <div className="divide-y divide-border-light">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/board/${type}/${post.id}`}
                  className="table-row block md:grid md:grid-cols-12 gap-4 px-6 py-4"
                >
                  <div className="col-span-7">
                    <div className="flex items-center gap-2">
                      {post.isNotice && (
                        <span className="badge bg-primary text-white text-xs">
                          공지
                        </span>
                      )}
                      {post.category && (
                        <span className="badge badge-secondary text-xs">
                          {post.category}
                        </span>
                      )}
                      <span className="font-medium text-text-primary hover:text-primary line-clamp-1">
                        {post.title}
                      </span>
                      {type === "qna" && post.answer && (
                        <span className="badge bg-green-100 text-green-700 text-xs">
                          답변완료
                        </span>
                      )}
                    </div>
                    {/* Mobile: Show meta info below title */}
                    <div className="md:hidden mt-2 text-sm text-text-muted">
                      {post.author} · {formatDate(post.createdAt)} · 조회{" "}
                      {post.views}
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-sm text-text-muted hidden md:block">
                    {post.author}
                  </div>
                  <div className="col-span-2 text-center text-sm text-text-muted hidden md:block">
                    {formatDate(post.createdAt)}
                  </div>
                  <div className="col-span-1 text-center text-sm text-text-muted hidden md:block">
                    {post.views}
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-16 text-center text-text-muted">
                게시글이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">더 궁금한 점이 있으신가요?</h3>
          <p className="opacity-90 mb-4">카카오톡으로 1:1 상담을 받아보세요</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-yellow-400 text-text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            <MessageCircle size={20} />
            카카오톡 상담
          </a>
        </div>
      </div>
    </div>
  );
}
