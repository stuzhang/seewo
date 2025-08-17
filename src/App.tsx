import React, { useState, useEffect } from 'react'
import { Monitor, Smartphone, Settings, Info, Moon, Sun } from 'lucide-react'
import { SystemInfo } from './components/SystemInfo'
import { AndroidConfigDisplay } from './components/AndroidConfigDisplay'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import './App.css'

/**
 * 导航标签类型
 */
type TabType = 'system' | 'android' | 'settings' | 'about'

/**
 * 主应用组件
 * 希沃触控一体机管理系统的主界面
 * @returns JSX元素
 */
function App() {
  const [activeTab, setActiveTab] = useState<TabType>('system')
  const [isElectron, setIsElectron] = useState(false)
  const { actualTheme } = useTheme()

  // 检查是否在Electron环境中运行
  useEffect(() => {
    setIsElectron(!!window.electronAPI)
  }, [])

  /**
   * 获取标签页配置
   */
  const tabs = [
    {
      id: 'system' as TabType,
      label: '系统信息',
      icon: Monitor,
      description: '查看Windows和Android系统详细信息'
    },
    {
      id: 'android' as TabType,
      label: 'Android配置',
      icon: Smartphone,
      description: '查看Android设备配置和状态'
    },
    {
      id: 'settings' as TabType,
      label: '系统设置',
      icon: Settings,
      description: '系统配置和偏好设置'
    },
    {
      id: 'about' as TabType,
      label: '关于',
      icon: Info,
      description: '应用信息和版本详情'
    }
  ]

  /**
   * 渲染标签页内容
   * @param tab - 当前标签页
   * @returns JSX元素
   */
  const renderTabContent = (tab: TabType) => {
    switch (tab) {
      case 'system':
        return <SystemInfo />
      case 'android':
        return <AndroidConfigDisplay />
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              系统设置
            </h2>
            
            {/* 主题设置 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                外观设置
              </h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">主题模式</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    选择应用的外观主题
                  </p>
                </div>
                <ThemeToggle dropdown />
              </div>
            </div>
            
            {/* 系统信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                应用信息
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">运行环境:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {isElectron ? 'Electron桌面应用' : 'Web浏览器'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">当前主题:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {actualTheme === 'dark' ? '暗黑模式' : '明亮模式'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">用户代理:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100 text-right max-w-xs truncate">
                    {navigator.userAgent.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Monitor className="text-white" size={48} />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                希沃触控一体机管理系统
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                专业的触控一体机系统信息管理工具
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                版本 1.0.0
              </div>
            </div>
            
            {/* 功能特性 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                主要功能
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Monitor className="text-blue-600 dark:text-blue-400" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">系统监控</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      实时监控Windows和Android系统状态
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="text-green-600 dark:text-green-400" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">设备管理</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      查看和管理Android设备配置信息
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Settings className="text-purple-600 dark:text-purple-400" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">系统设置</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      自定义应用外观和行为设置
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                    <Info className="text-yellow-600 dark:text-yellow-400" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">详细信息</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      提供全面的系统和硬件信息展示
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 技术栈 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                技术栈
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {[
                  'React 18',
                  'TypeScript',
                  'Electron',
                  'Tailwind CSS',
                  'Vite',
                  'Lucide Icons'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 版权信息 */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© 2024 希沃触控一体机管理系统. 保留所有权利.</p>
              <p className="mt-1">
                基于 React + Electron 构建的跨平台桌面应用
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo和标题 */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Monitor className="text-white" size={20} />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  希沃触控一体机管理系统
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isElectron ? 'Electron桌面版' : 'Web浏览器版'}
                </p>
              </div>
            </div>
            
            {/* 主题切换按钮 */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边导航 */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={tab.description}
                  >
                    <Icon
                      size={20}
                      className={`mr-3 ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                    <div>
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* 主内容区域 */}
          <main className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {renderTabContent(activeTab)}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App