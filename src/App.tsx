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

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartIdr = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
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
