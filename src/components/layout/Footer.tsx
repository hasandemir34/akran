import React from "react";
import Link from "next/link";
import { GraduationCap, Heart, Shield, BookOpen, Sparkles, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Akran</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                Sakarya Özel
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Sakarya Üniversitesi (SAÜ) ve Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ) öğrencilerini bir araya getiren; 1. sınıf öğrencilerine tecrübeli akran koçluğu, ders notları ve sınav taktikleri sağlayan dayanışma platformu.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>@sakarya.edu.tr & @subu.edu.tr onaylı öğrenci topluluğu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/notes" className="hover:text-indigo-600 transition">
                  Topluluk Not Havuzu
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-indigo-600 transition">
                  Sakarya Koçlarını Keşfet
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition">
                  Öğrenci & Koç Paneli
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full dark:bg-indigo-950 dark:text-indigo-300">
                  <Sparkles className="h-3 w-3" /> Danışana Özel Notlar
                </span>
              </li>
            </ul>
          </div>

          {/* Sakarya Campus Focus */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-indigo-600" />
              <span>Aktif Üniversiteler</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="font-semibold text-slate-800">
                🟢 Sakarya Üniversitesi (SAÜ)
                <span className="block text-[11px] font-normal text-slate-400">Esentepe Kampüsü & Mühendislik</span>
              </li>
              <li className="font-semibold text-slate-800">
                🟢 Sakarya Uyg. Bilimler Üniv. (SUBÜ)
                <span className="block text-[11px] font-normal text-slate-400">Teknoloji & Yazılım Fakültesi (+1)</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 italic">
                * Talep doğrultusunda diğer üniversitelere açılmaya hazır modüler altyapı.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Akran. Sakarya Üniversiteleri Açık Kaynak Öğrenci Girişimi.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Öğrenciler tarafından öğrenciler için <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> ile geliştirildi.
          </p>
        </div>
      </div>
    </footer>
  );
};
