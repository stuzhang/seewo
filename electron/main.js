const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const si = require('systeminformation');
const fs = require('fs').promises;

/**
 * 创建主窗口
 * @returns {BrowserWindow} 返回创建的窗口实例
 */
function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.svg'),
    frame: false, // 无边框窗口
    titleBarStyle: 'customButtonsOnHover', // 完全隐藏标题栏按钮（Mac专用）
    transparent: false, // 透明窗口
    vibrancy: 'under-window', // macOS毛玻璃效果
    visualEffectState: 'active',
    backgroundColor: '#1e40af', // 设置背景色
    show: false, // 先隐藏窗口，等加载完成后再显示
    roundedCorners: true, // 圆角窗口
    shadow: true, // 窗口阴影
    hasShadow: true
  });

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 加载应用
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // 开发环境下打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 移除协议拦截，使用IPC处理配置文件读取

  return mainWindow;
}

/**
 * 获取Windows系统信息
 * @returns {Promise<Object>} 返回系统信息对象
 */
async function getWindowsSystemInfo() {
  try {
    const [osInfo, cpuInfo, memInfo, diskInfo, networkInfo] = await Promise.all([
      si.osInfo(),
      si.cpu(),
      si.mem(),
      si.diskLayout(),
      si.networkInterfaces()
    ]);

    return {
      osVersion: `${osInfo.platform} ${osInfo.release} (${osInfo.arch})`,
      cpuModel: cpuInfo.brand,
      totalMemory: Math.round(memInfo.total / (1024 * 1024 * 1024)), // GB
      availableMemory: Math.round(memInfo.available / (1024 * 1024 * 1024)), // GB
      diskInfo: diskInfo.map(disk => ({
        name: disk.name,
        size: Math.round(disk.size / (1024 * 1024 * 1024)), // GB
        type: disk.type,
        interfaceType: disk.interfaceType
      })),
      networkAdapters: networkInfo.filter(adapter => !adapter.internal).map(adapter => ({
        name: adapter.iface,
        ip4: adapter.ip4,
        mac: adapter.mac,
        speed: adapter.speed
      }))
    };
  } catch (error) {
    console.error('获取系统信息失败:', error);
    return null;
  }
}

/**
 * 获取实时性能数据
 * @returns {Promise<Object>} 返回性能数据对象
 */
async function getPerformanceData() {
  try {
    const [cpuLoad, memInfo, fsSize] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize()
    ]);

    return {
      cpuUsage: Math.round(cpuLoad.currentLoad),
      memoryUsage: Math.round((memInfo.used / memInfo.total) * 100),
      diskUsage: fsSize.length > 0 ? Math.round((fsSize[0].used / fsSize[0].size) * 100) : 0
    };
  } catch (error) {
    console.error('获取性能数据失败:', error);
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0
    };
  }
}

/**
 * 读取安卓配置文件
 * @returns {Promise<Object>} 返回安卓配置信息
 */
async function getAndroidConfig() {
  try {
    const configPath = path.join(__dirname, '../config/android-config.json');
    const configData = await fs.readFile(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('读取安卓配置失败:', error);
    // 返回默认配置
    return {
      androidVersion: 'Android 11',
      kernelVersion: '4.19.157',
      totalRAM: 8192,
      totalROM: 64000,
      deviceModel: 'Seewo Board',
      buildNumber: 'SeewoOS_V2.1.0',
      lastUpdated: new Date().toISOString()
    };
  }
}

// 应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用（macOS除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC通信处理
ipcMain.handle('get-system-info', async () => {
  try {
    const [windowsInfo, androidInfo, performance] = await Promise.all([
      getWindowsSystemInfo(),
      getAndroidConfig(),
      getPerformanceData()
    ]);

    return {
      windowsInfo,
      androidInfo,
      performance,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('获取系统信息失败:', error);
    throw error;
  }
});

ipcMain.handle('get-android-config', async () => {
  return await getAndroidConfig();
});

ipcMain.handle('get-performance-data', async () => {
  return await getPerformanceData();
});

// 添加配置文件读取处理器
ipcMain.handle('get-config-file', async (event, configName) => {
  try {
    let configPath;
    if (isDev) {
      // 开发环境：从项目根目录的config文件夹读取
      configPath = path.join(__dirname, '../config', `${configName}.json`);
    } else {
      // 生产环境：从Resources目录读取
      configPath = path.join(process.resourcesPath, 'config', `${configName}.json`);
    }
    
    console.log(`Reading config file from: ${configPath}`);
    const configData = await fs.readFile(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error(`Error reading config file ${configName}:`, error);
    throw error;
  }
});

// 窗口控制IPC处理程序
ipcMain.handle('window-minimize', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    if (focusedWindow.isMaximized()) {
      focusedWindow.unmaximize();
    } else {
      focusedWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  return focusedWindow ? focusedWindow.isMaximized() : false;
});