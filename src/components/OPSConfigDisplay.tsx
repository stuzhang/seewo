import { Monitor, Cpu, HardDrive, MemoryStick, Zap, Thermometer } from 'lucide-react';
import type { WindowsConfig } from '@/services/configService';

interface OPSConfigDisplayProps {
  windowsConfig: WindowsConfig | null;
  performance: any;
}

/**
 * OPS配置显示组件
 * 显示Windows系统的硬件配置信息
 */
export default function OPSConfigDisplay({ windowsConfig, performance }: OPSConfigDisplayProps) {
  /**
   * 格式化内存大小
   */
  const formatMemorySize = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  /**
   * 格式化磁盘大小
   */
  const formatDiskSize = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1024) {
      return `${(gb / 1024).toFixed(1)}TB`;
    }
    return `${gb.toFixed(0)}GB`;
  };

  /**
   * 格式化存储大小
   */
  const formatStorageSize = (bytes: number | string): string => {
    if (typeof bytes === 'string') {
      return bytes;
    }
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1024) {
      return `${(gb / 1024).toFixed(1)}TB`;
    }
    return `${gb.toFixed(0)}GB`;
  };

  /**
   * 获取连接状态文本
   */
  const getConnectionStatusText = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      'connected': '已连接',
      'disconnected': '未连接',
      'up': '已连接',
      'down': '未连接'
    };
    return statusMap[status] || status;
  };

  /**
   * 获取性能状态颜色
   */
  const getPerformanceColor = (usage: number): string => {
    if (usage < 50) return 'text-green-400';
    if (usage < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  /**
   * 获取性能状态背景颜色
   */
  const getPerformanceBgColor = (usage: number): string => {
    if (usage < 50) return 'bg-green-400';
    if (usage < 80) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center mb-6">
        <Monitor className="w-8 h-8 mr-3" />
        <h2 className="text-xl font-semibold text-white">OPS电脑模块</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本系统信息 */}
        <div className="space-y-4">
          {/* 操作系统 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mr-3">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">操作系统</h3>
                <p className="text-sm text-white/70">系统版本信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">操作系统</span>
                <span className="text-white font-medium">
                  {windowsConfig?.system.os.distro || 'Windows 11'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">版本号</span>
                <span className="text-white font-medium">
                  {windowsConfig?.system.os.codename || '22H2'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">内核版本</span>
                <span className="text-white font-medium">
                  {windowsConfig?.system.os.kernel || '10.0.22621'}
                </span>
              </div>
            </div>
          </div>

          {/* 处理器信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center mr-3">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">处理器</h3>
                <p className="text-sm text-white/70">CPU详细信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">处理器</span>
                <span className="text-white font-medium text-sm">
                  {windowsConfig?.system.cpu.brand || 'AMD Ryzen 7 2700X'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">核心数</span>
                <span className="text-white font-medium">
                  {windowsConfig?.system.cpu.cores || '8'} 核心
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">基础频率</span>
                <span className="text-white font-medium">
                  {windowsConfig?.system.cpu.speed || '3.7'} GHz
                </span>
              </div>
              {performance && (
                <div className="flex justify-between items-center">
                  <span className="text-white/80">使用率</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getPerformanceColor(performance.cpuUsage)}`}>
                      {performance.cpuUsage.toFixed(1)}%
                    </span>
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPerformanceBgColor(performance.cpuUsage)}`}
                        style={{ width: `${performance.cpuUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 内存信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center mr-3">
                <MemoryStick className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">内存</h3>
                <p className="text-sm text-white/70">RAM信息</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">总容量</span>
                <span className="text-white font-medium">
                  {windowsConfig ? formatMemorySize(windowsConfig.system.memory.total) : '32GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">可用内存</span>
                <span className="text-white font-medium text-green-400">
                  {windowsConfig ? formatMemorySize(windowsConfig.system.memory.available) : '15GB'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">使用率</span>
                <span className="text-white font-medium">
                  {windowsConfig ? `${((windowsConfig.system.memory.used / windowsConfig.system.memory.total) * 100).toFixed(1)}%` : '53%'}
                </span>
              </div>
              {performance && (
                <div className="flex justify-between items-center">
                  <span className="text-white/80">使用率</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getPerformanceColor(performance.memoryUsage)}`}>
                      {performance.memoryUsage.toFixed(1)}%
                    </span>
                    <div className="w-16 bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPerformanceBgColor(performance.memoryUsage)}`}
                        style={{ width: `${performance.memoryUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 存储和网络信息 */}
        <div className="space-y-4">
          {/* 磁盘信息 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center mr-3">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">存储设备</h3>
                <p className="text-sm text-white/70">磁盘信息</p>
              </div>
            </div>
            <div className="space-y-3">
              {windowsConfig?.system.disks?.map((disk, index) => (
                <div key={index} className="bg-white/5 rounded p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{disk.device}</span>
                    <span className="text-white/80 text-sm">{disk.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">{disk.type}</span>
                    <span className="text-white/60">{disk.type}</span>
                  </div>
                </div>
              )) || (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">总容量</span>
                    <span className="text-white font-medium">
                      {windowsConfig && windowsConfig.system.disks && windowsConfig.system.disks.length > 0 ? formatStorageSize(windowsConfig.system.disks[0].size) : '1TB'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">可用空间</span>
                    <span className="text-white font-medium text-green-400">
                      {windowsConfig && windowsConfig.system.disks && windowsConfig.system.disks.length > 0 ? formatStorageSize(windowsConfig.system.disks[0].available) : '500GB'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">使用率</span>
                    <span className="text-white font-medium">
                      {windowsConfig && windowsConfig.system.disks && windowsConfig.system.disks.length > 0 ? `${((windowsConfig.system.disks[0].used / windowsConfig.system.disks[0].size) * 100).toFixed(1)}%` : '50%'}
                    </span>
                  </div>
                  {performance && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">磁盘使用率</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getPerformanceColor(performance.diskUsage)}`}>
                          {performance.diskUsage.toFixed(1)}%
                        </span>
                        <div className="w-16 bg-white/20 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPerformanceBgColor(performance.diskUsage)}`}
                            style={{ width: `${performance.diskUsage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 网络适配器 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">网络适配器</h3>
                <p className="text-sm text-white/70">网络连接信息</p>
              </div>
            </div>
            <div className="space-y-3">
              {windowsConfig?.system.network?.slice(0, 2).map((adapter, index) => (
                <div key={index} className="bg-white/5 rounded p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium text-sm">{adapter.iface}</span>
                    <span className={`text-xs ${
                      adapter.operstate === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {getConnectionStatusText(adapter.operstate === 'up' ? 'connected' : 'disconnected')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">IP地址</span>
                      <span className="text-white/80">{adapter.ip4}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">MAC地址</span>
                      <span className="text-white/80">{adapter.mac}</span>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">网络适配器</span>
                    <span className="text-white font-medium text-sm">
                      {windowsConfig && windowsConfig.system.network && windowsConfig.system.network.length > 0 ? windowsConfig.system.network[0].iface : 'Realtek PCIe GbE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">连接状态</span>
                    <span className={`font-medium ${
                      (windowsConfig && windowsConfig.system.network && windowsConfig.system.network.length > 0 && windowsConfig.system.network[0].operstate === 'up') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {getConnectionStatusText((windowsConfig && windowsConfig.system.network && windowsConfig.system.network.length > 0 && windowsConfig.system.network[0].operstate === 'up') ? 'connected' : 'disconnected')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">IP地址</span>
                    <span className="text-white font-medium">
                      {windowsConfig && windowsConfig.system.network && windowsConfig.system.network.length > 0 && windowsConfig.system.network[0].ip4 ? windowsConfig.system.network[0].ip4 : '192.168.1.100'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">MAC地址</span>
                    <span className="text-white font-medium">
                      {windowsConfig && windowsConfig.system.network && windowsConfig.system.network.length > 0 && windowsConfig.system.network[0].mac ? windowsConfig.system.network[0].mac : '00:1B:44:11:3A:B7'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 系统温度和电源 */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center mr-3">
                <Thermometer className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">系统状态</h3>
                <p className="text-sm text-white/70">温度和电源</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">CPU温度</span>
                <span className="text-white font-medium">
                  {performance?.temperature ? `${performance.temperature}°C` : '正常'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">电源状态</span>
                <span className="text-green-400 font-medium">外接电源</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-white/80">系统运行时间</span>
                <span className="text-white font-medium">2天 14小时</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}