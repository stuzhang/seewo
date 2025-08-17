/**
 * 配置服务
 * 负责加载和管理应用配置
 */

/**
 * 配置文件类型
 */
export type ConfigType = 'android' | 'device' | 'windows'

/**
 * 配置服务类
 */
export class ConfigService {
  private static instance: ConfigService
  private configCache = new Map<string, any>()

  /**
   * 获取配置服务单例实例
   * @returns ConfigService实例
   */
  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  /**
   * 加载配置文件
   * @param configType - 配置类型
   * @returns 配置数据
   */
  public async loadConfig(configType: ConfigType): Promise<any> {
    const cacheKey = `config_${configType}`
    
    // 检查缓存
    if (this.configCache.has(cacheKey)) {
      return this.configCache.get(cacheKey)
    }

    try {
      let configData: any

      // 检查是否在Electron环境中
      if (window.electronAPI) {
        // Electron环境：通过IPC获取配置
        const configPath = `config/${configType}-config.json`
        configData = await window.electronAPI.getConfigFile(configPath)
      } else {
        // Web环境：通过HTTP请求获取配置
        const response = await fetch(`/config/${configType}-config.json`)
        if (!response.ok) {
          throw new Error(`Failed to load ${configType} config: ${response.statusText}`)
        }
        configData = await response.json()
      }

      // 缓存配置数据
      this.configCache.set(cacheKey, configData)
      
      return configData
    } catch (error) {
      console.error(`Error loading ${configType} config:`, error)
      throw error
    }
  }

  /**
   * 加载Android配置
   * @returns Android配置数据
   */
  public async loadAndroidConfig(): Promise<any> {
    return this.loadConfig('android')
  }

  /**
   * 加载设备配置
   * @returns 设备配置数据
   */
  public async loadDeviceConfig(): Promise<any> {
    return this.loadConfig('device')
  }

  /**
   * 加载Windows配置
   * @returns Windows配置数据
   */
  public async loadWindowsConfig(): Promise<any> {
    return this.loadConfig('windows')
  }

  /**
   * 清除配置缓存
   * @param configType - 可选的配置类型，如果不提供则清除所有缓存
   */
  public clearCache(configType?: ConfigType): void {
    if (configType) {
      const cacheKey = `config_${configType}`
      this.configCache.delete(cacheKey)
    } else {
      this.configCache.clear()
    }
  }

  /**
   * 重新加载配置
   * @param configType - 配置类型
   * @returns 配置数据
   */
  public async reloadConfig(configType: ConfigType): Promise<any> {
    this.clearCache(configType)
    return this.loadConfig(configType)
  }

  /**
   * 获取所有配置
   * @returns 所有配置数据
   */
  public async loadAllConfigs(): Promise<{
    android: any
    device: any
    windows: any
  }> {
    const [android, device, windows] = await Promise.all([
      this.loadAndroidConfig(),
      this.loadDeviceConfig(),
      this.loadWindowsConfig()
    ])

    return { android, device, windows }
  }

  /**
   * 检查配置是否已缓存
   * @param configType - 配置类型
   * @returns 是否已缓存
   */
  public isCached(configType: ConfigType): boolean {
    const cacheKey = `config_${configType}`
    return this.configCache.has(cacheKey)
  }

  /**
   * 获取缓存的配置（不会触发加载）
   * @param configType - 配置类型
   * @returns 缓存的配置数据或undefined
   */
  public getCachedConfig(configType: ConfigType): any | undefined {
    const cacheKey = `config_${configType}`
    return this.configCache.get(cacheKey)
  }
}