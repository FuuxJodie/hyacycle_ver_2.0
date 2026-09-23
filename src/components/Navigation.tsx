import React, { useState } from 'react';
import {
  Radio,
  BarChart3,
  Globe2,
  Layers,
  ShoppingBag,
  Bell,
  User,
  Menu,
  X,
  ChevronDown
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
    admin: { label: 'Admin / Lead Operator', badgeColor: 'text-teal-700 bg-teal-50 border-teal-200' },
    operator: { label: 'IoT Vessel Operator', badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
    auditor: { label: 'Auditor OJK & ESG', badgeColor: 'text-amber-700 bg-amber-50 border-amber-200' },
    bumn_client: { label: 'BUMN CSR Partner', badgeColor: 'text-purple-700 bg-purple-50 border-purple-200' },
  };

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Globe2 },
    { id: 'telemetry', label: 'Live Telemetry', icon: Radio },
    { id: 'esg', label: 'ESG Analytics', icon: BarChart3 },
    { id: 'marketplace', label: 'Zero Waste Marketplace', icon: ShoppingBag },
    { id: 'csr', label: 'CSR Programs', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Alert / Telemetry Sync Bar */}
      <div className="bg-teal-50/80 px-4 py-1.5 text-[11px] font-mono border-b border-teal-100 flex items-center justify-between overflow-x-auto whitespace-nowrap text-slate-700">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-teal-800 font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            ARMADA IOT: 6 KAPAL AKTIF
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">
            Satelit Sentinel-2 L2A: <strong className="text-teal-700 font-semibold">Sinkron 14 mnt lalu</strong> (Coverage Waduk Cirata 100%)
          </span>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-slate-600 hidden md:inline">
            Biomassa Terangkat Hari Ini: <strong className="text-teal-800 font-semibold">4.820 Kg</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded border border-teal-200 font-semibold">
            ISO 14064-2 & POJK 51 Terverifikasi
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Official HyaCycle Logo from User */}
        <div
          onClick={() => onSelectTab('overview')}
          className="cursor-pointer transition hover:opacity-90 shrink-0"
        >
          <HyaCycleLogo size="md" subtitleText="SUSTAINABLE MOVEMENT" />
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.id === 'telemetry' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping ml-0.5" />
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
            className="relative p-2 rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition flex items-center gap-2 shadow-xs cursor-pointer"
            title="Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline text-xs font-semibold">Keranjang</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-teal-600 text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationToast(!showNotificationToast)}
              className="p-2 rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition relative shadow-xs cursor-pointer"
              title="Notifikasi Sistem"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-600" />
            </button>

            {/* Notification Dropdown */}
            {showNotificationToast && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900">Notifikasi Armada & ESG</span>
                  <span className="text-[10px] font-mono text-teal-600 font-semibold">3 Baru</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-teal-50/60 border border-teal-200">
                    <p className="font-semibold text-teal-900">HYA-01 Capai Muatan 78%</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Siap docking transfer biomassa di Dermaga Cipeundeuy.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-semibold text-slate-900">Sertifikat IDXCarbon Rilis</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">842 Ton CO₂e tervalidasi oleh auditor OJK.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="font-semibold text-slate-900">MoU PT Pupuk Kujang</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">SPK program revitalisasi 22.5 Ha siap ditandatangani.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Portal Button */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white border border-slate-200 hover:border-teal-500/50 hover:bg-slate-50 transition group text-left shadow-xs cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition leading-none">
                  Dr. Aris Thorne
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className={`text-[9px] font-mono px-1 rounded uppercase mt-0.5 inline-block border font-semibold ${roleNames[userRole].badgeColor}`}>
                {roleNames[userRole].label}
              </span>
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-xs"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
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
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.id === 'telemetry' && (
                  <span className="text-[10px] font-mono bg-teal-100 border border-teal-300 text-teal-800 px-2 py-0.5 rounded font-bold">
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
