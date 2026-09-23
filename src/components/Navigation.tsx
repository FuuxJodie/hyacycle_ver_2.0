import React, { useState } from 'react';
import {
  Activity,
  BarChart3,
  Globe2,
  Layers,
  ShoppingBag,
  Bell,
  Search,
  User,
  Menu,
  X,
  Radio,
  ChevronDown,
  ShieldCheck,
  Building2,
  Compass
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';
import { HyaCycleLogo } from './HyaCycleLogo';

interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  userRole: UserRole;
  userEmail: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenLogin,
  userRole,
  userEmail,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const roleNames: Record<UserRole, { label: string; badgeColor: string }> = {
    admin: { label: 'Admin / Lead Operator', badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' },
    operator: { label: 'IoT Vessel Operator', badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800' },
    auditor: { label: 'Auditor OJK & ESG', badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800' },
    bumn_client: { label: 'BUMN CSR Partner', badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-800' },
  };

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Globe2 },
    { id: 'telemetry', label: 'Live Telemetry', icon: Radio },
    { id: 'esg', label: 'ESG Analytics', icon: BarChart3 },
    { id: 'marketplace', label: 'Zero Waste Marketplace', icon: ShoppingBag },
    { id: 'csr', label: 'CSR Programs', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner Alert / Telemetry Sync Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 px-4 py-1.5 text-[11px] font-mono border-b border-emerald-500/20 flex items-center justify-between overflow-x-auto whitespace-nowrap text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ARMADA IOT: 6 KAPAL AKTIF
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Satelit Sentinel-2 L2A: <strong className="text-emerald-300">Sinkron 14 mnt lalu</strong> (Coverage Waduk Cirata 100%)
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">
            Biomassa Terangkat Hari Ini: <strong className="text-teal-300">4.820 Kg</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            ISO 14064-2 & POJK 51 Terverifikasi
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => onSelectTab('overview')}
          className="cursor-pointer transition hover:opacity-90 shrink-0"
        >
          <HyaCycleLogo size="md" subtitleText="SUSTAINABLE MOVEMENT" />
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'telemetry' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5">
          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition flex items-center gap-2"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline text-xs font-semibold">Keranjang</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationToast(!showNotificationToast)}
              className="p-2 rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition relative"
              title="Notifikasi Sistem"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
            </button>

            {/* Notification Dropdown */}
            {showNotificationToast && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-white">Notifikasi Armada & ESG</span>
                  <span className="text-[10px] font-mono text-emerald-400">3 Baru</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-emerald-500/30">
                    <p className="font-semibold text-emerald-300">HYA-01 Capai Muatan 78%</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Siap docking transfer biomassa di Dermaga Cipeundeuy.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <p className="font-semibold text-white">Sertifikat IDXCarbon Rilis</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">842 Ton CO₂e tervalidasi oleh auditor OJK.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <p className="font-semibold text-white">MoU PT Pupuk Kujang</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">SPK program revitalisasi 22.5 Ha siap ditandatangani.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Portal Button */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 transition group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition leading-none">
                  Dr. Aris Thorne
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className={`text-[9px] font-mono px-1 rounded uppercase mt-0.5 inline-block ${roleNames[userRole].badgeColor}`}>
                {roleNames[userRole].label}
              </span>
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-xs transition ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.id === 'telemetry' && (
                  <span className="text-[10px] font-mono bg-emerald-950 border border-emerald-800 text-emerald-400 px-2 py-0.5 rounded">
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
