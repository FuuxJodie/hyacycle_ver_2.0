import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, Shield, CheckCircle, ArrowRight, Activity, Waves } from 'lucide-react';
import { UserRole } from '../../types';
import { HyaCycleLogo } from '../HyaCycleLogo';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, email: string) => void;
  currentRole: UserRole;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [email, setEmail] = useState('aris.thorne@hyacycle.tech');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole, email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Form side (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <HyaCycleLogo size="md" subtitleText="B2B & B2G CLIENT PORTAL" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4">
                Masuk ke Portal Kemitraan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Akses telemetri satelit real-time, buku besar audit ESG, dan manajemen operasi harvester perairan.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('bumn_client');
                  setEmail('tjsl@plnnusantara.co.id');
                }}
                className={`py-1.5 px-2 rounded-lg transition ${
                  selectedRole === 'bumn_client'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mitra TJSL BUMN
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('operator');
                  setEmail('operator.cirata@hyacycle.tech');
                }}
                className={`py-1.5 px-2 rounded-lg transition ${
                  selectedRole === 'operator'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Operator IoT
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('auditor');
                  setEmail('auditor.esg@ojk.go.id');
                }}
                className={`py-1.5 px-2 rounded-lg transition ${
                  selectedRole === 'auditor'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Auditor OJK
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                  Alamat Email Korporat Terdaftar
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 font-mono">
                    Kata Sandi SSO / PIN Enkripsi
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Silakan hubungi Administrator Keamanan TI HyaCycle di admin@hyacycle.tech"); }} className="text-[11px] text-teal-700 hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-teal-600 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-teal-600 rounded"
                  />
                  <span>Ingat sesi di perangkat terverifikasi ini</span>
                </label>
                <span className="text-[10px] font-mono text-teal-700 font-semibold">2FA Aktif via Token</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Masuk ke Dashboard Otorisasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Enkripsi TLS 1.3 End-to-End</span>
            <span className="text-teal-700 font-semibold">ISO/IEC 27001 Terverifikasi</span>
          </div>
        </div>

        {/* Right Info side (5 cols) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 p-6 sm:p-8 flex-col justify-between border-l border-slate-200">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300 text-[10px] font-mono font-bold">
              <Shield className="w-3.5 h-3.5" />
              ENTERPRISE GOVERNANCE
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              Akses Terpadu Keberlanjutan Perairan & Hilirisasi
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Sinkronisasi citra satelit Sentinel-2 resolusi 10m dengan interval per 5 hari.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Log audit sertifikasi pengurangan emisi gas rumah kaca tervalidasi POJK 51.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Pelacakan alokasi anggaran CSR hingga ke tingkat kelompok tani penerima pupuk.</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1 shadow-xs">
            <div className="flex justify-between">
              <span>Status Server:</span>
              <span className="text-teal-700 font-bold">Semua Klaster Normal</span>
            </div>
            <div className="flex justify-between">
              <span>Keamanan:</span>
              <span className="text-slate-800 font-semibold">SOC-2 Type II Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
