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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Form side (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <HyaCycleLogo size="md" subtitleText="B2B & B2G CLIENT PORTAL" />
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-4">
                Masuk ke Portal Kemitraan
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Akses telemetri satelit real-time, buku besar audit ESG, dan manajemen operasi harvester perairan.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('bumn_client');
                  setEmail('tjsl.pln@nusantarapower.co.id');
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition ${
                  selectedRole === 'bumn_client'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Klien Korporat & BUMN
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('operator');
                  setEmail('aris.thorne@hyacycle.tech');
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition ${
                  selectedRole === 'operator'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Operator IoT
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('auditor');
                  setEmail('auditor.ojk@veritas.id');
                }}
                className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition ${
                  selectedRole === 'auditor'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Auditor ESG
              </button>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Korporasi / ID Akses Petugas
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                    placeholder="nama@perusahaan.co.id"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Kata Sandi / Token Kripto
                  </label>
                  <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Instruksi pemulihan kredensial telah dikirim."); }} className="text-[11px] text-emerald-400 hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <span>Ingat perangkat ini (2FA Aktif)</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition mt-2"
              >
                Masuk ke Sistem Terverifikasi
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-2">
                Atau Autentikasi Single Sign-On (SSO):
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-700 bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  SAML 2.0 / Azure AD
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-700 bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  Google Workspace
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
            <span>Enkripsi TLS 1.3 / ISO 27001 Certified</span>
            <span className="text-emerald-400 font-mono">Status Node: Cirata-01 OK</span>
          </div>
        </div>

        {/* Right Info side (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-950 via-emerald-950/60 to-slate-950 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              TELEMETRI AKTIF • 6 KAPAL OPERASIONAL
            </div>

            <h3 className="text-lg font-bold text-white">
              Pusat Kendali Otonom Waduk Cirata & Jatiluhur
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memonitor 184,5 hektar permukaan air secara live dengan sensor RTK-GNSS, sonar bathymetry, dan kamera YOLOv8 edge AI.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs">
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-slate-400">Total Biomassa Diangkat:</span>
                <span className="text-emerald-400 font-bold">14.820 Ton</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-slate-400">Sertifikasi Emisi Terdaftar:</span>
                <span className="text-teal-300 font-bold">IDXCarbon #0819</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-slate-400">Integritas Audit OJK:</span>
                <span className="text-cyan-300 font-bold">100% Lolos POJK 51</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-500/20">
            <p className="italic text-xs text-slate-300 leading-normal">
              &ldquo;Data satelit Sentinel-2 dan laporan telemetri HyaCycle mempercepat proses audit ESG tahunan kami dari 6 pekan menjadi 2 hari kerja.&rdquo;
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">
                P
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Divisi Keberlanjutan Korporasi</p>
                <p className="text-[10px] text-slate-400">PLN Nusantara Power</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
