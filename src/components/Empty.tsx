import React from 'react'
import { FileX } from 'lucide-react'

/**
 * 空状态组件属性接口
 */
interface EmptyProps {
  /** 空状态标题 */
  title?: string
  /** 空状态描述 */
  description?: string
  /** 自定义图标 */
  icon?: React.ReactNode
  /** 操作按钮 */
  action?: React.ReactNode
  /** 自定义类名 */
  className?: string
}

/**
 * 空状态组件
 * 用于显示无数据或加载失败的状态
 * @param props - 组件属性
 * @returns JSX元素
 */
export function Empty({
  title = '暂无数据',
  description = '当前没有可显示的内容',
  icon,
  action,
  className = ''
}: EmptyProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {/* 图标 */}
      <div className="mb-4 text-gray-400">
        {icon || <FileX size={64} />}
      </div>
      
      {/* 标题 */}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      {/* 描述 */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
        {description}
      </p>
      
      {/* 操作按钮 */}
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  )
}

/**
 * 加载状态组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export function Loading({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {/* 加载动画 */}
      <div className="mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      {/* 加载文本 */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        正在加载...
      </p>
    </div>
  )
}

/**
 * 错误状态组件
 * @param props - 组件属性
 * @returns JSX元素
 */
export function ErrorState({
  title = '加载失败',
  description = '无法获取数据，请稍后重试',
  onRetry,
  className = ''
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <Empty
      title={title}
      description={description}
      icon={
        <div className="text-red-400">
          <FileX size={64} />
        </div>
      }
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        )
      }
      className={className}
    />
  )
}