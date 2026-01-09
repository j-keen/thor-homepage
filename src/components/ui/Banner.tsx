"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner as BannerType } from "@/types";

interface BannerProps {
  banners: BannerType[];
}

export default function Banner({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-primary to-secondary overflow-hidden">
      {/* Banner Content */}
      <Link href={currentBanner.link} className="block h-full">
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="text-white z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {currentBanner.title}
            </h2>
            {currentBanner.subtitle && (
              <p className="text-xl md:text-2xl opacity-90 mb-6">
                {currentBanner.subtitle}
              </p>
            )}
            <span className="inline-block btn-outline border-white text-white hover:bg-white hover:text-primary">
              자세히 보기
            </span>
          </div>

          {/* Background Pattern */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform translate-x-1/4"></div>
          </div>
        </div>
      </Link>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
