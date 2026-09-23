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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Keranjang & Checkout B2B</h3>
              <p className="text-xs text-slate-500">
                {items.length} jenis produk sirkular siap didistribusikan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isOrderPlaced ? (
            <div className="p-6 text-center space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto border-2 border-teal-500 shadow-md shadow-teal-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Pesanan B2B Berhasil Dibuat!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Nomor Pesanan: <span className="font-mono text-teal-700 font-bold">ORD-HYA-2025-09821</span>. Invoice resmi dan instruksi pembayaran telah diterbitkan.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Metode:</span>
                  <span className="text-slate-900 font-bold">{paymentMethod.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Nomor Virtual Account:</span>
                  <span className="text-teal-700 font-bold">8872 1092 3847 0019</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Total Tagihan:</span>
                  <span className="text-slate-900 font-bold">{formattedGrandTotal}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Klaim Sertifikat ESG:</span>
                  <span className="text-teal-700 font-bold">Tervalidasi ({totalCarbonOffsetKg} Kg CO₂e)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsOrderPlaced(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition shadow-xs"
                >
                  Selesai & Kembali ke Dashboard
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm">Keranjang pesanan Anda masih kosong.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition"
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
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                        {item.product.badge}
                      </span>
                      <h5 className="font-semibold text-slate-900 text-xs sm:text-sm truncate mt-1">
                        {item.product.name}
                      </h5>
                      <p className="text-xs text-slate-500 font-mono">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                        }).format(item.product.price)} / {item.product.unit}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono text-slate-900 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carbon Offset badge */}
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Total Kontribusi Penyerapan CO₂:
                </span>
                <span className="font-mono font-bold text-teal-800">
                  {totalCarbonOffsetKg} Kg CO₂e
                </span>
              </div>

              {/* Shipping & Delivery Selector */}
              <div className="space-y-2 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-teal-600" />
                  Pilihan Logistik & Wilayah Pengiriman
                </label>
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-xs text-slate-800 rounded-lg p-2 font-mono focus:border-teal-600 focus:outline-none"
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
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Truk Engkel (5 Ton)
                    <span className="block text-[10px] text-teal-700 font-mono mt-0.5">Rp 650k</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMethod('fuso')}
                    className={`p-2 rounded-lg border text-center transition ${
                      shippingMethod === 'fuso'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Fuso Kontainer (20 Ton)
                    <span className="block text-[10px] text-teal-700 font-mono mt-0.5">Rp 1,85M</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingMethod('pickup')}
                    className={`p-2 rounded-lg border text-center transition ${
                      shippingMethod === 'pickup'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Ambil Sendiri
                    <span className="block text-[10px] text-slate-500 font-mono mt-0.5">Gratis</span>
                  </button>
                </div>
              </div>

              {/* ESG Certificate Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsEsgCertificate}
                  onChange={(e) => setWantsEsgCertificate(e.target.checked)}
                  className="mt-0.5 accent-teal-600"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">
                    Terbitkan Sertifikat Audit Karbon & Dampak Perairan (ISO 14064)
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Dilengkapi nomor registrasi SRN-PPI untuk pelaporan keberlanjutan tahunan korporat Anda.
                  </span>
                </div>
              </label>

              {/* Payment Method Selector */}
              <div className="space-y-2 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                <span className="text-xs font-bold text-slate-800 block">
                  Metode Pembayaran B2B / Institusional
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri_va')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'mandiri_va'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    Mandiri Virtual Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca_va')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'bca_va'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    BCA Virtual Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('corporate_po')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'corporate_po'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    PO Resmi (TOP 30 Hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-2 rounded-lg border text-left transition ${
                      paymentMethod === 'qris'
                        ? 'border-teal-500 bg-teal-100/70 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    QRIS Dinamis
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Totals and Checkout CTA */}
        {!isOrderPlaced && items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({items.length} Item):</span>
                <span>{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimasi Biaya Logistik:</span>
                <span>{formattedShipping}</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex justify-between text-slate-900 font-bold text-sm">
                <span>Total Tagihan:</span>
                <span className="text-teal-700">{formattedGrandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderPlaced(true)}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-500 shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Konfirmasi Pemesanan & Terbitkan Invoice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
