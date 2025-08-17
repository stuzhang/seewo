import React, { useState, useEffect } from 'react'
import { Smartphone, RefreshCw, Settings, Info, Wifi, Battery } from 'lucide-react'
import { AndroidSystemInfo } from '../types/electron'
import { formatBytes, formatPercentage } from '../lib/utils'
import { Loading, ErrorState } from './Empty'

/**
 * Android配置显示组件属性接口
 */
interface AndroidConfigDisplayProps {
  /** 自定义类名 */
  className?: string
}

/**
 * Android配置显示组件
 * 显示Android设备的详细配置信息
 * @param props - 组件属性
 * @returns JSX元素
 */
export function AndroidConfigDisplay({ className = '' }: AndroidConfigDisplayProps) {
  const [androidInfo, setAndroidInfo] = useState<AndroidSystemInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  /**
   * 获取Android配置信息
   */
  const fetchAndroidConfig = async () => {
    try {
      setLoading(true)
      setError(null)

      // 检查是否在Electron环境中
      if (window.electronAPI) {
        const data = await window.electronAPI.getAndroidConfig()
        setAndroidInfo(data)
      } else {
        // Web环境下的模拟数据
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
      }

      setLastUpdate(new Date())
    } catch (err) {
      console.error('获取Android配置失败:', err)
      setError(err instanceof Error ? err.message : '获取Android配置失败')
    } finally {
      setLoading(false)
    }
  }

  // 组件挂载时获取配置信息
  useEffect(() => {
    fetchAndroidConfig()
  }, [])

  if (loading) {
    return <Loading className={className} />
  }

  if (error) {
    return (
      <ErrorState
        title="Android配置获取失败"
        description={error}
        onRetry={fetchAndroidConfig}
        className={className}
      />
    )
  }

  if (!androidInfo) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Smartphone className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-500 dark:text-gray-400">未找到Android设备信息</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 标题和刷新按钮 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Smartphone className="text-green-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Android设备配置
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            最后更新: {lastUpdate.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchAndroidConfig}
            disabled={loading}
            className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
            title="刷新Android配置"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 设备概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 设备信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">设备型号</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {androidInfo.deviceModel}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Android {androidInfo.androidVersion}
              </p>
            </div>
            <Info className="text-blue-600" size={24} />
          </div>
        </div>

        {/* 网络信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">网络连接</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {androidInfo.ipAddress}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {androidInfo.macAddress}
              </p>
            </div>
            <Wifi className="text-blue-600" size={24} />
          </div>
        </div>

        {/* 电池信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">电池状态</p>
              <p className={`text-lg font-bold ${
                androidInfo.batteryLevel > 50 ? 'text-green-600' :
                androidInfo.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {androidInfo.batteryLevel}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {androidInfo.isCharging ? '充电中' : '未充电'}
              </p>
            </div>
            <Battery className={`${
              androidInfo.batteryLevel > 50 ? 'text-green-600' :
              androidInfo.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
            }`} size={24} />
          </div>
        </div>

        {/* 存储信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">存储使用</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatPercentage(androidInfo.storageUsed, androidInfo.storageTotal)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatBytes(androidInfo.storageUsed)} / {formatBytes(androidInfo.storageTotal)}
              </p>
            </div>
            <Settings className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 系统信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            系统信息
          </h3>
          
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
          </div>
        </div>

        {/* 硬件信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            硬件信息
          </h3>
          
          <div className="space-y-3">
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
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-400">存储空间:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPercentage(androidInfo.storageUsed, androidInfo.storageTotal)}
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(androidInfo.storageUsed / androidInfo.storageTotal) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{formatBytes(androidInfo.storageUsed)} 已使用</span>
                <span>{formatBytes(androidInfo.storageTotal)} 总计</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600 dark:text-gray-400">内存:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPercentage(androidInfo.ramUsed, androidInfo.ramTotal)}
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(androidInfo.ramUsed / androidInfo.ramTotal) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>{formatBytes(androidInfo.ramUsed)} 已使用</span>
                <span>{formatBytes(androidInfo.ramTotal)} 总计</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}