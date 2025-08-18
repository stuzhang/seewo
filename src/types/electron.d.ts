/**
 * Electron API类型定义
 * 为渲染进程提供类型安全的Electron API访问
 */

// 系统信息相关类型定义
export interface WindowsSystemInfo {
  osVersion: string;
  cpuModel: string;
  totalMemory: number;
  availableMemory: number;
  diskInfo: DiskInfo[];
  networkAdapters: NetworkAdapter[];
}

export interface DiskInfo {
  name: string;
  size: number;
  type: string;
  interfaceType: string;
}

export interface NetworkAdapter {
  name: string;
  ip4: string;
  mac: string;
  speed: number;
}

export interface AndroidSystemInfo {
  androidVersion: string;
  kernelVersion: string;
  totalRAM: number;
  availableRAM: number;
  totalROM: number;
  availableROM: number;
  deviceModel: string;
  buildNumber: string;
  securityPatch: string;
  apiLevel: number;
  manufacturer: string;
  brand: string;
  hardware: string;
  bootloader: string;
  fingerprint: string;
  lastUpdated: string;
  features: {
    touchScreen: boolean;
    multiTouch: boolean;
    wifi: boolean;
    bluetooth: boolean;
    camera: boolean;
    microphone: boolean;
    speakers: boolean;
    hdmi: boolean;
    usb: boolean;
    ethernet: boolean;
  };
  display: {
    resolution: string;
    density: number;
    refreshRate: number;
    size: string;
  };
  network: {
    wifiEnabled: boolean;
    bluetoothEnabled: boolean;
    ethernetEnabled: boolean;
  };
}

export interface PerformanceData {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  temperature?: number;
}

export interface SystemInfoResponse {
  windowsInfo: WindowsSystemInfo | null;
  androidInfo: AndroidSystemInfo;
  performance: PerformanceData;
  timestamp: number;
}

// Electron API接口定义
export interface ElectronAPI {
  getSystemInfo: () => Promise<SystemInfoResponse>;
  getAndroidConfig: () => Promise<AndroidSystemInfo>;
  getPerformanceData: () => Promise<PerformanceData>;
  getConfigFile: (configName: string) => Promise<any>;
  onSystemInfoUpdate: (callback: (event: any, data: SystemInfoResponse) => void) => void;
  removeSystemInfoListener: (callback: (event: any, data: SystemInfoResponse) => void) => void;
  windowControls: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
    isMaximized: () => Promise<boolean>;
  };
}

export interface PlatformAPI {
  getPlatform: () => string;
  isWindows: () => boolean;
  isDev: () => boolean;
}

// 全局Window接口扩展
declare global {
  interface Window {
    electronAPI: ElectronAPI;
    platform: PlatformAPI;
  }
}

export {};