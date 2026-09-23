export type NavigationTab = 
  | 'overview' 
  | 'telemetry' 
  | 'esg' 
  | 'marketplace' 
  | 'csr';

export type UserRole = 'admin' | 'operator' | 'auditor' | 'bumn_client';

export interface HarvesterUnit {
  id: string;
  name: string;
  lake: string;
  sector: string;
  status: 'OTONOM AKTIF' | 'PATROLI MANUAL' | 'STANDBY DOCK' | 'DOCKING PERAWATAN';
  coordinates: {
    lat: number;
    lng: number;
    alt: number;
    dmsLat: string;
    dmsLng: string;
  };
  heading: number;
  speedKnots: number;
  batteryLiFePO4: number; // percentage
  voltage: number;
  amperage: number;
  runtimeHours: number;
  hopperCapacity: number; // percentage
  hopperTons: number;
  maxHopperTons: number;
  loraRssi: number; // dBm
  loraSnr: number;
  packetLoss: number;
  conveyorSpeed: number; // m/s
  loadCellRate: number; // kg/h
  augerRpm: number;
  bladeMaintenanceHours: number;
  solarInputKwp: number;
  waterQuality: {
    ph: number;
    turbidityNtu: number;
    tempCelsius: number;
    dissolvedOxygen: number; // mg/L
  };
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'pupuk' | 'biopot' | 'pakan' | 'briket' | 'biostimulan';
  badge: string;
  price: number;
  unit: string;
  description: string;
  carbonOffsetKg: number;
  stockAvailable: string;
  specs: { [key: string]: string };
  imagePlaceholderColor: string;
  iconName: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CsrProposal {
  id: string;
  companyName: string;
  sector: string;
  programTitle: string;
  budget: number;
  targetHa: number;
  status: 'asesmen' | 'review_ojk' | 'negosiasi' | 'spk_aktif';
  targetDate: string;
  co2OffsetTon: number;
  harvestersCount: number;
  pic: string;
}

export interface EsgLedgerEntry {
  id: string;
  project: string;
  sector: string;
  coordinates: string;
  sponsor: string;
  sponsorLogoText: string;
  amountIdr: number;
  ojkStatus: 'TERVERIFIKASI' | 'AUDIT BERJALAN';
  carbonCertId: string;
  carbonAmountTon: number;
  biomassManagedTon: number;
  sentinelTileId: string;
  date: string;
  hashSha256: string;
}
