import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  Download,
  Users,
  Compass,
  ArrowRight,
  ChevronRight,
  Plus,
  Sliders,
  DollarSign
} from 'lucide-react';
import { CsrProposal } from '../../types';
import { INITIAL_CSR_PROPOSALS } from '../../data/mockData';
import { ProposalModal } from '../modals/ProposalModal';

export const CsrManagementView: React.FC = () => {
  const [proposals, setProposals] = useState<CsrProposal[]>(INITIAL_CSR_PROPOSALS);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  // Simulator state
  const [simBumn, setSimBumn] = useState('PT Bank Mandiri (Persero) Tbk');
  const [simLake, setSimLake] = useState('Waduk Cirata (Sektor C)');
  const [simDuration, setSimDuration] = useState<number>(12); // months
  const [simHarvesters, setSimHarvesters] = useState<number>(2);
  const [simBudget, setSimBudget] = useState<number>(1250000000); // 1.25 Milyar

  // Derived calculations for impact
  const calculatedHa = Number(((simBudget / 100000000) * 2.8 * (simHarvesters / 2)).toFixed(1));
  const calculatedBiomass = Math.round(calculatedHa * 14.8);
  const calculatedCarbon = Math.round(calculatedBiomass * 0.44);
  const calculatedJobs = Math.round(simHarvesters * 14 + (simDuration / 12) * 10);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);

  const kanbanColumns: {
    id: 'asesmen' | 'review_ojk' | 'negosiasi' | 'spk_aktif';
    title: string;
    badgeColor: string;
  }[] = [
    { id: 'asesmen', title: 'ASESMEN AWAL', badgeColor: 'text-slate-400 border-slate-700 bg-slate-800' },
    { id: 'review_ojk', title: 'REVIEW & OJK POJK 51', badgeColor: 'text-amber-400 border-amber-700 bg-amber-950/60' },
    { id: 'negosiasi', title: 'NEGOSIASI PKS / MOU', badgeColor: 'text-cyan-400 border-cyan-700 bg-cyan-950/60' },
    { id: 'spk_aktif', title: 'SPK TERBIT & EKSEKUSI', badgeColor: 'text-emerald-400 border-emerald-700 bg-emerald-950/60' },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. TOP HEADER */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                POJK 51/2017 CLEAN AUDIT
              </span>
              <span className="text-slate-400">SRN-PPI TERINTEGRASI • TJSL BUMN TAHUN ANGGARAN 2025</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Manajemen Kemitraan CSR & Proposal BUMN
            </h1>
            <p className="text-xs text-slate-400">
              Orkestrasi alokasi dana TJSL/CSR institusi korporasi untuk pemulihan danau dan pemberdayaan masyarakat sirkular.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                const el = document.getElementById('csr-simulator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Simulasi Dampak
            </button>
            <button
              onClick={() => {
                alert("Mengunduh Executive Summary Portfolio CSR TJSL 2025 format PDF...");
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Unduh Portofolio CSR 2025
            </button>
            <button
              onClick={() => setIsProposalModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-900/30 transition"
            >
              <Plus className="w-4 h-4" />
              Buat Proposal Baru
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUR KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            TOTAL KOMITMEN CSR (YTD)
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-sans">
              Rp 14,85
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono">Miliar</span>
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Pertumbuhan:</span>
              <span className="text-emerald-400 font-bold">+24.5% YoY</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              82% dari target Rp 18 Miliar (12 BUMN + 6 Swasta)
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            PIPELINE PROPOSAL AKTIF
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-sans">
              9
            </span>
            <span className="text-sm font-bold text-slate-400 font-mono">Usulan PKS</span>
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Estimasi Nilai:</span>
              <span className="text-cyan-300 font-bold">Rp 6,2 Miliar</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              4 Menunggu MoU • 3 Review Direksi • 2 SPK
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            TARGET RESTORASI TERALOKASI
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans">
              320
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono">Hektar</span>
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Armada Diterjunkan:</span>
              <span className="text-emerald-400 font-bold">18 Unit Kapal</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              6 Danau & Waduk Prioritas Nasional
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            KREDIT KARBON & DAMPAK
          </span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-teal-300 font-sans">
              1.420
            </span>
            <span className="text-sm font-bold text-teal-300 font-mono">Ton CO₂e</span>
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Standar Sertifikasi:</span>
              <span className="text-teal-300 font-bold">IDXCarbon Valid</span>
            </div>
            <span className="text-[10px] text-slate-500 block">
              100% Lolos Uji POJK 51 Otoritas Jasa Keuangan
            </span>
          </div>
        </div>
      </div>

      {/* 3. KANBAN BOARD: PIPELINE SIKLUS PROPOSAL KEMITRAAN CSR (TJSL BUMN) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Pipeline Siklus Proposal Kemitraan CSR (TJSL BUMN)
            </h3>
            <p className="text-slate-400 text-xs">
              Alur legalitas PKS: Asesmen Batimetri &rarr; Review Komite OJK &rarr; Negosiasi Draft &rarr; Terbit SPK Eksekusi
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            10 Proposal Terdata
          </span>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const colProposals = proposals.filter((p) => p.status === col.id);
            return (
              <div key={col.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 flex flex-col space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${col.badgeColor}`}>
                    {col.title}
                  </span>
                  <span className="text-slate-400 font-bold">{colProposals.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2.5 flex-1">
                  {colProposals.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSimBumn(item.companyName);
                        setSimBudget(item.budget);
                        setIsProposalModalOpen(true);
                      }}
                      className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-3 rounded-xl transition cursor-pointer group space-y-2"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                          {item.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {item.harvestersCount} Kapal
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition leading-snug">
                        {item.companyName}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {item.programTitle}
                      </p>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-400 font-bold">
                          {formatCurrency(item.budget)}
                        </span>
                        <span className="text-slate-400">{item.targetHa} Ha</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. INTERACTIVE CALCULATOR: ESTIMASI DAMPAK & VALUASI PROPOSAL CSR */}
      <div id="csr-simulator" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
            BUMN CSR VALUATION ENGINE
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Kalkulator Estimasi Dampak & Valuasi Proposal CSR BUMN
          </h3>
          <p className="text-xs text-slate-400">
            Simulasikan alokasi armada dan anggaran TJSL untuk memproyeksikan indikator keberlanjutan OJK (POJK 51) secara presisi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Entitas BUMN / Mitra Korporasi
                </label>
                <select
                  value={simBumn}
                  onChange={(e) => setSimBumn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl p-2.5 font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option>PT Bank Mandiri (Persero) Tbk</option>
                  <option>PT Pertamina Hulu Energi</option>
                  <option>PT Bukit Asam Tbk</option>
                  <option>PT Semen Indonesia (SIG)</option>
                  <option>PT Bio Farma (Persero)</option>
                  <option>PT Pelabuhan Indonesia (Pelindo)</option>
                  <option>PT Vale Indonesia Tbk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Lokasi Waduk / Danau Prioritas
                </label>
                <select
                  value={simLake}
                  onChange={(e) => setSimLake(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl p-2.5 font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option>Waduk Cirata (Sektor C)</option>
                  <option>Waduk Jatiluhur (Sektor Barat)</option>
                  <option>Rawa Pening (Intake PLTA)</option>
                  <option>Danau Toba (Balige Waterfront)</option>
                  <option>Danau Singkarak (Sumatera Barat)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Durasi Program Kemitraan
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[6, 12, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSimDuration(m)}
                      className={`p-2 rounded-xl border text-center transition ${
                        simDuration === m
                          ? 'border-emerald-500 bg-emerald-950/60 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {m} Bulan
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                  Alokasi Kapal Smart Harvester
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                  {[1, 2, 4, 6].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setSimHarvesters(count)}
                      className={`p-2 rounded-xl border text-center transition ${
                        simHarvesters === count
                          ? 'border-emerald-500 bg-emerald-950/60 text-white font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {count} Kapal
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Slider */}
            <div className="space-y-2 pt-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-bold">Estimasi Alokasi Anggaran CSR (TJSL):</span>
                <span className="text-lg font-black text-emerald-400">
                  {formatCurrency(simBudget)}
                </span>
              </div>
              <input
                type="range"
                min="500000000"
                max="5000000000"
                step="50000000"
                value={simBudget}
                onChange={(e) => setSimBudget(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Rp 500 Juta (Pilot Mini)</span>
                <span>Rp 2,5 Miliar (Regional)</span>
                <span>Rp 5,0 Miliar (Multi-Year)</span>
              </div>
            </div>
          </div>

          {/* Realtime Live Impact Projection Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Target Restorasi Kemitraan {simDuration} Bulan
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">OJK READY</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Luas Perairan Pulih</span>
                <span className="text-xl font-black text-emerald-400">{calculatedHa} Ha</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Bebas gulma eceng</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Biomassa Terangkat</span>
                <span className="text-xl font-black text-teal-300">{calculatedBiomass} Ton</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">100% sirkular</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Serapan Emisi CO₂e</span>
                <span className="text-xl font-black text-cyan-400">{calculatedCarbon} Ton</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">IDXCarbon Listed</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Serapan Tenaga Kerja</span>
                <span className="text-xl font-black text-amber-300">{calculatedJobs} Warga</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Petani & pengrajin</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIsProposalModalOpen(true)}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-900/30 flex items-center justify-center gap-2 transition"
              >
                <FileCheck className="w-4 h-4" />
                Generate Draft Proposal PDF Resmi
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Ringkasan eksekutif program telah dikirim ke alamat resmi direksi ${simBumn}.`);
                }}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition text-center"
              >
                Kirim Ringkasan ke Direksi Korporat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Draft Modal */}
      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        bumnName={simBumn}
        lakeName={simLake}
        durationMonths={simDuration}
        harvestersCount={simHarvesters}
        budgetTotal={simBudget}
        impactMetrics={{
          hectares: calculatedHa,
          biomassTons: calculatedBiomass,
          carbonOffsetTons: calculatedCarbon,
          localJobs: calculatedJobs,
        }}
      />
    </div>
  );
};
