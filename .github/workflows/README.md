# GitHub Actions 工作流说明

本项目包含两个主要的 GitHub Actions 工作流文件，用于自动化构建、测试和发布流程。

## 工作流文件

### 1. build.yml - 构建和发布工作流

**触发条件：**
- 推送到 `main` 分支
- 创建版本标签（格式：`v*`）
- Pull Request 到 `main` 分支
- 手动触发

**功能：**
- **代码质量检查**：运行 ESLint 和 TypeScript 检查
- **多平台构建**：支持 Windows、macOS 和 Linux 平台
- **自动发布**：当创建版本标签时自动发布到 GitHub Releases

**构建产物：**
- Windows: `.exe` 安装包
- macOS: `.dmg` 安装包
- Linux: `.AppImage`、`.deb`、`.rpm` 包

### 2. code-quality.yml - 代码质量检查工作流

**触发条件：**
- Pull Request 到 `main` 或 `develop` 分支
- 推送到 `main` 或 `develop` 分支

**功能：**
- **ESLint 检查**：代码风格和潜在问题检查
- **TypeScript 检查**：类型检查
- **构建测试**：确保代码可以正常构建
- **安全审计**：检查依赖包的安全漏洞

## 使用说明

### 发布新版本

1. 更新 `package.json` 中的版本号
2. 创建并推送版本标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. GitHub Actions 将自动构建并发布到 Releases

### 代码签名配置（可选）

如需启用代码签名，请在 GitHub 仓库的 Settings > Secrets 中添加以下密钥：

**Windows 代码签名：**
- `CSC_LINK`: 证书文件的 base64 编码
- `CSC_KEY_PASSWORD`: 证书密码

**macOS 代码签名：**
- `APPLE_ID`: Apple ID
- `APPLE_ID_PASS`: App-specific 密码
- `APPLE_TEAM_ID`: 开发者团队 ID

然后在 `build.yml` 中取消相关环境变量的注释。

### 自定义构建

可以通过修改 `build.yml` 中的 matrix 配置来自定义构建平台和架构：

```yaml
strategy:
  matrix:
    include:
      - os: ubuntu-latest
        platform: linux
        arch: x64
      - os: windows-latest
        platform: win
        arch: x64
      - os: macos-latest
        platform: mac
        arch: universal
```

## 注意事项

1. **依赖缓存**：工作流使用 pnpm 缓存来加速构建
2. **构建时间**：多平台构建可能需要较长时间，特别是 macOS 构建
3. **资源限制**：GitHub Actions 有使用时间限制，请合理使用
4. **安全性**：敏感信息应存储在 GitHub Secrets 中，不要硬编码在工作流文件中

## 故障排除

### 常见问题

1. **构建失败**：检查依赖是否正确安装，确保 `pnpm-lock.yaml` 文件已提交
2. **代码签名失败**：确保证书配置正确，或临时禁用代码签名
3. **发布失败**：检查 GitHub Token 权限，确保仓库有 Releases 权限

### 调试方法

1. 查看 Actions 页面的详细日志
2. 在本地运行相同的构建命令进行测试
3. 检查 `package.json` 中的脚本配置是否正确