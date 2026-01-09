import {
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { orders, getOrderStats, orderStatusLabels, orderStatusColors, getRecentOrders } from "@/data/orders";
import { users, getUserStats } from "@/data/users";
import { products } from "@/data/products";

export default function AdminDashboard() {
  const orderStats = getOrderStats();
  const userStats = getUserStats();
  const recentOrders = getRecentOrders(5);

  const stats: {
    title: string;
    value: string | number;
    icon: typeof ShoppingCart;
    change: string;
    changeType: "increase" | "decrease" | "neutral";
    color: string;
  }[] = [
    {
      title: "총 주문",
      value: orderStats.total,
      icon: ShoppingCart,
      change: "+12%",
      changeType: "increase",
      color: "bg-blue-500",
    },
    {
      title: "처리 대기",
      value: orderStats.pending + orderStats.confirmed,
      icon: TrendingUp,
      change: `${orderStats.pending}건 대기`,
      changeType: "neutral",
      color: "bg-yellow-500",
    },
    {
      title: "총 매출",
      value: `${(orderStats.totalRevenue / 10000).toFixed(0)}만원`,
      icon: DollarSign,
      change: "+8%",
      changeType: "increase",
      color: "bg-green-500",
    },
    {
      title: "총 회원",
      value: userStats.total,
      icon: Users,
      change: `+${userStats.newToday} 오늘`,
      changeType: "increase",
      color: "bg-purple-500",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">대시보드</h1>
        <p className="text-text-muted mt-1">토르폰 관리자 대시보드입니다.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-border-light p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span
                className={`flex items-center gap-1 text-sm ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                    ? "text-red-600"
                    : "text-text-muted"
                }`}
              >
                {stat.changeType === "increase" && <ArrowUpRight size={16} />}
                {stat.changeType === "decrease" && <ArrowDownRight size={16} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-text-muted text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border-light">
          <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
            <h2 className="font-bold text-lg">최근 주문</h2>
            <Link
              href="/admin/orders"
              className="text-primary text-sm hover:underline"
            >
              전체 보기
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="table-header">
                <tr>
                  <th className="table-cell text-left">주문번호</th>
                  <th className="table-cell text-left">고객</th>
                  <th className="table-cell text-left">상품</th>
                  <th className="table-cell text-center">상태</th>
                  <th className="table-cell text-right">일시</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="table-cell">{order.userName}</td>
                    <td className="table-cell text-text-muted">
                      {order.productName}
                    </td>
                    <td className="table-cell text-center">
                      <span
                        className={`badge ${orderStatusColors[order.status]}`}
                      >
                        {orderStatusLabels[order.status]}
                      </span>
                    </td>
                    <td className="table-cell text-right text-text-muted">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Status Summary */}
        <div className="bg-white rounded-xl border border-border-light">
          <div className="px-6 py-4 border-b border-border-light">
            <h2 className="font-bold text-lg">주문 현황</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "신청대기", value: orderStats.pending, color: "bg-yellow-500" },
              { label: "신청확인", value: orderStats.confirmed, color: "bg-blue-500" },
              { label: "개통진행중", value: orderStats.processing, color: "bg-purple-500" },
              { label: "개통완료", value: orderStats.completed, color: "bg-green-500" },
              { label: "취소", value: orderStats.cancelled, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-text-secondary">{item.label}</span>
                </div>
                <span className="font-bold">{item.value}건</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products/new"
          className="bg-white rounded-xl border border-border-light p-4 hover:border-primary transition-colors group"
        >
          <h3 className="font-medium group-hover:text-primary">새 상품 등록</h3>
          <p className="text-sm text-text-muted mt-1">신규 휴대폰 상품을 등록합니다</p>
        </Link>
        <Link
          href="/admin/orders?status=pending"
          className="bg-white rounded-xl border border-border-light p-4 hover:border-primary transition-colors group"
        >
          <h3 className="font-medium group-hover:text-primary">대기 주문 확인</h3>
          <p className="text-sm text-text-muted mt-1">{orderStats.pending}건의 주문이 대기중입니다</p>
        </Link>
        <Link
          href="/admin/boards?type=qna"
          className="bg-white rounded-xl border border-border-light p-4 hover:border-primary transition-colors group"
        >
          <h3 className="font-medium group-hover:text-primary">Q&A 답변하기</h3>
          <p className="text-sm text-text-muted mt-1">미답변 문의를 확인합니다</p>
        </Link>
        <Link
          href="/admin/banners"
          className="bg-white rounded-xl border border-border-light p-4 hover:border-primary transition-colors group"
        >
          <h3 className="font-medium group-hover:text-primary">배너 관리</h3>
          <p className="text-sm text-text-muted mt-1">메인 배너를 관리합니다</p>
        </Link>
      </div>
    </div>
  );
}
