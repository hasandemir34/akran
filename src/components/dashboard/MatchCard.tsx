"use client";

import React from "react";
import { User } from "@/types/user";
import { 
  Award, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Video, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2,
  Clock
} from "lucide-react";

interface MatchCardProps {
  currentUser: User;
  onOpenUploadModal?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ currentUser, onOpenUploadModal }) => {
  const isMentor = currentUser.role === "MENTOR";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Profile Details */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-2xl shadow-lg shadow-indigo-600/25">
              {isMentor ? "Z" : "E"}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] ring-2 ring-white">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                {isMentor ? "Eşleştiğin 1. Sınıf Danışanın" : "Atanan 3. Sınıf Akran Koçun"}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Aktif Eşleşme
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {isMentor ? "Zeynep Yılmaz" : "Eren Demir"}
            </h3>

            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span>{isMentor ? "1. Sınıf" : "3. Sınıf (GANO: 3.84)"}</span>
              <span>•</span>
              <span>İstanbul Teknik Üniversitesi</span>
              <span>•</span>
              <span>Bilgisayar Mühendisliği</span>
            </p>

            {/* Context Info */}
            <div className="pt-2 text-xs text-slate-600">
              {isMentor ? (
                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50/80 p-2 rounded-xl border border-amber-200/60">
                  <span className="font-semibold">⚠️ Zeynep&apos;in Destek İstediği Dersler:</span>
                  <span>MAT101, FZK101, C Programlama</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50/80 p-2 rounded-xl border border-indigo-200/60">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Eren sana özel ders notları ve vize taktikleri paylaşıyor.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap md:flex-col items-center sm:items-end gap-2.5 w-full md:w-auto">
          {isMentor && (
            <button
              onClick={onOpenUploadModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-purple-500 transition active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Zeynep&apos;e Özel Not Bırak</span>
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => alert("Görüntülü seans simülasyonu başlatılıyor...")}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <Video className="h-3.5 w-3.5 text-indigo-600" />
              <span>Görüşme Başlat</span>
            </button>
            <button
              onClick={() => alert("Mesajlaşma paneli açılıyor...")}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Mesaj At</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3" />
            <span>Haftalık senkron toplantı: Perşembe 17:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
