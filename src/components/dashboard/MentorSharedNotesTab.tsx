"use client";

import React, { useState } from "react";
import { Note } from "@/types/note";
import { NoteCard } from "@/components/notes/NoteCard";
import { 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Globe, 
  Layers, 
  Eye, 
  ThumbsUp,
  Download
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface MentorSharedNotesTabProps {
  notes: Note[];
  onOpenUpload: (defaultVisibility?: "PUBLIC" | "MENTEE_ONLY") => void;
}

export const MentorSharedNotesTab: React.FC<MentorSharedNotesTabProps> = ({
  notes,
  onOpenUpload,
}) => {
  const { deleteNote } = useApp();
  const [filterType, setFilterType] = useState<"ALL" | "PUBLIC" | "MENTEE_ONLY">("ALL");

  const filteredNotes = notes.filter((n) => {
    if (filterType === "ALL") return true;
    return n.visibility === filterType;
  });

  const publicCount = notes.filter((n) => n.visibility === "PUBLIC").length;
  const privateCount = notes.filter((n) => n.visibility === "MENTEE_ONLY").length;

  return (
    <div className="space-y-6">
      {/* Action and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Tümü ({notes.length})
          </button>
          <button
            onClick={() => setFilterType("MENTEE_ONLY")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === "MENTEE_ONLY"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Mentee Özel ({privateCount})</span>
          </button>
          <button
            onClick={() => setFilterType("PUBLIC")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === "PUBLIC"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Herkese Açık ({publicCount})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onOpenUpload("MENTEE_ONLY")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Danışanıma Özel Not</span>
          </button>
          <button
            onClick={() => onOpenUpload("PUBLIC")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Genel Not Ekle</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="relative group">
              <NoteCard note={note} showVisibilityBadge={true} />
              
              {/* Quick Delete Control for Author */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`"${note.title}" başlıklı notu silmek istediğinize emin misiniz?`)) {
                    deleteNote(note.id);
                  }
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/90 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition z-20"
                title="Notu Sil"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <Layers className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-800">Bu kategoride henüz not yok</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Yukarıdaki butonları kullanarak 1. sınıf öğrencilerin için özel döküman veya üniversite geneli için genel not yayınlayabilirsin.
          </p>
        </div>
      )}
    </div>
  );
};
