"use client";

import { useState } from "react";
import { Search, Filter, Eye, ChevronDown } from "lucide-react";
import { Pagination, Modal } from "@/components/ui";
import {
  orders,
  orderStatusLabels,
  orderStatusColors,
  getOrderStats,
} from "@/data/orders";
import { OrderStatus } from "@/types";

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const itemsPerPage = 10;
  const orderStats = getOrderStats();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => price.toLocaleString("ko-KR");

  const handleViewOrder = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    console.log("Update order", orderId, "to status:", newStatus);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">주문 관리</h1>
        <p className="text-text-muted mt-1">
          총 {filteredOrders.length}건의 주문
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {[
          { status: "", label: "전체", count: orderStats.total, color: "bg-gray-500" },
          { status: "pending", label: "신청대기", count: orderStats.pending, color: "bg-yellow-500" },
          { status: "confirmed", label: "신청확인", count: orderStats.confirmed, color: "bg-blue-500" },
          { status: "processing", label: "개통진행", count: orderStats.processing, color: "bg-purple-500" },
          { status: "completed", label: "개통완료", count: orderStats.completed, color: "bg-green-500" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setStatusFilter(item.status as OrderStatus | "")}
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
            <p className="text-2xl font-bold">{item.count}건</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border-light p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="주문번호, 고객명, 상품명 검색..."
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
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "")}
            className="input w-full sm:w-40"
          >
            <option value="">전체 상태</option>
            {Object.entries(orderStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left">주문번호</th>
                <th className="table-cell text-left">고객정보</th>
                <th className="table-cell text-left">상품</th>
                <th className="table-cell text-center">통신사</th>
                <th className="table-cell text-right">금액</th>
                <th className="table-cell text-center">상태</th>
                <th className="table-cell text-center">일시</th>
                <th className="table-cell text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="table-row">
                  <td className="table-cell font-medium">{order.orderNumber}</td>
                  <td className="table-cell">
                    <p className="font-medium">{order.userName}</p>
                    <p className="text-sm text-text-muted">{order.userPhone}</p>
                  </td>
                  <td className="table-cell">
                    <p>{order.productName}</p>
                    <p className="text-sm text-text-muted">
                      {order.color} / {order.storage}
                    </p>
                  </td>
                  <td className="table-cell text-center">
                    <span className="badge badge-secondary">{order.carrier}</span>
                  </td>
                  <td className="table-cell text-right">
                    <p className="font-medium">{formatPrice(order.totalPrice)}원</p>
                    <p className="text-sm text-text-muted">
                      월 {formatPrice(order.monthlyPayment)}원
                    </p>
                  </td>
                  <td className="table-cell text-center">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className={`badge ${orderStatusColors[order.status]} cursor-pointer border-0`}
                    >
                      {Object.entries(orderStatusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="table-cell text-center text-sm text-text-muted">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="table-cell text-center">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="p-2 hover:bg-background-alt rounded-lg"
                    >
                      <Eye size={18} className="text-text-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedOrders.length === 0 && (
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

      {/* Order Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="주문 상세"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div>
              <h3 className="font-bold mb-3">주문 정보</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">주문번호</span>
                  <p className="font-medium">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <span className="text-text-muted">주문일시</span>
                  <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <span className="text-text-muted">상태</span>
                  <p>
                    <span className={`badge ${orderStatusColors[selectedOrder.status]}`}>
                      {orderStatusLabels[selectedOrder.status]}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="font-bold mb-3">고객 정보</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-muted">이름</span>
                  <p className="font-medium">{selectedOrder.userName}</p>
                </div>
                <div>
                  <span className="text-text-muted">연락처</span>
                  <p className="font-medium">{selectedOrder.userPhone}</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="font-bold mb-3">상품 정보</h3>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="font-medium">{selectedOrder.productName}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-text-muted">
                  <p>색상: {selectedOrder.color}</p>
                  <p>용량: {selectedOrder.storage}</p>
                  <p>통신사: {selectedOrder.carrier}</p>
                  <p>가입유형: {selectedOrder.subscriptionType}</p>
                  <p>할인유형: {selectedOrder.discountType}</p>
                  <p>요금제: {selectedOrder.planName}</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="font-bold mb-3">결제 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">단말기 가격</span>
                  <span>{formatPrice(selectedOrder.totalPrice)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">월 납부금</span>
                  <span>{formatPrice(selectedOrder.monthlyPayment)}원</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
