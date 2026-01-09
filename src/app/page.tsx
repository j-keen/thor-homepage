import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Banner, ProductCard, ReviewCard } from "@/components/ui";
import { products, getBestProducts, getHotProducts, getProductsByBrand } from "@/data/products";
import { banners, reviews } from "@/data/banners";

export default function HomePage() {
  const bestProducts = getBestProducts().slice(0, 4);
  const hotProducts = getHotProducts().slice(0, 4);
  const samsungProducts = getProductsByBrand("Samsung").slice(0, 4);
  const appleProducts = getProductsByBrand("Apple").slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <Banner banners={banners.filter((b) => b.isActive)} />

      {/* Best Deal Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">토르폰 BEST DEAL</h2>
            <Link
              href="/phones?filter=best"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              더보기
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deal Section */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0 flex items-center gap-2">
              <span className="text-red-500">🔥</span>
              토르폰 핫딜
              <span className="text-red-500">🔥</span>
            </h2>
            <Link
              href="/phones?filter=hot"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              더보기
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Samsung Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">Galaxy 특가</h2>
            <Link
              href="/phones?brand=Samsung"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              더보기
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {samsungProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Apple Section */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">iPhone 특가</h2>
            <Link
              href="/phones?brand=Apple"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              더보기
              <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {appleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="section-title mb-2">고객 후기</h2>
            <p className="text-text-muted">실제 고객님들의 생생한 후기입니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 상담받으세요!
          </h2>
          <p className="text-lg opacity-90 mb-8">
            카카오톡으로 간편하게 상담받고, 최저가로 개통하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              카카오톡 상담
            </a>
            <a href="tel:070-4335-5624" className="btn-secondary">
              전화 상담 070-4335-5624
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
