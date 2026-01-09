import Link from "next/link";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";

const footerLinks = [
  { name: "이용약관", href: "/terms/service" },
  { name: "쇼핑몰 이용약관", href: "/terms/shopping" },
  { name: "개인정보 처리방침", href: "/terms/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      {/* Customer Service Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">고객센터</h3>
              <div className="space-y-3">
                <a
                  href="tel:070-4335-5624"
                  className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary-light"
                >
                  <Phone size={24} />
                  070-4335-5624
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span>평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)</span>
                </div>
                <p className="text-gray-400 text-sm">
                  토/일/공휴일 휴무
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">빠른 상담</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary"
                >
                  <MessageCircle size={18} />
                  카카오톡 상담 (24시간)
                </a>
                <a
                  href="mailto:help@thorphone.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-primary"
                >
                  <Mail size={18} />
                  help@thorphone.com
                </a>
              </div>
            </div>

            {/* Bank Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">입금 계좌</h3>
              <div className="space-y-2 text-gray-400">
                <p>신한은행 110-123-456789</p>
                <p>예금주: (주)토르커뮤니케이션</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Company Details */}
          <div className="space-y-2 text-sm text-gray-400">
            <p className="text-white font-bold text-lg mb-3">토르폰</p>
            <p>상호: (주)토르커뮤니케이션 | 대표: 홍길동</p>
            <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2024-서울강남-0000호</p>
            <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
            <p>개인정보관리책임자: 김보안 (privacy@thorphone.com)</p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-primary text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© 2024 토르폰. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
