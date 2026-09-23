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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.4)] overflow-hidden">
        {/* Top flashing header */}
        <div className="bg-red-600/20 border-b border-red-500/40 p-4 flex items-center justify-between text-red-400">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 animate-pulse text-red-500" />
            <span className="font-mono text-sm font-bold tracking-wider">
              PROTOKOL DARURAT: E-STOP AKTIF
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)]">
            <Power className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              Sistem Dimatikan Secara Paksa
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Unit <span className="font-mono font-bold text-red-400">{unitId} ({unitName})</span> telah menerima sinyal E-STOP manual via LoRaWAN/CanBus.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-left font-mono text-xs space-y-2 text-slate-400">
            <div className="flex justify-between items-center text-red-400 font-semibold">
              <span>● KONVEYOR HIDROLIK:</span>
              <span className="bg-red-950/80 px-2 py-0.5 rounded border border-red-800">TERKUNCI MATI (0.0 m/s)</span>
            </div>
            <div className="flex justify-between items-center text-red-400 font-semibold">
              <span>● PISAU AUGER PEMOTONG:</span>
              <span className="bg-red-950/80 px-2 py-0.5 rounded border border-red-800">DISENGAGED (0 RPM)</span>
            </div>
            <div className="flex justify-between items-center text-amber-400 font-semibold">
              <span>● MOTOR PROPULSI LISTRIK:</span>
              <span className="bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">NEUTRAL BRAKE ENGAGED</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400">
              <span>● TELEMETRI & GPS RTK:</span>
              <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">TETAP ONLINE (SOS BEACON)</span>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs text-left flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Pastikan tidak ada rintangan jaring nelayan, perahu warga, atau personil di sekitar haluan kapal sebelum mereset sistem operasional.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
          >
            Tutup Dialog
          </button>
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Relai & Mulai Ulang Sistem
          </button>
        </div>
      </div>
    </div>
  );
};
