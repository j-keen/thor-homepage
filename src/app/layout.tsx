import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "토르폰 - 휴대폰 최저가 0원 개통",
  description: "Galaxy, iPhone 최저가 0원 개통! 토르폰에서 스마트하게 개통하세요.",
  keywords: "휴대폰, 스마트폰, Galaxy, iPhone, 0원폰, 공시지원금, 번호이동",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
