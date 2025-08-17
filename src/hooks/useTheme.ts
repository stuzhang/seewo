import { useState, useEffect } from 'react'

/**
 * 主题类型定义
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * 主题Hook返回类型
 */
interface UseThemeReturn {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark'
}

/**
 * 主题管理Hook
 * 提供主题切换和持久化功能
 * @returns 主题状态和控制函数
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 从localStorage读取保存的主题设置
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme
      }
    }
    return 'system'
  })

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark')

  /**
   * 获取系统主题偏好
   * @returns 系统主题
   */
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  /**
   * 更新实际主题
   */
  const updateActualTheme = () => {
    const newActualTheme = theme === 'system' ? getSystemTheme() : theme
    setActualTheme(newActualTheme)
    
    // 更新HTML类名
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newActualTheme)
    }
  }

  /**
   * 设置主题
   * @param newTheme - 新主题
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  // 监听主题变化
  useEffect(() => {
    updateActualTheme()
  }, [theme])

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        updateActualTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // 初始化时设置主题
  useEffect(() => {
    updateActualTheme()
  }, [])

  return {
    theme,
    setTheme,
    actualTheme
  }
}