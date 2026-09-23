import React from 'react';
import { X, Printer, Download, Sparkles, Building2, Check, FileCheck } from 'lucide-react';
import { HyaCycleLogo } from '../HyaCycleLogo';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  bumnName: string;
  lakeName: string;
  durationMonths: number;
  harvestersCount: number;
  budgetTotal: number;
  impactMetrics: {
    hectares: number;
    biomassTons: number;
    carbonOffsetTons: number;
    localJobs: number;
  };
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  bumnName,
  lakeName,
  durationMonths,
  harvestersCount,
  budgetTotal,
  impactMetrics,
}) => {
  if (!isOpen) return null;

  const formattedBudget = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(budgetTotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                Proposal Program Kemitraan Strategis TJSL / CSR
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                  BUMN & OJK READY
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pilar Lingkungan Hidup & Ekonomi Sirkular Berkelanjutan (SDG 6, 8, 13, 14)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak
            </button>
            <button
              onClick={() => {
                alert("Proposal resmi siap dikirim via email resmi atau diunduh sebagai PDF dengan stempel digital.");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Berkas Proposal (.pdf)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Document */}
        <div className="p-8 bg-slate-950 text-slate-200 font-sans space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b-2 border-emerald-500/40 pb-6 flex items-start justify-between">
            <div>
              <HyaCycleLogo size="md" subtitleText="CLEANTECH FOR CSR & ESG EXCELLENCE" />
              <p className="text-xs text-slate-400 mt-2">
                Dokumen Usulan PKS (Perjanjian Kerja Sama) TJSL BUMN Nomor: HYA-CSR/PKS-PROP/2025/082
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-md font-bold inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SIAP DIAJUKAN
              </span>
              <p className="text-xs text-slate-400 mt-2">Tanggal: {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
            </div>
          </div>

          {/* Partner & Location Highlight */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950/40 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400">Mitra Calon Sponsor Korporasi:</span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                {bumnName || 'PT Bank Mandiri (Persero) Tbk'}
              </h2>
              <p className="text-xs text-slate-400">
                Lokasi Program: <strong className="text-slate-200">{lakeName}</strong> • Durasi Kemitraan: <strong className="text-slate-200">{durationMonths} Bulan</strong>
              </p>
            </div>
            <div className="text-right bg-slate-900/90 border border-emerald-500/30 px-4 py-3 rounded-lg">
              <p className="text-[11px] font-mono text-slate-400">Usulan Anggaran Nilai PKS:</p>
              <p className="text-xl font-black text-emerald-400">{formattedBudget}</p>
              <p className="text-[10px] text-slate-400">Alokasi Armada: {harvestersCount} Kapal Otonom</p>
            </div>
          </div>

          {/* Target Impact Bento */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Proyeksi Dampak Terukur (KPI Program TJSL Berkelanjutan):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Restorasi Danau</p>
                <p className="text-xl font-black text-emerald-400 mt-1">{impactMetrics.hectares} Ha</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Badan air bebas gulma</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Biomassa Dikelola</p>
                <p className="text-xl font-black text-teal-400 mt-1">{impactMetrics.biomassTons} Ton</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Diolah 100% jadi pupuk & kriya</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Offset Emisi GRK</p>
                <p className="text-xl font-black text-cyan-400 mt-1">{impactMetrics.carbonOffsetTons} Ton</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Sertifikasi IDXCarbon / SRN</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                <p className="text-[11px] text-slate-400 uppercase font-mono">Serapan Tenaga Kerja</p>
                <p className="text-xl font-black text-amber-400 mt-1">{impactMetrics.localJobs} Orang</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Masyarakat pesisir danau</p>
              </div>
            </div>
          </div>

          {/* Deliverables List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Output & Fasilitas Pelaporan Korporasi yang Diperoleh:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Akses Akun Portal ESG Institutional:</strong>
                  <p className="text-slate-400 mt-0.5">Pantau telemetri GPS kapal otonom dan tangkapan satelit NDVI secara live 24/7.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Laporan Keberlanjutan Siap Audit OJK:</strong>
                  <p className="text-slate-400 mt-0.5">Format terstandar POJK 51/2017 & GRI Standards untuk Annual Sustainability Report.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Branding Lambung Kapal & Dermaga:</strong>
                  <p className="text-slate-400 mt-0.5">Pemasangan logo korporasi pada kapal harvester katamaran dan posko edukasi warga.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Pemberdayaan Kelompok Tani / UMKM Binaan:</strong>
                  <p className="text-slate-400 mt-0.5">Pelatihan pembuatan pupuk organik HyaGrow dan biopot untuk kelompok tani binaan mitra.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal and compliance footer */}
          <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex justify-between items-center">
            <span>Disusun oleh Tim Kemitraan Strategis HyaCycle Cleantech</span>
            <span className="font-mono text-emerald-400">Verifikasi Dokumen ID: PROP-HYA-2025-X09</span>
          </div>
        </div>
      </div>
    </div>
  );
};
