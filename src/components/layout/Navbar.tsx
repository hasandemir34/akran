"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  BookOpen, 
  Users, 
  LayoutDashboard, 
  PlusCircle, 
  GraduationCap, 
  ChevronDown,
  LogIn,
  LogOut,
  UserCheck,
  Building
} from "lucide-react";
import { NoteUploadModal } from "@/components/notes/NoteUploadModal";
import { AuthModal } from "@/components/auth/AuthModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, switchUserRole, logout, isAuthenticated } = useApp();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const navLinks = [
    { name: "Not Havuzu", href: "/notes", icon: BookOpen },
    { name: "Koçları Keşfet", href: "/explore", icon: Users },
    { name: "Öğrenci Paneli", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-md shadow-indigo-500/25">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                    Akran
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60 hidden sm:inline-block">
                    Sakarya (SAÜ & SUBÜ)
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">Akran Koçluğu & Akademik Not Ağı</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-950/50 dark:text-indigo-400"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Center */}
          <div className="flex items-center gap-3">
            {/* Quick Upload Button */}
            {currentUser && (
              <button
                onClick={() => setIsUploadOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-md active:scale-95"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Not Paylaş</span>
              </button>
            )}

            {/* Authenticated State: Role Switcher & User Avatar */}
            {currentUser ? (
              <>
                {/* Role Switcher Demo Badge */}
                <div className="relative">
                  <button
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                    title="Rol Değiştir (Test İçin)"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-indigo-700 dark:text-indigo-400">
                      {currentUser.role === "MENTOR" ? "3. Sınıf Koç" : "1. Sınıf Mentee"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  {isRoleDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50 z-50 animate-in fade-in zoom-in-95 duration-100"
                      onMouseLeave={() => setIsRoleDropdownOpen(false)}
                    >
                      <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Aktif Sakarya Rolü
                      </div>

                      <button
                        onClick={() => {
                          switchUserRole("MENTEE");
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition ${
                          currentUser.role === "MENTEE" ? "bg-indigo-50 dark:bg-indigo-950/60" : "hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                          1.
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">1. Sınıf Mentee (Zeynep)</p>
                          <p className="text-[11px] text-slate-500">SAÜ Bilgisayar • Özel notları görür</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          switchUserRole("MENTOR");
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition mt-1 ${
                          currentUser.role === "MENTOR" ? "bg-indigo-50 dark:bg-indigo-950/60" : "hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold">
                          3.
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">3. Sınıf Koç (Eren)</p>
                          <p className="text-[11px] text-slate-500">SAÜ Bilgisayar • Öğrencisine not yazar</p>
                        </div>
                      </button>

                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between px-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsRoleDropdownOpen(false);
                          }}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Avatar */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-slate-200 p-0.5 hover:ring-2 hover:ring-indigo-500/20 transition"
                  title="Panelime Git"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Link>
              </>
            ) : (
              /* Unauthenticated State: Login / Register Buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthMode("LOGIN");
                    setIsAuthOpen(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Giriş Yap</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMode("REGISTER");
                    setIsAuthOpen(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition"
                >
                  <span>Kayıt Ol</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden border-t border-slate-200/80 px-4 py-2 bg-slate-50/50 justify-around text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 py-1 px-2 rounded font-medium ${
                  isActive ? "text-indigo-600 font-semibold" : "text-slate-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
          {currentUser ? (
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1 text-indigo-600 font-semibold"
            >
              <PlusCircle className="h-4 w-4" />
              Paylaş
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode("LOGIN");
                setIsAuthOpen(true);
              }}
              className="flex items-center gap-1 text-indigo-600 font-semibold"
            >
              <LogIn className="h-4 w-4" />
              Giriş
            </button>
          )}
        </div>
      </header>

      {/* Global Modals */}
      {isUploadOpen && <NoteUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </>
  );
};
