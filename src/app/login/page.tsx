"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, MessageCircle } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"member" | "nonMember">("member");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    orderDate: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    console.log("Login:", formData);
  };

  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">토르폰</h1>
          </Link>
          <p className="text-text-muted mt-2">로그인하고 더 많은 혜택을 받으세요</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-light p-8">
          {/* Login Type Tabs */}
          <div className="flex border-b border-border-light mb-6">
            <button
              onClick={() => setLoginType("member")}
              className={`flex-1 pb-3 text-center font-medium transition-colors ${
                loginType === "member"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-muted"
              }`}
            >
              회원 로그인
            </button>
            <button
              onClick={() => setLoginType("nonMember")}
              className={`flex-1 pb-3 text-center font-medium transition-colors ${
                loginType === "nonMember"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-muted"
              }`}
            >
              비회원 조회
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {loginType === "member" ? (
              <>
                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input"
                    placeholder="이메일을 입력하세요"
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="input pr-12"
                      placeholder="비밀번호를 입력하세요"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) =>
                        setFormData({ ...formData, remember: e.target.checked })
                      }
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-text-muted">로그인 유지</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    휴대폰 번호
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="input"
                    placeholder="010-0000-0000"
                  />
                </div>

                {/* Order Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    신청일
                  </label>
                  <input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) =>
                      setFormData({ ...formData, orderDate: e.target.value })
                    }
                    className="input"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary py-3">
              {loginType === "member" ? "로그인" : "신청현황 조회"}
            </button>
          </form>

          {/* Social Login */}
          {loginType === "member" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-text-muted">
                    간편하게 시작하기
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-lg hover:bg-background-alt transition-colors">
                  <span className="w-5 h-5 bg-green-500 rounded-sm"></span>
                  <span className="font-medium">네이버</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors">
                  <MessageCircle size={20} />
                  <span className="font-medium">카카오</span>
                </button>
              </div>
            </>
          )}

          {/* Register Link */}
          {loginType === "member" && (
            <p className="text-center mt-6 text-sm text-text-muted">
              아직 회원이 아니신가요?{" "}
              <Link href="/register" className="text-primary hover:underline">
                회원가입
              </Link>
            </p>
          )}
        </div>

        {/* Info */}
        <p className="text-center mt-4 text-xs text-text-muted">
          서비스 이용을 위해 필요한 최소한의 개인정보만 수집합니다.
        </p>
      </div>
    </div>
  );
}
