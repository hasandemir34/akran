"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { NoteCard } from "@/components/notes/NoteCard";
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Search, 
  Zap, 
  Award,
  ShieldCheck,
  Star,
  ChevronRight,
  LogIn,
  MapPin
} from "lucide-react";
import { NoteUploadModal } from "@/components/notes/NoteUploadModal";
import { AuthModal } from "@/components/auth/AuthModal";

export default function HomePage() {
  const { publicNotes, currentUser } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("REGISTER");

  const openAuth = (mode: "LOGIN" | "REGISTER") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="space-y-20 pb-24 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-24">
        {/* Background Gradient Blurs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <MapPin className="h-3.5 w-3.5 text-emerald-600" />
            <span>Sakarya Üniversitesi (SAÜ) & SUBÜ Özel Akran Koçluğu Ağı</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Sakarya&apos;da 1. Sınıfta Yalnız Kalma.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              3. Sınıf Koçunla
            </span>{" "}
            Dersleri Başarıyla Geç.
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Akran, Esentepe Kampüsü ve SUBÜ&apos;deki 1. sınıf öğrencilerini aynı bölümdeki tecrübeli 3. sınıf akran koçlarıyla buluşturur. SAÜ ortak havuz sınav tüyoları, lab hazırlıkları ve <b>koçundan sana özel çalışma taktikleriyle</b> akademik başarıya ulaş.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {!currentUser ? (
              <>
                <button
                  onClick={() => openAuth("REGISTER")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-xl active:scale-95"
                >
                  <Users className="h-4 w-4" />
                  <span>Öğrenci Kaydı Aç (Ücretsiz)</span>
                </button>
                <button
                  onClick={() => openAuth("LOGIN")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
                >
                  <LogIn className="h-4 w-4 text-indigo-600" />
                  <span>Giriş Yap</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-xl active:scale-95"
                >
                  <span>Öğrenci Panelime Git</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/notes"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
                >
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <span>Not Havuzunu Gez</span>
                </Link>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>@sakarya.edu.tr & @subu.edu.tr Doğrulaması</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Herkese Açık & Danışana Özel Notlar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Esentepe Kütüphanesi & Online Dayanışma</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Neden Akran?
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900">
            Sakarya Üniversitelerine Özel Hibrit Model
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Klasik not sitelerinden farklı olarak SAÜ ve SUBÜ hocalarının sınav tarzlarını bilen koçlarla birebir çalışma imkanı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">SAÜ & SUBÜ Akran Eşleşmesi</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bölümünde aynı sıralardan geçmiş, MAT101 ve C laboratuvarlarını vermiş 3. sınıf öğrencileriyle birebir koçluk bağı kur.
            </p>
          </div>

          {/* Feature 2: Dual Visibility Notes */}
          <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/50 to-white p-8 shadow-md space-y-4 relative">
            <span className="absolute -top-3 right-6 rounded-full bg-indigo-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Özel Özellik
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Danışana Özel (Mentee-Only) Notlar</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Koçun sınav döneminde zorlandığın konulara özel soru tüyoları, lab hazırlık notları ve birebir yol haritaları hazırlar. Sadece senin paneline düşer.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Sakarya Not Havuzu</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Esentepe Kampüsü ve SUBÜ teknoloji sınıflarından çıkmış sınav soruları, formül kağıtları ve ders özetlerine tek tıkla eriş.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Community Notes Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sakarya Kampüsünden Öne Çıkan Kaynaklar</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Öğrencilerin En Çok Yararlandığı Notlar
            </h3>
          </div>

          <Link
            href="/notes"
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            <span>Tüm Not Havuzunu Gör ({publicNotes.length})</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicNotes.slice(0, 3).map((note) => (
            <NoteCard key={note.id} note={note} showVisibilityBadge={false} />
          ))}
        </div>
      </section>

      {/* 4. Future Expansion Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Genişletilebilir Altyapı
            </span>
            <h4 className="text-base font-bold text-slate-900">Başka bir üniversitede misin?</h4>
            <p className="text-xs text-slate-500 max-w-xl">
              Akran platformu şu an Sakarya (SAÜ ve SUBÜ) için özel olarak pilot yayındadır. Çok yakında İTÜ, ODTÜ, YTÜ ve diğer üniversiteler için de tek tıkla kampüs genişlemesi yapılacaktır.
            </p>
          </div>
          <button
            onClick={() => alert("Üniversite talep formunuz alındı! Yakında kampüsünüz sisteme eklendiğinde bilgilendirileceksiniz.")}
            className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            Üniversiteni Talep Et
          </button>
        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-8 sm:p-14 text-white shadow-xl shadow-indigo-900/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sen de Sakarya Akran Koçluğu Ailesine Katıl
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              İster 1. sınıf öğrencisi olarak SAÜ/SUBÜ derslerinde rehberlik al, ister 3. sınıf tecrübeli öğrenci olarak akranlarına destek ol!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openAuth("REGISTER")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-xs font-bold text-indigo-950 shadow-md hover:bg-indigo-50 transition"
            >
              <span>Hemen Kayıt Ol</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => openAuth("LOGIN")}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-900/60 border border-white/20 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-900 transition"
            >
              <span>Giriş Yap</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {isUploadOpen && (
        <NoteUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          defaultVisibility="PUBLIC"
        />
      )}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </div>
  );
}
