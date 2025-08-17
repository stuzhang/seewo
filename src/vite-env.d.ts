/// <reference types="vite/client" />

/**
 * Vite环境变量类型定义
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_APP_VERSION: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * 全局类型声明
 */
declare global {
  interface Window {
    electronAPI?: import('./types/electron').ElectronAPI
    platform?: import('./types/electron').PlatformAPI
  }
}

export {}