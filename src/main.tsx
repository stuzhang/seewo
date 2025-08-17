import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * 应用入口文件
 * 初始化React应用并挂载到DOM
 */

// 确保DOM元素存在
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.')
}

// 创建React根节点并渲染应用
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 开发环境下的热重载支持
if (import.meta.hot) {
  import.meta.hot.accept()
}

// Electron环境下的特殊处理
if (window.electronAPI) {
  console.log('Running in Electron environment')
  
  // 监听系统信息更新
  if (window.electronAPI.onSystemInfoUpdate) {
    window.electronAPI.onSystemInfoUpdate((data) => {
      console.log('System info updated:', data)
    })
  }
} else {
  console.log('Running in web browser environment')
}

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})