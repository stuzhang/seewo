import { Router } from 'express';

/**
 * 认证路由
 */
const router = Router();

/**
 * 登录端点
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 简单的认证逻辑（实际项目中应该使用更安全的方式）
  if (username === 'admin' && password === 'seewo123') {
    res.json({
      success: true,
      message: '登录成功',
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: 'admin',
        role: 'administrator'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: '用户名或密码错误'
    });
  }
});

/**
 * 登出端点
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: '登出成功'
  });
});

/**
 * 验证token端点
 */
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token === 'mock-jwt-token') {
    res.json({
      success: true,
      user: {
        id: 1,
        username: 'admin',
        role: 'administrator'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Token无效'
    });
  }
});

export { router as authRouter };