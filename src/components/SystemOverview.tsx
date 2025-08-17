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
 * 系统概览组件
 * 显示设备型号、屏幕规格、视频展台、音响设备和连接状态等信息
 */
export default function SystemOverview({ windowsConfig, androidConfig, deviceConfig, performance }: SystemOverviewProps) {
  /**
   * 获取设备型号
   */
  const getDeviceModel = (): string => {
    return deviceConfig?.device.model || 'Seewo Board 86';
  };

  /**
   * 获取屏幕分辨率
   */
  const getScreenResolution = (): string => {
    return deviceConfig?.display.resolution || '3840×2160';
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
    return deviceConfig?.display.touchTechnology || '红外触控';
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
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      {/* 希沃LOGO */}
      <div className="flex justify-center mb-6">
        <img 
          src={logo} 
          alt="希沃LOGO" 
          className="h-12 w-auto"
        />
      </div>
      
      {/* <div className="flex items-center mb-6">
        <Monitor className="w-8 h-8 mr-3" />
        <h2 className="text-xl font-semibold text-white">系统概览</h2>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 设备型号信息 */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mr-3">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">设备型号</h3>
              <p className="text-sm text-white/70">触控一体机规格</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">产品型号</span>
              <span className="text-white font-medium text-right text-sm">
                {getDeviceModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">屏幕尺寸</span>
              <span className="text-white font-medium">
                {getScreenSize()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">分辨率</span>
              <span className="text-white font-medium">
                {getScreenResolution()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">触控技术</span>
              <span className="text-white font-medium">
                {getTouchTechnology()}
              </span>
            </div>
          </div>
        </div>

        {/* 外设设备信息 */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center mr-3">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">外设设备</h3>
              <p className="text-sm text-white/70">视频展台与音响</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">视频展台</span>
              <span className="text-white font-medium text-right text-sm">
                {getVideoStandModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">音响系统</span>
              <span className="text-white font-medium text-right text-sm">
                {getAudioModel()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">麦克风</span>
              <span className="text-white font-medium">
                {getMicrophoneInfo()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
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