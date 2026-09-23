import React from 'react';
import { X, CheckCircle2, ShieldCheck, Download, Award, FileSpreadsheet } from 'lucide-react';

interface LabTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const LabTestModal: React.FC<LabTestModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Top bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-sm sm:text-base flex items-center gap-2">
                Sertifikat Hasil Uji Laboratorium Mutu
              </h3>
              <p className="text-xs text-slate-500">
                Balai Penelitian Tanah (Balittanah) & PT Sucofindo (Persero)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-teal-800 font-mono uppercase font-semibold">Produk Diuji:</p>
              <h4 className="text-base font-bold text-slate-900">{productName}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Nomor Uji Lab: SCF-2025-AGRO-7719B • Batch Cirata Q1-2025</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 border border-teal-300 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" /> LOLOS UJI SNI
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">PARAMETER UJI</th>
                  <th className="p-3">HASIL ANALISIS</th>
                  <th className="p-3">STANDAR SNI 19-7030</th>
                  <th className="p-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Kadar Air</td>
                  <td className="p-3 text-teal-700 font-bold">14.2%</td>
                  <td className="p-3 text-slate-500">Maks. 50%</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">MEMENUHI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Rasio C/N</td>
                  <td className="p-3 text-teal-700 font-bold">15.2</td>
                  <td className="p-3 text-slate-500">10 - 25</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">MEMENUHI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Kalium (K₂O)</td>
                  <td className="p-3 text-teal-700 font-bold">3.82%</td>
                  <td className="p-3 text-slate-500">Min. 0.40%</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">SANGAT TINGGI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Nitrogen Total (N)</td>
                  <td className="p-3 text-teal-700 font-bold">1.62%</td>
                  <td className="p-3 text-slate-500">Min. 0.40%</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">MEMENUHI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Fosfat (P₂O₅)</td>
                  <td className="p-3 text-teal-700 font-bold">0.88%</td>
                  <td className="p-3 text-slate-500">Min. 0.10%</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">MEMENUHI</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Logam Berat Timbal (Pb)</td>
                  <td className="p-3 text-cyan-700 font-bold">&lt; 0.05 mg/kg</td>
                  <td className="p-3 text-slate-500">Maks. 150 mg/kg</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">STERIL</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">E. Coli & Salmonella</td>
                  <td className="p-3 text-cyan-700 font-bold">Negatif / Nol</td>
                  <td className="p-3 text-slate-500">Negatif (Nol)</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">STERIL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1 font-mono">
            <p className="font-semibold text-slate-900">Keterangan Verifikator Sucofindo:</p>
            <p className="text-[11px] text-slate-500">
              Hasil pengujian di atas menunjukkan bahwa sampel pupuk organik pelet HyaBio-Grow memenuhi persyaratan teknis SNI 19-7030-2004 serta Permentan No. 70/Permentan/SR.140/10/2011 untuk peredaran komersial.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Ditandatangani Digital oleh Kepala Lab Sucofindo Agro
          </span>
          <button
            onClick={() => {
              alert(`Mengunduh Sertifikat Analisis (CoA) PDF untuk ${productName}...`);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Sertifikat CoA (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
