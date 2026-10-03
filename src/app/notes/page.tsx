"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteFilter } from "@/components/notes/NoteFilter";
import { 
  BookOpen, 
  Sparkles, 
  PlusCircle, 
  FilterX, 
  GraduationCap, 
  Compass,
  FileCheck2,
  TrendingUp
} from "lucide-react";
import { NoteUploadModal } from "@/components/notes/NoteUploadModal";

export default function NotesPage() {
  const { publicNotes } = useApp();

  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "upvotes">("popular");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filtreleme mantığı - Sadece PUBLIC notlar
  const filteredNotes = useMemo(() => {
    return publicNotes
      .filter((note) => {
        // Arama sorgusu (Ders kodu, Başlık, Etiketler)
        if (search) {
          const q = search.toLowerCase();
          const matchCode = note.courseCode.toLowerCase().includes(q);
          const matchTitle = note.title.toLowerCase().includes(q);
          const matchCourseName = note.courseName.toLowerCase().includes(q);
          const matchTag = note.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchCode && !matchTitle && !matchCourseName && !matchTag) {
            return false;
          }
        }

        // Üniversite
        if (selectedUniversity && note.university !== selectedUniversity) {
          return false;
        }

        // Bölüm
        if (selectedDepartment && note.department !== selectedDepartment) {
          return false;
        }

        // İçerik Türü
        if (selectedType && note.noteType !== selectedType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return b.views - a.views;
        }
        if (sortBy === "upvotes") {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
  }, [publicNotes, search, selectedUniversity, selectedDepartment, selectedType, sortBy]);

  const handleReset = () => {
    setSearch("");
    setSelectedUniversity("");
    setSelectedDepartment("");
    setSelectedType("");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl shadow-indigo-950/20">
          {/* Decorative Glow */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-md border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              <span>Sakarya Üniversitesi & SUBÜ Akademik Not Havuzu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              SAÜ & SUBÜ&apos;nün En İyi Ders Notları ve Çıkmış Soruları
            </h1>

            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-2xl">
              Esentepe Kampüsü ve SUBÜ teknoloji sınıflarından doğrulanmış vize/final çıkmışları, formül kağıtları ve özetler. Sakarya&apos;daki 1. ve 3. sınıf öğrencilerinin katkılarıyla büyüyen açık kütüphane!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-indigo-950 shadow-md transition hover:bg-indigo-50 hover:shadow-lg active:scale-95"
              >
                <PlusCircle className="h-4 w-4 text-indigo-600" />
                <span>Bir Not da Sen Paylaş</span>
              </button>

              <div className="flex items-center gap-4 text-xs text-indigo-200">
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-cyan-400" />
                  <span>{publicNotes.length} Aktif Kaynak</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Doğrulanmış Öğrenci Notları</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <NoteFilter
          search={search}
          onSearchChange={setSearch}
          selectedUniversity={selectedUniversity}
          onUniversityChange={setSelectedUniversity}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onReset={handleReset}
          totalCount={filteredNotes.length}
        />

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} showVisibilityBadge={false} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
              <FilterX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Arama kriterlerine uygun not bulunamadı
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Farklı bir arama kelimesi veya üniversite/bölüm filtresi seçebilir, ya da bu ders için ilk notu sen yükleyebilirsin!
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleReset}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Filtreleri Temizle
              </button>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-sm"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Bu Derse Not Ekle</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <NoteUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          defaultVisibility="PUBLIC"
        />
      )}
    </div>
  );
}
