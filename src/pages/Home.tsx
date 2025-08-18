import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Smartphone, 
  Settings,
  Wifi,
  Shield
} from 'lucide-react';
import configService, { type WindowsConfig, type AndroidConfig, type DeviceConfig } from '@/services/configService';
import SystemOverview from '@/components/SystemOverview';
import OPSConfigDisplay from '@/components/OPSConfigDisplay';
import AndroidConfigDisplay from '@/components/AndroidConfigDisplay';

/**
 * 希沃触控一体机系统信息显示主页面
 * 实现蓝色渐变背景和卡片式布局，显示Windows OPS配置和安卓系统信息
 */
export default function Home() {
  const [windowsConfig, setWindowsConfig] = useState<WindowsConfig | null>(null);
  const [androidConfig, setAndroidConfig] = useState<AndroidConfig | null>(null);
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfig | null>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 加载配置文件数据
  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const [windowsData, androidData, deviceData] = await Promise.all([
          configService.loadWindowsConfig(),
          configService.loadAndroidConfig(),
          configService.loadDeviceConfig()
        ]);
        
        setWindowsConfig(windowsData);
        setAndroidConfig(androidData);
        setDeviceConfig(deviceData);
        setPerformance(windowsData.system.performance);
        setLoading(false);
      } catch (error) {
        console.error('加载配置文件失败:', error);
        setLoading(false);
      }
    };

    loadConfigs();

    // 设置定时更新性能数据（使用模拟数据）
    const performanceInterval = setInterval(() => {
      try {
        const realtimePerf = configService.getRealtimePerformance();
        setPerformance(realtimePerf);
      } catch (error) {
        console.error('更新性能数据失败:', error);
      }
    }, 2000);

    // 更新时间
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(performanceInterval);
      clearInterval(timeInterval);
    };
  }, []);

  /**
   * 格式化内存大小显示
   */
  const formatMemorySize = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  /**
   * 格式化磁盘大小显示
   */
  const formatDiskSize = (bytes: number): string => {
    const tb = bytes / (1024 * 1024 * 1024 * 1024);
    if (tb >= 1) {
      return `${tb.toFixed(1)}TB`;
    }
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(0)}GB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">正在加载系统信息...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white overflow-auto">
      {/* 主要内容区域 */}
      <div className="flex-1 p-6 animate-fadeIn">
        {/* 系统概览 */}
        <div className="mb-8">
          <SystemOverview 
            windowsConfig={windowsConfig}
            androidConfig={androidConfig}
            deviceConfig={deviceConfig}
            performance={performance}
          />
        </div>

        {/* 详细配置信息 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* OPS配置显示 */}
          <OPSConfigDisplay 
            windowsConfig={windowsConfig}
            performance={performance}
          />
          
          {/* 安卓配置显示 */}
          <AndroidConfigDisplay 
            androidConfig={androidConfig}
            deviceConfig={deviceConfig}
          />
        </div>

        {/* 性能监控条 */}
        {performance && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">实时性能监控</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{performance.cpuUsage.toFixed(1)}%</div>
                <div className="text-sm opacity-70">CPU使用率</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${performance.cpuUsage}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{performance.memoryUsage.toFixed(1)}%</div>
                <div className="text-sm opacity-70">内存使用率</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${performance.memoryUsage}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{(performance.networkRx / 1024 / 1024).toFixed(1)}MB/s</div>
                <div className="text-sm opacity-70">网络下载</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((performance.networkRx / 1024 / 1024) * 10, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}      </div>
    </div>
  );
}