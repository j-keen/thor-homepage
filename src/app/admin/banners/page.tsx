"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { Modal } from "@/components/ui";
import { banners } from "@/data/banners";
import { Banner } from "@/types";

export default function AdminBannersPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link: "",
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const handleNew = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      link: "",
      isActive: true,
      startDate: "",
      endDate: "",
    });
    setShowModal(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      link: banner.link,
      isActive: banner.isActive,
      startDate: banner.startDate,
      endDate: banner.endDate,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit:", formData, editingBanner?.id);
    setShowModal(false);
  };

  const toggleActive = (bannerId: number) => {
    console.log("Toggle active:", bannerId);
  };

  const handleDelete = (bannerId: number) => {
    console.log("Delete:", bannerId);
  };

  const activeBanners = banners.filter((b) => b.isActive);
  const inactiveBanners = banners.filter((b) => !b.isActive);

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">배너 관리</h1>
          <p className="text-text-muted mt-1">
            활성 {activeBanners.length}개 / 비활성 {inactiveBanners.length}개
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={20} />
          새 배너 추가
        </button>
      </div>

      {/* Active Banners */}
      <div className="mb-8">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Eye size={18} className="text-green-500" />
          활성 배너
        </h2>
        <div className="space-y-4">
          {activeBanners.length > 0 ? (
            activeBanners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-xl border border-border-light p-4 flex items-center gap-4"
              >
                {/* Drag Handle */}
                <button className="p-2 cursor-grab text-text-muted hover:text-text-primary">
                  <GripVertical size={20} />
                </button>

                {/* Banner Preview */}
                <div className="w-40 h-24 bg-gradient-to-r from-primary to-secondary rounded-lg flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                    {banner.title}
                  </div>
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg">{banner.title}</h3>
                  {banner.subtitle && (
                    <p className="text-text-muted">{banner.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                    <span>링크: {banner.link}</span>
                    <span>
                      기간: {formatDate(banner.startDate)} ~{" "}
                      {formatDate(banner.endDate)}
                    </span>
                  </div>
                </div>

                {/* Order */}
                <div className="text-center px-4">
                  <p className="text-2xl font-bold text-primary">{banner.order}</p>
                  <p className="text-xs text-text-muted">순서</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="비활성화"
                  >
                    <EyeOff size={18} className="text-red-500" />
                  </button>
                  <button
                    onClick={() => handleEdit(banner)}
                    className="p-2 hover:bg-background-alt rounded-lg"
                    title="수정"
                  >
                    <Edit size={18} className="text-text-muted" />
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="삭제"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-border-light p-8 text-center text-text-muted">
              활성화된 배너가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Inactive Banners */}
      {inactiveBanners.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <EyeOff size={18} className="text-gray-400" />
            비활성 배너
          </h2>
          <div className="space-y-4">
            {inactiveBanners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-xl border border-border-light p-4 flex items-center gap-4 opacity-60"
              >
                {/* Banner Preview */}
                <div className="w-40 h-24 bg-gray-300 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold text-sm text-center p-2">
                    {banner.title}
                  </div>
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg">{banner.title}</h3>
                  {banner.subtitle && (
                    <p className="text-text-muted">{banner.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                    <span>
                      기간: {formatDate(banner.startDate)} ~{" "}
                      {formatDate(banner.endDate)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className="p-2 hover:bg-green-50 rounded-lg"
                    title="활성화"
                  >
                    <Eye size={18} className="text-green-500" />
                  </button>
                  <button
                    onClick={() => handleEdit(banner)}
                    className="p-2 hover:bg-background-alt rounded-lg"
                    title="수정"
                  >
                    <Edit size={18} className="text-text-muted" />
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 hover:bg-red-50 rounded-lg"
                    title="삭제"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingBanner ? "배너 수정" : "새 배너 추가"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">제목 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input"
              placeholder="배너 제목"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">부제목</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              className="input"
              placeholder="배너 부제목"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">링크 URL *</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="input"
              placeholder="/phones?brand=Samsung"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">시작일 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">종료일 *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">배너 이미지</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <p className="text-text-muted text-sm">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-text-muted text-xs mt-1">
                권장 크기: 1920x500px
              </p>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-primary rounded"
            />
            <span>활성화</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 btn-outline"
            >
              취소
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {editingBanner ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
