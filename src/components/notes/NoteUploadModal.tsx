"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { NoteType, Visibility } from "@/types/note";
import { 
  X, 
  UploadCloud, 
  Sparkles, 
  Globe, 
  Lock, 
  FileText, 
  Link as LinkIcon, 
  CheckCircle,
  HelpCircle,
  Tag
} from "lucide-react";
import { MOCK_UNIVERSITIES, MOCK_DEPARTMENTS } from "@/data/mockData";

interface NoteUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVisibility?: Visibility;
}

export const NoteUploadModal: React.FC<NoteUploadModalProps> = ({
  isOpen,
  onClose,
  defaultVisibility = "PUBLIC",
}) => {
  const { currentUser, addNote } = useApp();

  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [university, setUniversity] = useState(currentUser?.university || MOCK_UNIVERSITIES[0]);
  const [department, setDepartment] = useState(currentUser?.department || MOCK_DEPARTMENTS[0]);
  const [term, setTerm] = useState("1. Sınıf Güz");
  const [noteType, setNoteType] = useState<NoteType>("SUMMARY");
  const [contentType, setContentType] = useState<"MARKDOWN" | "EXTERNAL_LINK" | "PDF">("MARKDOWN");
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(defaultVisibility);
  const [tagsInput, setTagsInput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !courseCode || !content) {
      alert("Lütfen başlık, ders kodu ve not içeriğini eksiksiz doldurun.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter((t) => t.length > 0);

    // Otomatik temel etiketler ekle
    if (tags.length === 0) {
      tags.push(courseCode.toLowerCase(), "not", "ders");
    }

    addNote({
      title,
      courseCode: courseCode.toUpperCase().trim(),
      courseName: courseName || courseCode,
      university,
      department,
      term,
      noteType,
      contentType,
      content,
      fileUrl: fileUrl.trim() || undefined,
      visibility,
      targetMenteeId: visibility === "MENTEE_ONLY" ? (currentUser?.matchedUserId || "mentee-1") : undefined,
      targetMenteeName: visibility === "MENTEE_ONLY" ? (currentUser?.matchedUserName || "Danışan Öğrenci") : undefined,
      tags,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Akademik Not & Kaynak Paylaş
              </h3>
              <p className="text-xs text-slate-500">
                Topluluğa açık havuz veya danışanına özel çalışma rehberi oluştur
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Not Başarıyla Paylaşıldı!</h4>
            <p className="text-sm text-slate-500">
              {visibility === "MENTEE_ONLY" 
                ? `Danışanınız ${currentUser?.matchedUserName || 'öğrenciniz'} panelinde bu notu anında görebilecek.`
                : "Topluluk kütüphanesine eklendi, diğer öğrenciler faydalanabilir."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Görünürlük Seçimi (Önemli Odak Noktası) */}
            <div className="rounded-2xl border-2 border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/40 p-4">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2.5">
                <span>1. Görünürlük Düzeyi (Visibility)</span>
                <span className="text-[11px] font-normal text-indigo-600">Kimin görmesini istiyorsun?</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PUBLIC Option */}
                <div
                  onClick={() => setVisibility("PUBLIC")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    visibility === "PUBLIC"
                      ? "border-indigo-600 bg-white shadow-md shadow-indigo-600/10 ring-1 ring-indigo-600"
                      : "border-slate-200 bg-white/70 hover:border-slate-300"
                  }`}
                >
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    visibility === "PUBLIC" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Herkese Açık (PUBLIC)</span>
                      {visibility === "PUBLIC" && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Tüm öğrenciler arayabilir, görüntüleyebilir ve indirebilir.
                    </p>
                  </div>
                </div>

                {/* PRIVATE_MENTEE Option */}
                <div
                  onClick={() => setVisibility("MENTEE_ONLY")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    visibility === "MENTEE_ONLY"
                      ? "border-purple-600 bg-white shadow-md shadow-purple-600/10 ring-1 ring-purple-600"
                      : "border-slate-200 bg-white/70 hover:border-slate-300"
                  }`}
                >
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    visibility === "MENTEE_ONLY" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-purple-950">Danışanıma Özel (MENTEE_ONLY)</span>
                      {visibility === "MENTEE_ONLY" && <span className="h-2 w-2 rounded-full bg-purple-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Sadece eşleştiğin 1. sınıf mentee&apos;nin ({currentUser?.matchedUserName || "Zeynep Yılmaz"}) panelinde gözükür.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Not Başlığı *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: MAT101 Vize Taktikleri & Hoca Soru Tipleri"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Course Code & Name & Term */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ders Kodu *
                </label>
                <input
                  type="text"
                  required
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="MAT101, BLM203 vb."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold uppercase text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ders Adı
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Matematik 1, Veri Yapıları"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Dönem / Yıl
                </label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="1. Sınıf Güz">1. Sınıf Güz</option>
                  <option value="1. Sınıf Bahar">1. Sınıf Bahar</option>
                  <option value="2. Sınıf Güz">2. Sınıf Güz</option>
                  <option value="Genel / Tüm Yıllar">Genel / Tüm Yıllar</option>
                </select>
              </div>
            </div>

            {/* Note Type & University */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  İçerik Türü
                </label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as NoteType)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="SUMMARY">Ders Özeti</option>
                  <option value="PAST_EXAMS">Çıkmış Sınav Soruları</option>
                  <option value="ROADMAP">Yol Haritası & Tavsiyeler</option>
                  <option value="CHEAT_SHEET">Formül & İpuçları</option>
                  <option value="LAB_NOTES">Laboratuvar / Kodlama Notu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Üniversite
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {MOCK_UNIVERSITIES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content (Markdown / Rich Text) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Not Detayı, Açıklama veya Markdown Metni *
                </label>
                <span className="text-[10px] text-slate-400">Markdown destekler</span>
              </div>
              <textarea
                required
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ders notu özetini, hocanın üzerinde durduğu konuları veya tavsiyeleri buraya yazın..."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* File URL / Drive Link */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>Harici Döküman / PDF / Google Drive Bağlantısı (Opsiyonel)</span>
              </label>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://drive.google.com/... veya https://github.com/..."
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                <span>Etiketler (Virgülle ayırın)</span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="vize, final, özet, çıkmış sorular, taktikler"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition active:scale-95"
              >
                <UploadCloud className="h-4 w-4" />
                <span>
                  {visibility === "MENTEE_ONLY" ? "Danışanıma Özel Yayınla" : "Kütüphaneye Herkese Açık Yükle"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
