"use client";

import React from "react";
import { Search, Filter, RotateCcw, Sparkles } from "lucide-react";
import { MOCK_UNIVERSITIES, MOCK_DEPARTMENTS } from "@/data/mockData";

interface NoteFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedUniversity: string;
  onUniversityChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortBy: "popular" | "newest" | "upvotes";
  onSortByChange: (value: "popular" | "newest" | "upvotes") => void;
  onReset: () => void;
  totalCount: number;
}

export const NoteFilter: React.FC<NoteFilterProps> = ({
  search,
  onSearchChange,
  selectedUniversity,
  onUniversityChange,
  selectedDepartment,
  onDepartmentChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortByChange,
  onReset,
  totalCount,
}) => {
  const isFiltered = Boolean(
    search || selectedUniversity || selectedDepartment || selectedType
  );

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
      {/* Top Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ders kodu (örn: MAT101), konu veya başlık ara..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
        />
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Üniversite */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Üniversite
          </label>
          <select
            value={selectedUniversity}
            onChange={(e) => onUniversityChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tüm Üniversiteler</option>
            {MOCK_UNIVERSITIES.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Bölüm */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Bölüm
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tüm Bölümler</option>
            {MOCK_DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Not Türü */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            İçerik Türü
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">Tüm Türler</option>
            <option value="SUMMARY">Ders Özeti</option>
            <option value="PAST_EXAMS">Çıkmış Sorular</option>
            <option value="ROADMAP">Yol Haritası & Tavsiyeler</option>
            <option value="CHEAT_SHEET">Formül & Hızlı İpuçları</option>
            <option value="LAB_NOTES">Lab Notları & Kodlar</option>
          </select>
        </div>

        {/* Sıralama */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Sıralama
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="popular">En Çok Görüntülenen</option>
            <option value="upvotes">En Çok Beğenilen</option>
            <option value="newest">En Son Paylaşılan</option>
          </select>
        </div>
      </div>

      {/* Bottom Bar: Results Count & Reset */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-900">{totalCount}</span>
          <span>akademik kaynak listeleniyor</span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Filtreleri Temizle</span>
          </button>
        )}
      </div>
    </div>
  );
};
