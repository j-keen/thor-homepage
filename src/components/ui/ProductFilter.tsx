"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  key: string;
  type: "checkbox" | "radio";
  options: FilterOption[];
}

const filterSections: FilterSection[] = [
  {
    title: "제조사",
    key: "brand",
    type: "checkbox",
    options: [
      { label: "삼성", value: "Samsung" },
      { label: "애플", value: "Apple" },
      { label: "LG", value: "LG" },
      { label: "기타", value: "Others" },
    ],
  },
  {
    title: "통신사",
    key: "carrier",
    type: "checkbox",
    options: [
      { label: "SKT", value: "SKT" },
      { label: "KT", value: "KT" },
      { label: "LG U+", value: "LGU+" },
    ],
  },
  {
    title: "가입유형",
    key: "subscriptionType",
    type: "checkbox",
    options: [
      { label: "신규가입", value: "신규" },
      { label: "번호이동", value: "번호이동" },
      { label: "기기변경", value: "기기변경" },
    ],
  },
  {
    title: "할인유형",
    key: "discountType",
    type: "radio",
    options: [
      { label: "공시지원금", value: "공시지원" },
      { label: "선택약정", value: "선택약정" },
    ],
  },
];

interface ProductFilterProps {
  filters: Record<string, string[]>;
  onFilterChange: (key: string, values: string[]) => void;
  onReset: () => void;
}

export default function ProductFilter({
  filters,
  onFilterChange,
  onReset,
}: ProductFilterProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    filterSections.map((s) => s.key)
  );

  const toggleSection = (key: string) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCheckboxChange = (key: string, value: string) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  const handleRadioChange = (key: string, value: string) => {
    onFilterChange(key, [value]);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v.length > 0);

  return (
    <div className="bg-white rounded-xl border border-border-light p-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-light">
        <h3 className="font-bold text-lg">필터</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-text-muted hover:text-primary flex items-center gap-1"
          >
            <X size={14} />
            초기화
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {filterSections.map((section) => (
          <div key={section.key} className="border-b border-border-light pb-4 last:border-0">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between py-2 font-medium text-text-primary"
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.key) ? (
                <ChevronUp size={18} className="text-text-muted" />
              ) : (
                <ChevronDown size={18} className="text-text-muted" />
              )}
            </button>

            {/* Section Options */}
            {expandedSections.includes(section.key) && (
              <div className="mt-2 space-y-2">
                {section.options.map((option) => {
                  const isChecked = (filters[section.key] || []).includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type={section.type}
                        name={section.key}
                        checked={isChecked}
                        onChange={() =>
                          section.type === "checkbox"
                            ? handleCheckboxChange(section.key, option.value)
                            : handleRadioChange(section.key, option.value)
                        }
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span
                        className={`text-sm ${
                          isChecked ? "text-primary font-medium" : "text-text-secondary"
                        } group-hover:text-primary`}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <h4 className="font-medium text-text-primary mb-3">가격대</h4>
        <div className="space-y-2">
          {[
            { label: "0원 (무료)", min: 0, max: 0 },
            { label: "1원 ~ 10만원", min: 1, max: 100000 },
            { label: "10만원 ~ 30만원", min: 100000, max: 300000 },
            { label: "30만원 이상", min: 300000, max: Infinity },
          ].map((range) => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary group-hover:text-primary">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
