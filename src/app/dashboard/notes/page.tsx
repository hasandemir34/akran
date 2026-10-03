"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MenteePrivateNotesTab } from "@/components/dashboard/MenteePrivateNotesTab";
import { MentorSharedNotesTab } from "@/components/dashboard/MentorSharedNotesTab";
import { NoteUploadModal } from "@/components/notes/NoteUploadModal";
import { 
  Sparkles, 
  FileText, 
  Globe, 
  PlusCircle, 
  ArrowLeft, 
  Layers,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { Visibility } from "@/types/note";

export default function DashboardNotesPage() {
  const { currentUser, privateMenteeNotes, userCreatedNotes, publicNotes } = useApp();
  const isMentor = currentUser?.role === "MENTOR";

  const [activeTab, setActiveTab] = useState<"private" | "my_notes" | "all_public">(
    isMentor ? "my_notes" : "private"
  );
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [defaultVisibility, setDefaultVisibility] = useState<Visibility>("PUBLIC");

  const handleOpenUpload = (vis: Visibility = "PUBLIC") => {
    setDefaultVisibility(vis);
    setIsUploadOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Panele Geri Dön</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Öğrenci & Koç Not Yönetim Merkezi
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Özel mentee notlarını incele, koçunla döküman paylaş veya topluluk kütüphanesine katkı sun
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenUpload(isMentor ? "MENTEE_ONLY" : "PUBLIC")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-500 transition active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{isMentor ? "Öğrencime Özel Not Bırak" : "Yeni Not Yükle"}</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("private")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "private"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {isMentor ? "Öğrencime Özel Notlar" : "Koçumdan Bana Özel Notlar"} ({privateMenteeNotes.length})
            </span>
          </button>

          {isMentor && (
            <button
              onClick={() => setActiveTab("my_notes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "my_notes"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Yayınladığım Notlar ({userCreatedNotes.length})</span>
            </button>
          )}

          <Link
            href="/notes"
            className="ml-auto hidden sm:flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Genel Not Havuzuna Git →</span>
          </Link>
        </div>

        {/* Tab Views */}
        {activeTab === "private" && (
          <MenteePrivateNotesTab
            notes={privateMenteeNotes}
            mentorName={currentUser?.matchedUserName}
          />
        )}

        {activeTab === "my_notes" && isMentor && (
          <MentorSharedNotesTab
            notes={userCreatedNotes}
            onOpenUpload={handleOpenUpload}
          />
        )}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <NoteUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          defaultVisibility={defaultVisibility}
        />
      )}
    </div>
  );
}
