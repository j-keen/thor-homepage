"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check, Phone, MessageCircle } from "lucide-react";
import { getProductById } from "@/data/products";
import { getPlansByCarrier } from "@/data/banners";
import { Carrier, SubscriptionType, DiscountType } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(Number(params.id));

  const [selectedCarrier, setSelectedCarrier] = useState<Carrier>("SKT");
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionType>("번호이동");
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountType>("공시지원");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/phones" className="btn-primary">
            상품 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const plans = getPlansByCarrier(selectedCarrier);
  const currentPlan = plans[selectedPlan] || plans[0];

  const formatPrice = (price: number) => price.toLocaleString("ko-KR");

  return (
    <div className="min-h-screen bg-background-alt">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            href="/phones"
            className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
          >
            <ChevronLeft size={18} />
            상품 목록으로
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-8">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />
            </div>

            {/* Color Selection */}
            <div className="mt-6 pt-6 border-t border-border-light">
              <h3 className="font-medium mb-3">색상 선택</h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`relative w-10 h-10 rounded-full border-2 ${
                      selectedColor === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === index && (
                      <Check
                        size={16}
                        className={`absolute inset-0 m-auto ${
                          color.hex === "#1C1C1C" || color.hex === "#4A4A4A"
                            ? "text-white"
                            : "text-text-primary"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-text-muted">
                {product.colors[selectedColor].name}
              </p>
            </div>
          </div>

          {/* Product Info & Options */}
          <div className="space-y-6">
            {/* Product Title */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex gap-2 mb-2">
                {product.isHot && (
                  <span className="badge bg-red-500 text-white">HOT</span>
                )}
                {product.isBest && (
                  <span className="badge bg-secondary text-white">BEST</span>
                )}
              </div>
              <p className="text-text-muted">{product.brand}</p>
              <h1 className="text-2xl font-bold text-text-primary mt-1">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 pt-4 border-t border-border-light">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-text-muted line-through">
                    출고가 {formatPrice(product.originalPrice)}원
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold text-primary">
                    {product.finalPrice === 0 ? "0" : formatPrice(product.finalPrice)}
                  </span>
                  <span className="text-2xl font-bold text-primary">원</span>
                  <span className="badge badge-primary ml-2">
                    {product.discountRate}% 할인
                  </span>
                </div>
              </div>
            </div>

            {/* Options Selection */}
            <div className="bg-white rounded-2xl p-6 space-y-6">
              {/* Carrier */}
              <div>
                <h3 className="font-medium mb-3">통신사</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(["SKT", "KT", "LGU+"] as Carrier[]).map((carrier) => (
                    <button
                      key={carrier}
                      onClick={() => {
                        setSelectedCarrier(carrier);
                        setSelectedPlan(0);
                      }}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                        selectedCarrier === carrier
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {carrier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscription Type */}
              <div>
                <h3 className="font-medium mb-3">가입유형</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(["신규", "번호이동", "기기변경"] as SubscriptionType[]).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSubscription(type)}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                          selectedSubscription === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Discount Type */}
              <div>
                <h3 className="font-medium mb-3">할인유형</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(["공시지원", "선택약정"] as DiscountType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedDiscount(type)}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                        selectedDiscount === type
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <h3 className="font-medium mb-3">용량</h3>
                <div className="flex gap-3">
                  {product.storage.map((storage, index) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(index)}
                      className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                        selectedStorage === index
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan */}
              <div>
                <h3 className="font-medium mb-3">요금제</h3>
                <div className="space-y-2">
                  {plans.slice(0, 4).map((plan, index) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(index)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                        selectedPlan === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-sm text-text-muted">
                            데이터 {plan.data} / 통화 {plan.call}
                          </p>
                        </div>
                        <p className="font-bold">
                          월 {formatPrice(plan.monthlyFee)}원
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">결제 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">출고가</span>
                  <span>{formatPrice(product.originalPrice)}원</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>추가할인</span>
                  <span>-{formatPrice(product.additionalDiscount)}원</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>공시지원금</span>
                  <span>-{formatPrice(product.commonDiscount)}원</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between font-bold text-lg">
                  <span>실 구매가</span>
                  <span className="text-primary">
                    {formatPrice(product.finalPrice)}원
                  </span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>월 요금제</span>
                  <span>{formatPrice(currentPlan?.monthlyFee || 0)}원</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between font-bold">
                  <span>예상 월 납부금</span>
                  <span>{formatPrice(product.monthlyPayment + (currentPlan?.monthlyFee || 0))}원</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 btn-primary py-4 text-lg">
                신청하기
              </button>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold transition-colors"
              >
                <MessageCircle size={20} />
                상담
              </a>
              <a
                href="tel:070-4335-5624"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-semibold transition-colors"
              >
                <Phone size={20} />
                전화
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
