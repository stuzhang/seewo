# 希沃触控一体机系统信息显示应用

一个基于 Electron + React + TypeScript 开发的希沃触控一体机系统信息显示应用，用于实时监控和展示设备的系统配置、性能状态和运行信息。

## ✨ 功能特性

### 🖥️ 系统概览
- 设备基本信息展示（型号、屏幕规格、分辨率等）
- 外设设备状态监控（视频展台、音响、麦克风、摄像头）
- 希沃品牌标识和产品信息

### 💻 OPS 配置显示
- **操作系统信息**：版本、内核信息
- **处理器信息**：型号、核心数、频率、实时使用率
- **内存信息**：总容量、可用内存、使用率
- **存储设备**：磁盘信息、容量、类型、使用情况
- **网络适配器**：接口状态、IP地址、MAC地址
- **系统状态**：CPU温度、电源状态

### 📱 Android 配置显示
- **系统信息**：Android版本、API级别、安全补丁
- **内核信息**：内核版本、构建时间
- **设备信息**：设备型号、制造商、产品名称
- **硬件配置**：处理器、内存、存储容量
- **显示参数**：屏幕密度、分辨率
- **网络状态**：WiFi和蓝牙连接状态

### 📊 实时性能监控
- CPU使用率实时图表
- 内存使用率监控
- 磁盘使用情况
- 性能数据颜色编码（绿色/黄色/红色）

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **桌面应用**：Electron
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **系统信息**：systeminformation
- **图标库**：Lucide React
- **状态管理**：React Hooks

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- pnpm 8.x
- Git

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/stuzhang/seewo.git
cd seewo

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动前端开发服务器
pnpm run dev

# 启动 Electron 应用（新终端）
pnpm run electron:dev
```

### 构建应用

```bash
# 构建前端
pnpm run build

# 打包 Electron 应用
pnpm run electron:build
```

## 📁 项目结构

```
seewo/
├── src/                    # 前端源码
│   ├── components/         # React 组件
│   │   ├── SystemOverview.tsx
│   │   ├── OPSConfigDisplay.tsx
│   │   └── AndroidConfigDisplay.tsx
│   ├── pages/             # 页面组件
│   ├── services/          # 服务层
│   ├── types/             # TypeScript 类型定义
│   └── hooks/             # 自定义 Hooks
├── electron/              # Electron 主进程
│   ├── main.js           # 主进程入口
│   └── preload.js        # 预加载脚本
├── config/               # 配置文件
│   ├── android-config.json
│   ├── device-config.json
│   └── windows-config.json
├── public/               # 静态资源
├── dist/                 # 前端构建输出
├── dist-electron/        # Electron 打包输出
└── docs/                 # 文档
```

## 🔧 配置说明

### 系统配置文件

应用使用 JSON 配置文件来定义系统信息：

- `config/windows-config.json` - Windows 系统配置
- `config/android-config.json` - Android 系统配置
- `config/device-config.json` - 设备基本信息配置

### 环境变量

```bash
# 开发环境
NODE_ENV=development

# 生产环境
NODE_ENV=production
```

## 📦 构建和部署

### Windows 平台构建

项目支持 GitHub Actions 自动构建 Windows 安装包：

1. 推送代码到 `main` 分支自动触发构建
2. 手动在 Actions 页面触发构建
3. 构建产物包括：`.exe`、`.msi`、`.zip` 格式

详细说明请参考：[Windows 构建指南](docs/WINDOWS_BUILD.md)

### 本地构建

```bash
# 构建所有平台（根据当前系统）
pnpm run electron:build

# 仅构建当前平台
pnpm run electron:build -- --publish=never
```

## 🎨 界面预览

应用采用现代化的深色主题设计，具有以下特点：

- 响应式布局，适配不同屏幕尺寸
- 实时数据更新，性能监控可视化
- 直观的状态指示器和进度条
- 专业的希沃品牌视觉设计

## 🔒 安全特性

- 使用 `contextBridge` 安全地暴露 API
- 禁用 `nodeIntegration` 和 `enableRemoteModule`
- 启用 `contextIsolation` 上下文隔离
- 预加载脚本安全通信机制

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 现代化构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [systeminformation](https://systeminformation.io/) - 系统信息获取库

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/stuzhang/seewo/issues)
- 发送邮件到项目维护者

---

**希沃触控一体机系统信息显示应用** - 让设备管理更简单、更直观！