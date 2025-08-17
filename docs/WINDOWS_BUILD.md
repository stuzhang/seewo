# Windows 平台构建指南

本文档详细说明了如何在 Windows 平台上构建希沃触控一体机系统信息显示应用。

## 🚀 GitHub Actions 自动化构建

### 触发方式

1. **手动触发**：在 GitHub 仓库的 Actions 页面手动运行工作流
2. **自动触发**：推送代码到 `main` 分支时自动构建
3. **PR 触发**：创建 Pull Request 到 `main` 分支时触发构建验证

### 构建步骤

工作流会自动执行以下步骤：

1. **环境准备**
   - 使用 Windows 最新版本的 GitHub Runner
   - 安装 Node.js 18.x
   - 安装 pnpm 8.x

2. **依赖安装**
   ```bash
   pnpm install --frozen-lockfile
   ```

3. **前端构建**
   ```bash
   pnpm run build
   ```

4. **Electron 打包**
   ```bash
   pnpm run electron:build
   ```

5. **产物上传**
   - 自动上传构建产物到 GitHub Artifacts
   - 保留 30 天

### 使用方法

1. **查看构建状态**
   - 访问仓库的 Actions 页面
   - 查看最新的构建状态和日志

2. **下载构建产物**
   - 在 Actions 页面找到对应的构建
   - 下载 `windows-build-{commit-sha}` 压缩包
   - 解压后获得 Windows 安装包

## 🔧 本地构建

### 环境要求

- **操作系统**: Windows 10 或更高版本
- **Node.js**: 18.x 或更高版本
- **包管理器**: pnpm 8.x
- **Python**: 3.8+ (用于 node-gyp)
- **Visual Studio Build Tools**: 2019 或更高版本

### 构建步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/stuzhang/seewo.git
   cd seewo
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **构建前端**
   ```bash
   pnpm run build
   ```

4. **打包 Electron 应用**
   ```bash
   pnpm run electron:build
   ```

### 构建产物

构建完成后，在 `dist-electron` 目录下会生成以下文件：

- `*.exe` - Windows 安装程序
- `*.msi` - Windows MSI 安装包
- `*.zip` - 便携版压缩包
- `*.blockmap` - 增量更新映射文件

## 📦 构建配置

### package.json 配置

```json
{
  "build": {
    "appId": "com.seewo.system-info",
    "productName": "希沃触控一体机管理系统",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "config/**/*"
    ],
    "extraResources": [
      {
        "from": "config",
        "to": "config"
      }
    ],
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        },
        {
          "target": "msi",
          "arch": ["x64"]
        },
        {
          "target": "zip",
          "arch": ["x64"]
        }
      ],
      "icon": "public/favicon.ico"
    }
  }
}
```

## ⚠️ 注意事项

### 路径处理

- 使用 `path.join()` 而不是字符串拼接
- 避免硬编码路径分隔符
- 使用相对路径而不是绝对路径

### 文件系统操作

- 使用 `fs.promises` 进行异步文件操作
- 正确处理文件不存在的情况
- 使用 try-catch 包装文件操作

### 配置文件读取

- 区分开发环境和生产环境的配置路径
- 生产环境从 `process.resourcesPath` 读取
- 开发环境从项目目录读取

## 🐛 故障排除

### 常见问题

1. **构建失败：缺少 Python**
   ```bash
   npm install --global windows-build-tools
   ```

2. **构建失败：缺少 Visual Studio Build Tools**
   - 下载并安装 Visual Studio Build Tools
   - 确保包含 C++ 构建工具

3. **打包失败：权限问题**
   - 以管理员身份运行命令提示符
   - 检查防病毒软件是否阻止文件操作

4. **应用启动失败：配置文件缺失**
   - 确保 `config` 目录被正确打包
   - 检查 `extraResources` 配置

### 调试技巧

1. **启用详细日志**
   ```bash
   DEBUG=electron-builder pnpm run electron:build
   ```

2. **检查打包内容**
   - 解压生成的安装包
   - 验证文件结构是否正确

3. **测试开发版本**
   ```bash
   pnpm run electron:dev
   ```

## 🔄 持续集成

### 版本管理

- 使用语义化版本号 (Semantic Versioning)
- 在 `package.json` 中更新版本号
- 创建 Git 标签触发发布

### 自动发布

- 推送标签时自动创建 GitHub Release
- 自动上传构建产物到 Release
- 生成发布说明

## 📚 相关资源

- [Electron Builder 文档](https://www.electron.build/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Node.js 官方文档](https://nodejs.org/docs/)
- [pnpm 官方文档](https://pnpm.io/)

---

如有问题，请在 GitHub Issues 中提出。