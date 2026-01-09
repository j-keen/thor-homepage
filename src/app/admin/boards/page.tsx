"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Eye, MessageCircle } from "lucide-react";
import { Pagination, Modal } from "@/components/ui";
import { boardPosts, boardTypeLabels } from "@/data/boards";
import { BoardType, BoardPost } from "@/types";

const boardTabs: { type: BoardType; label: string }[] = [
  { type: "notice", label: "공지사항" },
  { type: "qna", label: "Q&A" },
  { type: "faq", label: "FAQ" },
  { type: "event", label: "이벤트" },
];

export default function AdminBoardsPage() {
  const [activeTab, setActiveTab] = useState<BoardType>("notice");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const itemsPerPage = 10;

  const filteredPosts = boardPosts.filter(
    (post) =>
      post.type === activeTab &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const handleAnswer = (post: BoardPost) => {
    setSelectedPost(post);
    setAnswerText(post.answer || "");
    setShowAnswerModal(true);
  };

  const submitAnswer = () => {
    console.log("Submit answer for post", selectedPost?.id, ":", answerText);
    setShowAnswerModal(false);
    setSelectedPost(null);
    setAnswerText("");
  };

  const unansweredCount = boardPosts.filter(
    (p) => p.type === "qna" && !p.answer
  ).length;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">게시판 관리</h1>
          <p className="text-text-muted mt-1">
            {unansweredCount > 0 && (
              <span className="text-red-500">
                미답변 Q&A {unansweredCount}건 |{" "}
              </span>
            )}
            총 {filteredPosts.length}개의 게시글
          </p>
        </div>
        <Link
          href={`/admin/boards/new?type=${activeTab}`}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          새 글 작성
        </Link>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-border-light mb-6">
        <div className="flex border-b border-border-light">
          {boardTabs.map((tab) => {
            const count = boardPosts.filter((p) => p.type === tab.type).length;
            const unanswered =
              tab.type === "qna"
                ? boardPosts.filter((p) => p.type === "qna" && !p.answer).length
                : 0;

            return (
              <button
                key={tab.type}
                onClick={() => {
                  setActiveTab(tab.type);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                  activeTab === tab.type
                    ? "text-primary border-b-2 border-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {tab.label}
                <span className="ml-1 text-sm text-text-muted">({count})</span>
                {unanswered > 0 && (
                  <span className="absolute top-2 right-4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unanswered}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="제목 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left w-12">ID</th>
                <th className="table-cell text-left">제목</th>
                <th className="table-cell text-center">작성자</th>
                <th className="table-cell text-center">조회</th>
                <th className="table-cell text-center">작성일</th>
                {activeTab === "qna" && (
                  <th className="table-cell text-center">답변</th>
                )}
                <th className="table-cell text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr key={post.id} className="table-row">
                  <td className="table-cell text-text-muted">{post.id}</td>
                  <td className="table-cell">
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
                      <span className="font-medium line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="table-cell text-center">{post.author}</td>
                  <td className="table-cell text-center text-text-muted">
                    {post.views}
                  </td>
                  <td className="table-cell text-center text-text-muted">
                    {formatDate(post.createdAt)}
                  </td>
                  {activeTab === "qna" && (
                    <td className="table-cell text-center">
                      {post.answer ? (
                        <span className="badge bg-green-100 text-green-700">
                          완료
                        </span>
                      ) : (
                        <span className="badge bg-yellow-100 text-yellow-700">
                          대기
                        </span>
                      )}
                    </td>
                  )}
                  <td className="table-cell text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/board/${post.type}/${post.id}`}
                        className="p-2 hover:bg-background-alt rounded-lg"
                        title="보기"
                      >
                        <Eye size={16} className="text-text-muted" />
                      </Link>
                      {(activeTab === "qna" || activeTab === "faq") && (
                        <button
                          onClick={() => handleAnswer(post)}
                          className="p-2 hover:bg-primary/10 rounded-lg"
                          title="답변"
                        >
                          <MessageCircle size={16} className="text-primary" />
                        </button>
                      )}
                      <Link
                        href={`/admin/boards/${post.id}/edit`}
                        className="p-2 hover:bg-background-alt rounded-lg"
                        title="수정"
                      >
                        <Edit size={16} className="text-text-muted" />
                      </Link>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg"
                        title="삭제"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedPosts.length === 0 && (
          <div className="py-16 text-center text-text-muted">
            게시글이 없습니다.
          </div>
        )}
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

      {/* Answer Modal */}
      <Modal
        isOpen={showAnswerModal}
        onClose={() => setShowAnswerModal(false)}
        title="답변 작성"
        size="lg"
      >
        {selectedPost && (
          <div className="space-y-4">
            {/* Question */}
            <div className="bg-background-alt rounded-lg p-4">
              <p className="font-medium mb-2">{selectedPost.title}</p>
              <p className="text-text-secondary text-sm whitespace-pre-wrap">
                {selectedPost.content}
              </p>
              <p className="text-text-muted text-xs mt-2">
                {selectedPost.author} · {formatDate(selectedPost.createdAt)}
              </p>
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-sm font-medium mb-2">답변 내용</label>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                className="input min-h-[200px]"
                placeholder="답변을 입력하세요..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAnswerModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-background-alt"
              >
                취소
              </button>
              <button onClick={submitAnswer} className="btn-primary">
                {selectedPost.answer ? "답변 수정" : "답변 등록"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
