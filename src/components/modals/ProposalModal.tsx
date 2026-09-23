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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                Proposal Program Kemitraan Strategis TJSL / CSR
                <span className="text-[10px] font-mono uppercase bg-teal-100 text-teal-800 border border-teal-300 px-2 py-0.5 rounded font-bold">
                  BUMN & OJK READY
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Pilar Lingkungan Hidup & Ekonomi Sirkular Berkelanjutan (SDG 6, 8, 13, 14)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Cetak Proposal"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
            <div>
              <HyaCycleLogo size="md" />
              <p className="text-xs text-slate-500 mt-1">
                PT HyaCycle Teknologi Sirkular Nusantara • Divisi Kemitraan Strategis B2G & BUMN
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                Gedung Graha Mandiri Lt. 12, Jl. Imam Bonjol No. 61, Jakarta Pusat 10310
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-slate-600">
              <p>Nomor Dokumen: <strong>PROP-CSR/HYA/2025/081</strong></p>
              <p>Tanggal: <strong>18 Mei 2025</strong></p>
              <p>Sifat: <strong>Rahasia & Eksklusif (B2G)</strong></p>
            </div>
          </div>

          {/* Recipient Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <p className="text-slate-500 font-mono">Kepada Yth:</p>
            <p className="text-base font-bold text-slate-900 mt-0.5">
              Direksi & Tim Pengelola TJSL / CSR
            </p>
            <p className="text-sm font-semibold text-teal-700">{bumnName}</p>
            <p className="text-slate-600 mt-1">
              Perihal: <em>Usulan Program Bersama Pemulihan Waduk/Danau & Hilirisasi Biomassa Ramah Lingkungan Berbasis IoT</em>
            </p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2 text-xs leading-relaxed text-slate-700">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1">
              1. Ringkasan Eksekutif & Urgensi Masalah
            </h4>
            <p>
              Eutrofikasi akibat ledakan populasi eceng gondok (<em>Eichhornia crassipes</em>) di kawasan <strong>{lakeName}</strong> telah menurunkan kapasitas tampung efektif waduk, mempercepat pendangkalan sedimentasi hingga 2,4 mm/tahun, serta mengancam keandalan suplai air intake PLTA / irigasi pertanian.
            </p>
            <p>
              Melalui kemitraan strategis ini, <strong>{bumnName}</strong> bersama HyaCycle akan mengoperasikan <strong>{harvestersCount} Unit Kapal Smart Harvester Otonom</strong> selama <strong>{durationMonths} Bulan</strong> berturut-turut untuk merevitalisasi ekosistem perairan dengan pelaporan terverifikasi POJK 51.
            </p>
          </div>

          {/* Impact Matrix Grid */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 border-b border-slate-200 pb-1">
              2. Matriks Komitmen Capaian & Indikator ESG
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">TARGET PERAIRAN BERSIH</span>
                <span className="text-lg font-bold text-teal-700">{impactMetrics.hectares} Hektar</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">BIOMASSA TERANGKAT</span>
                <span className="text-lg font-bold text-cyan-700">{impactMetrics.biomassTons} Ton</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">KREDIT KARBON CO₂e</span>
                <span className="text-lg font-bold text-emerald-700">{impactMetrics.carbonOffsetTons} Ton</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">SERAPAN WARGA LOKAL</span>
                <span className="text-lg font-bold text-amber-700">{impactMetrics.localJobs} Orang</span>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 border-b border-slate-200 pb-1">
              3. Rencana Anggaran Biaya (RAB) Program TJSL
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">KOMPONEN PROGRAM</th>
                    <th className="p-2.5">ALOKASI</th>
                    <th className="p-2.5 text-right">NOMINAL (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5">Operasional & Logistik Armada Kapal Harvester ({harvestersCount} Unit)</td>
                    <td className="p-2.5 text-teal-700">45%</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budgetTotal * 0.45)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Pengolahan Hilirisasi Pupuk Kompos & Biopot Komunitas</td>
                    <td className="p-2.5 text-cyan-700">30%</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budgetTotal * 0.30)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Pemberdayaan Kelompok Tani Lingkar Waduk & Pelatihan</td>
                    <td className="p-2.5 text-emerald-700">20%</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budgetTotal * 0.20)}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Audit OJK POJK 51 & Sertifikasi Karbon SRN-PPI</td>
                    <td className="p-2.5 text-amber-700">5%</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budgetTotal * 0.05)}
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td className="p-2.5" colSpan={2}>TOTAL NILAI INVESTASI PROGRAM TJSL BUMN</td>
                    <td className="p-2.5 text-right text-teal-700 text-sm">
                      {formattedBudget}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Signatures */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-500 font-mono">Diusulkan Oleh:</p>
              <p className="font-bold text-slate-900 mt-1">PT HyaCycle Teknologi Sirkular</p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-teal-700 font-bold">[Tanda Tangan Digital Tersertifikasi BSrE]</span>
              </div>
              <p className="font-bold text-slate-800">Dr. Ir. Aris Thorne, M.Sc.</p>
              <p className="text-slate-500 text-[10px]">Chief Executive Officer</p>
            </div>
            <div>
              <p className="text-slate-500 font-mono">Menyetujui Sebagai Mitra Pelaksana:</p>
              <p className="font-bold text-slate-900 mt-1">{bumnName}</p>
              <div className="h-16 flex items-center justify-center text-slate-300">
                <span className="border-b border-dashed border-slate-400 w-36"></span>
              </div>
              <p className="font-bold text-slate-800">Direktur Human Capital & TJSL</p>
              <p className="text-slate-500 text-[10px]">Untuk & Atas Nama Korporasi</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            Status: Draft MoU Siap Ditandatangani
          </span>
          <button
            onClick={() => {
              alert(`Mengunduh Berkas Proposal Resmi untuk ${bumnName} (Format PDF OJK)...`);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Unduh Berkas Lengkap (PDF 24 Halaman)
          </button>
        </div>
      </div>
    </div>
  );
};
