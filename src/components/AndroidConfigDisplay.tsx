import { Smartphone, Cpu, HardDrive, MemoryStick, Settings, Shield } from 'lucide-react';
import type { AndroidConfig, DeviceConfig } from '@/services/configService';

interface AndroidConfigDisplayProps {
  androidConfig: AndroidConfig | null;
  deviceConfig: DeviceConfig | null;
}

/**
 * 安卓配置显示组件
 * 显示安卓系统的详细配置信息
 */
export default function AndroidConfigDisplay({ androidConfig, deviceConfig }: AndroidConfigDisplayProps) {
  /**
   * 格式化存储大小显示
   * @param size - 存储大小，可以是数字（字节）或字符串
   */
  const formatStorageSize = (size: string | number): string => {
    // 如果是字符串且已经格式化，直接返回
    if (typeof size === 'string' && (size.includes('GB') || size.includes('MB'))) {
      return size;
    }
    
    // 转换为数字（字节数）
    let bytes: number;
    if (typeof size === 'number') {
      bytes = size;
    } else {
      bytes = parseInt(size);
      if (isNaN(bytes)) return size;
    }
    
    // 转换为合适的单位
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) {
      return `${gb.toFixed(1)}GB`;
    }
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)}MB`;
  };

  /**
   * 获取安卓版本显示名称
   */
  const getAndroidVersionName = (version: string): string => {
    const versionMap: { [key: string]: string } = {
      '13': 'Android 13 (Tiramisu)',
      '12': 'Android 12 (Snow Cone)',
      '11': 'Android 11',
      '10': 'Android 10',
      '9': 'Android 9 (Pie)',
      '8.1': 'Android 8.1 (Oreo)',
      '8.0': 'Android 8.0 (Oreo)',
      '7.1': 'Android 7.1 (Nougat)',
      '7.0': 'Android 7.0 (Nougat)'
    };
    return versionMap[version] || `${version}`;
  };

  /**
   * 获取连接状态颜色
   */
  const getConnectionStatusColor = (): string => {
    return androidConfig ? 'text-green-400' : 'text-red-400';
  };

  /**
   * 获取连接状态文本
   */
  const getConnectionStatusText = (): string => {
    return androidConfig ? '已连接' : '未连接';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Smartphone className="w-8 h-8 mr-3" />
          <h2 className="text-xl font-semibold text-white">安卓系统配置</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${androidConfig ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
            {getConnectionStatusText()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 系统基本信息 */}
        <div className="space-y-4">
          {/* 安卓版本信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center mr-3">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">系统版本</h3>
                <p className="text-sm text-white/70">安卓系统信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">版本</span>
                <span className="text-white font-medium">
                  {androidConfig ? getAndroidVersionName(androidConfig.androidVersion) : 'Android 11'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">API级别</span>
                <span className="text-white font-medium">
                  {androidConfig?.apiLevel || '30'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">安全补丁</span>
                <span className="text-white font-medium">
                  {androidConfig?.securityPatch || '2023-12-01'}
                </span>
              </div>
            </div>
          </div>

          {/* 内核信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mr-3">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">内核信息</h3>
                <p className="text-sm text-white/70">Linux内核版本</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">内核版本</span>
                <span className="text-white font-medium text-sm">
                  {androidConfig?.kernelVersion || '5.4.61-android12-9-00001-gd3b362b9b9b9'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">构建时间</span>
                <span className="text-white font-medium">
                  {androidConfig?.buildNumber || '2023-12-15'}
                </span>
              </div>
            </div>
          </div>

          {/* 设备信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">设备信息</h3>
                <p className="text-sm text-white/70">硬件设备详情</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">设备型号</span>
                <span className="text-white font-medium">
                  {deviceConfig?.device.model || 'Seewo Board'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">制造商</span>
                <span className="text-white font-medium">
                  {deviceConfig?.device.brand || 'Seewo'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">产品名称</span>
                <span className="text-white font-medium">
                  {androidConfig?.productName || 'SeewoBoard86'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 硬件配置信息 */}
        <div className="space-y-4">
          {/* 处理器信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center mr-3">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">处理器</h3>
                <p className="text-sm text-white/70">CPU配置信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">芯片组</span>
                <span className="text-white font-medium">
                  {androidConfig?.hardware || 'Rockchip RK3588'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">架构</span>
                <span className="text-white font-medium">
                  ARM64-v8a
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">核心数</span>
                <span className="text-white font-medium">
                  8核
                </span>
              </div>
            </div>
          </div>

          {/* 内存信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center mr-3">
                <MemoryStick className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">内存配置</h3>
                <p className="text-sm text-white/70">RAM信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">总内存</span>
                <span className="text-white font-medium">
                  {androidConfig ? formatStorageSize(androidConfig.totalRAM * 1024 * 1024) : '8GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">可用内存</span>
                <span className="text-white font-medium">
                  {androidConfig ? formatStorageSize(androidConfig.availableRAM * 1024 * 1024) : '5.2GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">内存类型</span>
                <span className="text-white font-medium">LPDDR4X</span>
              </div>
            </div>
          </div>

          {/* 存储信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-yellow-500/30 rounded-lg flex items-center justify-center mr-3">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">存储配置</h3>
                <p className="text-sm text-white/70">ROM信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">总存储</span>
                <span className="text-white font-medium">
                  {androidConfig ? formatStorageSize(androidConfig.totalROM * 1024 * 1024) : '128GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">可用存储</span>
                <span className="text-white font-medium">
                  {androidConfig ? formatStorageSize(androidConfig.availableROM * 1024 * 1024) : '89.5GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">存储类型</span>
                <span className="text-white font-medium">eMMC 5.1</span>
              </div>
            </div>
          </div>

          {/* 显示和网络 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-pink-500/30 rounded-lg flex items-center justify-center mr-3">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">其他配置</h3>
                <p className="text-sm text-white/70">显示和网络</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">屏幕分辨率</span>
                <span className="text-white font-medium">
                  {androidConfig?.display.resolution || '3840×2160'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">屏幕密度</span>
                <span className="text-white font-medium">
                  {androidConfig?.display.density ? `${androidConfig.display.density} DPI` : '320 DPI'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">WiFi状态</span>
                <span className="text-green-400 font-medium">已连接</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">蓝牙状态</span>
                <span className="text-green-400 font-medium">已开启</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-white/60">最后更新:</span>
            <span className="text-white">{new Date().toLocaleString('zh-CN')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${androidConfig ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className={`text-sm ${getConnectionStatusColor()}`}>
              {androidConfig ? '实时监控中' : '连接断开'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}