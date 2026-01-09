"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";
import { ProductCard, ProductFilter, Pagination } from "@/components/ui";
import { products, filterProducts } from "@/data/products";

function PhonesContent() {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");
  const filterParam = searchParams.get("filter");
  const categoryParam = searchParams.get("category");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    if (brandParam) initial.brand = [brandParam];
    return initial;
  });

  const itemsPerPage = 8;

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = filterProducts({
      brand: filters.brand,
      carrier: filters.carrier,
      subscriptionType: filters.subscriptionType,
    });

    // Apply URL params
    if (filterParam === "best") {
      result = result.filter((p) => p.isBest);
    } else if (filterParam === "hot") {
      result = result.filter((p) => p.isHot);
    }

    if (categoryParam) {
      result = result.filter((p) => p.category === categoryParam);
    }

    return result;
  }, [filters, filterParam, categoryParam]);

  // Paginate
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFilterChange = (key: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const getPageTitle = () => {
    if (brandParam === "Samsung") return "Galaxy 시리즈";
    if (brandParam === "Apple") return "iPhone 시리즈";
    if (filterParam === "best") return "베스트 상품";
    if (filterParam === "hot") return "핫딜 상품";
    if (categoryParam === "kids") return "키즈폰";
    return "전체 상품";
  };

  return (
    <div className="min-h-screen bg-background-alt">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">{getPageTitle()}</h1>
          <p className="text-text-muted mt-2">
            총 {filteredProducts.length}개의 상품
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-border-light p-4 mb-6">
              <div className="flex items-center justify-between">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 text-text-secondary hover:text-primary"
                >
                  <SlidersHorizontal size={18} />
                  필터
                </button>

                {/* Active Filters */}
                <div className="hidden lg:flex items-center gap-2 flex-wrap">
                  {Object.entries(filters).map(([key, values]) =>
                    values.map((value) => (
                      <span
                        key={`${key}-${value}`}
                        className="badge badge-primary flex items-center gap-1"
                      >
                        {value}
                        <button
                          onClick={() =>
                            handleFilterChange(
                              key,
                              values.filter((v) => v !== value)
                            )
                          }
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:bg-background-alt"
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "text-text-muted hover:bg-background-alt"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showDetails={viewMode === "grid"}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-text-muted text-lg">
                  조건에 맞는 상품이 없습니다.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 btn-outline"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border-light p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">필터</h3>
              <button onClick={() => setShowMobileFilter(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <ProductFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-text-muted">로딩 중...</p>
      </div>
    </div>
  );
}

export default function PhonesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PhonesContent />
    </Suspense>
  );
}
