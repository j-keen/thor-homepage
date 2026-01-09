"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  ShoppingCart,
  Users,
  FileText,
  Image,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { name: "대시보드", href: "/admin", icon: LayoutDashboard },
  { name: "상품 관리", href: "/admin/products", icon: Smartphone },
  { name: "주문 관리", href: "/admin/orders", icon: ShoppingCart },
  { name: "회원 관리", href: "/admin/users", icon: Users },
  { name: "게시판 관리", href: "/admin/boards", icon: FileText },
  { name: "배너 관리", href: "/admin/banners", icon: Image },
  { name: "설정", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-alt">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-text-primary transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-bold text-white">
            토르폰 <span className="text-primary">Admin</span>
          </Link>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              관
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">관리자</p>
              <p className="text-gray-400 text-sm">admin@thorphone.com</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            사이트로 이동
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-4 lg:px-8">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Page Title (mobile) */}
          <h1 className="lg:hidden font-bold text-lg">
            {navItems.find((item) =>
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            )?.name || "관리자"}
          </h1>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-background-alt rounded-lg">
              <Bell size={20} className="text-text-muted" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-background-alt rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                관
              </div>
              <span className="font-medium">관리자</span>
              <ChevronDown size={16} className="text-text-muted" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
