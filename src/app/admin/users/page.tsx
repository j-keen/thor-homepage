"use client";

import { useState } from "react";
import { Search, Eye, Ban, Check } from "lucide-react";
import { Pagination, Modal } from "@/components/ui";
import { users, userStatusLabels, userStatusColors, getUserStats } from "@/data/users";
import { User } from "@/types";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<User["status"] | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const itemsPerPage = 10;
  const userStats = getUserStats();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleStatusChange = (userId: number, newStatus: User["status"]) => {
    console.log("Update user", userId, "to status:", newStatus);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">회원 관리</h1>
        <p className="text-text-muted mt-1">
          총 {filteredUsers.length}명의 회원
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { status: "", label: "전체", count: userStats.total, color: "bg-gray-500" },
          { status: "active", label: "활성", count: userStats.active, color: "bg-green-500" },
          { status: "inactive", label: "비활성", count: userStats.inactive, color: "bg-gray-400" },
          { status: "blocked", label: "차단", count: userStats.blocked, color: "bg-red-500" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setStatusFilter(item.status as User["status"] | "")}
            className={`bg-white rounded-xl border p-4 text-left transition-colors ${
              statusFilter === item.status
                ? "border-primary ring-2 ring-primary/20"
                : "border-border-light hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-text-muted">{item.label}</span>
            </div>
            <p className="text-2xl font-bold">{item.count}명</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border-light p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="이름, 이메일, 연락처 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as User["status"] | "")}
            className="input w-full sm:w-40"
          >
            <option value="">전체 상태</option>
            {Object.entries(userStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left">회원정보</th>
                <th className="table-cell text-center">연락처</th>
                <th className="table-cell text-center">가입일</th>
                <th className="table-cell text-center">주문수</th>
                <th className="table-cell text-center">상태</th>
                <th className="table-cell text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-center">{user.phone}</td>
                  <td className="table-cell text-center text-text-muted">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="table-cell text-center">
                    <span className="font-medium">{user.orderCount}</span>건
                  </td>
                  <td className="table-cell text-center">
                    <span className={`badge ${userStatusColors[user.status]}`}>
                      {userStatusLabels[user.status]}
                    </span>
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-background-alt rounded-lg"
                        title="상세보기"
                      >
                        <Eye size={16} className="text-text-muted" />
                      </button>
                      {user.status !== "blocked" ? (
                        <button
                          onClick={() => handleStatusChange(user.id, "blocked")}
                          className="p-2 hover:bg-red-50 rounded-lg"
                          title="차단"
                        >
                          <Ban size={16} className="text-red-500" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, "active")}
                          className="p-2 hover:bg-green-50 rounded-lg"
                          title="활성화"
                        >
                          <Check size={16} className="text-green-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedUsers.length === 0 && (
          <div className="py-16 text-center text-text-muted">
            검색 결과가 없습니다.
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

      {/* User Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="회원 상세"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-text-muted">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-alt rounded-lg p-4">
                <p className="text-sm text-text-muted mb-1">연락처</p>
                <p className="font-medium">{selectedUser.phone}</p>
              </div>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="text-sm text-text-muted mb-1">가입일</p>
                <p className="font-medium">{formatDate(selectedUser.joinDate)}</p>
              </div>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="text-sm text-text-muted mb-1">주문 횟수</p>
                <p className="font-medium">{selectedUser.orderCount}건</p>
              </div>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="text-sm text-text-muted mb-1">상태</p>
                <span className={`badge ${userStatusColors[selectedUser.status]}`}>
                  {userStatusLabels[selectedUser.status]}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedUser.status !== "blocked" ? (
                <button
                  onClick={() => {
                    handleStatusChange(selectedUser.id, "blocked");
                    setShowDetailModal(false);
                  }}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  회원 차단
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleStatusChange(selectedUser.id, "active");
                    setShowDetailModal(false);
                  }}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  차단 해제
                </button>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 btn-outline"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
