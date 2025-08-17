const { contextBridge, ipcRenderer } = require('electron');

/**
 * 安全地暴露IPC通信接口给渲染进程
 * 使用contextBridge确保安全性
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * 获取完整系统信息
   * @returns {Promise<Object>} 包含Windows信息、安卓信息和性能数据
   */
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  /**
   * 获取安卓配置信息
   * @returns {Promise<Object>} 安卓系统配置信息
   */
  getAndroidConfig: () => ipcRenderer.invoke('get-android-config'),

  /**
   * 获取实时性能数据
   * @returns {Promise<Object>} CPU、内存、磁盘使用率
   */
  getPerformanceData: () => ipcRenderer.invoke('get-performance-data'),

  /**
   * 获取配置文件
   * @param {string} configName 配置文件名称（不含扩展名）
   * @returns {Promise<Object>} 配置文件内容
   */
  getConfigFile: (configName) => ipcRenderer.invoke('get-config-file', configName),

  /**
   * 监听系统信息更新事件
   * @param {Function} callback 回调函数
   */
  onSystemInfoUpdate: (callback) => {
    ipcRenderer.on('system-info-update', callback);
  },

  /**
   * 移除系统信息更新监听
   * @param {Function} callback 回调函数
   */
  removeSystemInfoListener: (callback) => {
    ipcRenderer.removeListener('system-info-update', callback);
  }
});

// 暴露平台信息
contextBridge.exposeInMainWorld('platform', {
  /**
   * 获取当前平台
   * @returns {string} 平台名称
   */
  getPlatform: () => process.platform,

  /**
   * 判断是否为Windows平台
   * @returns {boolean} 是否为Windows
   */
  isWindows: () => process.platform === 'win32',

  /**
   * 判断是否为开发环境
   * @returns {boolean} 是否为开发环境
   */
  isDev: () => process.env.NODE_ENV === 'development'
});