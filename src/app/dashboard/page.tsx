"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { MenteePrivateNotesTab } from "@/components/dashboard/MenteePrivateNotesTab";
import { MentorSharedNotesTab } from "@/components/dashboard/MentorSharedNotesTab";
import { NoteUploadModal } from "@/components/notes/NoteUploadModal";
import { 
  Sparkles, 
  FileText, 
  Users, 
  Eye, 
  ThumbsUp, 
  PlusCircle, 
  BookOpen, 
  GraduationCap, 
  Activity, 
  ArrowUpRight,
  FolderHeart,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Visibility } from "@/types/note";

export default function DashboardPage() {
  const { currentUser, privateMenteeNotes, userCreatedNotes, publicNotes, quickLoginAs } = useApp();

  const isMentor = currentUser?.role === "MENTOR";

  // Tab State: 'overview' | 'private_notes' | 'my_notes' | 'community'
  const [activeTab, setActiveTab] = useState<"overview" | "private_notes" | "my_notes">("overview");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [uploadDefaultVisibility, setUploadDefaultVisibility] = useState<Visibility>("PUBLIC");

  const openUploadModal = (visibility: Visibility = "PUBLIC") => {
    setUploadDefaultVisibility(visibility);
    setIsUploadOpen(true);
  };

  // İstatistik hesaplamaları
  const totalViews = userCreatedNotes.reduce((acc, n) => acc + n.views, 0);
  const totalUpvotes = userCreatedNotes.reduce((acc, n) => acc + n.upvotes, 0);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Öğrenci Paneline Giriş Yapmalısın</h2>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
          Koçunun sana özel bıraktığı notları görmek veya mentee&apos;lerine rehberlik etmek için Sakarya öğrenci hesabınla oturum aç.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition"
          >
            Giriş Yap / Kayıt Ol
          </Link>
          <button
            onClick={() => quickLoginAs("MENTEE")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            Hızlı Test: 1. Sınıf Mentee Olarak Aç
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome & Profile Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Hoş Geldin, {currentUser.name}
                </h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isMentor ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {isMentor ? "3. Sınıf Akran Koçu" : "1. Sınıf Danışan"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentUser.university} • {currentUser.department} ({currentUser.year}. Sınıf)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => openUploadModal(isMentor ? "MENTEE_ONLY" : "PUBLIC")}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{isMentor ? "Öğrencime Not Bırak" : "Not Paylaş"}</span>
            </button>
            <Link
              href="/notes"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span>Not Havuzu</span>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>{isMentor ? "Paylaştığım Notlar" : "Bana Özel Notlar"}</span>
              <FileText className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {isMentor ? userCreatedNotes.length : privateMenteeNotes.length}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" /> Aktif
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>{isMentor ? "Aktif Danışanım" : "Akran Koçum"}</span>
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {isMentor ? "1 Kişi" : "1 Koç"}
              </span>
              <span className="text-[11px] text-indigo-600 font-medium truncate max-w-[120px]">
                {currentUser.matchedUserName || "Eşleşti"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Görüntülenme</span>
              <Eye className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {isMentor ? totalViews : 48}
              </span>
              <span className="text-[11px] text-slate-400">okunma</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Toplam Beğeni</span>
              <ThumbsUp className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {isMentor ? totalUpvotes : 14}
              </span>
              <span className="text-[11px] text-rose-600 font-medium">öğrenci teşekkür etti</span>
            </div>
          </div>
        </div>

        {/* Peer Mentorship Status Card */}
        <MatchCard
          currentUser={currentUser}
          onOpenUploadModal={() => openUploadModal("MENTEE_ONLY")}
        />

        {/* Tabs Bar */}
        <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "overview"
                ? "border-indigo-600 text-indigo-600 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Genel Bakış & Akış</span>
          </button>

          <button
            onClick={() => setActiveTab("private_notes")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeTab === "private_notes"
                ? "border-indigo-600 text-indigo-600 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>
              {isMentor ? "Öğrencime Bıraktığım Notlar" : "Koçumdan Bana Özel Notlar"}
            </span>
            <span className="rounded-full bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-bold">
              {privateMenteeNotes.length}
            </span>
          </button>

          {isMentor && (
            <button
              onClick={() => setActiveTab("my_notes")}
              className={`pb-3 border-b-2 transition flex items-center gap-2 ${
                activeTab === "my_notes"
                  ? "border-indigo-600 text-indigo-600 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Yayınladığım Tüm Notlar</span>
              <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-xs font-bold">
                {userCreatedNotes.length}
              </span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick highlight of private notes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>
                      {isMentor ? "Danışanına Özel Hazırladığın İçerikler" : "Koçunun Senin İçin Bıraktığı Özel Notlar"}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isMentor
                      ? "Zeynep Yılmaz sadece bu içerikleri mentee panelinde görür."
                      : "Sınav tüyoları, hoca soru şablonları ve birebir koçluk dökümanları."}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab("private_notes")}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  <span>Tümünü Gör ({privateMenteeNotes.length})</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              {privateMenteeNotes.length > 0 ? (
                <MenteePrivateNotesTab
                  notes={privateMenteeNotes}
                  mentorName={currentUser.matchedUserName}
                />
              ) : (
                <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-8 text-center">
                  <p className="text-xs text-slate-600">Henüz özel not bulunmuyor.</p>
                </div>
              )}
            </div>

            {/* Mentorship Tips & Next Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Card 1: Mentorship goals */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  <span>Akademik Dönem Hedefleri</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>MAT101 Vize ortalamasını sınıf ortalamasının (%20) üzerinde tutmak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Haftalık 1 saat soru çözüm seansı ve lab kod incelemesi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    <span>Dönem sonu için minimum GANO hedefi: 3.50+</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Recommended Library Notes */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-600" />
                    <span>Bölümünden Popüler Notlar</span>
                  </h4>
                  <Link href="/notes" className="text-xs text-indigo-600 font-semibold">
                    Keşfet →
                  </Link>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {publicNotes.slice(0, 3).map((n) => (
                    <Link
                      key={n.id}
                      href="/notes"
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                    >
                      <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                        [{n.courseCode}] {n.title}
                      </span>
                      <span className="text-[11px] text-slate-400">{n.upvotes} beğeni</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "private_notes" && (
          <MenteePrivateNotesTab
            notes={privateMenteeNotes}
            mentorName={currentUser.matchedUserName}
          />
        )}

        {activeTab === "my_notes" && isMentor && (
          <MentorSharedNotesTab
            notes={userCreatedNotes}
            onOpenUpload={openUploadModal}
          />
        )}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <NoteUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          defaultVisibility={uploadDefaultVisibility}
        />
      )}
    </div>
  );
}
