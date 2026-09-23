import React, { useState } from 'react';
import {
  Radio,
  BarChart3,
  ShoppingBag,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Waves,
  Zap,
  Globe2,
  Users,
  Compass,
  FileCheck,
  ChevronRight,
  Send,
  Calendar,
  Building2,
  Award
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface OverviewViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onAddToCart: (productId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onAddToCart }) => {
  const [demoDate, setDemoDate] = useState('2025-06-15');
  const [demoLake, setDemoLake] = useState('Waduk Cirata (Jawa Barat)');
  const [bumnOrg, setBumnOrg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* 1. HERO SECTION */}
      <section className="relative pt-4 sm:pt-10 overflow-hidden">
        {/* Soft decorative background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-teal-100/50 via-emerald-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Action Buttons (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              B2B & B2G Cleantech Automation
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Transforming Water Crisis into{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                Circular Wealth.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Solusi robotik pemanen eceng gondok otonom berbasis IoT dan citra satelit Sentinel-2. Memulihkan perairan nasional secara berkelanjutan, terintegrasi dengan hilirisasi biomassa zero-waste dan pelaporan ESG terverifikasi OJK.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('telemetry')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-700/20 flex items-center gap-2 transition cursor-pointer"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Pantau Telemetri Langsung</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('csr')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs flex items-center gap-2 transition cursor-pointer"
              >
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Kemitraan CSR BUMN</span>
              </button>
            </div>

            {/* Certifications Row */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Audit OJK (POJK 51)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                ISO 14064 Carbon Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-600" />
                SNI 19-7030-2004
              </span>
            </div>
          </div>

          {/* Right Column: Floating Autonomous Harvester Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white border border-teal-200/90 p-6 shadow-xl shadow-teal-900/5 space-y-4">
              {/* Header card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                  <strong className="text-slate-900">HYA-04 CATAMARAN</strong>
                </div>
                <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                  OTONOM AKTIF
                </span>
              </div>

              {/* Graphical Harvester Silhouette */}
              <div className="relative h-44 rounded-2xl bg-gradient-to-br from-teal-50/60 to-slate-100/80 border border-teal-100 flex items-center justify-center overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#0d948815_1px,transparent_1px),linear-gradient(to_bottom,#0d948815_1px,transparent_1px)] bg-[size:16px_16px]" />

                {/* Hydro Catamaran Vessel Vector Art */}
                <svg viewBox="0 0 260 110" className="w-56 h-auto drop-shadow-md">
                  {/* Water ripples */}
                  <path d="M 10,95 Q 60,90 120,95 T 240,95" stroke="#99f6e4" strokeWidth="3" fill="none" />
                  <path d="M 30,102 Q 80,98 150,102 T 230,102" stroke="#ccfbf1" strokeWidth="2" fill="none" />

                  {/* Left pontoon */}
                  <rect x="25" y="70" width="85" height="18" rx="8" fill="#334155" />
                  {/* Right pontoon */}
                  <rect x="145" y="70" width="85" height="18" rx="8" fill="#334155" />

                  {/* Main deck structure */}
                  <polygon points="40,70 70,35 185,35 215,70" fill="#0f766e" />
                  {/* Front conveyor ramp */}
                  <polygon points="100,88 155,88 140,55 115,55" fill="#14b8a6" />
                  {/* Solar panel roof */}
                  <rect x="80" y="24" width="95" height="12" rx="3" fill="#0284c7" />
                  {/* RTK GPS Antenna */}
                  <line x1="165" y1="24" x2="165" y2="10" stroke="#38b8a6" strokeWidth="2.5" />
                  <circle cx="165" cy="8" r="4" fill="#10b981" />
                  {/* Bow LiDAR Sensor */}
                  <circle cx="128" cy="40" r="5" fill="#f59e0b" />
                </svg>

                {/* Telemetry overlay pill */}
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-teal-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-teal-200">
                  Waduk Jatiluhur • Sektor Barat
                </div>
              </div>

              {/* Progress bar hopper */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>KAPASITAS HOPPER BIOMASSA</span>
                  <span className="text-teal-700 font-bold">78.4% (1.560 Kg)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                    style={{ width: '78.4%' }}
                  />
                </div>
              </div>

              {/* Telemetry Quick Grid */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">KECEPATAN</span>
                  <span className="font-bold text-slate-900">1.8 Knots</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">BATERAI</span>
                  <span className="font-bold text-teal-700">84% LiFePO4</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">SINYAL LORA</span>
                  <span className="font-bold text-teal-700">-94 dBm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE WATERWAYS RECOVERY TELEMETRY LEDGER */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-mono uppercase text-teal-700 font-bold tracking-wider">
              REAL-TIME IMPACT ACCRUAL
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Buku Besar Pemulihan Perairan Nasional
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Terverifikasi Sensor YSI & Citra Copernicus Sentinel-2
          </span>
        </div>

        {/* 4 Bento Ledger Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-2xl shadow-xs transition group">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              TOTAL BIOMASSA TERANGKAT
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-black text-slate-900 group-hover:text-teal-700 transition">
                14.820
              </span>
              <span className="text-sm font-bold text-teal-700 font-mono">Ton</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Dibersihkan dari 6 waduk PLTA strategis tanpa residu herbisida kimia.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-2xl shadow-xs transition group">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              POTENSI SERAPAN KARBON
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-black text-teal-700">
                284.500
              </span>
              <span className="text-sm font-bold text-teal-700 font-mono">Kg CO₂e</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Mencegah pelepasan gas metana akibat pembusukan gulma anaerobik di dasar danau.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-2xl shadow-xs transition group">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              KEMITRAAN TJSL BUMN
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-black text-slate-900 group-hover:text-teal-700 transition">
                24
              </span>
              <span className="text-sm font-bold text-slate-500 font-mono">Korporasi</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              BUMN Energi, Pupuk, Perbankan, dan Perkebunan terintegrasi dalam POJK 51.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-teal-400 p-5 rounded-2xl shadow-xs transition group">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
              LUAS PERAIRAN PULIH
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-black text-teal-700">
                412
              </span>
              <span className="text-sm font-bold text-teal-700 font-mono">Hektar</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Mengembalikan sedimentasi normal dan meningkatkan turbulensi oksigen (DO +142%).
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE PILLARS OF HYACYCLE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-teal-700 font-bold tracking-wider">
            ECOSYSTEM INTEGRATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tiga Pilar Ekosistem Sirkular HyaCycle
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Arsitektur komprehensif yang menghubungkan robotika perairan otonom, verifikasi data satelit, dan hilirisasi ekonomi bernilai tambah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div
            onClick={() => onNavigate('telemetry')}
            className="bg-white border border-slate-200 hover:border-teal-500/80 p-6 rounded-3xl shadow-xs hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-105 transition">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">
              1. Smart Harvester Hardware
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Armada katamaran elektrik bertenaga surya & LiFePO4 dengan pisau pencacah hidrolik auger, pemandu rute otonom GNSS RTK, dan kendali jarak jauh LoRaWAN jangkauan 15 Km.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:gap-2 transition">
              Buka Layar Telemetri &gt;
            </span>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => onNavigate('esg')}
            className="bg-white border border-slate-200 hover:border-teal-500/80 p-6 rounded-3xl shadow-xs hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:scale-105 transition">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition">
              2. AI Dashboard & ESG Analytics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pengolahan citra satelit Sentinel-2 multi-spektral untuk prediksi persebaran gulma, kalkulasi serapan karbon terhindar otomatis, serta buku besar audit POJK 51 siap verifikasi OJK.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 group-hover:gap-2 transition">
              Buka Hub ESG & CSR &gt;
            </span>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => onNavigate('marketplace')}
            className="bg-white border border-slate-200 hover:border-teal-500/80 p-6 rounded-3xl shadow-xs hover:shadow-md transition cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-105 transition">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition">
              3. Zero Waste Circular Marketplace
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Konversi 100% biomassa eceng gondok menjadi pupuk organik granul kaya kalium alami (HyaBio-Grow), pot bibit biodegradable (HyaPot), dan pakan silase ternak berstandar lab Kementan.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:gap-2 transition">
              Jelajahi Produk &gt;
            </span>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT HIGHLIGHT SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-mono uppercase text-teal-700 font-bold tracking-wider">
              COMMERCIAL CIRCULAR PRODUCTS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Produk Hilirisasi Biomassa Teruji Mutu
            </h2>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            Lihat Semua Produk di Marketplace &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product 1 */}
          <div className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
                  ORGANIC CERTIFIED
                </span>
                <span className="text-xs font-mono text-slate-500">Stok: 420 Sak</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                HyaBio-Grow Organik Kompos Granul (25 Kg)
              </h4>
              <p className="text-xs text-slate-600">
                Pupuk kompos pelet dari fermentasi eceng gondok kaya Kalium (K₂O 3.8%) dan mikroorganisme pembenah tanah.
              </p>
              <div className="text-xs font-mono text-teal-700 font-semibold">
                Serapan Karbon: -30 Kg CO₂e / Sak
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Harga Grosir</span>
                <span className="text-base font-bold text-slate-900 font-mono">Rp 65.000</span>
              </div>
              <button
                onClick={() => onAddToCart('prod-01')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition cursor-pointer"
              >
                + Keranjang
              </button>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-bold">
                  100% DEGRADABLE
                </span>
                <span className="text-xs font-mono text-slate-500">Stok: 1.250 Pcs</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                HyaPot Eco Biodegradable Nursery Pot (12 cm)
              </h4>
              <p className="text-xs text-slate-600">
                Pot bibit ramah lingkungan pengganti polybag plastik. Terurai sempurna di dalam tanah dalam 45 hari menjadi pupuk.
              </p>
              <div className="text-xs font-mono text-teal-700 font-semibold">
                Bebas Mikroplastik 100%
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Harga Grosir</span>
                <span className="text-base font-bold text-slate-900 font-mono">Rp 1.800</span>
              </div>
              <button
                onClick={() => onAddToCart('prod-02')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition cursor-pointer"
              >
                + Keranjang
              </button>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded font-bold">
                  HIGH PROTEIN
                </span>
                <span className="text-xs font-mono text-slate-500">Stok: 180 Drum</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                HyaFeed Pakan Ternak Silase Fermentasi (50 Kg)
              </h4>
              <p className="text-xs text-slate-600">
                Pakan hijauan fermentasi kaya nutrisi untuk sapi, kambing, dan domba dengan masa simpan hingga 8 bulan.
              </p>
              <div className="text-xs font-mono text-teal-700 font-semibold">
                Protein Kasar 14.2% Tervalidasi
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Harga Grosir</span>
                <span className="text-base font-bold text-slate-900 font-mono">Rp 135.000</span>
              </div>
              <button
                onClick={() => onAddToCart('prod-03')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition cursor-pointer"
              >
                + Keranjang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOVERNMENT & WATER OPERATORS TRUST SECTION */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-mono uppercase text-teal-700 font-bold">
            TRUSTED NATIONAL ALLIANCES
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Dipercaya Pengelola Waduk PLTA & Danau Prioritas
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-teal-700 font-bold block text-sm">PLTA CIRATA</span>
            <span className="text-[11px] text-slate-500">Sektor Barat & Dermaga Cipeundeuy</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-teal-700 font-bold block text-sm">JATILUHUR (PJT II)</span>
            <span className="text-[11px] text-slate-500">Intake Bendungan Utama</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-teal-700 font-bold block text-sm">RAWA PENING</span>
            <span className="text-[11px] text-slate-500">Kawasan Intake PLTA Jelok</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-teal-700 font-bold block text-sm">DANAU TOBA</span>
            <span className="text-[11px] text-slate-500">Revitalisasi Waterfront Balige</span>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-slate-700 italic text-center max-w-3xl mx-auto leading-relaxed">
          &ldquo;Implementasi armada otonom HyaCycle di Waduk Cirata berhasil menekan laju eutrofikasi hingga 65% dalam 90 hari tanpa mengganggu intake turbin PLTA, serta menghasilkan laporan ESG audit-ready yang transparan bagi pemegang saham BUMN.&rdquo;
          <div className="mt-2 not-italic font-bold text-teal-900 font-mono text-xs">
            — Ir. Bambang Wicaksono, M.T. (VP Operasi Lingkungan Pembangkitan Hidro)
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION & SCHEDULING FORM */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-xs font-mono uppercase text-teal-700 font-bold">
            TAKE CONCRETE ACTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Jadwalkan Demonstrasi & Asesmen Perairan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tim teknis dan auditor lingkungan HyaCycle siap melakukan survei batimetri serta simulasi proposal kemitraan TJSL untuk institusi Anda.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-teal-50 border border-teal-300 text-center space-y-2 max-w-lg mx-auto">
            <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
            <h4 className="text-base font-bold text-teal-900">Permohonan Demonstrasi Berhasil Terkirim!</h4>
            <p className="text-xs text-teal-800">
              Technical Account Lead kami akan menghubungi Anda dalam waktu 1x24 jam dengan proposal asesmen batimetri awal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                  Instansi / BUMN / Korporasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT PLN Nusantara Power"
                  value={bumnOrg}
                  onChange={(e) => setBumnOrg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                  Target Waduk / Danau
                </label>
                <select
                  value={demoLake}
                  onChange={(e) => setDemoLake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-teal-600 font-mono"
                >
                  <option>Waduk Cirata (Jawa Barat)</option>
                  <option>Waduk Jatiluhur (Jawa Barat)</option>
                  <option>Rawa Pening (Jawa Tengah)</option>
                  <option>Danau Toba (Sumatera Utara)</option>
                  <option>Danau Limboto (Gorontalo)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                  Usulan Tanggal Asesmen Lapangan
                </label>
                <input
                  type="date"
                  value={demoDate}
                  onChange={(e) => setDemoDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-teal-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 font-mono">
                  Estimasi Alokasi Anggaran TJSL
                </label>
                <select className="w-full bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-teal-600 font-mono">
                  <option>Rp 500 Juta - Rp 1,5 Miliar</option>
                  <option>Rp 1,5 Miliar - Rp 3,0 Miliar</option>
                  <option>&gt; Rp 3,0 Miliar (Multi-Tahun)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Kirim Permohonan Asesmen Lapangan & Proposal
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
