"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Building, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { MOCK_UNIVERSITIES, MOCK_DEPARTMENTS } from "@/data/mockData";
import { UserRole } from "@/types/user";

type AuthMode = "LOGIN" | "REGISTER" | "FORGOT_PASSWORD";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "LOGIN",
}) => {
  const { login, register, quickLoginAs } = useApp();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState(MOCK_UNIVERSITIES[0]);
  const [department, setDepartment] = useState(MOCK_DEPARTMENTS[0]);
  const [selectedRole, setSelectedRole] = useState<UserRole>("MENTEE");
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot password feedback
  const [resetSent, setResetSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "zeynep.yilmaz@sakarya.edu.tr");
    setSuccessMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
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
      role: selectedRole,
      year: selectedRole === "MENTEE" ? 1 : 3,
    });

    setSuccessMessage("Hesabınız oluşturuldu! Sisteme giriş yapıldı.");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 1000);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Lütfen kayıtlı üniversite e-posta adresinizi girin.");
      return;
    }
    setResetSent(true);
  };

  const handleQuickLogin = (role: UserRole) => {
    quickLoginAs(role);
    setSuccessMessage(`${role === "MENTOR" ? "3. Sınıf Koç (Eren)" : "1. Sınıf Mentee (Zeynep)"} olarak giriş yapıldı!`);
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm font-bold text-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900">Akran</span>
              <span className="ml-1.5 text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/50">
                Sakarya Kampüsü
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="m-4 flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1. LOGIN MODE */}
        {mode === "LOGIN" && (
          <div className="p-6 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tekrar Hoş Geldin!</h2>
              <p className="text-xs text-slate-500 mt-1">
                Sakarya Üniversitesi veya SUBÜ öğrenci hesabınla giriş yap
              </p>
            </div>

            {/* Quick Demo Switcher Banner */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-purple-50/60 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-indigo-900">
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" />
                  Hızlı Test Girişi (Tek Tık)
                </span>
                <span className="text-[10px] text-indigo-500 font-normal">Şifresiz Demo</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("MENTEE")}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-2.5 py-2 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>1. Sınıf Mentee</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("MENTOR")}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white px-2.5 py-2 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>3. Sınıf Koç</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Öğrenci E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@sakarya.edu.tr veya @subu.edu.tr"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Şifre</label>
                  <button
                    type="button"
                    onClick={() => setMode("FORGOT_PASSWORD")}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    Şifremi Unuttum?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Beni hatırla</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition active:scale-95"
              >
                <span>Giriş Yap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
              Henüz bir hesabın yok mu?{" "}
              <button
                type="button"
                onClick={() => setMode("REGISTER")}
                className="font-bold text-indigo-600 hover:underline"
              >
                Hemen Kayıt Ol
              </button>
            </div>
          </div>
        )}

        {/* 2. REGISTER MODE */}
        {mode === "REGISTER" && (
          <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Aramıza Katıl</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sakarya&apos;daki akran koçluğu ağına dahil ol
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Role Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Platformdaki Rolün
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("MENTEE")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedRole === "MENTEE"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-xs font-bold">1. Sınıf (Mentee)</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">Koçluk ve not desteği almak istiyorum</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("MENTOR")}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedRole === "MENTOR"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-xs font-bold">3. Sınıf (Koç)</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">1. sınıflara mentorluk yapmak istiyorum</span>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Üniversite Öğrenci E-postası *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="b231210000@sakarya.edu.tr veya subu.edu.tr"
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* University */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Üniversite *
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  {MOCK_UNIVERSITIES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bölüm *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  {MOCK_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Şifre Belirleyin *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 6 karakter"
                    className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition active:scale-95"
              >
                <span>Öğrenci Hesabı Oluştur</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-2">
              Zaten hesabın var mı?{" "}
              <button
                type="button"
                onClick={() => setMode("LOGIN")}
                className="font-bold text-indigo-600 hover:underline"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        )}

        {/* 3. FORGOT PASSWORD MODE */}
        {mode === "FORGOT_PASSWORD" && (
          <div className="p-6 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Şifreni mi Unuttun?</h2>
              <p className="text-xs text-slate-500 mt-1">
                Kayıtlı üniversite e-posta adresini gir, sana tek kullanımlık sıfırlama bağlantısı gönderelim.
              </p>
            </div>

            {resetSent ? (
              <div className="rounded-2xl bg-indigo-50 p-5 text-center space-y-3 border border-indigo-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Bağlantı Gönderildi!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <b>{email || "öğrenci e-posta adresinize"}</b> şifre sıfırlama bağlantısı iletildi. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setMode("LOGIN");
                  }}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition"
                >
                  Giriş Ekranına Dön
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Öğrenci E-postan (@sakarya.edu.tr veya @subu.edu.tr)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="b231210000@sakarya.edu.tr"
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition"
                >
                  <span>Şifre Sıfırlama Bağlantısı Gönder</span>
                </button>
              </form>
            )}

            <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-2">
              Hatırladın mı?{" "}
              <button
                type="button"
                onClick={() => setMode("LOGIN")}
                className="font-bold text-indigo-600 hover:underline"
              >
                Giriş Yap&apos;a Dön
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
