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
  Zap,
  BatteryCharging,
  Cpu,
  Waves,
  Calendar,
  Send,
  Building2,
  ChevronRight,
  Check
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface OverviewViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onAddToCart: (productId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onAddToCart }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    email: '',
    phone: '',
    category: 'Pembersihan Reservoir PLTA / Bendungan',
    lakeArea: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-10 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                B2B & B2G CLEANTECH AUTOMATION
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Transforming Water Crisis into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                  Circular Wealth
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Solusi integrasi <strong className="text-white">autonomous robotic harvesters</strong> dan analitik satelit optik untuk memulihkan reservoir bendungan, danau, dan sungai dari ledakan gulma eceng gondok. Membuka rantai nilai biomassa hijau zero-waste yang terverifikasi standar ESG OJK.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('consultation-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-900/40 flex items-center gap-2 transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Jadwalkan Demo SaaS & Armada
                </button>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-400 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 shadow-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  Beli Produk Zero Waste
                </button>
              </div>

              {/* Trust checkpoints */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ISO 14064 & POJK 51 Audited</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Telemetry LoRaWAN & GPS RTK (±3cm)</span>
                </div>
              </div>
            </div>

            {/* Right Hero Card: Floating Live Harvester Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
                {/* Header card */}
                <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    UNIT HYA-04 : DANAU JATILUHUR
                  </span>
                  <span className="bg-emerald-950 border border-emerald-700 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    STATUS: OTONOM AKTIF
                  </span>
                </div>

                {/* Simulated Graphic of Harvester Vessel */}
                <div className="relative h-56 bg-gradient-to-b from-slate-950 via-teal-950/40 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
                  {/* Water grid ripples */}
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Overlaid Badges on Photo */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono bg-black/75 backdrop-blur-sm border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Radio className="w-3 h-3 text-emerald-400" /> LiDAR 360° & Sonar Depth
                    </span>
                    <span className="text-[10px] font-mono bg-black/75 backdrop-blur-sm border border-teal-500/50 text-teal-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Solar Hybrid 4.2 kWp
                    </span>
                  </div>

                  {/* SVG Harvester Catamaran Graphic Representation */}
                  <div className="relative w-72 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 320 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                      {/* Water base ripples */}
                      <path d="M20 130 Q80 140 160 130 T300 130" stroke="#059669" strokeWidth="2" fill="none" opacity="0.4" />
                      <path d="M10 138 Q90 148 170 138 T310 138" stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.3" />

                      {/* Catamaran Twin Hulls */}
                      <path d="M40 120 L80 128 L240 128 L270 120 L250 114 L70 114 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <path d="M50 108 L90 114 L230 114 L260 108 L245 104 L75 104 Z" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />

                      {/* Front Harvesting Conveyor Ramp & Auger Cutter */}
                      <path d="M30 125 L90 85 L140 85 L120 120 Z" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                      <circle cx="35" cy="122" r="9" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                      <line x1="35" y1="113" x2="35" y2="131" stroke="#34d399" strokeWidth="2" />
                      <line x1="26" y1="122" x2="44" y2="122" stroke="#34d399" strokeWidth="2" />

                      {/* Biomass Hopper Cage */}
                      <rect x="130" y="70" width="85" height="42" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
                      {/* Green Biomass Load inside hopper */}
                      <path d="M135 108 Q150 78 180 82 T210 108 Z" fill="#22c55e" opacity="0.85" />

                      {/* Solar Canopy Roof */}
                      <polygon points="120,55 240,55 230,62 110,62" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="120" y1="62" x2="130" y2="70" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="230" y1="62" x2="215" y2="70" stroke="#94a3b8" strokeWidth="2" />

                      {/* Antenna / LiDAR Dome */}
                      <line x1="210" y1="55" x2="210" y2="40" stroke="#f8fafc" strokeWidth="2" />
                      <circle cx="210" cy="38" r="4" fill="#ef4444" className="animate-ping" />
                      <circle cx="210" cy="38" r="3" fill="#10b981" />
                    </svg>
                  </div>

                  {/* Water plants floating indicator */}
                  <div className="absolute bottom-2 left-4 text-[10px] font-mono text-emerald-400/80">
                    Dense Bloom: Eichhornia Crassipes
                  </div>
                </div>

                {/* Progress bar of Hopper */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">KAPASITAS MUATAN HOPPER</span>
                    <span className="text-emerald-400 font-bold">78.4% (9.4 Ton Terisi)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '78.4%' }} />
                  </div>
                </div>

                {/* Telemetry quick stats */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950 p-3 text-center text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">KECEPATAN</span>
                    <span className="text-white font-bold">1.8 Knots</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">BATERAI LiFePO4</span>
                    <span className="text-emerald-400 font-bold">92% (52.8V)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">SINYAL LoRa</span>
                    <span className="text-teal-300 font-bold">-68 dBm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE WATERWAYS RECOVERY TELEMETRY LEDGER (Bento 4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              Live Waterways Recovery Telemetry Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Sinkronisasi Satelit Sentinel-2 L2A: 02 menit yang lalu • Geotagging WGS84
            </p>
          </div>
          <button
            onClick={() => onNavigate('telemetry')}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
          >
            Buka Radar Peta Interaktif &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bento 1 */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition group">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              TOTAL BIOMASSA DIANGKAT
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white group-hover:text-emerald-400 transition font-sans">
                14,820
              </span>
              <span className="text-sm font-bold text-emerald-400 font-mono">Ton</span>
            </div>
            <p className="text-xs text-emerald-400/90 font-mono mt-2 flex items-center gap-1">
              ↗ +142 Ton minggu ini
            </p>
          </div>

          {/* Bento 2 */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition group">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              SERTIFIKAT KARBON TERVERIFIKASI
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-400 font-sans">
                284,500
              </span>
              <span className="text-sm font-bold text-emerald-400 font-mono">Kg</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-2">
              Standar OJK Taksonomi & Verra VM0042
            </p>
          </div>

          {/* Bento 3 */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition group">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              KEMITRAAN AKTIF
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white group-hover:text-teal-300 transition font-sans">
                24
              </span>
              <span className="text-sm font-bold text-slate-400 font-mono">Entitas</span>
            </div>
            <p className="text-xs text-teal-300 font-mono mt-2">
              Pemprov, BUMN Energi, Operator PLTA
            </p>
          </div>

          {/* Bento 4 */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition group">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              LUAS PERAIRAN PULIH
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-cyan-400 font-sans">
                412
              </span>
              <span className="text-sm font-bold text-cyan-400 font-mono">Hektar</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-2">
              DO (Dissolved Oxygen) naik 38%
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE PILLARS (EKOSISTEM END-TO-END) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            EKOSISTEM END-TO-END
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Tiga Pilar Restorasi Danau & Sirkularitas Biomassa
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Dari pengerukan presisi otonom di tengah danau hingga rantai pasok produk organik bernilai komersial tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1 */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Radio className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                PILAR 01 • PERANGKAT KERAS OTONOM
              </span>
              <h3 className="text-lg font-bold text-white">
                Smart Harvester
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kapal panen katamaran bertenaga surya-hibrida tanpa awak. Beroperasi 16 jam non-stop dengan sensor LiDAR dan sonar anti-tabrakan.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Penghindaran rintangan sonar AI presisi tinggi
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Sistem pencacah mekanis hidrolik instan
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Zero-emission propulsi motor listrik brushless
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('telemetry')}
              className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
            >
              Pelajari Spesifikasi Armada &gt;
            </button>
          </div>

          {/* Pilar 2 */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-teal-400 font-bold block">
                PILAR 02 • KOMPUTASI & KEPATUHAN
              </span>
              <h3 className="text-lg font-bold text-white">
                AI Dashboard & ESG Analytics
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Platform intelijen geospasial real-time yang mengonversi pengerukan biomassa menjadi sertifikat emisi karbon yang siap diaudit akuntan publik.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  Peta konsentrasi gulma perairan NDVI/NDWI
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  Kalkulator klaim Scope 1, 2, & 3 otomatis
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  Sertifikat CSR siap audit akuntan publik
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('esg')}
              className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
            >
              Eksplorasi Fitur Dashboard &gt;
            </button>
          </div>

          {/* Pilar 3 */}
          <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-bold block">
                PILAR 03 • HILIRISASI SIRKULAR
              </span>
              <h3 className="text-lg font-bold text-white">
                Zero Waste Marketplace
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Biomassa eceng gondok yang dipanen diproses 100% tanpa residu menjadi pupuk bio-organik, biopot biodegradable, briket, dan kriya bernilai ekspor.
              </p>
              <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Pupuk Bio-Organic HyaGrow kaya Kalium
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Biopot Biodegradable terurai 45-60 hari
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Pemberdayaan UMKM pengrajin & petani lokal
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
            >
              Katalog Produk Sirkular &gt;
            </button>
          </div>
        </div>
      </section>

      {/* 4. CIRCULAR PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              PRODUK HASIL HILIRISASI
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Biomassa yang Diberdayakan Kembali
            </h2>
          </div>
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            Lihat Semua Produk & Simulasi Diskon B2B &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                ORGANIC CERTIFIED SNI
              </span>
              <h4 className="text-base font-bold text-white">
                HyaGrow Bio-Fertilizer (25 Kg)
              </h4>
              <p className="text-xs text-slate-300">
                Pupuk kompos aktif diperkaya Kalium alami dan asam humat. Meningkatkan produktivitas gabah dan kesuburan tanah.
              </p>
              <div className="font-mono text-xs text-emerald-400">
                -30 Kg CO₂e / karung
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-base font-bold text-white font-mono">Rp 68.000 <span className="text-xs text-slate-400 font-normal">/ zak</span></span>
              <button
                onClick={() => onAddToCart('prod-01')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition"
              >
                Pesan Grosir
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                100% DEGRADABLE
              </span>
              <h4 className="text-base font-bold text-white">
                HyaPot Eco-Nursery Pot (Pack 100)
              </h4>
              <p className="text-xs text-slate-300">
                Pot semai ramah lingkungan pengganti polybag plastik bibit kelapa sawit dan holtikultura. Langsung tanam ke tanah.
              </p>
              <div className="font-mono text-xs text-emerald-400">
                -15 Kg CO₂e / pack
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-base font-bold text-white font-mono">Rp 120.000 <span className="text-xs text-slate-400 font-normal">/ pack</span></span>
              <button
                onClick={() => onAddToCart('prod-02')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition"
              >
                Pesan Grosir
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded">
                CSR HANDCRAFTED
              </span>
              <h4 className="text-base font-bold text-white">
                HyaFiber Acoustic Panels & Kriya
              </h4>
              <p className="text-xs text-slate-300">
                Panel peredam suara ruangan ramah lingkungan berbahan serat anyaman eceng gondok olahan UMKM binaan waduk.
              </p>
              <div className="font-mono text-xs text-emerald-400">
                -45 Kg CO₂e / m²
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-base font-bold text-white font-mono">Rp 250.000 <span className="text-xs text-slate-400 font-normal">/ m²</span></span>
              <button
                onClick={() => onNavigate('csr')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition"
              >
                Konsultasi Kriya
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY GOV & OPERATORS & TESTIMONIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              DIPERCAYA OLEH PENGELOLA SUMBER DAYA AIR & PEMANGKU KEBIJAKAN LINGKUNGAN
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-bold font-mono text-slate-300">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-center text-center">
                Kementerian LHK<br />(Program DAS Citarum)
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-center text-center">
                PLTA Cirata & Saguling<br />(Proteksi Intake Turbin)
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-center text-center">
                Perum Jasa Tirta II<br />(Waduk Jatiluhur)
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-center text-center">
                Badan Otorita Danau Toba<br />(Destinasi Wisata Super)
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-8 max-w-4xl mx-auto text-center space-y-4">
            <p className="text-base sm:text-lg italic text-slate-200 leading-relaxed">
              &ldquo;Implementasi sistem armada otonom HyaCycle menghemat 42% biaya pengerukan manual kami per kuartal sembari memberikan laporan data emisi metana yang dapat diaudit langsung untuk laporan keberlanjutan tahunan perusahaan.&rdquo;
            </p>
            <div>
              <p className="text-xs font-bold text-emerald-400">Divisi Konservasi Lingkungan Hidup & Keandalan Waduk</p>
              <p className="text-[11px] text-slate-400">Operator Waduk Tenaga Air Nasional (Jawa Barat)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION & SCHEDULING FORM */}
      <section id="consultation-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              KONSULTASI & JADWALKAN DEMO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Siap Merevitalisasi Ekosistem Perairan Anda?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tim engineering dan analis ESG kami siap mendemonstrasikan armada otonom di lokasi bendungan atau danau Anda.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Permohonan Terkirim Sukses!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Terima kasih, tim Technical Support HyaCycle akan menghubungi Anda dalam waktu 1x24 jam untuk menjadwalkan demo telemetri langsung di lokasi perairan Anda.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
              >
                Kirim Permohonan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Nama Lengkap Pemohon
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Ir. Bambang Triyono"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Instansi / BUMN / Korporasi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Contoh: PT PLN Nusantara Power"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Resmi Perusahaan
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@instansi.co.id"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    No. WhatsApp / Telepon
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-XXXX-XXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Kategori Kebutuhan
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Pembersihan Reservoir PLTA / Bendungan</option>
                    <option>Kemitraan Alokasi CSR & TJSL BUMN</option>
                    <option>Pengadaan Produk Sirkular (Pupuk / Biopot Skala Fuso)</option>
                    <option>Restorasi Danau Wisata Nasional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Lokasi Perairan & Estimasi Luas (Ha)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lakeArea}
                    onChange={(e) => setFormData({ ...formData, lakeArea: e.target.value })}
                    placeholder="Contoh: Waduk Cirata Zona C, Est. 45 Hektar"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                Kirim Permohonan Penjadwalan & Konsultasi
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 pt-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 HyaCycle Inovasi Nusantara. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>OJK POJK 51/2017</span>
            <span>SRN-PPI #772/IDN/2025</span>
            <span>ISO 14064-2:2019</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
