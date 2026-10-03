"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  ArrowRight, 
  Zap, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Building,
  User,
  MapPin
} from "lucide-react";
import { MOCK_UNIVERSITIES, MOCK_DEPARTMENTS } from "@/data/mockData";
import { UserRole } from "@/types/user";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, quickLoginAs } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState(MOCK_UNIVERSITIES[0]);
  const [department, setDepartment] = useState(MOCK_DEPARTMENTS[0]);
  const [role, setRole] = useState<UserRole>("MENTEE");
  const [successMsg, setSuccessMsg] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "zeynep.yilmaz@sakarya.edu.tr");
    setSuccessMsg("Giriş başarılı! Panele yönlendiriliyorsunuz...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Lütfen ad ve e-posta alanlarını doldurun.");
      return;
    }
    register({
      name,
      email,
      university,
      department,
      role,
      year: role === "MENTEE" ? 1 : 3,
    });
    setSuccessMsg("Öğrenci hesabınız başarıyla oluşturuldu!");
    setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  };

  const handleQuick = (r: UserRole) => {
    quickLoginAs(r);
    setSuccessMsg(`${r === "MENTOR" ? "3. Sınıf Koç (Eren)" : "1. Sınıf Mentee (Zeynep)"} olarak giriş yapıldı!`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12 bg-slate-50/60">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900">Akran</span>
              <span className="ml-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Sakarya (SAÜ & SUBÜ)
              </span>
            </div>
          </Link>
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">
            Ana Sayfa
          </Link>
        </div>

        {successMsg && (
          <div className="m-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* FORGOT PASSWORD */}
        {isForgotMode ? (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Şifremi Unuttum</h2>
            <p className="text-xs text-slate-500">
              Kayıtlı @sakarya.edu.tr veya @subu.edu.tr e-posta adresinizi girin.
            </p>

            {resetSent ? (
              <div className="rounded-2xl bg-emerald-50 p-5 text-center space-y-3 border border-emerald-200">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Sıfırlama Bağlantısı Gönderildi</h4>
                <p className="text-xs text-slate-600">
                  {email || "öğrenci e-posta"} adresinize sıfırlama talimatları gönderildi.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setIsForgotMode(false);
                  }}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition"
                >
                  Giriş Ekranına Dön
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setResetSent(true); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Öğrenci E-postası
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="b231210000@sakarya.edu.tr"
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
                >
                  Sıfırlama Bağlantısı Gönder
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(false)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    ← Giriş Ekranına Dön
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : isRegisterMode ? (
          /* REGISTER */
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sakarya Öğrenci Kaydı</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                SAÜ veya SUBÜ öğrenci topluluğumuza katılın
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Rol Seçimi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("MENTEE")}
                    className={`p-2 rounded-xl border text-xs font-bold text-left ${
                      role === "MENTEE" ? "bg-emerald-50 border-emerald-600 text-emerald-800" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    1. Sınıf Mentee
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("MENTOR")}
                    className={`p-2 rounded-xl border text-xs font-bold text-left ${
                      role === "MENTOR" ? "bg-indigo-50 border-indigo-600 text-indigo-800" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    3. Sınıf Koç
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Öğrenci E-postası</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sakarya.edu.tr veya subu.edu.tr"
                  className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Üniversite</label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 px-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    {MOCK_UNIVERSITIES.map((u) => (
                      <option key={u} value={u}>{u.includes("SUBÜ") ? "SUBÜ" : "SAÜ"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bölüm</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 px-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    {MOCK_DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Şifre</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm"
              >
                Kayıt Ol ve Giriş Yap
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
              Zaten hesabın var mı?{" "}
              <button
                onClick={() => setIsRegisterMode(false)}
                className="font-bold text-indigo-600 hover:underline"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        ) : (
          /* LOGIN */
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Giriş Yap</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sakarya Üniversitesi (SAÜ) veya SUBÜ hesabınızla giriş yapın
              </p>
            </div>

            {/* Quick Demo Test */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Test Girişi (Tek Tıkla Simülasyon)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuick("MENTEE")}
                  className="rounded-xl bg-white border border-slate-200 py-1.5 px-2 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition"
                >
                  1. Sınıf Mentee (Zeynep)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuick("MENTOR")}
                  className="rounded-xl bg-white border border-slate-200 py-1.5 px-2 text-xs font-bold text-slate-700 hover:border-indigo-500 hover:text-indigo-700 transition"
                >
                  3. Sınıf Koç (Eren)
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Öğrenci E-postası
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sakarya.edu.tr veya subu.edu.tr"
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Şifre</label>
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    Şifremi Unuttum?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm"
              >
                <span>Giriş Yap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-100">
              Hesabın yok mu?{" "}
              <button
                onClick={() => setIsRegisterMode(true)}
                className="font-bold text-indigo-600 hover:underline"
              >
                Kayıt Ol
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
