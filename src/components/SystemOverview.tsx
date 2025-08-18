import { Monitor, Tv, Camera, Volume2, Wifi, Bluetooth, Usb } from 'lucide-react';
import type { WindowsConfig, AndroidConfig, DeviceConfig } from '@/services/configService';
import logo from '@/logo/logo.svg';

interface SystemOverviewProps {
  windowsConfig: WindowsConfig | null;
  androidConfig: AndroidConfig | null;
  deviceConfig: DeviceConfig | null;
  performance?: any;
}

/**
 * 希沃触控一体机型号概览组件
 * 显示设备型号、屏幕规格、视频展台、音响设备和连接状态等信息
 */
export default function SystemOverview({ windowsConfig, androidConfig, deviceConfig, performance }: SystemOverviewProps) {
  /**
   * 获取设备型号信息
   */
  const getDeviceModel = (): string => {
    return deviceConfig?.device.model || 'Seewo 希沃第六代智慧黑板 BG86ER';
  };

  /**
   * 获取屏幕分辨率信息
   */
  const getScreenResolution = (): string => {
    if (deviceConfig?.display.resolution) {
      return `${deviceConfig.display.resolution} (4K UHD)`;
    }
    return '3840×2160 (4K UHD)';
  };

  /**
   * 获取屏幕尺寸
   */
  const getScreenSize = (): string => {
    return deviceConfig?.display.size || '86英寸';
  };

  /**
   * 获取触控技术
   */
  const getTouchTechnology = (): string => {
    return deviceConfig?.display.touchTechnology || '电容触控';
  };

  /**
   * 获取视频展台型号
   */
  const getVideoStandModel = (): string => {
    return deviceConfig?.videoStation.model || 'Seewo SC06';
  };

  /**
   * 获取音响型号
   */
  const getAudioModel = (): string => {
    return deviceConfig?.audio.speakers.model || 'Seewo Audio Pro S333B';
  };

  /**
   * 获取麦克风信息
   */
  const getMicrophoneInfo = (): string => {
    return deviceConfig?.audio.microphone.type || '内置阵列麦克风';
  };

  /**
   * 获取摄像头信息
   */
  const getCameraInfo = (): string => {
    if (deviceConfig?.videoStation.resolution) {
      return `${deviceConfig.videoStation.resolution}内置高清摄像头`;
    }
    return '1080P内置高清摄像头';
  };

  return (
    <div className="modern-card p-6 animate-fadeIn">
      {/* 设备标题和Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 animate-slideIn">
          <div className="relative">
            <img src={logo} alt="希沃Logo" className="w-12 h-12 animate-pulse-slow" />
            <div className="absolute inset-0 bg-white/20 rounded-full animate-glow"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{getDeviceModel()}</h1>
            <p className="text-blue-100 text-sm opacity-80">希沃第六代智慧交互黑板</p>
          </div>
        </div>
        <div className="text-right animate-slideIn" style={{ animationDelay: '0.2s' }}>
          <div className="text-sm text-blue-100 opacity-80">当前时间</div>
          <div className="text-lg font-semibold text-white">
            {new Date().toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </div>
      
      {/* <div className="flex items-center mb-6">
        <Monitor className="w-8 h-8 mr-3" />
        <h2 className="text-xl font-semibold text-white">系统概览</h2>
      </div> */}

      {/* 设备规格信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* 屏幕信息 */}
        <div className="glass-effect rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 animate-slideIn" style={{ animationDelay: '0.1s' }}>
          <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-200 animate-pulse-slow" />
          <div className="text-sm text-blue-100 mb-1 opacity-80">显示屏</div>
          <div className="text-white font-semibold">{getScreenSize()}</div>
          <div className="text-xs text-blue-200 opacity-70">{getScreenResolution()}</div>
          <div className="text-xs text-blue-200 opacity-70">{getTouchTechnology()}</div>
        </div>

        {/* 视频展台 */}
        <div className="glass-effect rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 animate-slideIn" style={{ animationDelay: '0.2s' }}>
          <Camera className="w-8 h-8 mx-auto mb-2 text-green-200 animate-pulse-slow" />
          <div className="text-sm text-blue-100 mb-1 opacity-80">视频展台</div>
          <div className="text-white font-semibold">{getVideoStandModel()}</div>
          <div className="text-xs text-green-200 opacity-70">已连接</div>
        </div>

        {/* 音响设备 */}
        <div className="glass-effect rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 animate-slideIn" style={{ animationDelay: '0.3s' }}>
          <Volume2 className="w-8 h-8 mx-auto mb-2 text-purple-200 animate-pulse-slow" />
          <div className="text-sm text-blue-100 mb-1 opacity-80">音响</div>
          <div className="text-white font-semibold">{getAudioModel()}</div>
          <div className="text-xs text-purple-200 opacity-70">立体声输出</div>
        </div>

        {/* 连接状态 */}
        <div className="glass-effect rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 animate-slideIn" style={{ animationDelay: '0.4s' }}>
          <Wifi className="w-8 h-8 mx-auto mb-2 text-yellow-200 animate-pulse-slow" />
          <div className="text-sm text-blue-100 mb-1 opacity-80">网络</div>
          <div className="text-white font-semibold">已连接</div>
          <div className="text-xs text-yellow-200 opacity-70">WiFi + 有线</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 设备型号信息 */}
        <div className="glass-effect rounded-lg p-4 animate-slideIn" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/40 to-blue-600/40 rounded-lg flex items-center justify-center mr-3 animate-glow">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white gradient-text">设备型号</h3>
              <p className="text-sm text-white/70">触控一体机规格</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">产品型号</span>
              <span className="text-white font-medium text-right text-sm">
                {getDeviceModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">屏幕尺寸</span>
              <span className="text-white font-medium">
                {getScreenSize()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">分辨率</span>
              <span className="text-white font-medium">
                {getScreenResolution()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">触控技术</span>
              <span className="text-white font-medium">
                {getTouchTechnology()}
              </span>
            </div>
          </div>
        </div>

        {/* 外设设备信息 */}
        <div className="glass-effect rounded-lg p-4 animate-slideIn" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/40 to-purple-600/40 rounded-lg flex items-center justify-center mr-3 animate-glow">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white gradient-text">外设设备</h3>
              <p className="text-sm text-white/70">视频展台与音响</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">视频展台</span>
              <span className="text-white font-medium text-right text-sm">
                {getVideoStandModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">音响系统</span>
              <span className="text-white font-medium text-right text-sm">
                {getAudioModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">麦克风</span>
              <span className="text-white font-medium">
                {getMicrophoneInfo()}
              </span>
            </div>
            
            <div className="flex justify-between items-center hover:bg-white/5 rounded p-2 transition-colors duration-200">
              <span className="text-white/80">摄像头</span>
              <span className="text-white font-medium">
                {getCameraInfo()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 连接状态指示器 */}
      {/* <div className="mt-6">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center mr-3">
              <Wifi className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">连接状态</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs ml-1">WiFi</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Bluetooth className="w-4 h-4 text-blue-400" />
              <div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs ml-1">蓝牙</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Usb className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs ml-1">USB</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Tv className="w-4 h-4 text-purple-400" />
              <div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs ml-1">HDMI</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}