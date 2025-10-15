export interface Worker {
  id: string;
  name: string;
  status: 'active' | 'exited' | 'emergency';
  ppeCompliance: boolean;
  entryTime: string;
  exitTime?: string;
  gasLevel: number;
  oxygenLevel: number;
  location: {
    lat: number;
    lng: number;
    zone: string;
  };
  lastUpdate: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  status: 'online' | 'offline';
  detectionStatus: 'compliant' | 'non-compliant' | 'checking';
}

export interface EmergencyAlert {
  id: string;
  workerId: string;
  workerName: string;
  type: 'gas' | 'oxygen' | 'manual' | 'equipment';
  severity: 'critical' | 'high' | 'medium';
  timestamp: string;
  resolved: boolean;
}

export const mockWorkers: Worker[] = [
  {
    id: 'W001',
    name: 'Rajesh Kumar',
    status: 'active',
    ppeCompliance: true,
    entryTime: '2025-01-15T06:00:00',
    gasLevel: 2.1,
    oxygenLevel: 19.8,
    location: { lat: 23.2156, lng: 77.4123, zone: 'Shaft A - Level 3' },
    lastUpdate: '2025-01-15T10:45:00'
  },
  {
    id: 'W002',
    name: 'Suresh Patil',
    status: 'active',
    ppeCompliance: true,
    entryTime: '2025-01-15T06:15:00',
    gasLevel: 1.8,
    oxygenLevel: 20.1,
    location: { lat: 23.2145, lng: 77.4135, zone: 'Shaft B - Level 2' },
    lastUpdate: '2025-01-15T10:43:00'
  },
  {
    id: 'W003',
    name: 'Arun Singh',
    status: 'active',
    ppeCompliance: true,
    entryTime: '2025-01-15T06:30:00',
    gasLevel: 3.2,
    oxygenLevel: 18.5,
    location: { lat: 23.2134, lng: 77.4145, zone: 'Shaft A - Level 4' },
    lastUpdate: '2025-01-15T10:40:00'
  },
  {
    id: 'W004',
    name: 'Prakash Yadav',
    status: 'exited',
    ppeCompliance: true,
    entryTime: '2025-01-15T06:00:00',
    exitTime: '2025-01-15T10:00:00',
    gasLevel: 0,
    oxygenLevel: 20.9,
    location: { lat: 23.2167, lng: 77.4112, zone: 'Exit Point' },
    lastUpdate: '2025-01-15T10:00:00'
  },
  {
    id: 'W005',
    name: 'Mohan Sharma',
    status: 'active',
    ppeCompliance: true,
    entryTime: '2025-01-15T06:45:00',
    gasLevel: 2.5,
    oxygenLevel: 19.2,
    location: { lat: 23.2149, lng: 77.4128, zone: 'Shaft C - Level 2' },
    lastUpdate: '2025-01-15T10:44:00'
  }
];

export const mockCameras: CameraFeed[] = [
  { id: 'CAM001', name: 'Entry Gate - Camera 1', status: 'online', detectionStatus: 'compliant' },
  { id: 'CAM002', name: 'Entry Gate - Camera 2', status: 'online', detectionStatus: 'compliant' },
  { id: 'CAM003', name: 'Entry Gate - Camera 3', status: 'online', detectionStatus: 'compliant' }
];

export const mockAlerts: EmergencyAlert[] = [
  {
    id: 'ALT001',
    workerId: 'W003',
    workerName: 'Arun Singh',
    type: 'gas',
    severity: 'high',
    timestamp: '2025-01-15T10:30:00',
    resolved: false
  }
];

export const ppeChecklist = [
  { id: 'helmet', name: 'Safety Helmet', required: true },
  { id: 'vest', name: 'High-Vis Vest', required: true },
  { id: 'boots', name: 'Steel-Toe Boots', required: true },
  { id: 'gloves', name: 'Work Gloves', required: true },
  { id: 'mask', name: 'Respirator Mask', required: true },
  { id: 'lamp', name: 'Headlamp', required: true },
  { id: 'detector', name: 'Gas Detector', required: true }
];
