import React, { useState, useEffect } from 'react';
import {
  Radio,
  Compass,
  Gauge,
  Battery,
  Wifi,
  Cpu,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Sliders,
  Maximize2,
  Download,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crosshair,
  Droplets,
  Thermometer,
  Activity,
  Layers,
  Sparkles,
  Power
} from 'lucide-react';
import { HarvesterUnit } from '../../types';
import { INITIAL_HARVESTERS } from '../../data/mockData';
import { EStopModal } from '../modals/EStopModal';

export const LiveTelemetryView: React.FC = () => {
  const [harvesters, setHarvesters] = useState<HarvesterUnit[]>(INITIAL_HARVESTERS);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('HYA-01');
  const [controlMode, setControlMode] = useState<'autonomous' | 'manual'>('autonomous');
  const [throttle, setThrottle] = useState<number>(45);
  const [rudderAngle, setRudderAngle] = useState<number>(0);
  const [isEStopOpen, setIsEStopOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showAutonomousPath, setShowAutonomousPath] = useState(true);
  const [conveyorPushed, setConveyorPushed] = useState(false);
  const [augerReversed, setAugerReversed] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const activeUnit = harvesters.find((h) => h.id === selectedUnitId) || harvesters[0];

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.getFullYear() +
          '-' +
          String(now.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(now.getDate()).padStart(2, '0') +
          ' ' +
          String(now.getHours()).padStart(2, '0') +
          ':' +
          String(now.getMinutes()).padStart(2, '0') +
          ':' +
          String(now.getSeconds()).padStart(2, '0') +
          ' WIB'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live slight oscillation simulation for telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setHarvesters((prev) =>
        prev.map((h) => {
          if (h.id === 'HYA-01' && h.status === 'OTONOM AKTIF') {
            const deltaRssi = (Math.random() - 0.5) * 1.5;
            const deltaSpeed = (Math.random() - 0.5) * 0.05;
            return {
              ...h,
              speedKnots: Math.max(1.5, Math.min(2.1, Number((h.speedKnots + deltaSpeed).toFixed(2)))),
              loraRssi: Math.round(h.loraRssi + deltaRssi),
            };
          }
          return h;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadNmea = () => {
    const nmeaContent = [
      '$GPRMC,034219.00,A,0644.4687,S,10719.9013,E,1.80,042.0,180525,,,A*7A',
      '$GPGGA,034219.00,0644.4687,S,10719.9013,E,4,14,0.82,221.4,M,0.0,M,1.0,0001*5C',
      '$GPVTG,042.0,T,,M,1.80,N,3.33,K,A*23',
      '$HYATL,HYA-01,BAT=78%,VOLT=52.8,LOAD=420KG,HOPPER=78.4%,DO=6.8,PH=7.2*3F',
      '# HYACYCLE RTK-ENHANCED LORAWAN TELEMETRY LOG',
      `# TIMESTAMP: ${new Date().toISOString()}`,
      '# SECTOR: WADUK CIRATA ZONA B (LAT -6.741144, LON 107.331689)',
    ].join('\n');

    const blob = new Blob([nmeaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NMEA_LOG_${selectedUnitId}_${Date.now()}.nmea`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleManualSteer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (controlMode === 'autonomous') {
      alert("Aktifkan mode [Manual Override] terlebih dahulu untuk mengambil alih kendali kemudi.");
      return;
    }
    if (direction === 'left') {
      setRudderAngle((prev) => Math.max(-35, prev - 5));
    } else if (direction === 'right') {
      setRudderAngle((prev) => Math.min(35, prev + 5));
    } else if (direction === 'up') {
      setThrottle((prev) => Math.min(100, prev + 5));
    } else if (direction === 'down') {
      setThrottle((prev) => Math.max(0, prev - 5));
    }
  };

  const handleResetEStop = () => {
    setHarvesters((prev) =>
      prev.map((h) => (h.id === activeUnit.id ? { ...h, status: 'OTONOM AKTIF' } : h))
    );
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* 1. TOP SUBHEADER BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-900 font-bold text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              Telemetri Lapangan Real-Time
            </span>
            <span className="text-[10px] font-mono bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
              LORAWAN SF7 • ONLINE
            </span>
            <span className="text-[10px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded font-semibold">
              GPS NEO-M8P RTK FIXED
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Sektor: <strong className="text-slate-800">{activeUnit.lake} - {activeUnit.sector}</strong> • Referensi Geodesi WGS-84
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-left font-mono text-xs">
            <span className="text-[10px] text-slate-500 uppercase block leading-none">SENTINEL-2 INGEST</span>
            <span className="text-teal-700 font-bold">Tervalidasi (14 mnt lalu)</span>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-left font-mono text-xs">
            <span className="text-[10px] text-slate-500 uppercase block leading-none">BIOMASSA TERANGKAT</span>
            <span className="text-slate-900 font-bold">4.820 kg (Hari Ini)</span>
          </div>
          <button
            onClick={handleDownloadNmea}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-teal-600" />
            Unduh Log NMEA
          </button>
        </div>
      </div>

      {/* 2. INTERACTIVE GEOSPATIAL RADAR & HYDRO MAP */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
        {/* GNSS Header details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span className="text-teal-700 font-bold flex items-center gap-1.5">
              <Crosshair className="w-4 h-4" />
              RTK GNSS DIFFERENTIAL FIX (14 Sats)
            </span>
            <span>LAT: <strong className="text-slate-900">{activeUnit.coordinates.dmsLat}</strong></span>
            <span>LON: <strong className="text-slate-900">{activeUnit.coordinates.dmsLng}</strong></span>
            <span>ALT: <strong className="text-slate-900">{activeUnit.coordinates.alt} m MSL</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Akurasi: <strong className="text-teal-700 font-bold">±0.03 m</strong></span>
            <span>HDOP: <strong className="text-slate-800">0.82</strong></span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-900 font-bold">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              N {String(activeUnit.heading).padStart(3, '0')}°
            </span>
          </div>
        </div>

        {/* Map Canvas / SVG Geospatial Display (Light nautical palette) */}
        <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-[#e6f4f1] via-[#e2f1ee] to-[#d8ece7] rounded-2xl overflow-hidden border border-teal-200/80">
          {/* Hydrographic reservoir grid */}
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#0d948820_1px,transparent_1px),linear-gradient(to_bottom,#0d948820_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Radar Sweep Animation Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full border border-teal-500/25 pointer-events-none">
            <div className="w-full h-full rounded-full border border-teal-500/20 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-dashed border-teal-500/35" />
            </div>
            {/* Rotating radar sweep */}
            <div className="absolute inset-0 rounded-full animate-radar origin-center pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-teal-500/25 to-transparent rounded-tl-full" />
            </div>
          </div>

          {/* SVG Map details: Lake Shoreline and Weed Bloom Heatmap */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Reservoir Shorelines */}
            <path
              d="M 0,80 Q 200,40 380,90 T 700,60 L 800,90 L 800,400 L 0,400 Z"
              fill="#cbe3dc"
              opacity="0.65"
            />
            <path
              d="M 50,140 Q 220,100 420,130 T 780,110"
              stroke="#0f766e"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            {/* Island / Peninsula */}
            <path
              d="M 540,160 Q 640,140 680,200 T 560,250 Z"
              fill="#b2d6cd"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />

            {/* Heatmap Layer (Sentinel-2 NDVI weed bloom) */}
            {showHeatmap && (
              <g opacity="0.7">
                {/* Thick weed patch Zone 1 */}
                <ellipse cx="280" cy="180" rx="90" ry="50" fill="url(#weedHeatLight1)" />
                {/* Weed patch Zone 2 */}
                <ellipse cx="490" cy="220" rx="110" ry="60" fill="url(#weedHeatLight2)" />
                {/* Moderate patch */}
                <ellipse cx="140" cy="240" rx="60" ry="35" fill="url(#weedHeatLight3)" />
              </g>
            )}

            {/* Autonomous planned trajectory path */}
            {showAutonomousPath && (
              <g>
                <path
                  d="M 180,260 L 260,200 L 320,180 L 400,210 L 480,230"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="opacity-90"
                />
                <circle cx="260" cy="200" r="4" fill="#0d9488" />
                <circle cx="320" cy="180" r="4" fill="#0d9488" />
                <circle cx="400" cy="210" r="4" fill="#0d9488" />
                <circle cx="480" cy="230" r="4" fill="#0d9488" />
              </g>
            )}

            <defs>
              <radialGradient id="weedHeatLight1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="weedHeatLight2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#84cc16" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="weedHeatLight3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Vessel Markers Placed on Map */}
          {/* HYA-01 Nusantara Alpha (Selected) */}
          <div
            onClick={() => setSelectedUnitId('HYA-01')}
            className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-teal-500 opacity-60" />
              <div className="w-8 h-8 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-teal-700/40">
                <Radio className="w-4 h-4" />
              </div>
            </div>
            {/* Label card */}
            <div className="mt-1 bg-white/95 border border-teal-500 text-slate-900 px-2.5 py-1 rounded-md text-[11px] font-mono shadow-md whitespace-nowrap">
              <div className="flex items-center gap-1 font-bold text-teal-800">
                HYA-01 Nusantara Alpha
              </div>
              <div className="text-[10px] text-slate-600">
                1.8 Knots • Heading 042° • Auto
              </div>
            </div>
          </div>

          {/* HYA-02 Cirata Beta */}
          <div
            onClick={() => setSelectedUnitId('HYA-02')}
            className="absolute top-[55%] left-[62%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-600 border border-white flex items-center justify-center text-white">
              <Radio className="w-3 h-3" />
            </div>
            <div className="mt-1 bg-white/95 border border-slate-300 text-slate-800 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-xs">
              HYA-02 Beta (0.9 Kn)
            </div>
          </div>

          {/* HYA-03 Aruna Explorer (Docking) */}
          <div
            onClick={() => setSelectedUnitId('HYA-03')}
            className="absolute top-[68%] left-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className="w-5 h-5 rounded-full bg-slate-500 border border-white flex items-center justify-center text-white text-[10px] font-bold">
              D
            </div>
            <div className="mt-1 bg-white/90 border border-slate-300 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-xs">
              HYA-03 Aruna (Pangkalan)
            </div>
          </div>

          {/* Water quality in-situ sonde floating marker */}
          <div className="absolute top-[28%] left-[52%] bg-white/90 border border-teal-400 px-2 py-1 rounded text-[10px] font-mono text-teal-800 flex items-center gap-1 shadow-xs">
            <Droplets className="w-3 h-3" />
            Sonde Cirata-02: DO 6.8 mg/L • pH 7.2
          </div>
        </div>

        {/* Map Footer Controls & Legend */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-600 font-bold">DENSITAS GULMA:</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500">Rendah</span>
              <div className="w-28 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500" />
              <span className="text-[10px] text-red-600 font-bold">Tinggi (&gt;85%)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                showHeatmap
                  ? 'bg-teal-50 border-teal-400 text-teal-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              Layer Heatmap Sentinel
            </button>
            <button
              onClick={() => setShowAutonomousPath(!showAutonomousPath)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                showAutonomousPath
                  ? 'bg-teal-50 border-teal-400 text-teal-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              Rute Otonom
            </button>
            <button
              onClick={() => setSelectedUnitId('HYA-01')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition"
            >
              Fokus Kapal HYA-01
            </button>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE ROW: 3 BENTO COLUMNS (Camera, Subsystems, Remote Control) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMN 1: LIVE RTSP BOW CAMERA (Frame in Light, Viewport in authentic dark maritime HUD) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-mono">
            <span className="flex items-center gap-2 text-slate-900 font-bold">
              <Eye className="w-4 h-4 text-teal-600" />
              LIVE RTSP BOW CAMERA
            </span>
            <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded font-bold animate-pulse">
              ● 1080p @ 30 FPS
            </span>
          </div>

          {/* Camera Viewport Simulation */}
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Background water simulation gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-950/50 via-emerald-950/40 to-slate-950" />

            {/* Water ripple grid lines */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Catamaran Bow View Front Ramp Graphics */}
            <div className="absolute bottom-0 w-full flex justify-center pointer-events-none">
              <svg viewBox="0 0 300 90" className="w-72 opacity-90">
                <polygon points="20,90 80,30 220,30 280,90" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <line x1="80" y1="30" x2="80" y2="90" stroke="#10b981" strokeWidth="1.5" />
                <line x1="220" y1="30" x2="220" y2="90" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="150" cy="50" r="16" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <line x1="150" y1="38" x2="150" y2="62" stroke="#34d399" strokeWidth="2" />
              </svg>
            </div>

            {/* YOLOv8 AI Object Detection Bounding Box */}
            <div className="absolute top-10 left-12 right-12 bottom-16 border-2 border-emerald-400 rounded-lg bg-emerald-500/10 pointer-events-none flex flex-col justify-between p-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <div className="flex justify-between items-start">
                <span className="bg-emerald-500 text-slate-950 font-mono text-[10px] font-black px-1.5 py-0.5 rounded">
                  Eichhornia crassipes (Eceng) Conf: 96.4%
                </span>
                <span className="bg-black/70 text-emerald-400 font-mono text-[9px] px-1 py-0.5 rounded border border-emerald-500/40">
                  EST. DENSITAS: 87% (Tebal)
                </span>
              </div>
              <div className="text-right">
                <span className="bg-black/80 text-cyan-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-cyan-500/40">
                  Sonar Haluan Bebas (12.4m)
                </span>
              </div>
            </div>

            {/* OSD Timestamp stamp */}
            <div className="absolute top-2 left-3 font-mono text-[9px] text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
              CAM-01 [FRONT] • {activeUnit.id} • {currentTime || '2025-05-18 10:42:19 WIB'}
            </div>

            {/* Target Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-emerald-400/40">
              <Crosshair className="w-12 h-12" />
            </div>
          </div>

          {/* Model info footer */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Model Edge AI:</span>
              <span className="text-teal-700 font-bold">YOLOv8-Biomass Tiny Edge (Hailo-8)</span>
            </div>
            <div className="flex justify-between">
              <span>Inference Latency:</span>
              <span className="text-slate-800 font-semibold">12 ms @ 4.2 Mbps</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: HARDWARE SUBSYSTEM TELEMETRY */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-mono">
            <span className="flex items-center gap-2 text-slate-900 font-bold">
              <Cpu className="w-4 h-4 text-cyan-600" />
              SUBSISTEM HARDWARE ({activeUnit.id})
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-mono font-semibold">
              CAN-BUS: 28% OK
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Battery Cluster */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Battery className="w-4 h-4 text-teal-600" />
                  BANK DAYA LiFePO4:
                </span>
                <span className="text-teal-700 font-bold text-sm">{activeUnit.batteryLiFePO4}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${activeUnit.batteryLiFePO4}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{activeUnit.voltage}V • {activeUnit.amperage}A</span>
                <span>{activeUnit.runtimeHours} Jam Sisa Runtime</span>
              </div>
            </div>

            {/* LoRa Connectivity */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-cyan-600" />
                  KONEKTIVITAS IOT LORA:
                </span>
                <span className="text-cyan-800 font-bold">{activeUnit.loraRssi} dBm RSSI</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>SNR: +{activeUnit.loraSnr} dB</span>
                <span>Packet Loss: {activeUnit.packetLoss}%</span>
              </div>
            </div>

            {/* Hydraulic Conveyor & Cutter */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  KONVEYOR HIDROLIK:
                </span>
                <span className="text-amber-800 font-bold">
                  {conveyorPushed ? '2.0 m/s (BOOST)' : `${activeUnit.conveyorSpeed} m/s`}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Load Cell: {activeUnit.loadCellRate} kg/jam</span>
                <span>Auger: {augerReversed ? '-180 RPM (REV)' : `${activeUnit.augerRpm} RPM`}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Countdown */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3 text-[11px] text-slate-700 space-y-1 font-mono">
            <div className="flex justify-between items-center text-teal-800 font-bold">
              <span>Jadwal Perawatan Pisau Auger:</span>
              <span>{activeUnit.bladeMaintenanceHours} Jam Lagi</span>
            </div>
            <p className="text-slate-500 text-[10px]">
              Inspeksi rutin pelumasan rantai dan ketajaman bilah pemotong hidrolik.
            </p>
          </div>
        </div>

        {/* COLUMN 3: SHIP OPERATIONS REMOTE CONTROL */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-mono">
            <span className="flex items-center gap-2 text-slate-900 font-bold">
              <Sliders className="w-4 h-4 text-teal-600" />
              KENDALI OPERASIONAL KAPAL
            </span>
            {/* Mode switch */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setControlMode('autonomous')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                  controlMode === 'autonomous'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Otonom
              </button>
              <button
                type="button"
                onClick={() => setControlMode('manual')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                  controlMode === 'manual'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Manual
              </button>
            </div>
          </div>

          {/* D-Pad Virtual Steering Controls */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <button
              onClick={() => handleManualSteer('up')}
              className="w-12 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-teal-600 active:text-white border border-slate-300 flex items-center justify-center text-slate-800 transition shadow-xs"
              title="Maju (Throttle Up)"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleManualSteer('left')}
                className="w-12 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-teal-600 active:text-white border border-slate-300 flex items-center justify-center text-slate-800 transition shadow-xs"
                title="Kemudi Kiri"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-300 flex flex-col items-center justify-center text-center shadow-xs">
                <span className="text-[9px] font-mono text-slate-500">RUDDER</span>
                <span className="text-xs font-mono font-bold text-teal-700">{rudderAngle}°</span>
              </div>
              <button
                onClick={() => handleManualSteer('right')}
                className="w-12 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-teal-600 active:text-white border border-slate-300 flex items-center justify-center text-slate-800 transition shadow-xs"
                title="Kemudi Kanan"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => handleManualSteer('down')}
              className="w-12 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-teal-600 active:text-white border border-slate-300 flex items-center justify-center text-slate-800 transition shadow-xs"
              title="Mundur (Reverse)"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Throttle Slider */}
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">THROTTLE MOTOR:</span>
              <span className="text-teal-700 font-bold">{throttle}% ({activeUnit.speedKnots} Knots)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={throttle}
              onChange={(e) => {
                if (controlMode === 'autonomous') {
                  alert("Beralih ke mode [Manual Override] untuk mengatur tuas gas.");
                  return;
                }
                setThrottle(Number(e.target.value));
              }}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => setConveyorPushed(!conveyorPushed)}
              className={`p-2 rounded-xl border text-center font-bold transition ${
                conveyorPushed
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Push Conveyor
            </button>
            <button
              onClick={() => setAugerReversed(!augerReversed)}
              className={`p-2 rounded-xl border text-center font-bold transition ${
                augerReversed
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Reverse Auger
            </button>
          </div>

          {/* Emergency Stop Button (E-STOP) */}
          <button
            onClick={() => {
              setHarvesters((prev) =>
                prev.map((h) =>
                  h.id === activeUnit.id ? { ...h, status: 'STANDBY DOCK', speedKnots: 0 } : h
                )
              );
              setIsEStopOpen(true);
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm tracking-wider shadow-md shadow-red-600/30 flex items-center justify-center gap-2 border border-red-500 transition cursor-pointer"
          >
            <Power className="w-5 h-5" />
            EMERGENCY STOP (E-STOP)
          </button>
        </div>
      </div>

      {/* 4. WATER QUALITY TELEMETRY BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-teal-600" />
              Telemetri Kualitas Air Reservoir In-Situ ({activeUnit.sector})
            </span>
            <span className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
              Kondisi Air Sehat
            </span>
          </div>
          <span className="text-slate-500 text-[11px]">
            Sensor Multi-Probe YSI EXO2 • Kalibrasi Terakhir 10:00 WIB
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase">Derajat Keasaman (pH)</span>
            <span className="text-xl font-black text-teal-700">{activeUnit.waterQuality.ph}</span>
            <span className="text-[10px] text-slate-600 block mt-0.5">Rentang Ideal (6.5 - 8.5)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase">Kekeruhan Air (NTU)</span>
            <span className="text-xl font-black text-cyan-700">{activeUnit.waterQuality.turbidityNtu} NTU</span>
            <span className="text-[10px] text-slate-600 block mt-0.5">Bening & Bebas Partikel</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase">Suhu Permukaan</span>
            <span className="text-xl font-black text-amber-700">{activeUnit.waterQuality.tempCelsius} °C</span>
            <span className="text-[10px] text-slate-600 block mt-0.5">Suhu Termal Normal</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase">Oksigen Terlarut (DO)</span>
            <span className="text-xl font-black text-emerald-700">{activeUnit.waterQuality.dissolvedOxygen} mg/L</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">↗ +38% dari baseline</span>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM FLEET STATUS TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs font-mono">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Status Armada Smart Harvester Waduk Cirata & Nasional
            </h3>
            <p className="text-slate-500 text-xs">
              6 Unit Terdaftar • 3 Sedang Misi • 2 Standby Pangkalan • 1 Docking Perawatan
            </p>
          </div>
          <span className="text-slate-500 text-[11px]">
            Sinkronisasi: 2 Detik Lalu
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-3">ID & NAMA UNIT</th>
                <th className="p-3">STATUS MISI</th>
                <th className="p-3">KOORDINAT GPS (WGS84)</th>
                <th className="p-3">BATERAI (LiFePO4)</th>
                <th className="p-3">KAPASITAS HOPPER</th>
                <th className="p-3">TAUTAN LORA</th>
                <th className="p-3 text-right">TINDAKAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {harvesters.map((unit) => {
                const isSelected = unit.id === selectedUnitId;
                return (
                  <tr
                    key={unit.id}
                    onClick={() => setSelectedUnitId(unit.id)}
                    className={`cursor-pointer transition ${
                      isSelected
                        ? 'bg-teal-50/70 font-semibold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-teal-800">
                        {unit.id.split('-')[1]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{unit.id}</div>
                        <div className="text-[10px] text-slate-500">{unit.name}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                          unit.status === 'OTONOM AKTIF'
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : unit.status === 'PATROLI MANUAL'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : unit.status === 'STANDBY DOCK'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {unit.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 text-[11px]">
                      {unit.coordinates.dmsLat}, {unit.coordinates.dmsLng}
                    </td>
                    <td className="p-3">
                      <span className="text-teal-700 font-bold">{unit.batteryLiFePO4}%</span>
                      <span className="text-[10px] text-slate-400 block">({unit.voltage}V)</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${unit.hopperCapacity}%` }}
                          />
                        </div>
                        <span className="text-xs">{unit.hopperCapacity}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-700">
                      {unit.loraRssi} dBm
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnitId(unit.id);
                        }}
                        className="px-2.5 py-1 rounded bg-white hover:bg-teal-600 hover:text-white text-slate-700 border border-slate-300 transition text-xs font-semibold shadow-xs"
                      >
                        Pilih & Pantau
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Stop Modal */}
      <EStopModal
        isOpen={isEStopOpen}
        onClose={() => setIsEStopOpen(false)}
        onReset={handleResetEStop}
        unitId={activeUnit.id}
        unitName={activeUnit.name}
      />
    </div>
  );
};
