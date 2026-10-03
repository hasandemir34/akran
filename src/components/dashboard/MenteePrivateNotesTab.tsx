"use client";

import React, { useState } from "react";
import { Note } from "@/types/note";
import { NoteCard } from "@/components/notes/NoteCard";
import { 
  Sparkles, 
  Lock, 
  BookMarked, 
  Search, 
  GraduationCap, 
  HelpCircle,
  FileCheck
} from "lucide-react";

interface MenteePrivateNotesTabProps {
  notes: Note[];
  mentorName?: string;
}

export const MenteePrivateNotesTab: React.FC<MenteePrivateNotesTabProps> = ({
  notes,
  mentorName = "Eren Demir",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = notes.filter((n) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.courseCode.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Informative Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 sm:p-8 text-white shadow-lg shadow-indigo-950/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Sadece Sana Özel Çalışma Alanı</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Koçun {mentorName} Tarafından Senin İçin Hazırlanan Notlar
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Zorlandığın dersler, yaklaşan vize/finaller ve haftalık koçluk görüşmelerinize istinaden mentörünün birebir sana özel bıraktığı dökümanlar, formüller ve soru çözüm stratejileri.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="text-center px-2">
              <span className="block text-2xl font-black text-amber-300">{notes.length}</span>
              <span className="text-[11px] text-indigo-200">Özel Kaynak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Özel notlarımda ara (örn: MAT101)..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Toplam <b>{filtered.length}</b> özel not bulundu
        </div>
      </div>

      {/* Notes Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} showVisibilityBadge={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/30 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 mb-4">
            <BookMarked className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {searchTerm ? "Aramaya uygun özel not bulunamadı" : "Henüz sana özel bir not bırakılmamış"}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Koçun ile haftalık seansında eksik olduğun dersleri belirlediğinde sana özel çalışma dökümanları ve taktikler burada listelenecektir.
          </p>
        </div>
      )}
    </div>
  );
};
