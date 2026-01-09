import { BoardPost, BoardType } from "@/types";

export const boardPosts: BoardPost[] = [
  // 공지사항
  {
    id: 1,
    type: "notice",
    title: "[필독] 2024년 새해 이벤트 안내",
    content: `안녕하세요, 토르폰입니다.

2024년 새해를 맞아 특별 이벤트를 진행합니다.

■ 이벤트 기간: 2024.01.01 ~ 2024.01.31

■ 이벤트 내용
1. 전 상품 추가 할인 10만원
2. 선착순 100명 사은품 증정
3. 리뷰 작성 시 스타벅스 기프티콘 증정

많은 참여 부탁드립니다.
감사합니다.`,
    author: "관리자",
    views: 1542,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    isNotice: true,
  },
  {
    id: 2,
    type: "notice",
    title: "[안내] 설 연휴 배송 안내",
    content: `안녕하세요, 토르폰입니다.

설 연휴 기간 배송 일정을 안내드립니다.

■ 연휴 기간: 2024.02.09 ~ 2024.02.12

■ 배송 안내
- 2/7(수) 이전 신청 건: 연휴 전 배송
- 2/8(목) 이후 신청 건: 연휴 후 순차 배송

불편을 드려 죄송합니다.`,
    author: "관리자",
    views: 856,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    isNotice: true,
  },
  // QnA
  {
    id: 3,
    type: "qna",
    category: "배송",
    title: "개통까지 얼마나 걸리나요?",
    content: "Galaxy S24 Ultra 신청했는데 개통까지 보통 얼마나 걸리나요?",
    author: "김**",
    views: 234,
    createdAt: "2024-01-16T14:30:00Z",
    updatedAt: "2024-01-16T16:00:00Z",
    answer: `안녕하세요, 토르폰입니다.

문의 주셔서 감사합니다.

신청 후 개통까지는 보통 1~3 영업일 소요됩니다.
번호이동의 경우 기존 통신사 해지 절차에 따라 추가 시간이 소요될 수 있습니다.

자세한 진행 상황은 마이페이지에서 확인 가능합니다.

감사합니다.`,
    answeredAt: "2024-01-16T16:00:00Z",
  },
  {
    id: 4,
    type: "qna",
    category: "할인",
    title: "공시지원금이랑 선택약정 차이가 뭔가요?",
    content: "할인 유형 선택하는데 공시지원금이랑 선택약정 중에 뭐가 더 유리한가요?",
    author: "이**",
    views: 567,
    createdAt: "2024-01-15T09:20:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    answer: `안녕하세요, 토르폰입니다.

좋은 질문 감사합니다.

■ 공시지원금
- 단말기 가격을 즉시 할인
- 약정 기간 중 요금제 변경 제한

■ 선택약정
- 24개월간 요금 25% 할인
- 요금제 자유롭게 변경 가능

고가 요금제를 오래 사용하실 경우 선택약정이,
단말기 가격 할인을 원하시면 공시지원금이 유리합니다.

추가 문의사항 있으시면 연락주세요!`,
    answeredAt: "2024-01-15T11:00:00Z",
  },
  {
    id: 5,
    type: "qna",
    category: "기타",
    title: "색상 변경 가능한가요?",
    content: "어제 신청했는데 색상 변경하고 싶어요. 가능한가요?",
    author: "박**",
    views: 89,
    createdAt: "2024-01-17T08:45:00Z",
    updatedAt: "2024-01-17T08:45:00Z",
  },
  // FAQ
  {
    id: 6,
    type: "faq",
    category: "결제",
    title: "결제는 어떻게 하나요?",
    content: "",
    author: "관리자",
    views: 2341,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
    answer: `토르폰은 현금 결제 없이 개통이 가능합니다.

단말기 대금은 24개월 할부로 통신요금과 함께 납부됩니다.
단, 할부 조건에 따라 일부 선입금이 필요할 수 있습니다.`,
  },
  {
    id: 7,
    type: "faq",
    category: "배송",
    title: "배송비가 있나요?",
    content: "",
    author: "관리자",
    views: 1892,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
    answer: `전 상품 무료 배송입니다.

제주/도서산간 지역도 추가 배송비 없이 무료로 배송해 드립니다.`,
  },
  {
    id: 8,
    type: "faq",
    category: "개통",
    title: "미성년자도 개통 가능한가요?",
    content: "",
    author: "관리자",
    views: 1456,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
    answer: `미성년자는 법정대리인(부모님) 동의하에 개통 가능합니다.

신청 시 법정대리인 정보를 함께 입력해 주시면,
담당자가 본인확인 절차를 안내해 드립니다.`,
  },
  // 이벤트
  {
    id: 9,
    type: "event",
    title: "Galaxy S24 시리즈 출시 기념 대란!",
    content: `Galaxy S24 시리즈 출시를 기념하여 초특가 할인 이벤트를 진행합니다.

■ 이벤트 기간: 2024.01.17 ~ 재고 소진 시

■ 혜택
- Galaxy S24 Ultra: 최대 100% 할인
- Galaxy S24+: 최대 100% 할인
- Galaxy S24: 최대 100% 할인

■ 추가 혜택
- 삼성 정품 케이스 증정
- 버즈2 Pro 동시 구매 시 50% 할인`,
    author: "관리자",
    views: 3456,
    createdAt: "2024-01-17T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z",
  },
  {
    id: 10,
    type: "event",
    title: "친구 추천하고 10만원 받자!",
    content: `친구 추천 이벤트를 진행합니다.

■ 이벤트 기간: 상시

■ 참여 방법
1. 마이페이지에서 추천 코드 확인
2. 친구에게 추천 코드 공유
3. 친구가 개통 완료 시 양측 모두 혜택 지급

■ 혜택
- 추천인: 10만원 캐시백
- 피추천인: 5만원 추가 할인`,
    author: "관리자",
    views: 2100,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z",
  },
];

export const getPostById = (id: number): BoardPost | undefined => {
  return boardPosts.find((p) => p.id === id);
};

export const getPostsByType = (type: BoardType): BoardPost[] => {
  return boardPosts.filter((p) => p.type === type);
};

export const getNotices = (): BoardPost[] => {
  return boardPosts.filter((p) => p.type === "notice");
};

export const getFAQs = (): BoardPost[] => {
  return boardPosts.filter((p) => p.type === "faq");
};

export const getQnAs = (): BoardPost[] => {
  return boardPosts.filter((p) => p.type === "qna");
};

export const getEvents = (): BoardPost[] => {
  return boardPosts.filter((p) => p.type === "event");
};

export const boardTypeLabels: Record<BoardType, string> = {
  notice: "공지사항",
  qna: "Q&A",
  faq: "자주 묻는 질문",
  inquiry: "1:1 문의",
  event: "이벤트",
  review: "구매후기",
};
