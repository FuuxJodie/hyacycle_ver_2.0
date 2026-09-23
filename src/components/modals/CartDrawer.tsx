import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, ShieldCheck, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [destinationCity, setDestinationCity] = useState('Bandung & Sekitarnya (Waduk Cirata Hub)');
  const [shippingMethod, setShippingMethod] = useState<'engkel' | 'fuso' | 'pickup'>('engkel');
  const [wantsEsgCertificate, setWantsEsgCertificate] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'mandiri_va' | 'bca_va' | 'corporate_po'>('mandiri_va');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCarbonOffsetKg = items.reduce(
    (sum, item) => sum + item.product.carbonOffsetKg * item.quantity,
    0
  );

  const shippingCost =
    shippingMethod === 'pickup'
      ? 0
      : shippingMethod === 'fuso'
      ? 1850000
      : 650000;

  const grandTotal = subtotal + shippingCost;

  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  const formattedShipping = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(shippingCost);

  const formattedGrandTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(grandTotal);

  const handleCheckout = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Keranjang & Checkout B2B</h3>
              <p className="text-xs text-slate-400">
                {items.length} jenis produk sirkular siap didistribusikan
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

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isOrderPlaced ? (
            <div className="p-6 text-center space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Pesanan B2B Berhasil Dibuat!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Nomor Pesanan: <span className="font-mono text-emerald-400 font-bold">ORD-HYA-2025-09821</span>. Invoice resmi dan instruksi pembayaran telah diterbitkan.
              </p>
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Metode:</span>
                  <span className="text-white font-bold">{paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Nomor Virtual Account:</span>
                  <span className="text-emerald-400 font-bold">8872 1092 3847 0019</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Tagihan:</span>
                  <span className="text-white font-bold">{formattedGrandTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Klaim Sertifikat ESG:</span>
                  <span className="text-teal-300 font-bold">Tervalidasi ({totalCarbonOffsetKg} Kg CO₂e)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsOrderPlaced(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow"
                >
                  Selesai & Kembali ke Dashboard
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">Keranjang pesanan Anda masih kosong.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/50 transition"
              >
                Pilih Produk dari Marketplace
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        {item.product.badge}
                      </span>
                      <h5 className="font-semibold text-white text-xs sm:text-sm truncate mt-1">
                        {item.product.name}
                      </h5>
                      <p className="text-xs text-slate-400 font-mono">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                        }).format(item.product.price)} / {item.product.unit}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carbon Offset badge */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Total Kontribusi Penyerapan CO₂:
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {totalCarbonOffsetKg} Kg CO₂e
                </span>
              </div>

              {/* Shipping & Delivery Selector */}
              <div className="space-y-2 bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-xl">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Pilihan Logistik & Wilayah Pengiriman
                </label>
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option>Bandung & Sekitarnya (Waduk Cirata Hub)</option>
                  <option>DKI Jakarta & Kawasan Industri Jabodetabek</option>
                  <option>Purwakarta & Subang (Kawasan Perkebunan)</option>
                  <option>Semarang & Jawa Tengah (Sentra Rawa Pening)</option>
                  <option>Surabaya & Jawa Timur</option>
                </select>

                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('engkel')}
                    className={`p-2 rounded-lg border text-center transition ${
                      shippingMethod === 'engkel'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Truk Engkel (5 Ton)
                    <span className="block text-[10px] text-emerald-400 font-mono mt-0.5">Rp 650k</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMethod('fuso')}
                    className={`p-2 rounded-lg border text-center transition ${
                      shippingMethod === 'fuso'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Truk Fuso (15 Ton)
                    <span className="block text-[10px] text-emerald-400 font-mono mt-0.5">Rp 1,85M</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMethod('pickup')}
                    className={`p-2 rounded-lg border text-center transition ${
                      shippingMethod === 'pickup'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Ambil di Gudang
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">Gratis (Rp 0)</span>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 bg-slate-950/50 border border-slate-800/80 p-3.5 rounded-xl text-xs">
                <label className="font-bold text-slate-300">Metode Pembayaran Korporat / Instansi</label>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri_va')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'mandiri_va'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Mandiri Virtual Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca_va')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'bca_va'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    BCA Virtual Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('corporate_po')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'corporate_po'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    Purchase Order (TOP 30 Hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'qris'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    QRIS B2B Settlement
                  </button>
                </div>
              </div>

              {/* ESG Certificate Checkbox */}
              <label className="flex items-start gap-2.5 p-3 bg-slate-950/30 border border-slate-800 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsEsgCertificate}
                  onChange={(e) => setWantsEsgCertificate(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">
                    Terbitkan Sertifikat Klaim Emisi Karbon (Scope 3)
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Dokumen resmi dengan stempel digital untuk dilampirkan ke Laporan Keberlanjutan OJK korporasi Anda.
                  </p>
                </div>
              </label>

              {/* Price Calculation */}
              <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal Produk:</span>
                  <span className="text-slate-200">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimasi Ongkos Angkut:</span>
                  <span className="text-slate-200">{formattedShipping}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PPN 11% (DTP Bebas PPN Hilirisasi):</span>
                  <span className="text-emerald-400 font-bold">Rp 0 (Insentif Hijau)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-white font-bold text-sm">
                  <span>Total Pembayaran:</span>
                  <span className="text-emerald-400">{formattedGrandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {!isOrderPlaced && items.length > 0 && (
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase font-mono text-slate-400">Total Akhir</p>
              <p className="text-base font-bold text-emerald-400">{formattedGrandTotal}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 transition"
            >
              Konfirmasi & Dapatkan Invoice
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
