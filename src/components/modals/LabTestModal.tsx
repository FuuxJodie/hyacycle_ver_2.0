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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Top bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                Sertifikat Hasil Uji Laboratorium Mutu
              </h3>
              <p className="text-xs text-slate-400">
                Balai Penelitian Tanah (Balittanah) & PT Sucofindo (Persero)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-400 font-mono uppercase">Produk Diuji:</p>
              <h4 className="text-base font-bold text-white">{productName}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Nomor Uji Lab: SCF-2025-AGRO-7719B • Batch Cirata Q1-2025</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" /> LOLOS UJI SNI
              </span>
            </div>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Parameter Uji</th>
                  <th className="p-2.5">Hasil Analisis HyaCycle</th>
                  <th className="p-2.5">Standar Kementan RI</th>
                  <th className="p-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 bg-slate-900/60">
                <tr>
                  <td className="p-2.5 font-semibold text-white">Rasio C/N</td>
                  <td className="p-2.5 text-emerald-400 font-bold">15.2</td>
                  <td className="p-2.5 text-slate-400">10 - 25</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">C-Organik</td>
                  <td className="p-2.5 text-emerald-400 font-bold">24.6 %</td>
                  <td className="p-2.5 text-slate-400">Min. 15 %</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ LOLOS</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Kadar N Total</td>
                  <td className="p-2.5 text-emerald-400 font-bold">2.14 %</td>
                  <td className="p-2.5 text-slate-400">Min. 1.5 %</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ LOLOS</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Kalium (K2O Alami)</td>
                  <td className="p-2.5 text-emerald-400 font-bold">3.82 %</td>
                  <td className="p-2.5 text-slate-400">Min. 1.5 %</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ UNGGUL (+150%)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Logam Berat Timbal (Pb)</td>
                  <td className="p-2.5 text-teal-400 font-bold">&lt; 0.05 ppm</td>
                  <td className="p-2.5 text-slate-400">Maks. 50 ppm</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ SANGAT AMAN</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">Logam Berat Kadmium (Cd)</td>
                  <td className="p-2.5 text-teal-400 font-bold">&lt; 0.01 ppm</td>
                  <td className="p-2.5 text-slate-400">Maks. 2 ppm</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ SANGAT AMAN</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-white">E. Coli & Salmonella</td>
                  <td className="p-2.5 text-teal-400 font-bold">Nihil / Negatif</td>
                  <td className="p-2.5 text-slate-400">Nihil (0 MPN/g)</td>
                  <td className="p-2.5 text-right text-emerald-400 font-bold">✓ STERIL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-center justify-between">
            <span>Metode Analisis: Spektrofotometri Serapan Atom (AAS) & Kjeldahl Digest.</span>
            <span className="font-mono text-emerald-400">Akreditasi KAN LP-024-IDN</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 transition"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              alert("Mengunduh Certificate of Analysis (CoA) resmi format PDF...");
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Berkas CoA Resmi (.pdf)
          </button>
        </div>
      </div>
    </div>
  );
};
