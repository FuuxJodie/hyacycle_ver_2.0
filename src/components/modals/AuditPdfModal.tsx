import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText, QrCode } from 'lucide-react';
import { HyaCycleLogo } from '../HyaCycleLogo';

interface AuditPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  quarter?: string;
}

export const AuditPdfModal: React.FC<AuditPdfModalProps> = ({
  isOpen,
  onClose,
  quarter = 'Kuartal 1 (Q1 2025)',
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                Dokumen Audit Kepatuhan ESG & CSR Terverifikasi
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                  POJK 51 / ISO 14064-2
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Sistem Registri Nasional Pengendalian Perubahan Iklim (SRN-PPI #772/IDN/2025)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Print
            </button>
            <button
              onClick={() => {
                alert("Mengunduh sertifikat digital audit berkas PDF terenkripsi SHA-256...");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh PDF (.pdf)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audit Document Paper Preview */}
        <div className="p-8 bg-slate-950 text-slate-200 font-sans space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Header Paper */}
          <div className="border-b-2 border-emerald-500/40 pb-6 flex items-start justify-between">
            <div>
              <HyaCycleLogo size="md" subtitleText="AUTONOMOUS ESG TRANSPARENCY HUB" />
              <p className="text-xs text-slate-400 mt-2">
                PT HyaCycle Inovasi Nusantara • Ditjen PPKL Kementerian Lingkungan Hidup dan Kehutanan RI
              </p>
              <p className="text-xs text-slate-400">
                Waduk Cirata Operations Base, Cipeundeuy, Bandung Barat, Jawa Barat 40558
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED AUDIT STATUS: PASS
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1.5">No. Sertifikat: HYA-ESG-2025-Q1-9982</p>
              <p className="text-xs font-mono text-slate-400">Periode Pelaporan: {quarter}</p>
            </div>
          </div>

          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="border-r border-slate-800/80 pr-2">
              <p className="text-[11px] text-slate-400 uppercase font-mono">Total Dana CSR Tervalidasi</p>
              <p className="text-lg font-bold text-white mt-1">Rp 4.250.000.000</p>
              <p className="text-[10px] text-emerald-400">94.1% Realisasi Program</p>
            </div>
            <div className="border-r border-slate-800/80 px-2">
              <p className="text-[11px] text-slate-400 uppercase font-mono">Restorasi Perairan</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">184,5 Hektar</p>
              <p className="text-[10px] text-slate-400">Sentinel-2 Optic Validated</p>
            </div>
            <div className="border-r border-slate-800/80 px-2">
              <p className="text-[11px] text-slate-400 uppercase font-mono">Pencegahan Emisi Metana</p>
              <p className="text-lg font-bold text-teal-300 mt-1">842 Ton CO₂e</p>
              <p className="text-[10px] text-teal-400">IdxCarbon Registered</p>
            </div>
            <div className="pl-2">
              <p className="text-[11px] text-slate-400 uppercase font-mono">Biomassa Dikelola</p>
              <p className="text-lg font-bold text-cyan-400 mt-1">3.410 Ton</p>
              <p className="text-[10px] text-cyan-300">100% Zero-Waste Hilirisasi</p>
            </div>
          </div>

          {/* Detailed Verification Tables */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              1. Matriks Kepatuhan Standar Otoritas Jasa Keuangan (POJK 51/2017)
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Klausul POJK</th>
                    <th className="p-2.5">Parameter Audit Lingkungan</th>
                    <th className="p-2.5">Metodologi Verifikasi</th>
                    <th className="p-2.5 text-right">Hasil Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-semibold text-emerald-400">Pasal 6 Ayat (1)</td>
                    <td className="p-2.5">Pencegahan Pencemaran & Pelestarian Keanekaragaman Hayati</td>
                    <td className="p-2.5">Peta Multispektral Sentinel-2 NDVI & Sensor Sonar</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">MEMENUHI (100%)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-emerald-400">Pasal 6 Ayat (2)</td>
                    <td className="p-2.5">Efisiensi Penggunaan Energi & Pengurangan GRK</td>
                    <td className="p-2.5">ISO 14064-2:2019 / Verra VM0042 Algoritma</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">MEMENUHI (100%)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-emerald-400">Pasal 7 Ayat (3)</td>
                    <td className="p-2.5">Keterlibatan Masyarakat & Dampak Kesejahteraan Lokal</td>
                    <td className="p-2.5">Audit Lapangan Serapan Gabungan Kelompok Tani (Gapoktan)</td>
                    <td className="p-2.5 text-right text-emerald-400 font-bold">MEMENUHI (100%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cryptographic Ledger Verification Stamp */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-mono text-slate-400 uppercase">Segel Integritas Kriptografis Blockchain / Ledger</p>
              <p className="text-[11px] font-mono text-emerald-400 break-all">
                SHA256: e87c2b4a10f92b7c91d4e0821c43b9e115fa30fbc9821a938c0352a71bf129d
              </p>
              <p className="text-[10px] text-slate-500">
                Terhubung langsung dengan API IDXCarbon & SRN-PPI Kementerian LHK RI. Tidak dapat dimanipulasi atau diubah setelah penerbitan.
              </p>
            </div>
            <div className="shrink-0 p-2 bg-white rounded-lg text-slate-950 flex flex-col items-center">
              <QrCode className="w-16 h-16" />
              <span className="text-[9px] font-mono font-bold mt-1">VERIFIED REGISTRY</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-800/80 text-center text-xs">
            <div>
              <p className="text-slate-400 font-mono">Lead Environmental Auditor</p>
              <div className="h-14 flex items-end justify-center font-serif italic text-base text-slate-300">
                Prof. Dr. Ir. S. Suryonegoro, IPM.
              </div>
              <p className="font-semibold text-white">Lembaga Sertifikasi Independen Mutu Hijau</p>
              <p className="text-[10px] text-slate-500">Reg. KAN No. LPK-088-IDN</p>
            </div>
            <div>
              <p className="text-slate-400 font-mono">Director of Cleantech Operations</p>
              <div className="h-14 flex items-end justify-center font-serif italic text-base text-emerald-400">
                Dr. Aris Thorne
              </div>
              <p className="font-semibold text-white">HyaCycle Inovasi Nusantara</p>
              <p className="text-[10px] text-slate-500">Lead IoT & Automation System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
