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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-base flex items-center gap-2">
                Dokumen Audit Kepatuhan ESG & CSR Terverifikasi
                <span className="text-[10px] font-mono uppercase bg-teal-100 text-teal-800 border border-teal-300 px-2 py-0.5 rounded font-bold">
                  POJK 51 / ISO 14064-2
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Sistem Registri Nasional Pengendalian Perubahan Iklim (SRN-PPI #772/IDN/2025)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Print
            </button>
            <button
              onClick={() => {
                alert("Mengunduh sertifikat digital audit berkas PDF terenkripsi SHA-256...");
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh PDF (.pdf)
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview (Clean white letterhead) */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[75vh] overflow-y-auto bg-white text-slate-900">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
            <div>
              <HyaCycleLogo size="md" />
              <p className="text-xs text-slate-600 font-semibold mt-1">
                KOMITE AUDIT INDEPENDEN LINGKUNGAN & KEBERLANJUTAN PERAIRAN
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Akreditasi KAN LP-621-IDN • Lisensi Otoritas Jasa Keuangan (OJK) No. S-441/PM.2/2024
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right font-mono text-xs text-slate-600">
                <p>No. Sertifikat: <strong>AUD-ESG/2025/Q1-0941</strong></p>
                <p>Periode Audit: <strong>{quarter}</strong></p>
                <p>Status: <strong className="text-teal-700">UNQUALIFIED OPINION (WAJAR TANPA PENGECUALIAN)</strong></p>
              </div>
              <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-lg flex flex-col items-center justify-center p-1">
                <QrCode className="w-10 h-10 text-slate-800" />
                <span className="text-[8px] font-mono text-slate-500">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Statement of Verification */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-teal-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              PERNYATAAN INDEPENDEN VERIFIKASI KEBERLANJUTAN (POJK 51/POJK.03/2017)
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Kami telah melakukan audit kepatuhan substantif terhadap metodologi ekstraksi biomassa perairan otonom HyaCycle, integrasi citra satelit Sentinel-2, pemantauan telemetri insitu YSI, serta penyerapan emisi karbon terhindar di wilayah Waduk Cirata dan Danau Prioritas Nasional periode {quarter}.
            </p>
          </div>

          {/* Key Audit Findings Grid */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 font-mono border-b border-slate-200 pb-1">
              Ringkasan Temuan Audit Kuantitatif
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">REALISASI LUAS PULIH</span>
                <span className="text-lg font-bold text-teal-700">184,5 Hektar</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Deviasi Satelit &lt; 0.8%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">TOTAL BIOMASSA BASAH</span>
                <span className="text-lg font-bold text-teal-700">3.410 Ton</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Load Cell Tera Metrologi</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">PENCEGAHAN EMISI CO₂e</span>
                <span className="text-lg font-bold text-cyan-700">842 Ton CO₂e</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">IPCC Wetlands Tier 2</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">REALISASI ANGGARAN TJSL</span>
                <span className="text-lg font-bold text-slate-900">Rp 4,25 Miliar</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">94,1% Pagu Terserap</span>
              </div>
            </div>
          </div>

          {/* Water Ecology Quality Improvement Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 font-mono border-b border-slate-200 pb-1">
              Verifikasi Peningkatan Mutu Ekosistem Danau (PP No. 22 Tahun 2021)
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">INDIKATOR AIR</th>
                    <th className="p-2.5">SEBELUM OPERASI</th>
                    <th className="p-2.5">SETELAH OPERASI</th>
                    <th className="p-2.5">STATUS BAKU MUTU KELAS II</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Oksigen Terlarut (DO)</td>
                    <td className="p-2.5 text-red-600">2.6 mg/L (Kritis)</td>
                    <td className="p-2.5 text-teal-700 font-bold">6.4 mg/L (+142%)</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">MEMENUHI BAKU MUTU</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Kecerahan Secchi Disk</td>
                    <td className="p-2.5 text-amber-600">92 cm (Keruh)</td>
                    <td className="p-2.5 text-teal-700 font-bold">182 cm (+90 cm)</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">MEMENUHI BAKU MUTU</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Derajat Keasaman (pH)</td>
                    <td className="p-2.5 text-slate-600">6.1 (Asam Anoxic)</td>
                    <td className="p-2.5 text-teal-700 font-bold">7.2 (Ideal Netral)</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">MEMENUHI BAKU MUTU</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Auditor Signatures */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-500 font-mono">Lead Environmental Auditor:</p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-teal-700 font-bold">[Tanda Tangan Digital Tersertifikasi OJK]</span>
              </div>
              <p className="font-bold text-slate-800">Drs. Hendra Gunawan, M.Env.Sc., CPA</p>
              <p className="text-slate-500 text-[10px]">No. Register OJK: ESG-2021-99214</p>
            </div>
            <div>
              <p className="text-slate-500 font-mono">Ketua Komite Verifikasi Karbon:</p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-serif italic text-teal-700 font-bold">[Tanda Tangan Digital SRN-PPI]</span>
              </div>
              <p className="font-bold text-slate-800">Prof. Dr. Ir. Siti Nurhaliza, M.T.</p>
              <p className="text-slate-500 text-[10px]">Lembaga Verifikasi Independen EcoVeritas</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Hash Digital SHA256: e87c2b4a10f92b7c91d4e0821c43b9e115fa30fbc9821a</span>
          <span className="text-teal-700 font-semibold">Dokumen Sah Tanpa Meterai Tempel</span>
        </div>
      </div>
    </div>
  );
};
