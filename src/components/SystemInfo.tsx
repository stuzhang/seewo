import React, { useState, useEffect } from 'react'
import { Monitor, Cpu, HardDrive, Wifi, Smartphone, RefreshCw } from 'lucide-react'
import { WindowsSystemInfo, AndroidSystemInfo, PerformanceData } from '../types/electron'
import { formatBytes, formatPercentage, getPerformanceColor, getPerformanceBackgroundColor } from '../lib/utils'
import { Loading, ErrorState } from './Empty'

/**
 * 系统信息组件属性接口
 */
interface SystemInfoProps {
  /** 自定义类名 */
  className?: string
}

/**
 * 系统信息组件
 * 显示Windows和Android系统的详细信息
 * @param props - 组件属性
 * @returns JSX元素
 */
export function SystemInfo({ className = '' }: SystemInfoProps) {
  const [windowsInfo, setWindowsInfo] = useState<WindowsSystemInfo | null>(null)
  const [androidInfo, setAndroidInfo] = useState<AndroidSystemInfo | null>(null)
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  /**
   * 获取系统信息
   */
  const fetchSystemInfo = async () => {
    try {
      setLoading(true)
      setError(null)

      // 检查是否在Electron环境中
      if (window.electronAPI) {
        // 获取Windows系统信息
        const windowsData = await window.electronAPI.getSystemInfo()
        setWindowsInfo(windowsData)

        // 获取Android系统信息
        const androidData = await window.electronAPI.getAndroidConfig()
        setAndroidInfo(androidData)

        // 获取性能数据
        const perfData = await window.electronAPI.getPerformanceData()
        setPerformanceData(perfData)
      } else {
        // Web环境下的模拟数据
        setWindowsInfo({
          hostname: 'DEMO-PC',
          platform: 'win32',
          arch: 'x64',
          release: '10.0.19045',
          version: 'Windows 10 Pro',
          totalMemory: 16 * 1024 * 1024 * 1024, // 16GB
          freeMemory: 8 * 1024 * 1024 * 1024,   // 8GB
          cpuModel: 'Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz',
          cpuCores: 8,
          uptime: 86400, // 1天
          networkInterfaces: {
            'Wi-Fi': {
              address: '192.168.1.100',
              netmask: '255.255.255.0',
              family: 'IPv4',
              mac: '00:11:22:33:44:55',
              internal: false,
              cidr: '192.168.1.100/24'
            }
          }
        })

        setAndroidInfo({
          deviceModel: 'SM-G9980',
          androidVersion: '13',
          kernelVersion: '5.10.149-android13-4-00003-g7ce8c8b3b5b5-ab9632507',
          buildTime: '2023-10-15 14:30:25',
          serialNumber: 'R58N123ABCD',
          imei: '860123456789012',
          macAddress: 'AA:BB:CC:DD:EE:FF',
          ipAddress: '192.168.1.101',
          batteryLevel: 85,
          isCharging: false,
          storageTotal: 128 * 1024 * 1024 * 1024, // 128GB
          storageUsed: 64 * 1024 * 1024 * 1024,   // 64GB
          ramTotal: 8 * 1024 * 1024 * 1024,       // 8GB
          ramUsed: 4 * 1024 * 1024 * 1024         // 4GB
        })

        setPerformanceData({
          cpuUsage: 45.2,
          memoryUsage: 62.8,
          diskUsage: 78.5,
          networkSpeed: {
            download: 125.6,
            upload: 23.4
          },
          temperature: 65
        })
      }

      setLastUpdate(new Date())
    } catch (err) {
      console.error('获取系统信息失败:', err)
      setError(err instanceof Error ? err.message : '获取系统信息失败')
    } finally {
      setLoading(false)
    }
  }

  // 组件挂载时获取系统信息
  useEffect(() => {
    fetchSystemInfo()

    // 设置定时刷新（每30秒）
    const interval = setInterval(fetchSystemInfo, 30000)

    return () => clearInterval(interval)
  }, [])

  // 监听系统信息更新
  useEffect(() => {
    if (window.electronAPI?.onSystemInfoUpdate) {
      const unsubscribe = window.electronAPI.onSystemInfoUpdate((data) => {
        setWindowsInfo(data.windows)
        setAndroidInfo(data.android)
        setPerformanceData(data.performance)
        setLastUpdate(new Date())
      })

      return unsubscribe
    }
  }, [])

  if (loading) {
    return <Loading className={className} />
  }

  if (error) {
    return (
      <ErrorState
        title="系统信息获取失败"
        description={error}
        onRetry={fetchSystemInfo}
        className={className}
      />
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 刷新按钮和最后更新时间 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          系统信息
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            最后更新: {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchSystemInfo}
            disabled={loading}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            title="刷新系统信息"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 性能概览 */}
      {performanceData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">CPU使用率</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performanceData.cpuUsage)}`}>
                  {performanceData.cpuUsage.toFixed(1)}%
                </p>
              </div>
              <Cpu className={getPerformanceColor(performanceData.cpuUsage)} size={24} />
            </div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getPerformanceBackgroundColor(performanceData.cpuUsage)}`}
                style={{ width: `${performanceData.cpuUsage}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">内存使用率</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performanceData.memoryUsage)}`}>
                  {performanceData.memoryUsage.toFixed(1)}%
                </p>
              </div>
              <HardDrive className={getPerformanceColor(performanceData.memoryUsage)} size={24} />
            </div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getPerformanceBackgroundColor(performanceData.memoryUsage)}`}
                style={{ width: `${performanceData.memoryUsage}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">磁盘使用率</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(performanceData.diskUsage)}`}>
                  {performanceData.diskUsage.toFixed(1)}%
                </p>
              </div>
              <HardDrive className={getPerformanceColor(performanceData.diskUsage)} size={24} />
            </div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getPerformanceBackgroundColor(performanceData.diskUsage)}`}
                style={{ width: `${performanceData.diskUsage}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">网络速度</p>
                <p className="text-lg font-bold text-blue-600">
                  ↓{performanceData.networkSpeed.download.toFixed(1)} MB/s
                </p>
                <p className="text-sm text-gray-500">
                  ↑{performanceData.networkSpeed.upload.toFixed(1)} MB/s
                </p>
              </div>
              <Wifi className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Windows系统信息 */}
        {windowsInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Monitor className="text-blue-600 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Windows系统
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">主机名:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {windowsInfo.hostname}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">系统版本:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {windowsInfo.version}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">架构:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {windowsInfo.arch}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">CPU:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-right max-w-xs truncate">
                  {windowsInfo.cpuModel}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">CPU核心:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {windowsInfo.cpuCores} 核
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">总内存:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatBytes(windowsInfo.totalMemory)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">可用内存:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatBytes(windowsInfo.freeMemory)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">运行时间:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {Math.floor(windowsInfo.uptime / 3600)} 小时
                </span>
              </div>
            </div>
            
            {/* 网络接口信息 */}
            {windowsInfo.networkInterfaces && Object.keys(windowsInfo.networkInterfaces).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  网络接口
                </h4>
                {Object.entries(windowsInfo.networkInterfaces).map(([name, info]) => (
                  <div key={name} className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{name}:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {info.address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">MAC:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {info.mac}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Android系统信息 */}
        {androidInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Smartphone className="text-green-600 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Android系统
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">设备型号:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.deviceModel}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Android版本:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.androidVersion}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">内核版本:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-right max-w-xs truncate">
                  {androidInfo.kernelVersion}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">构建时间:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.buildTime}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">序列号:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.serialNumber}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">IMEI:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.imei}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">MAC地址:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.macAddress}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">IP地址:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {androidInfo.ipAddress}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">电池电量:</span>
                <span className={`font-medium ${
                  androidInfo.batteryLevel > 50 ? 'text-green-600' :
                  androidInfo.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {androidInfo.batteryLevel}% {androidInfo.isCharging ? '(充电中)' : ''}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">存储空间:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatBytes(androidInfo.storageUsed)} / {formatBytes(androidInfo.storageTotal)}
                  <span className="text-sm text-gray-500 ml-1">
                    ({formatPercentage(androidInfo.storageUsed, androidInfo.storageTotal)})
                  </span>
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">内存:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatBytes(androidInfo.ramUsed)} / {formatBytes(androidInfo.ramTotal)}
                  <span className="text-sm text-gray-500 ml-1">
                    ({formatPercentage(androidInfo.ramUsed, androidInfo.ramTotal)})
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}