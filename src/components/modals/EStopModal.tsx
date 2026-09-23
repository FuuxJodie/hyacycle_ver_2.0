import React from 'react';
import { AlertTriangle, ShieldAlert, Power, RefreshCw, X } from 'lucide-react';

interface EStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  unitId: string;
  unitName: string;
}

export const EStopModal: React.FC<EStopModalProps> = ({
  isOpen,
  onClose,
  onReset,
  unitId,
  unitName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border-2 border-red-500 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top flashing header */}
        <div className="bg-red-50 border-b border-red-200 p-4 flex items-center justify-between text-red-700">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 animate-pulse text-red-600" />
            <span className="font-mono text-sm font-bold tracking-wider">
              PROTOKOL DARURAT: E-STOP AKTIF
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center text-red-600 shadow-md shadow-red-500/30">
            <Power className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Sistem Dimatikan Secara Paksa
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Unit <span className="font-mono font-bold text-red-600">{unitId} ({unitName})</span> telah menerima sinyal E-STOP manual via LoRaWAN/CanBus.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left font-mono text-xs space-y-2 text-slate-600">
            <div className="flex justify-between items-center text-red-700 font-semibold">
              <span>● KONVEYOR HIDROLIK:</span>
              <span className="bg-red-100 px-2 py-0.5 rounded border border-red-300">TERKUNCI MATI (0.0 m/s)</span>
            </div>
            <div className="flex justify-between items-center text-red-700 font-semibold">
              <span>● MOTOR PENDORONG UTAMA:</span>
              <span className="bg-red-100 px-2 py-0.5 rounded border border-red-300">DAYA TERPUTUS (0 RPM)</span>
            </div>
            <div className="flex justify-between items-center text-teal-800 font-semibold">
              <span>● SUAR TELEMETRI & GPS:</span>
              <span className="bg-teal-100 px-2 py-0.5 rounded border border-teal-300">TETAP MEMANCAR (100%)</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Pastikan lingkungan perairan di sekitar lambung kapal dalam kondisi aman dari jaring nelayan, kayu apung, atau kendala mekanis sebelum mereset motor penggerak.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition shadow-xs cursor-pointer"
            >
              Tetap Kunci Sistem (Off)
            </button>
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full sm:w-1/2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reset & Lanjutkan Misi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
