"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Pagination, Modal } from "@/components/ui";
import { products } from "@/data/products";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 10;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const formatPrice = (price: number) => price.toLocaleString("ko-KR");

  const handleDelete = (id: number) => {
    setSelectedProduct(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete
    console.log("Delete product:", selectedProduct);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">상품 관리</h1>
          <p className="text-text-muted mt-1">
            총 {filteredProducts.length}개의 상품
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary inline-flex items-center gap-2">
          <Plus size={20} />
          새 상품 등록
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border-light p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="상품명, 브랜드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
          <select className="input w-full sm:w-40">
            <option value="">전체 브랜드</option>
            <option value="Samsung">삼성</option>
            <option value="Apple">애플</option>
            <option value="LG">LG</option>
          </select>
          <select className="input w-full sm:w-40">
            <option value="">전체 상태</option>
            <option value="active">판매중</option>
            <option value="soldout">품절</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left">상품</th>
                <th className="table-cell text-center">브랜드</th>
                <th className="table-cell text-right">출고가</th>
                <th className="table-cell text-right">판매가</th>
                <th className="table-cell text-center">할인율</th>
                <th className="table-cell text-center">재고</th>
                <th className="table-cell text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative bg-background-alt rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/48";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="flex gap-1 mt-1">
                          {product.isHot && (
                            <span className="badge bg-red-100 text-red-700 text-xs">HOT</span>
                          )}
                          {product.isBest && (
                            <span className="badge bg-blue-100 text-blue-700 text-xs">BEST</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-center">{product.brand}</td>
                  <td className="table-cell text-right">
                    {formatPrice(product.originalPrice)}원
                  </td>
                  <td className="table-cell text-right font-medium text-primary">
                    {formatPrice(product.finalPrice)}원
                  </td>
                  <td className="table-cell text-center">
                    <span className="badge badge-primary">
                      {product.discountRate}%
                    </span>
                  </td>
                  <td className="table-cell text-center">
                    <span
                      className={
                        product.stock > 10
                          ? "text-green-600"
                          : product.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/phones/${product.id}`}
                        className="p-2 hover:bg-background-alt rounded-lg"
                        title="보기"
                      >
                        <Eye size={16} className="text-text-muted" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 hover:bg-background-alt rounded-lg"
                        title="수정"
                      >
                        <Edit size={16} className="text-text-muted" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg"
                        title="삭제"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {paginatedProducts.length === 0 && (
          <div className="py-16 text-center text-text-muted">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="상품 삭제"
        size="sm"
      >
        <p className="text-text-secondary mb-6">
          정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-background-alt"
          >
            취소
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </Modal>
    </div>
  );
}
