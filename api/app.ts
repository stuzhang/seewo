import express from 'express';
import cors from 'cors';

/**
 * Express应用配置
 */
const app = express();

/**
 * 中间件配置
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 基础路由
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Seewo System Info API',
    version: '1.0.0',
    status: 'running'
  });
});

export default app;