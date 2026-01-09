// 상품 관련 타입
export interface Product {
  id: number;
  name: string;
  brand: "Samsung" | "Apple" | "LG" | "Others";
  category: string;
  image: string;
  originalPrice: number;
  finalPrice: number;
  discountRate: number;
  carrier: Carrier[];
  subscriptionType: SubscriptionType[];
  discountType: DiscountType;
  colors: ProductColor[];
  storage: string[];
  monthlyPayment: number;
  additionalDiscount: number;
  commonDiscount: number;
  isHot: boolean;
  isBest: boolean;
  stock: number;
  createdAt: string;
}

export type Carrier = "SKT" | "KT" | "LGU+";
export type SubscriptionType = "신규" | "번호이동" | "기기변경";
export type DiscountType = "공시지원" | "선택약정";

export interface ProductColor {
  name: string;
  hex: string;
}

// 사용자 관련 타입
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  joinDate: string;
  orderCount: number;
  status: "active" | "inactive" | "blocked";
}

// 주문 관련 타입
export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  userName: string;
  userPhone: string;
  productId: number;
  productName: string;
  carrier: Carrier;
  subscriptionType: SubscriptionType;
  discountType: DiscountType;
  color: string;
  storage: string;
  planName: string;
  totalPrice: number;
  monthlyPayment: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"      // 신청대기
  | "confirmed"    // 신청확인
  | "processing"   // 개통진행중
  | "completed"    // 개통완료
  | "cancelled";   // 취소

// 게시판 관련 타입
export interface BoardPost {
  id: number;
  type: BoardType;
  category?: string;
  title: string;
  content: string;
  author: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  isNotice?: boolean;
  answer?: string;
  answeredAt?: string;
}

export type BoardType = "notice" | "qna" | "faq" | "inquiry" | "event";

// 배너 관련 타입
export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
  startDate: string;
  endDate: string;
}

// 리뷰 관련 타입
export interface Review {
  id: number;
  userName: string;
  productName: string;
  rating: number;
  content: string;
  createdAt: string;
}

// 요금제 관련 타입
export interface Plan {
  id: number;
  carrier: Carrier;
  name: string;
  monthlyFee: number;
  data: string;
  call: string;
  message: string;
}

// 통계 관련 타입
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalUsers: number;
  newUsersToday: number;
  popularProducts: { name: string; count: number }[];
  recentOrders: Order[];
}

// 필터 관련 타입
export interface ProductFilter {
  brand?: string[];
  carrier?: Carrier[];
  subscriptionType?: SubscriptionType[];
  discountType?: DiscountType;
  priceRange?: { min: number; max: number };
}

// 페이지네이션
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}
