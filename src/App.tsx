import React, { useState } from 'react';
import { NavigationTab, UserRole, CartItem } from './types';
import { PRODUCTS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { OverviewView } from './components/views/OverviewView';
import { LiveTelemetryView } from './components/views/LiveTelemetryView';
import { EsgAnalyticsView } from './components/views/EsgAnalyticsView';
import { MarketplaceView } from './components/views/MarketplaceView';
import { CsrManagementView } from './components/views/CsrManagementView';
import { CartDrawer } from './components/modals/CartDrawer';
import { ClientPortalModal } from './components/modals/ClientPortalModal';
import { HyaCycleLogo } from './components/HyaCycleLogo';
import { ShieldCheck, CheckCircle2, Award, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [userEmail, setUserEmail] = useState<string>('aris.thorne@hyacycle.tech');

  // Initial cart with items matching the marketplace mockup
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 50 }, // 50 sak HyaBio-Grow
    { product: PRODUCTS[1], quantity: 20 }, // 20 pack HyaPot Eco
  ]);

  const handleAddToCart = (productId: string, quantity = 1) => {
    const targetProduct = PRODUCTS.find((p) => p.id === productId);
    if (!targetProduct) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: targetProduct, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartIdr = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Top Main Navigation & Telemetry Alert Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        userRole={userRole}
        userEmail={userEmail}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <OverviewView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(id) => {
              handleAddToCart(id, 1);
              setIsCartOpen(true);
            }}
          />
        )}

        {activeTab === 'telemetry' && <LiveTelemetryView />}

        {activeTab === 'esg' && <EsgAnalyticsView />}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            onAddToCart={(id, qty) => {
              handleAddToCart(id, qty || 1);
            }}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartItems.length}
            cartTotalIdr={totalCartIdr}
          />
        )}

        {activeTab === 'csr' && <CsrManagementView />}
      </main>

      {/* Light Theme Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <HyaCycleLogo size="md" subtitleText="SUSTAINABLE MOVEMENT" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Pionir pemulihan perairan otonom berbasis robotika katamaran IoT, verifikasi satelit Sentinel-2, dan hilirisasi biomassa eceng gondok sirkular bernilai ekonomi.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-teal-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                ISO 14064-2 & POJK 51 OJK
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 mb-3">Modul Solusi</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button onClick={() => { setActiveTab('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-700 transition">
                    Ringkasan Ekosistem
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('telemetry'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-700 transition">
                    Telemetri GNSS & Kamera AI
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('esg'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-700 transition">
                    Ledger Audit ESG & POJK 51
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-700 transition">
                    Zero Waste Marketplace
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab('csr'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-700 transition">
                    Kemitraan CSR TJSL BUMN
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 mb-3">Sertifikasi & Kepatuhan</h4>
              <ul className="space-y-2 text-xs text-slate-600 font-mono">
                <li>✓ POJK 51/POJK.03/2017 Keuangan Berkelanjutan</li>
                <li>✓ ISO 14064-2:2019 Gas Rumah Kaca</li>
                <li>✓ SNI 19-7030-2004 Kompos Organik Teruji</li>
                <li>✓ Registrasi SRN-PPI Kementerian LHK</li>
                <li>✓ Uji Sucofindo & Balai Penelitian Tanah</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900 mb-3">Kontak Lapangan & Operasi</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Dermaga Cipeundeuy, Waduk Cirata, Jawa Barat</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>kemitraan@hyacycle.tech</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>+62 21 5088 9421 (Hotline B2G)</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} HyaCycle. All rights reserved. Transforming Water Crisis into Circular Wealth.</p>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="text-teal-700 font-semibold">Status Sistem: Operasional 100%</span>
              <span>WGS-84 / UTM Zona 48S</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Client Portal / Login Modal */}
      <ClientPortalModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(role, email) => {
          setUserRole(role);
          setUserEmail(email);
        }}
        currentRole={userRole}
      />
    </div>
  );
}
