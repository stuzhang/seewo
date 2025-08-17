import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Vite 配置文件
 * 配置开发服务器、构建选项、插件等
 */
export default defineConfig({
  plugins: [
    react()
  ],
  
  // 路径解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/lib': resolve(__dirname, 'src/lib'),
      '@/services': resolve(__dirname, 'src/services'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/types': resolve(__dirname, 'src/types')
    }
  },
  
  // 开发服务器配置
  server: {
    port: 5173,
    host: true,
    open: false,
    cors: true,
    proxy: {
      // API代理配置
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // 预览服务器配置
  preview: {
    port: 4173,
    host: true,
    cors: true
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'esnext',
    
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将React相关库打包到单独的chunk
          'react-vendor': ['react', 'react-dom'],
          // 将图标库打包到单独的chunk
          'icons': ['lucide-react'],
          // 将工具库打包到单独的chunk
          'utils': ['clsx', 'tailwind-merge']
        },
        // 资源文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return 'assets/css/[name]-[hash].[ext]'
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash].[ext]'
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
            return 'assets/fonts/[name]-[hash].[ext]'
          }
          
          return `assets/[ext]/[name]-[hash].[ext]`
        }
      }
    },
    
    // 构建优化
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // 资源内联阈值
    assetsInlineLimit: 4096,
    
    // CSS代码分割
    cssCodeSplit: true,
    
    // 生成manifest文件
    manifest: false,
    
    // 清空输出目录
    emptyOutDir: true
  },
  
  // CSS配置
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  },
  
  // 环境变量配置
  envPrefix: 'VITE_',
  
  // 依赖优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: [
      'electron'
    ]
  },
  
  // 定义全局常量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // 基础路径配置
  base: './',
  
  // 公共目录
  publicDir: 'public',
  
  // 日志级别
  logLevel: 'info',
  
  // 清除控制台
  clearScreen: false,
  
  // esbuild配置
  esbuild: {
    target: 'esnext',
    format: 'esm',
    platform: 'browser',
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    }
  }
})