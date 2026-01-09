"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Phone, MessageCircle, User, FileText } from "lucide-react";

const navItems = [
  { name: "베스트", href: "/phones?filter=best" },
  { name: "키즈폰", href: "/phones?category=kids" },
  { name: "핫딜", href: "/phones?filter=hot" },
  { name: "Galaxy", href: "/phones?brand=Samsung" },
  { name: "iPhone", href: "/phones?brand=Apple" },
  { name: "고객센터", href: "/board/qna" },
  { name: "1:1 문의", href: "/board/inquiry" },
];

const popularKeywords = [
  "Galaxy S24 Ultra",
  "iPhone 15 Pro",
  "Galaxy Z Flip5",
  "iPhone 15",
  "Galaxy A54",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top Bar */}
      <div className="bg-background-alt border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 text-text-muted">
            <a
              href="tel:070-4335-5624"
              className="flex items-center gap-1 hover:text-primary"
            >
              <Phone size={14} />
              <span>070-4335-5624</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-primary"
            >
              <MessageCircle size={14} />
              <span>카카오톡 상담</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-1 text-text-muted hover:text-primary">
              <User size={14} />
              <span>로그인</span>
            </Link>
            <Link href="/mypage" className="flex items-center gap-1 text-text-muted hover:text-primary">
              <FileText size={14} />
              <span>신청현황</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">토르폰</h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="원하는 휴대폰을 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle size={18} />
              카카오톡 상담
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Popular Keywords */}
        <div className="hidden md:flex items-center gap-2 mt-3 text-sm">
          <span className="text-text-muted">인기검색어:</span>
          {popularKeywords.map((keyword, index) => (
            <Link
              key={keyword}
              href={`/phones?search=${encodeURIComponent(keyword)}`}
              className="text-text-secondary hover:text-primary"
            >
              {keyword}
              {index < popularKeywords.length - 1 && (
                <span className="ml-2 text-border">|</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-5 py-4 font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-border-light">
            <div className="relative">
              <input
                type="text"
                placeholder="원하는 휴대폰을 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Nav Items */}
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-text-secondary hover:bg-primary/5 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="p-4 border-t border-border-light">
            <a
              href="#"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              카카오톡 상담
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
