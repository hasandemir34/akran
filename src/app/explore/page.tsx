"use client";

import React, { useState } from "react";
import { MOCK_USERS, MOCK_UNIVERSITIES, MOCK_DEPARTMENTS } from "@/data/mockData";
import { User } from "@/types/user";
import { 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Building, 
  Briefcase, 
  Calendar,
  Send,
  UserCheck,
  Search
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ExplorePage() {
  const { currentUser } = useApp();
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [requestedMentorId, setRequestedMentorId] = useState<string | null>(null);

  // Mentorları listele
  const mentors = Object.values(MOCK_USERS).filter((u) => u.role === "MENTOR");

  const filteredMentors = mentors.filter((mentor) => {
    if (selectedUniversity && mentor.university !== selectedUniversity) return false;
    if (selectedDepartment && mentor.department !== selectedDepartment) return false;
    return true;
  });

  const handleRequestMentorship = (mentor: User) => {
    setRequestedMentorId(mentor.id);
    setTimeout(() => {
      alert(`Harika! ${mentor.name} koçuna eşleşme ve tanışma talebin başarıyla iletildi.`);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20">
              <Users className="h-3.5 w-3.5" />
              <span>Sakarya (SAÜ & SUBÜ) 3. Sınıf Akran Koçluğu Ağı</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Bölümündeki Tecrübeli Sakarya Koçlarını Keşfet
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Daha önce senin aldığın dersleri yüksek ortalamayla geçmiş, Esentepe hocalarının soru tarzını bilen ve Sakarya Teknokent staj deneyimi olan 3. sınıf akran koçlarından birebir mentorluk talep et.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Üniversite Filtresi
            </label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Tüm Üniversiteler</option>
              {MOCK_UNIVERSITIES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Bölüm Filtresi
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
            >
              <option value="">Tüm Bölümler</option>
              {MOCK_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => {
            const isRequested = requestedMentorId === mentor.id || mentor.matchedUserId === currentUser?.id;
            return (
              <div
                key={mentor.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-5"
              >
                {/* Header Profile */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="h-14 w-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{mentor.name}</h3>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                          <Award className="h-3 w-3" /> 3. Sınıf Koç
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {mentor.department} • {mentor.university}
                      </p>
                      {mentor.gpa && (
                        <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                          Genel Not Ortalaması (GANO): {mentor.gpa} / 4.00
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      {mentor.mentorProfile?.capacity || 2} Mentee Kontenjanı
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  &ldquo;{mentor.bio}&rdquo;
                </p>

                {/* Experiences */}
                {mentor.mentorProfile?.experiences && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>Deneyim & Kulüp Geçmişi</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.mentorProfile.experiences.map((exp) => (
                        <span
                          key={exp}
                          className="rounded-lg bg-indigo-50/70 border border-indigo-100 px-2.5 py-1 text-[11px] font-medium text-indigo-900"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Haftalık 1-e-1 online görüşme + Özel not desteği
                  </span>

                  <button
                    onClick={() => handleRequestMentorship(mentor)}
                    disabled={isRequested}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm ${
                      isRequested
                        ? "bg-emerald-100 text-emerald-800 cursor-default"
                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/25 active:scale-95"
                    }`}
                  >
                    {isRequested ? (
                      <>
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>Eşleşme Talebi İletildi</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Koçluk Talep Et</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
