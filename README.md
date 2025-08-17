# 希沃触控一体机管理系统

一个基于Electron + React + TypeScript的跨平台桌面应用，用于管理和监控希沃触控一体机的系统信息。

## 功能特性

- 📊 **系统信息显示**：实时显示CPU、内存、存储等硬件信息
- ⚙️ **配置管理**：支持Windows、Android等多平台配置管理
- 📱 **响应式界面**：基于Tailwind CSS的现代化UI设计
- 🔄 **实时更新**：系统性能数据实时刷新
- 🌐 **跨平台支持**：支持Windows、macOS、Linux平台

## 技术栈

- **前端框架**：React 18 + TypeScript
- **桌面框架**：Electron
- **UI框架**：Tailwind CSS
- **状态管理**：Zustand
- **路由管理**：React Router
- **构建工具**：Vite
- **包管理器**：pnpm

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动前端开发服务器
pnpm run client:dev

# 启动Electron应用
pnpm run electron:dev

# 同时启动前端和后端服务
pnpm run dev
```

### 构建应用

```bash
# 构建前端应用
pnpm run build

# 打包Electron应用（所有平台）
pnpm run dist

# 打包特定平台
pnpm run dist:win    # Windows
pnpm run dist:mac    # macOS
pnpm run dist:linux  # Linux
```

## 项目结构

```
seewo/
├── src/                 # 前端源代码
│   ├── components/      # React组件
│   ├── pages/          # 页面组件
│   ├── hooks/          # 自定义Hooks
│   └── types/          # TypeScript类型定义
├── electron/           # Electron主进程代码
├── api/               # API服务器代码
├── config/            # 配置文件
├── .github/           # GitHub Actions工作流
└── docs/              # 项目文档
```

## 自动化构建

项目配置了GitHub Actions自动化工作流，支持：

- ✅ Windows平台自动打包
- ✅ 自动创建Release
- ✅ 构建产物上传

详细说明请参考：[Windows构建文档](docs/WINDOWS_BUILD.md)

## 开发指南

### 代码规范

- 使用ESLint进行代码检查
- 使用TypeScript进行类型检查
- 遵循React Hooks最佳实践

### 提交规范

使用约定式提交格式：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 贡献

欢迎提交Issue和Pull Request来帮助改进项目！

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交Issue：[GitHub Issues](https://github.com/stuzhang/seewo/issues)
- 邮箱：[您的邮箱]

---

**希沃触控一体机管理系统** - 让设备管理更简单、更高效！