# Thor Phone Shop (토르폰)

휴대폰 판매 웹사이트 - Next.js 14, TypeScript, Tailwind CSS, Supabase

## 라이브 사이트

- **메인 사이트**: https://thor-homepage.vercel.app
- **관리자 페이지**: https://thor-homepage.vercel.app/admin

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 주요 기능

### 사용자 페이지
- 메인 홈페이지 (배너, 베스트/핫딜 상품)
- 상품 목록 (필터, 페이지네이션)
- 상품 상세 (옵션 선택, 가격 계산)
- 게시판 (공지사항, Q&A, FAQ)
- 약관 페이지

### 관리자 페이지
- 대시보드 (통계, 최근 주문)
- 상품 관리 (CRUD)
- 주문 관리
- 회원 관리
- 게시판 관리
- 배너 관리

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── admin/              # 관리자 페이지
│   ├── board/              # 게시판
│   ├── phones/             # 상품 목록/상세
│   ├── login/              # 로그인
│   └── terms/              # 약관
├── components/
│   ├── layout/             # Header, Footer
│   └── ui/                 # 재사용 컴포넌트
├── data/                   # Mock 데이터
├── lib/
│   └── supabase/           # Supabase 클라이언트 및 쿼리
└── types/                  # TypeScript 타입 정의
```

## 로컬 개발

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 Supabase 키 입력

# 개발 서버 실행
npm run dev
```

## 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 데이터베이스 설정

Supabase SQL Editor에서 `supabase/schema.sql` 실행

## 배포

Vercel에 자동 배포 (GitHub 연동)

```bash
vercel --prod
```

## TODO

- [ ] 관리자 페이지 Supabase CRUD 연동
- [ ] 관리자 로그인 인증
- [ ] 주문 기능 구현
- [ ] 이미지 업로드 (Supabase Storage)
- [ ] 카카오톡 상담 연동
