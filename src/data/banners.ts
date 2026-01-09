import { Banner, Review, Plan } from "@/types";

export const banners: Banner[] = [
  {
    id: 1,
    title: "Galaxy S24 시리즈",
    subtitle: "최대 100% 할인! 0원 개통",
    image: "https://images.samsung.com/kdp/event/2024/s24-banner.jpg",
    link: "/phones?brand=Samsung",
    isActive: true,
    order: 1,
    startDate: "2024-01-17",
    endDate: "2024-02-28",
  },
  {
    id: 2,
    title: "iPhone 15 시리즈",
    subtitle: "프로는 역시 프로답게",
    image: "https://store.storeimages.cdn-apple.com/banner/iphone15.jpg",
    link: "/phones?brand=Apple",
    isActive: true,
    order: 2,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 3,
    title: "키즈폰 기획전",
    subtitle: "우리 아이 첫 스마트폰",
    image: "https://example.com/kids-phone-banner.jpg",
    link: "/phones?category=kids",
    isActive: true,
    order: 3,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  },
  {
    id: 4,
    title: "폴더블 특가",
    subtitle: "Z Flip5 / Z Fold5 초특가",
    image: "https://images.samsung.com/kdp/event/foldable-banner.jpg",
    link: "/phones?category=foldable",
    isActive: true,
    order: 4,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
  {
    id: 5,
    title: "설맞이 이벤트",
    subtitle: "새해 복 많이 받으세요!",
    image: "https://example.com/lunar-new-year.jpg",
    link: "/board/event",
    isActive: false,
    order: 5,
    startDate: "2024-02-01",
    endDate: "2024-02-15",
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    userName: "김**",
    productName: "Galaxy S24 Ultra",
    rating: 5,
    content: "정말 빠른 개통! 하루만에 완료되었어요. 할인도 많이 받아서 너무 좋습니다.",
    createdAt: "2024-01-16",
  },
  {
    id: 2,
    userName: "이**",
    productName: "iPhone 15 Pro Max",
    rating: 5,
    content: "상담도 친절하고 가격도 최저가였어요. 강추합니다!",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    userName: "박**",
    productName: "Galaxy Z Flip5",
    rating: 5,
    content: "플립5 0원에 개통했어요~ 대만족입니다 ㅎㅎ",
    createdAt: "2024-01-14",
  },
  {
    id: 4,
    userName: "최**",
    productName: "Galaxy S24+",
    rating: 4,
    content: "배송이 조금 늦었지만 상품은 만족스럽습니다.",
    createdAt: "2024-01-13",
  },
  {
    id: 5,
    userName: "정**",
    productName: "iPhone 15",
    rating: 5,
    content: "카톡 상담으로 간편하게 신청했어요. 추천합니다!",
    createdAt: "2024-01-12",
  },
  {
    id: 6,
    userName: "강**",
    productName: "Galaxy A54",
    rating: 5,
    content: "효도폰으로 구매했는데 부모님도 만족하세요~",
    createdAt: "2024-01-11",
  },
];

export const plans: Plan[] = [
  // SKT
  {
    id: 1,
    carrier: "SKT",
    name: "5G 프리미어 플러스",
    monthlyFee: 105000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 2,
    carrier: "SKT",
    name: "5G 프리미어 에센셜",
    monthlyFee: 85000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 3,
    carrier: "SKT",
    name: "5G 스탠다드",
    monthlyFee: 69000,
    data: "150GB",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 4,
    carrier: "SKT",
    name: "5G 베이직",
    monthlyFee: 55000,
    data: "50GB",
    call: "무제한",
    message: "무제한",
  },
  // KT
  {
    id: 5,
    carrier: "KT",
    name: "5G 슈퍼플랜 프리미어",
    monthlyFee: 100000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 6,
    carrier: "KT",
    name: "5G 슈퍼플랜",
    monthlyFee: 80000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 7,
    carrier: "KT",
    name: "5G 심플",
    monthlyFee: 65000,
    data: "100GB",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 8,
    carrier: "KT",
    name: "5G 라이트",
    monthlyFee: 52000,
    data: "36GB",
    call: "무제한",
    message: "무제한",
  },
  // LG U+
  {
    id: 9,
    carrier: "LGU+",
    name: "5G 프리미어 플러스",
    monthlyFee: 100000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 10,
    carrier: "LGU+",
    name: "5G 프리미어",
    monthlyFee: 80000,
    data: "무제한",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 11,
    carrier: "LGU+",
    name: "5G 스탠다드",
    monthlyFee: 65000,
    data: "110GB",
    call: "무제한",
    message: "무제한",
  },
  {
    id: 12,
    carrier: "LGU+",
    name: "5G 라이트",
    monthlyFee: 50000,
    data: "30GB",
    call: "무제한",
    message: "무제한",
  },
];

export const getActiveBanners = (): Banner[] => {
  const today = new Date().toISOString().split("T")[0];
  return banners
    .filter((b) => b.isActive && b.startDate <= today && b.endDate >= today)
    .sort((a, b) => a.order - b.order);
};

export const getPlansByCarrier = (carrier: string): Plan[] => {
  return plans.filter((p) => p.carrier === carrier);
};
