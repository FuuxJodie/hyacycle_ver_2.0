import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronDown,
  Sparkles,
  PieChart,
  Layers,
  Filter,
  Check,
  FileText
} from 'lucide-react';
import { ESG_LEDGER_ENTRIES } from '../../data/mockData';
import { AuditPdfModal } from '../modals/AuditPdfModal';

export const EsgAnalyticsView: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('Kuartal 1 (Q1 2025)');
  const [selectedSponsorFilter, setSelectedSponsorFilter] = useState('Semua');
  const [isAuditPdfOpen, setIsAuditPdfOpen] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const filteredEntries =
    selectedSponsorFilter === 'Semua'
      ? ESG_LEDGER_ENTRIES
      : ESG_LEDGER_ENTRIES.filter((e) => e.sponsor.includes(selectedSponsorFilter));

  const monthlyTrendData = [
    { month: 'Okt 2024', target: 25, real: 28, do: 4.8 },
    { month: 'Nov 2024', target: 50, real: 56, do: 5.2 },
    { month: 'Des 2024', target: 80, real: 92, do: 5.7 },
    { month: 'Jan 2025', target: 115, real: 126, do: 6.1 },
    { month: 'Feb 2025', target: 150, real: 161, do: 6.3 },
    { month: 'Mar 2025', target: 156, real: 184.5, do: 6.8 },
  ];

  const handleExportCsv = () => {
    const csvRows = [
      ['ID', 'Proyek', 'Sponsor', 'Nilai (IDR)', 'Status OJK', 'Kredit Karbon (Ton)', 'Biomassa (Ton)', 'Hash SHA256'],
      ...ESG_LEDGER_ENTRIES.map((entry) => [
        entry.id,
        entry.project,
        entry.sponsor,
        entry.amountIdr,
        entry.ojkStatus,
        entry.carbonAmountTon,
        entry.biomassManagedTon,
        entry.hashSha256,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ESG_AUDIT_LEDGER_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. TOP HEADER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded font-bold">
                HYACYCLE AUTONOMOUS ESG LEDGER
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                OJK ESG COMPLIANT (POJK 51 / ISO 14064) • SRN-PPI #772/IDN/2025
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ESG Analytics & CSR Transparency Hub
            </h1>
            <p className="text-xs text-slate-400">
              Portal Verifikasi Keberlanjutan Korporat B2G, BUMN, dan Lembaga Akuntan Publik Independen
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-emerald-500"
            >
              <option>Kuartal 1 (Q1 2025)</option>
              <option>Kuartal 4 (Q4 2024)</option>
              <option>Tahun Kalender 2024 Penuh</option>
            </select>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              Ekspor CSV / API
            </button>

            <button
              onClick={() => setIsAuditPdfOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-900/30 transition"
            >
              <FileText className="w-3.5 h-3.5" />
              Unduh Laporan PDF (Audit-Ready)
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUR KEY METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            TOTAL PENGELUARAN CSR
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-sans">
              Rp 4,25
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono">Miliar</span>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">Realisasi Dana:</span>
              <span className="text-emerald-400 font-bold">94,1% Terkonfirmasi</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94.1%' }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              IDR 4.250.000.000 / IDR 4.500.000.000 pagu
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            LUAS PERAIRAN PULIH
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">
              184,5
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono">Hektar</span>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">Taraf Restorasi Satelit:</span>
              <span className="text-emerald-400 font-bold">↗ +18,2%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Melampaui target kuartal (156 Ha)
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            EMISI KARBON TERHINDAR
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-teal-300 font-sans">
              842
            </span>
            <span className="text-sm font-bold text-teal-300 font-mono">Ton CO₂e</span>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">Verifikasi IDXCarbon:</span>
              <span className="text-teal-300 font-bold">Valid & Terdaftar</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Mencegah dekomposisi 3.120 ton enceng gondok
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            RASIO EFISIENSI BIAYA
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-sans">
              Rp 23k
            </span>
            <span className="text-sm font-bold text-slate-400 font-mono">/ Kg Basah</span>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-400">Hemat vs Ponton Manual:</span>
              <span className="text-cyan-300 font-bold">-38% Biaya</span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '62%' }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Metode konvensional Rp 37.100 / Kg
            </span>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC CHARTS (Restoration Trend & CSR Fund Allocation Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Ecosystem Restoration Dynamics (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Dinamika Pemulihan Ekosistem Air & Oksigen Terlarut
                </h3>
                <p className="text-xs text-slate-400">
                  Multi-temporal Sentinel-2 & In-Situ Telemetry (Okt 2024 - Mar 2025)
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-1 bg-emerald-400 rounded" /> Realisasi (Ha)
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-3 h-1 bg-slate-500 rounded border border-dashed" /> Target (Ha)
                </span>
              </div>
            </div>

            {/* Overlaid callout highlight tag */}
            <div className="my-3 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs font-mono flex items-center justify-between text-emerald-300">
              <span>Rata-rata Oksigen Terlarut: <strong>6.4 mg/L (+142%)</strong></span>
              <span>Indeks Biodiversitas: <strong>3.12 (Kategori Sehat)</strong></span>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative h-56 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

                {/* Target Line (dashed) */}
                <polyline
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  points="20,150 110,130 200,105 290,75 380,50 470,45"
                />

                {/* Realized Area Gradient */}
                <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <polygon
                  fill="url(#realGrad)"
                  points="20,180 20,145 110,120 200,85 290,55 380,30 470,15 470,180"
                />

                {/* Realized Trend Line */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="20,145 110,120 200,85 290,55 380,30 470,15"
                />

                {/* Points on Realized Line */}
                {monthlyTrendData.map((d, idx) => {
                  const x = 20 + idx * 90;
                  const y = [145, 120, 85, 55, 30, 15][idx];
                  return (
                    <g key={d.month} className="cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#0f172a"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Month labels at bottom */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                {monthlyTrendData.map((d) => (
                  <span key={d.month}>{d.month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Bottom Sub-Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">pH LEVEL RATA-RATA</span>
              <span className="text-emerald-400 font-bold">7.2 Optimal</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">BIOMASS EXTRACTED</span>
              <span className="text-white font-bold">3.410 Ton</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">SINAR TEMBUS AIR</span>
              <span className="text-cyan-400 font-bold">182 cm (+90cm)</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase">VERIFIKASI ISO</span>
              <span className="text-teal-300 font-bold">14064-2 Passed</span>
            </div>
          </div>
        </div>

        {/* Right Chart: CSR Fund Allocation Donut (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Alokasi & Distribusi Dana CSR
              </h3>
              <p className="text-xs text-slate-400">
                Akuntabilitas Berbasis PO & Smart Contract (Kuartal 1)
              </p>
            </div>

            {/* SVG Donut Chart with Center Label */}
            <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                {/* Segment 1: 45% Operasional Kapal (emerald) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="24"
                  strokeDasharray="170 207"
                  strokeDashoffset="0"
                />
                {/* Segment 2: 30% Biomassa & Riset (teal) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="24"
                  strokeDasharray="113 264"
                  strokeDashoffset="-170"
                />
                {/* Segment 3: 20% Distribusi Petani (cyan) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="24"
                  strokeDasharray="75 302"
                  strokeDashoffset="-283"
                />
                {/* Segment 4: 5% OJK Audit (amber) */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="24"
                  strokeDasharray="19 358"
                  strokeDashoffset="-358"
                />
              </svg>
              {/* Donut Center Label */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">AUDIT OJK</span>
                <span className="text-lg font-black text-emerald-400">100%</span>
                <span className="text-[9px] font-mono text-slate-300">Tervalidasi</span>
              </div>
            </div>

            {/* Breakdown Legend Table */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Operasional Kapal</span>
                </div>
                <span className="text-white font-bold">Rp 1,91 M (45%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span className="text-slate-300">Hilirisasi & Riset</span>
                </div>
                <span className="text-white font-bold">Rp 1,28 M (30%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-slate-300">Komunitas & Petani</span>
                </div>
                <span className="text-white font-bold">Rp 850 Jt (20%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-300">Verifikasi & Audit</span>
                </div>
                <span className="text-white font-bold">Rp 212 Jt (5%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AUDIT LEDGER TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Buku Besar Audit Proyek CSR & Verifikasi Satelit
            </h3>
            <p className="text-slate-400 text-xs">
              Seluruh transaksi CSR terenkripsi pada ledger audit publik dan ditautkan ke telemetri satelit Copernicus Sentinel-2
            </p>
          </div>

          {/* Sponsor Filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSponsorFilter}
              onChange={(e) => setSelectedSponsorFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300"
            >
              <option value="Semua">Semua Sponsor BUMN / Swasta</option>
              <option value="PLN">PLN Nusantara Power</option>
              <option value="Pupuk Kujang">PT Pupuk Kujang</option>
              <option value="Telkom">PT Telkom Indonesia</option>
              <option value="Jasa Tirta">Perum Jasa Tirta II</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">PROYEK & LOKASI</th>
                <th className="p-3">SPONSOR KORPORAT</th>
                <th className="p-3">NILAI CSR (IDR)</th>
                <th className="p-3">STATUS AUDIT OJK</th>
                <th className="p-3">SERTIFIKASI KARBON</th>
                <th className="p-3">BIOMASSA</th>
                <th className="p-3 text-right">BUKTI & GEO-TAG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-950/60 transition">
                  <td className="p-3">
                    <div className="font-bold text-white">{entry.project}</div>
                    <div className="text-[10px] text-slate-400">{entry.sector} • {entry.coordinates}</div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-200">{entry.sponsor}</span>
                  </td>
                  <td className="p-3 font-bold text-emerald-400">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(entry.amountIdr)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        entry.ojkStatus === 'TERVERIFIKASI'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {entry.ojkStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-teal-300 font-bold">{entry.carbonAmountTon} Ton CO₂e</div>
                    <div className="text-[10px] text-slate-500">{entry.carbonCertId}</div>
                  </td>
                  <td className="p-3 text-slate-200 font-semibold">
                    {entry.biomassManagedTon} Ton
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setIsAuditPdfOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 text-white transition text-[11px]"
                    >
                      Tile {entry.sentinelTileId.slice(0, 7)}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cryptographic SHA-256 Stamp */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-[11px] truncate">
            <span className="text-emerald-400 font-bold">Hash Integritas SHA-256:</span>
            <span className="text-slate-500 truncate max-w-sm">e87c2b4a10f92b7c91d4e0821c43b9e115fa30fbc9821a</span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Tercatat di SRN Kementerian LHK & IDXCarbon
          </span>
        </div>
      </div>

      {/* Audit PDF Preview Modal */}
      <AuditPdfModal
        isOpen={isAuditPdfOpen}
        onClose={() => setIsAuditPdfOpen(false)}
        quarter={selectedQuarter}
      />
    </div>
  );
};
