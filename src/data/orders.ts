import { Order, OrderStatus } from "@/types";

export const orders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2024-0001",
    userId: 1,
    userName: "김철수",
    userPhone: "010-1234-5678",
    productId: 1,
    productName: "Galaxy S24 Ultra",
    carrier: "SKT",
    subscriptionType: "번호이동",
    discountType: "공시지원",
    color: "티타늄 블랙",
    storage: "256GB",
    planName: "5G 프리미어 플러스",
    totalPrice: 0,
    monthlyPayment: 65000,
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-17T14:00:00Z",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-0002",
    userId: 2,
    userName: "이영희",
    userPhone: "010-2345-6789",
    productId: 5,
    productName: "iPhone 15 Pro Max",
    carrier: "KT",
    subscriptionType: "신규",
    discountType: "공시지원",
    color: "내추럴 티타늄",
    storage: "512GB",
    planName: "5G 슈퍼플랜",
    totalPrice: 100000,
    monthlyPayment: 70000,
    status: "processing",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T16:00:00Z",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-0003",
    userId: 3,
    userName: "박민수",
    userPhone: "010-3456-7890",
    productId: 3,
    productName: "Galaxy Z Flip5",
    carrier: "LGU+",
    subscriptionType: "기기변경",
    discountType: "선택약정",
    color: "민트",
    storage: "256GB",
    planName: "5G 프리미어 에센셜",
    totalPrice: 100000,
    monthlyPayment: 45000,
    status: "pending",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-0004",
    userId: 4,
    userName: "정수진",
    userPhone: "010-4567-8901",
    productId: 7,
    productName: "iPhone 15",
    carrier: "SKT",
    subscriptionType: "번호이동",
    discountType: "공시지원",
    color: "핑크",
    storage: "256GB",
    planName: "5G 스탠다드",
    totalPrice: 0,
    monthlyPayment: 50000,
    status: "confirmed",
    createdAt: "2024-01-17T11:45:00Z",
    updatedAt: "2024-01-17T13:00:00Z",
  },
  {
    id: 5,
    orderNumber: "ORD-2024-0005",
    userId: 5,
    userName: "최동훈",
    userPhone: "010-5678-9012",
    productId: 8,
    productName: "Galaxy A54",
    carrier: "KT",
    subscriptionType: "신규",
    discountType: "공시지원",
    color: "어썸 바이올렛",
    storage: "128GB",
    planName: "5G 베이직",
    totalPrice: 0,
    monthlyPayment: 25000,
    status: "completed",
    createdAt: "2024-01-14T16:30:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: 6,
    orderNumber: "ORD-2024-0006",
    userId: 6,
    userName: "강미영",
    userPhone: "010-6789-0123",
    productId: 6,
    productName: "iPhone 15 Pro",
    carrier: "LGU+",
    subscriptionType: "번호이동",
    discountType: "공시지원",
    color: "블루 티타늄",
    storage: "256GB",
    planName: "5G 프리미어",
    totalPrice: 50000,
    monthlyPayment: 60000,
    status: "cancelled",
    createdAt: "2024-01-13T08:00:00Z",
    updatedAt: "2024-01-14T09:00:00Z",
  },
  {
    id: 7,
    orderNumber: "ORD-2024-0007",
    userId: 7,
    userName: "윤서연",
    userPhone: "010-7890-1234",
    productId: 2,
    productName: "Galaxy S24+",
    carrier: "SKT",
    subscriptionType: "기기변경",
    discountType: "선택약정",
    color: "코발트 바이올렛",
    storage: "512GB",
    planName: "5G 프리미어 플러스",
    totalPrice: 0,
    monthlyPayment: 55000,
    status: "processing",
    createdAt: "2024-01-17T15:00:00Z",
    updatedAt: "2024-01-17T15:30:00Z",
  },
  {
    id: 8,
    orderNumber: "ORD-2024-0008",
    userId: 8,
    userName: "임준혁",
    userPhone: "010-8901-2345",
    productId: 4,
    productName: "Galaxy Z Fold5",
    carrier: "KT",
    subscriptionType: "번호이동",
    discountType: "공시지원",
    color: "아이시 블루",
    storage: "512GB",
    planName: "5G 슈퍼플랜 프리미어",
    totalPrice: 200000,
    monthlyPayment: 75000,
    status: "pending",
    createdAt: "2024-01-17T17:20:00Z",
    updatedAt: "2024-01-17T17:20:00Z",
  },
];

export const getOrderById = (id: number): Order | undefined => {
  return orders.find((o) => o.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return orders.filter((o) => o.status === status);
};

export const getOrdersByUserId = (userId: number): Order[] => {
  return orders.filter((o) => o.userId === userId);
};

export const getRecentOrders = (limit: number = 5): Order[] => {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getOrderStats = () => {
  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const confirmed = orders.filter((o) => o.status === "confirmed").length;
  const processing = orders.filter((o) => o.status === "processing").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.totalPrice + o.monthlyPayment * 24, 0);

  return { total, pending, confirmed, processing, completed, cancelled, totalRevenue };
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "신청대기",
  confirmed: "신청확인",
  processing: "개통진행중",
  completed: "개통완료",
  cancelled: "취소",
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
