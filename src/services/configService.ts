/**
 * 配置文件读取服务
 * 统一管理配置数据的加载和缓存
 */

// 配置数据类型定义
export interface WindowsConfig {
  system: {
    os: {
      platform: string;
      distro: string;
      release: string;
      codename: string;
      kernel: string;
      arch: string;
      hostname: string;
      fqdn: string;
      codepage: string;
      logofile: string;
      serial: string;
      build: string;
      servicepack: string;
      uefi: boolean;
    };
    cpu: {
      manufacturer: string;
      brand: string;
      vendor: string;
      family: string;
      model: string;
      stepping: string;
      revision: string;
      voltage: string;
      speed: number;
      speedMin: number;
      speedMax: number;
      governor: string;
      cores: number;
      physicalCores: number;
      processors: number;
      socket: string;
      flags: string;
      virtualization: boolean;
      cache: {
        l1d: number;
        l1i: number;
        l2: number;
        l3: number;
      };
    };
    memory: {
      total: number;
      free: number;
      used: number;
      active: number;
      available: number;
      buffers: number;
      cached: number;
      slab: number;
      buffcache: number;
      swaptotal: number;
      swapused: number;
      swapfree: number;
    };
    disks: Array<{
      device: string;
      type: string;
      size: number;
      used: number;
      available: number;
      use: number;
      mount: string;
    }>;
    network: Array<{
      iface: string;
      ifaceName: string;
      ip4: string;
      ip4subnet: string;
      ip6: string;
      ip6subnet: string;
      mac: string;
      internal: boolean;
      virtual: boolean;
      operstate: string;
      type: string;
      duplex: string;
      mtu: number;
      speed: number;
      dhcp: boolean;
      dnsSuffix: string;
      ieee8021xAuth: string;
      ieee8021xState: string;
    }>;
    performance: {
      cpuUsage: number;
      memoryUsage: number;
      diskUsage: number;
      networkRx: number;
      networkTx: number;
      temperature: number;
      fanSpeed: number;
      powerState: string;
      uptime: number;
    };
  };
}

export interface AndroidConfig {
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
  productName: string;
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

export interface DeviceConfig {
  device: {
    brand: string;
    model: string;
    series: string;
    type: string;
    serialNumber: string;
    manufacturingDate: string;
    warrantyExpiry: string;
  };
  display: {
    size: string;
    resolution: string;
    aspectRatio: string;
    brightness: string;
    contrast: string;
    refreshRate: string;
    touchPoints: number;
    touchTechnology: string;
    responseTime: string;
    viewingAngle: string;
    colorGamut: string;
    backlight: string;
    antiGlare: boolean;
    blueLight: string;
  };
  videoStation: {
    model: string;
    brand: string;
    resolution: string;
    zoom: string;
    focus: string;
    interface: string;
    compatibility: string[];
    features: string[];
    status: string;
  };
  audio: {
    speakers: {
      model: string;
      brand: string;
      power: string;
      frequency: string;
      impedance: string;
      sensitivity: string;
      type: string;
      position: string;
    };
    microphone: {
      type: string;
      channels: number;
      pickupRange: string;
      noiseReduction: boolean;
      echoCancellation: boolean;
    };
  };
  connectivity: {
    wifi: {
      status: string;
      standard: string;
      frequency: string;
      speed: string;
      security: string;
    };
    bluetooth: {
      status: string;
      version: string;
      range: string;
      profiles: string[];
    };
    ethernet: {
      status: string;
      speed: string;
      duplex: string;
      cable: string;
    };
    usb: {
      ports: number;
      usb3: number;
      usb2: number;
      typeC: number;
    };
    hdmi: {
      inputs: number;
      outputs: number;
      version: string;
      resolution: string;
    };
    vga: {
      inputs: number;
      resolution: string;
    };
  };
  power: {
    consumption: string;
    standby: string;
    voltage: string;
    frequency: string;
    powerSaving: boolean;
    autoShutdown: string;
  };
  environmental: {
    operatingTemp: string;
    storageTemp: string;
    humidity: string;
    altitude: string;
    certification: string[];
  };
  software: {
    os: string;
    version: string;
    kernel: string;
    preInstalled: string[];
    updateChannel: string;
    lastUpdate: string;
  };
  status: {
    overall: string;
    temperature: string;
    uptime: string;
    lastMaintenance: string;
    nextMaintenance: string;
    errors: string[];
    warnings: string[];
  };
}

/**
 * 配置服务类
 * 负责加载和缓存配置文件数据
 */
class ConfigService {
  private windowsConfig: WindowsConfig | null = null;
  private androidConfig: AndroidConfig | null = null;
  private deviceConfig: DeviceConfig | null = null;

  /**
   * 加载Windows配置文件
   */
  async loadWindowsConfig(): Promise<WindowsConfig> {
    if (this.windowsConfig) {
      return this.windowsConfig;
    }

    try {
      // 检查是否在Electron环境中
      if (window.electronAPI) {
        this.windowsConfig = await window.electronAPI.getConfigFile('windows-config');
      } else {
        // Web环境下使用fetch
        const response = await fetch('/config/windows-config.json');
        if (!response.ok) {
          throw new Error(`Failed to load Windows config: ${response.statusText}`);
        }
        this.windowsConfig = await response.json();
      }
      return this.windowsConfig;
    } catch (error) {
      console.error('Error loading Windows config:', error);
      throw error;
    }
  }

  /**
   * 加载Android配置文件
   */
  async loadAndroidConfig(): Promise<AndroidConfig> {
    if (this.androidConfig) {
      return this.androidConfig;
    }

    try {
      // 检查是否在Electron环境中
      if (window.electronAPI) {
        this.androidConfig = await window.electronAPI.getConfigFile('android-config');
      } else {
        // Web环境下使用fetch
        const response = await fetch('/config/android-config.json');
        if (!response.ok) {
          throw new Error(`Failed to load Android config: ${response.statusText}`);
        }
        this.androidConfig = await response.json();
      }
      return this.androidConfig;
    } catch (error) {
      console.error('Error loading Android config:', error);
      throw error;
    }
  }

  /**
   * 加载设备配置文件
   */
  async loadDeviceConfig(): Promise<DeviceConfig> {
    if (this.deviceConfig) {
      return this.deviceConfig;
    }

    try {
      // 检查是否在Electron环境中
      if (window.electronAPI) {
        this.deviceConfig = await window.electronAPI.getConfigFile('device-config');
      } else {
        // Web环境下使用fetch
        const response = await fetch('/config/device-config.json');
        if (!response.ok) {
          throw new Error(`Failed to load Device config: ${response.statusText}`);
        }
        this.deviceConfig = await response.json();
      }
      return this.deviceConfig;
    } catch (error) {
      console.error('Error loading Device config:', error);
      throw error;
    }
  }

  /**
   * 获取实时性能数据（模拟数据，可以根据需要调整）
   */
  getRealtimePerformance() {
    return {
      cpuUsage: Math.random() * 30 + 20, // 20-50%
      memoryUsage: Math.random() * 20 + 40, // 40-60%
      diskUsage: Math.random() * 10 + 55, // 55-65%
      networkRx: Math.random() * 1000000 + 500000, // 0.5-1.5MB/s
      networkTx: Math.random() * 500000 + 250000, // 0.25-0.75MB/s
      temperature: Math.random() * 10 + 40, // 40-50°C
      fanSpeed: Math.random() * 200 + 1100, // 1100-1300 RPM
      powerState: '运行中',
      uptime: Date.now() / 1000 // 当前运行时间（秒）
    };
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.windowsConfig = null;
    this.androidConfig = null;
    this.deviceConfig = null;
  }

  /**
   * 重新加载所有配置
   */
  async reloadAll() {
    this.clearCache();
    await Promise.all([
      this.loadWindowsConfig(),
      this.loadAndroidConfig(),
      this.loadDeviceConfig()
    ]);
  }
}

// 导出单例实例
export const configService = new ConfigService();
export default configService;