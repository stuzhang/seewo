import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并CSS类名的工具函数
 * 结合clsx和tailwind-merge，提供更好的类名合并体验
 * @param inputs - CSS类名输入
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化字节大小
 * @param bytes - 字节数
 * @param decimals - 小数位数，默认为2
 * @returns 格式化后的大小字符串
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 格式化百分比
 * @param value - 数值
 * @param total - 总数
 * @param decimals - 小数位数，默认为1
 * @returns 格式化后的百分比字符串
 */
export function formatPercentage(value: number, total: number, decimals: number = 1): string {
  if (total === 0) return '0%'
  const percentage = (value / total) * 100
  return percentage.toFixed(decimals) + '%'
}

/**
 * 获取性能状态颜色
 * @param usage - 使用率（0-100）
 * @returns Tailwind CSS颜色类名
 */
export function getPerformanceColor(usage: number): string {
  if (usage < 50) return 'text-green-500'
  if (usage < 80) return 'text-yellow-500'
  return 'text-red-500'
}

/**
 * 获取性能状态背景颜色
 * @param usage - 使用率（0-100）
 * @returns Tailwind CSS背景颜色类名
 */
export function getPerformanceBackgroundColor(usage: number): string {
  if (usage < 50) return 'bg-green-500'
  if (usage < 80) return 'bg-yellow-500'
  return 'bg-red-500'
}

/**
 * 延迟执行函数
 * @param ms - 延迟毫秒数
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param limit - 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * 生成随机ID
 * @param length - ID长度，默认为8
 * @returns 随机ID字符串
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * 格式化时间戳
 * @param timestamp - 时间戳
 * @param format - 格式类型
 * @returns 格式化后的时间字符串
 */
export function formatTimestamp(
  timestamp: number | string | Date,
  format: 'datetime' | 'date' | 'time' = 'datetime'
): string {
  const date = new Date(timestamp)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  
  switch (format) {
    case 'date':
      return date.toLocaleDateString('zh-CN')
    case 'time':
      return date.toLocaleTimeString('zh-CN', { hour12: false })
    default:
      return date.toLocaleString('zh-CN', options)
  }
}

/**
 * 检查是否为有效的IP地址
 * @param ip - IP地址字符串
 * @returns 是否为有效IP
 */
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

/**
 * 检查是否为有效的MAC地址
 * @param mac - MAC地址字符串
 * @returns 是否为有效MAC地址
 */
export function isValidMAC(mac: string): boolean {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return macRegex.test(mac)
}