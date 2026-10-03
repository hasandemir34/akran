"use client";

import React, { useState } from "react";
import { Note } from "@/types/note";
import { useApp } from "@/context/AppContext";
import { 
  ThumbsUp, 
  Eye, 
  Download, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Lock, 
  Globe, 
  MessageSquare,
  Award,
  Calendar,
  Building,
  Tag
} from "lucide-react";
import { NoteDetailModal } from "./NoteDetailModal";

interface NoteCardProps {
  note: Note;
  showVisibilityBadge?: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, showVisibilityBadge = true }) => {
  const { upvoteNote } = useApp();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      upvoteNote(note.id);
      setHasUpvoted(true);
    }
  };

  const isPrivate = note.visibility === "MENTEE_ONLY";

  // Renk kodlaması ders tipine göre
  const typeLabels: Record<string, { label: string; color: string }> = {
    SUMMARY: { label: "Ders Özeti", color: "bg-blue-50 text-blue-700 border-blue-200" },
    PAST_EXAMS: { label: "Çıkmış Sorular", color: "bg-amber-50 text-amber-700 border-amber-200" },
    ROADMAP: { label: "Yol Haritası", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    CHEAT_SHEET: { label: "Formül & İpuçları", color: "bg-purple-50 text-purple-700 border-purple-200" },
    LAB_NOTES: { label: "Lab Notu", color: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  const typeInfo = typeLabels[note.noteType] || { label: "Not", color: "bg-slate-50 text-slate-700 border-slate-200" };

  return (
    <>
      <div 
        onClick={() => setIsDetailOpen(true)}
        className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
          isPrivate 
            ? "border-indigo-300/80 bg-gradient-to-b from-indigo-50/40 via-white to-white ring-1 ring-indigo-500/20 shadow-indigo-100/50" 
            : "border-slate-200/80 hover:border-indigo-300"
        }`}
      >
        {/* Top Badges: Course Code, Type, Visibility */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Course Code Badge */}
              <span className="inline-flex items-center rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold tracking-wider text-white shadow-sm">
                {note.courseCode}
              </span>

              {/* Note Type Badge */}
              <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium border ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
            </div>

            {/* Visibility Badge */}
            {showVisibilityBadge && (
              <div>
                {isPrivate ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                    <Sparkles className="h-3 w-3 animate-spin text-amber-300" />
                    <span>Mentee Özel</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200">
                    <Globe className="h-3 w-3 text-slate-400" />
                    <span>Herkese Açık</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {note.title}
          </h3>

          {/* University & Department & Term */}
          <div className="mt-2 flex items-center flex-wrap gap-y-1 gap-x-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Building className="h-3.5 w-3.5 text-slate-400" />
              {note.university}
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
            <span>{note.term}</span>
          </div>

          {/* Preview / Snippet */}
          <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50/70 p-2 rounded-lg border border-slate-100">
            {note.content.replace(/[#*`]/g, "")}
          </p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-slate-200 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Author Info & Metrics */}
        <div className="mt-5 pt-3.5 border-t border-slate-100">
          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200">
                {note.authorName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                  {note.authorName}
                  {note.authorRole === "MENTOR" && (
                    <span className="inline-flex items-center gap-0.5 rounded bg-indigo-50 px-1 py-0.2 text-[9px] font-bold text-indigo-600 border border-indigo-200/60" title="3. Sınıf Akran Koçu">
                      <Award className="h-2.5 w-2.5" /> Koç
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-400">{note.authorDepartment}</p>
              </div>
            </div>

            {/* Metrics: Upvotes, Views, Comments */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <button
                onClick={handleUpvote}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition ${
                  hasUpvoted 
                    ? "bg-rose-50 text-rose-600 border border-rose-200" 
                    : "bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200/80"
                }`}
                title="Beğen"
              >
                <ThumbsUp className={`h-3.5 w-3.5 ${hasUpvoted ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{note.upvotes}</span>
              </button>

              <span className="flex items-center gap-1 text-[11px] text-slate-400" title="Görüntülenme">
                <Eye className="h-3.5 w-3.5" />
                {note.views}
              </span>

              <span className="flex items-center gap-1 text-[11px] text-slate-400" title="Yorum & Teşekkür">
                <MessageSquare className="h-3.5 w-3.5" />
                {note.commentsCount}
              </span>
            </div>
          </div>

          {/* Mentee target note note info if private */}
          {isPrivate && note.targetMenteeName && (
            <div className="mt-2.5 flex items-center justify-between rounded-lg bg-indigo-50/70 px-2.5 py-1 text-[11px] text-indigo-700 border border-indigo-100">
              <span className="font-medium">🎯 Özel Danışan Notu:</span>
              <span className="font-bold underline">{note.targetMenteeName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailOpen && (
        <NoteDetailModal 
          note={note} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </>
  );
};
