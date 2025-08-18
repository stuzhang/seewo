import React, { useState, useEffect } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

/**
 * 自定义标题栏组件
 * 提供窗口控制功能和现代化的标题栏设计
 */
export default function CustomTitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // 检查窗口最大化状态
  useEffect(() => {
    const checkMaximized = async () => {
      if (window.electronAPI?.windowControls) {
        const maximized = await window.electronAPI.windowControls.isMaximized();
        setIsMaximized(maximized);
      }
    };
    
    checkMaximized();
    
    // 定期检查状态
    const interval = setInterval(checkMaximized, 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * 最小化窗口
   */
  const handleMinimize = async () => {
    if (window.electronAPI?.windowControls) {
      await window.electronAPI.windowControls.minimize();
    }
  };

  /**
   * 最大化/还原窗口
   */
  const handleMaximize = async () => {
    if (window.electronAPI?.windowControls) {
      await window.electronAPI.windowControls.maximize();
      // 更新状态
      const maximized = await window.electronAPI.windowControls.isMaximized();
      setIsMaximized(maximized);
    }
  };

  /**
   * 关闭窗口
   */
  const handleClose = async () => {
    if (window.electronAPI?.windowControls) {
      await window.electronAPI.windowControls.close();
    }
  };

  return (
    <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 select-none" 
         style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
      {/* 应用标题和图标 */}
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-xs"></div>
        </div>
        <span className="text-sm font-medium">Seewo希沃设备信息工具</span>
      </div>

      {/* 窗口控制按钮 */}
      <div className="flex items-center space-x-1" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* 最小化按钮 */}
        <button
          onClick={handleMinimize}
          onMouseEnter={() => setIsHovered('minimize')}
          onMouseLeave={() => setIsHovered(null)}
          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200 ${
            isHovered === 'minimize' 
              ? 'bg-white/20 hover:bg-white/30' 
              : 'hover:bg-white/10'
          }`}
          title="最小化"
        >
          <Minus size={12} className="text-white" />
        </button>

        {/* 最大化/还原按钮 */}
        <button
          onClick={handleMaximize}
          onMouseEnter={() => setIsHovered('maximize')}
          onMouseLeave={() => setIsHovered(null)}
          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200 ${
            isHovered === 'maximize' 
              ? 'bg-white/20 hover:bg-white/30' 
              : 'hover:bg-white/10'
          }`}
          title={isMaximized ? '还原' : '最大化'}
        >
          {isMaximized ? (
            <Square size={10} className="text-white" />
          ) : (
            <Maximize2 size={10} className="text-white" />
          )}
        </button>

        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          onMouseEnter={() => setIsHovered('close')}
          onMouseLeave={() => setIsHovered(null)}
          className={`w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200 ${
            isHovered === 'close' 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'hover:bg-red-500'
          }`}
          title="关闭"
        >
          <X size={12} className="text-white" />
        </button>
      </div>
    </div>
  );
}