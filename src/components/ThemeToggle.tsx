import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, Theme } from '../hooks/useTheme'

/**
 * 主题切换组件属性接口
 */
interface ThemeToggleProps {
  /** 自定义类名 */
  className?: string
  /** 是否显示为下拉菜单 */
  dropdown?: boolean
}

/**
 * 主题切换组件
 * 提供明亮、暗黑和跟随系统三种主题选择
 * @param props - 组件属性
 * @returns JSX元素
 */
export function ThemeToggle({ className = '', dropdown = false }: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme()

  /**
   * 获取主题图标
   * @param themeType - 主题类型
   * @returns 图标组件
   */
  const getThemeIcon = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return <Sun size={16} />
      case 'dark':
        return <Moon size={16} />
      case 'system':
        return <Monitor size={16} />
      default:
        return <Monitor size={16} />
    }
  }

  /**
   * 获取主题标签
   * @param themeType - 主题类型
   * @returns 主题标签
   */
  const getThemeLabel = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return '明亮'
      case 'dark':
        return '暗黑'
      case 'system':
        return '跟随系统'
      default:
        return '跟随系统'
    }
  }

  if (dropdown) {
    return (
      <div className={`relative inline-block text-left ${className}`}>
        <div className="group">
          <button
            type="button"
            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title={`当前主题: ${getThemeLabel(theme)}`}
          >
            {getThemeIcon(theme)}
            <span className="ml-2">{getThemeLabel(theme)}</span>
            <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-1">
              {(['light', 'dark', 'system'] as Theme[]).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    theme === themeOption
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {getThemeIcon(themeOption)}
                  <span className="ml-2">{getThemeLabel(themeOption)}</span>
                  {theme === themeOption && (
                    <svg className="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 简单的切换按钮模式
  const themes: Theme[] = ['light', 'dark', 'system']
  const currentIndex = themes.indexOf(theme)
  const nextTheme = themes[(currentIndex + 1) % themes.length]

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      title={`当前: ${getThemeLabel(theme)} (${actualTheme === 'dark' ? '暗黑' : '明亮'}), 点击切换到: ${getThemeLabel(nextTheme)}`}
    >
      {getThemeIcon(theme)}
    </button>
  )
}