import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';

/**
 * 创建Express应用实例
 */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * 中间件配置
 */
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 路由配置
 */
app.use('/api/auth', authRouter);

/**
 * 健康检查端点
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * 系统信息API端点
 */
app.get('/api/system-info', (req, res) => {
  // 在Web环境下返回模拟数据
  res.json({
    windowsInfo: {
      osVersion: 'Windows 11 Pro (x64)',
      cpuModel: 'Intel Core i7-12700H',
      totalMemory: 16,
      availableMemory: 8,
      diskInfo: [
        {
          name: 'C:',
          size: 512,
          type: 'SSD',
          interfaceType: 'NVMe'
        }
      ],
      networkAdapters: [
        {
          name: 'Ethernet',
          ip4: '192.168.1.100',
          mac: '00:1B:44:11:3A:B7',
          speed: 1000
        }
      ]
    },
    androidInfo: {
      androidVersion: 'Android 11',
      kernelVersion: '4.19.157',
      totalRAM: 8192,
      totalROM: 64000,
      deviceModel: 'Seewo Board',
      buildNumber: 'SeewoOS_V2.1.0',
      lastUpdated: new Date().toISOString()
    },
    performance: {
      cpuUsage: Math.floor(Math.random() * 30) + 10,
      memoryUsage: Math.floor(Math.random() * 40) + 30,
      diskUsage: Math.floor(Math.random() * 20) + 40
    },
    timestamp: Date.now()
  });
});

/**
 * 错误处理中间件
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

/**
 * 404处理
 */
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

/**
 * 启动服务器
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;