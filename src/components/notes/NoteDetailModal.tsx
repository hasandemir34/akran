"use client";

import React, { useState } from "react";
import { Note } from "@/types/note";
import { useApp } from "@/context/AppContext";
import { 
  X, 
  ThumbsUp, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Share2, 
  Check,
  Building,
  Calendar,
  Lock
} from "lucide-react";

interface NoteDetailModalProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({ note, isOpen, onClose }) => {
  const { upvoteNote, addComment, currentUser } = useApp();
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  if (!isOpen) return null;

  const isPrivate = note.visibility === "MENTEE_ONLY";

  const handleUpvote = () => {
    if (!hasUpvoted) {
      upvoteNote(note.id);
      setHasUpvoted(true);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(note.id, commentText.trim());
    setCommentText("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/notes?id=${note.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white tracking-wide">
              {note.courseCode}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {note.courseName}
            </span>

            {isPrivate ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                Danışana Özel
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                Herkese Açık Kütüphane
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
              title="Bağlantıyı Kopyala"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Kopyalandı" : "Paylaş"}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Author Meta */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">
              {note.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100">
              {/* Author Card */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-500/20">
                  {note.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 text-sm">{note.authorName}</span>
                    {note.authorRole === "MENTOR" && (
                      <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        3. Sınıf Koç
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {note.authorDepartment} • {note.university}
                  </p>
                </div>
              </div>

              {/* Upvote & Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpvote}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    hasUpvoted
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? "fill-white" : ""}`} />
                  <span>{note.upvotes} Beğeni</span>
                </button>

                {note.fileUrl && (
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Dökümanı Aç / İndir</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Target Mentee Notice if private */}
          {isPrivate && (
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200/80">
              <Lock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Bu kaynak {note.targetMenteeName || "Belirli Mentee"} için koçu {note.authorName} tarafından özel olarak hazırlanmıştır.
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Özel çalışma notları, sınav tüyoları ve 1-e-1 mentörlük yönlendirmelerini içerir.
                </p>
              </div>
            </div>
          )}

          {/* Markdown Content Area */}
          <div className="prose prose-slate max-w-none rounded-2xl bg-slate-50/50 p-6 border border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Not İçeriği & Ders Dökümanı
            </h4>
            <div className="text-sm text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
              {note.content}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Etiketler:</span>
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments / Feedback Section */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Soru, Cevap & Teşekkürler ({note.comments?.length || 0})
              </h4>
            </div>

            {/* Existing Comments */}
            <div className="space-y-3 mb-4">
              {note.comments && note.comments.length > 0 ? (
                note.comments.map((comment) => (
                  <div key={comment.id} className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-100">
                    <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        {comment.authorName}
                        {comment.authorRole === "MENTEE" ? (
                          <span className="text-[10px] text-emerald-600 font-normal bg-emerald-50 px-1.5 rounded">1. Sınıf</span>
                        ) : (
                          <span className="text-[10px] text-indigo-600 font-normal bg-indigo-50 px-1.5 rounded">3. Sınıf Koç</span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <p className="text-slate-600">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Henüz yorum yapılmamış. İlk teşekkür eden sen ol!</p>
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`${currentUser?.name || "Öğrenci"} olarak teşekkür veya soru yaz...`}
                className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Gönder</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
