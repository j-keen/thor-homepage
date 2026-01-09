"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

export default function ProductCard({ product, showDetails = true }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  return (
    <Link href={`/phones/${product.id}`} className="card group block overflow-hidden">
      {/* Discount Badge */}
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <span className="badge bg-primary text-white text-sm font-bold px-3 py-1">
            {product.discountRate}%
          </span>
        </div>

        {/* Hot/Best Badge */}
        {(product.isHot || product.isBest) && (
          <div className="absolute top-3 right-3 z-10 flex gap-1">
            {product.isHot && (
              <span className="badge bg-red-500 text-white text-xs px-2 py-0.5">
                HOT
              </span>
            )}
            {product.isBest && (
              <span className="badge bg-secondary text-white text-xs px-2 py-0.5">
                BEST
              </span>
            )}
          </div>
        )}

        {/* Product Image */}
        <div className="aspect-square bg-background-alt p-4 group-hover:bg-background-dark transition-colors">
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Name */}
        <div className="mb-3">
          <span className="text-xs text-text-muted">{product.brand}</span>
          <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price Section */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted line-through">
              출고가 {formatPrice(product.originalPrice)}원
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">
              {product.finalPrice === 0 ? "0" : formatPrice(product.finalPrice)}
            </span>
            <span className="text-lg font-bold text-primary">원</span>
          </div>
        </div>

        {showDetails && (
          <>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.carrier.slice(0, 3).map((carrier) => (
                <span key={carrier} className="text-xs px-2 py-0.5 bg-background-alt rounded text-text-muted">
                  {carrier}
                </span>
              ))}
              <span className="text-xs px-2 py-0.5 bg-background-alt rounded text-text-muted">
                {product.subscriptionType[0]}
              </span>
            </div>

            {/* Discount Breakdown */}
            <div className="pt-3 border-t border-border-light space-y-1 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>추가할인</span>
                <span className="text-primary font-medium">-{formatPrice(product.additionalDiscount)}원</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>공시지원</span>
                <span className="text-primary font-medium">-{formatPrice(product.commonDiscount)}원</span>
              </div>
            </div>

            {/* Monthly Payment */}
            <div className="mt-3 pt-3 border-t border-border-light">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">월 납부금</span>
                <span className="font-bold text-text-primary">
                  {formatPrice(product.monthlyPayment)}원
                </span>
              </div>
            </div>
          </>
        )}

        {/* Apply Button */}
        <button className="mt-4 w-full btn-primary py-2.5 text-sm">
          신청하기
        </button>
      </div>
    </Link>
  );
}
