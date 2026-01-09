"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, X, Plus } from "lucide-react";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "Samsung",
    category: "flagship",
    originalPrice: "",
    additionalDiscount: "",
    commonDiscount: "",
    monthlyPayment: "",
    storage: ["256GB"],
    isHot: false,
    isBest: false,
  });

  const [colors, setColors] = useState([{ name: "", hex: "#000000" }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit:", { ...formData, colors });
  };

  const addColor = () => {
    setColors([...colors, { name: "", hex: "#000000" }]);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const updated = [...colors];
    updated[index][field] = value;
    setColors(updated);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-text-muted hover:text-primary mb-4"
        >
          <ChevronLeft size={18} />
          상품 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">새 상품 등록</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <h2 className="font-bold text-lg mb-4">기본 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input"
                    placeholder="Galaxy S24 Ultra"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      브랜드 *
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="input"
                    >
                      <option value="Samsung">삼성</option>
                      <option value="Apple">애플</option>
                      <option value="LG">LG</option>
                      <option value="Others">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      카테고리 *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="input"
                    >
                      <option value="flagship">플래그십</option>
                      <option value="foldable">폴더블</option>
                      <option value="mid-range">중급형</option>
                      <option value="budget">보급형</option>
                      <option value="kids">키즈폰</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <h2 className="font-bold text-lg mb-4">가격 설정</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    출고가 *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: e.target.value })
                      }
                      className="input pr-12"
                      placeholder="1,787,400"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                      원
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      추가 할인
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.additionalDiscount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalDiscount: e.target.value,
                          })
                        }
                        className="input pr-12"
                        placeholder="500,000"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                        원
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      공시지원금
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.commonDiscount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            commonDiscount: e.target.value,
                          })
                        }
                        className="input pr-12"
                        placeholder="800,000"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                        원
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    월 납부금
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.monthlyPayment}
                      onChange={(e) =>
                        setFormData({ ...formData, monthlyPayment: e.target.value })
                      }
                      className="input pr-12"
                      placeholder="65,000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                      원
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">색상 옵션</h2>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  색상 추가
                </button>
              </div>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColor(index, "hex", e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColor(index, "name", e.target.value)}
                      className="input flex-1"
                      placeholder="색상명 (예: 티타늄 블랙)"
                    />
                    {colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="p-2 hover:bg-red-50 rounded-lg"
                      >
                        <X size={18} className="text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <h2 className="font-bold text-lg mb-4">상품 이미지</h2>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload size={40} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-muted text-sm mb-2">
                  이미지를 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-text-muted text-xs">PNG, JPG (최대 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="mt-4 inline-block btn-outline cursor-pointer"
                >
                  파일 선택
                </label>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <h2 className="font-bold text-lg mb-4">추가 옵션</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isHot}
                    onChange={(e) =>
                      setFormData({ ...formData, isHot: e.target.checked })
                    }
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>HOT 상품으로 표시</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBest}
                    onChange={(e) =>
                      setFormData({ ...formData, isBest: e.target.checked })
                    }
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span>BEST 상품으로 표시</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-border-light p-6">
              <div className="space-y-3">
                <button type="submit" className="w-full btn-primary">
                  상품 등록
                </button>
                <Link
                  href="/admin/products"
                  className="block w-full text-center btn-outline"
                >
                  취소
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
