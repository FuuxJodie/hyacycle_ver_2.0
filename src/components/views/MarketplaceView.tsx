import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  Sprout,
  Package,
  Wheat,
  Flame,
  Droplet,
  Sliders,
  ArrowRight,
  Plus
} from 'lucide-react';
import { ProductItem } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import { LabTestModal } from '../modals/LabTestModal';

interface MarketplaceViewProps {
  onAddToCart: (productId: string, quantity?: number) => void;
  onOpenCart: () => void;
  cartCount: number;
  cartTotalIdr: number;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onAddToCart,
  onOpenCart,
  cartCount,
  cartTotalIdr,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLabProduct, setSelectedLabProduct] = useState<string | null>(null);

  // B2B Discount Simulator Slider State
  const [b2bQuantity, setB2bQuantity] = useState<number>(120);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'semua' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Simulator Calculations
  const unitPrice = 65000; // HyaBio-Grow base
  let discountPercent = 0;
  if (b2bQuantity >= 250) discountPercent = 15;
  else if (b2bQuantity >= 100) discountPercent = 10;
  else if (b2bQuantity >= 50) discountPercent = 5;

  const simSubtotal = b2bQuantity * unitPrice;
  const simDiscount = (simSubtotal * discountPercent) / 100;
  const simTotal = simSubtotal - simDiscount;
  const simCarbonOffset = b2bQuantity * 30; // 30kg per bag

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-6 h-6 text-teal-600" />;
      case 'Package': return <Package className="w-6 h-6 text-amber-600" />;
      case 'Wheat': return <Wheat className="w-6 h-6 text-teal-700" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-600" />;
      case 'Droplet': return <Droplet className="w-6 h-6 text-cyan-600" />;
      default: return <Sprout className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. TOP BATCH HEADER & CART FLOATER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                HILIRISASI BIOMASSA DANAU CIRATA
              </span>
              <span className="text-slate-500">BATCH #CR-2025-04 • SERTIFIKASI MUTU SNI & ISO 14064 TERVERIFIKASI</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Zero Waste Circular Marketplace
            </h1>
            <p className="text-xs text-slate-500">
              Katalog produk organik bernilai komersial hasil konversi 100% gulma air tanpa limbah residu.
            </p>
          </div>

          {/* Quick Cart button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right font-mono text-xs">
              <span className="text-[10px] text-slate-500 block uppercase">BIOMASSA TERHILIRISASI</span>
              <span className="text-teal-700 font-bold">142.8 Ton</span>
            </div>
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cartCount} Barang di Keranjang</span>
              <span className="text-teal-100 font-mono">| {formatRupiah(cartTotalIdr)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. IMPACT BANNER */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-slate-50 border border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900">
              Setiap pembelian 100 kg pupuk telah membantu membersihkan 450 m² perairan dan menyerap 120 kg CO₂
            </p>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Tervalidasi audit akuntan lingkungan independen EcoVeritas & Lembaga Sertifikasi Pertanian Organik.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0 font-mono text-xs hidden md:block">
          <span className="text-teal-800 font-bold bg-teal-100/70 border border-teal-300 px-2.5 py-1 rounded">
            DTP Bebas PPN Hijau 11%
          </span>
        </div>
      </div>

      {/* 3. FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs font-semibold">
          {[
            { id: 'semua', label: 'Semua Produk' },
            { id: 'pupuk', label: 'Pupuk Hayati & Kompos' },
            { id: 'biopot', label: 'Biopot Biodegradable' },
            { id: 'pakan', label: 'Pakan Ternak Silase' },
            { id: 'briket', label: 'Briket Biomassa' },
            { id: 'biostimulan', label: 'Biostimulan Cair' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pupuk, biopot, pakan..."
            className="w-full bg-white border border-slate-300 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 shadow-xs"
          />
        </div>
      </div>

      {/* 4. PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-5 flex flex-col justify-between transition group space-y-4 shadow-xs hover:shadow-md"
          >
            <div className="space-y-3">
              {/* Card Top: Icon & Badge */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {getProductIcon(prod.iconName)}
                </div>
                <span className="text-[10px] font-mono uppercase bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
                  {prod.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-[11px] font-mono">
                {Object.entries(prod.specs).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-slate-500 text-[10px] block">{key}:</span>
                    <span className="text-slate-800 font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              {/* Carbon Offset tag */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">Serapan Karbon:</span>
                <span className="text-teal-700 font-bold">-{prod.carbonOffsetKg} Kg CO₂e / {prod.unit.split(' ')[0]}</span>
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                Stok: {prod.stockAvailable}
              </div>
            </div>

            {/* Bottom Actions: Price, CoA test, Add to Cart */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Harga Grosir</span>
                <span className="text-base font-black text-slate-900 font-mono">
                  {formatRupiah(prod.price)}
                  <span className="text-[10px] font-normal text-slate-500">/{prod.unit}</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedLabProduct(prod.name)}
                  className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition shadow-xs"
                  title="Lihat Hasil Uji Lab Sucofindo"
                >
                  Uji Lab
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(prod.id, 1)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 flex items-center gap-1 shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. LARGE B2B ENTERPRISE ORDER BANNER */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white border border-teal-700/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase bg-teal-500/20 text-teal-300 border border-teal-400/40 px-2.5 py-0.5 rounded font-bold">
            B2B OFF-TAKER & CORPORATE SUPPLY CHAIN
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Pemesanan Skala Fuso & Kontainer Ekspor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Menyediakan pasokan biomassa terstandar industri hingga 250 Ton per bulan untuk perkebunan kelapa sawit, pabrik pupuk BUMN, dan pembangkit co-firing biomassa.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-teal-300">
            <span>✓ TOP 30-60 Hari (Invoice Resmi)</span>
            <span>✓ Gratis Ongkir Armada Fuso Kontainer</span>
            <span>✓ Dedicated Account Manager</span>
          </div>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('b2b-simulator');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-lg shadow-teal-500/20 shrink-0 transition"
        >
          Hitung Diskon Skala Besar &gt;
        </button>
      </div>

      {/* 6. INTERACTIVE LAB TEST & AUTOMATIC B2B DISCOUNT SIMULATOR */}
      <div id="b2b-simulator" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-mono uppercase text-teal-700 font-bold">
            INTERACTIVE CALCULATOR
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            Uji Laboratorium & Simulasi Diskon B2B Otomatis
          </h3>
          <p className="text-xs text-slate-500">
            Simulasikan penghematan biaya dan volume serapan emisi karbon untuk pengadaan pupuk HyaBio-Grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Lab Analysis snapshot (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-600" />
                Parameter Mutu Uji Balittanah Kementan RI
              </span>
              <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                SNI 19-7030-2004
              </span>
            </div>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Rasio Karbon/Nitrogen (C/N):</span>
                <span className="text-teal-800 font-bold">15.2 (Standar 10-25) ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Kandungan Kalium Alami (K₂O):</span>
                <span className="text-teal-800 font-bold">3.82% (Unggul +150%) ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Total C-Organik:</span>
                <span className="text-teal-800 font-bold">24.6% (Min. 15%) ✓</span>
              </div>
              <div className="flex justify-between">
                <span>Kadar Logam Berat Timbal (Pb):</span>
                <span className="text-cyan-800 font-bold">&lt;0.05 ppm (Sangat Steril) ✓</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLabProduct('HyaBio-Grow Organik Kompos Granul')}
              className="w-full mt-2 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition text-center shadow-xs"
            >
              Buka Lembar Sertifikat Analisis Lengkap (CoA)
            </button>
          </div>

          {/* Right: Interactive Volume Slider & Price (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-700 font-bold">Volume Pesanan Pupuk:</span>
                <span className="text-lg font-black text-teal-700">{b2bQuantity} Sak ({(b2bQuantity * 25) / 1000} Ton)</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={b2bQuantity}
                onChange={(e) => setB2bQuantity(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>10 Sak (Eceran B2B)</span>
                <span>100 Sak (-10% Diskon)</span>
                <span>250+ Sak (-15% Diskon Fuso)</span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Harga Normal (@Rp 65.000):</span>
                <span>{formatRupiah(simSubtotal)}</span>
              </div>
              <div className="flex justify-between text-teal-700 font-semibold">
                <span>Potongan Tier Grosir ({discountPercent}%):</span>
                <span>- {formatRupiah(simDiscount)}</span>
              </div>
              <div className="flex justify-between text-cyan-700">
                <span>Estimasi Serapan Karbon:</span>
                <span>{simCarbonOffset} Kg CO₂e</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-bold text-sm">
                <span>Total Investasi Pembelian:</span>
                <span className="text-teal-700">{formatRupiah(simTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart('prod-01', b2bQuantity)}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Masukkan Pesanan Grosir ({b2bQuantity} Sak) ke Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* Lab Test Modal */}
      {selectedLabProduct && (
        <LabTestModal
          isOpen={!!selectedLabProduct}
          onClose={() => setSelectedLabProduct(null)}
          productName={selectedLabProduct}
        />
      )}
    </div>
  );
};
