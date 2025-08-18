# Windows平台打包说明

## 概述

本项目已配置GitHub Actions自动化工作流，支持在Windows平台上自动打包Electron应用。

## 跨平台兼容性检查结果

经过代码审查，项目在跨平台兼容性方面表现良好：

### ✅ 兼容性良好的部分

1. **路径处理**：使用了Node.js的`path`模块进行路径拼接，自动处理不同操作系统的路径分隔符
2. **文件系统操作**：使用`fs.promises`进行异步文件操作，跨平台兼容
3. **配置文件读取**：通过`process.resourcesPath`和相对路径正确处理生产环境的资源路径
4. **平台检测**：在preload.js中提供了平台检测功能（`process.platform`）
5. **Electron配置**：electron-builder已配置支持Windows、macOS和Linux平台

### 📋 构建配置

项目的`package.json`已包含完整的Windows构建配置：

```json
{
  "build": {
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

## GitHub Actions工作流

### 触发条件

- 推送到`main`分支
- 创建Pull Request到`main`分支
- 手动触发（workflow_dispatch）

### 构建步骤

1. **环境准备**：设置Node.js 18和pnpm
2. **依赖安装**：运行`pnpm install`
3. **前端构建**：运行`pnpm run build`
4. **Electron打包**：运行`pnpm run electron:build`
5. **产物上传**：将生成的.exe和.msi文件上传为GitHub Artifacts
6. **自动发布**：推送到main分支时自动创建Release

### 使用方法

#### 方法1：自动触发

1. 将代码推送到`main`分支
2. GitHub Actions会自动开始构建
3. 构建完成后，可在Actions页面下载构建产物
4. 如果是推送到main分支，会自动创建Release

#### 方法2：手动触发

1. 访问项目的GitHub页面
2. 点击"Actions"标签
3. 选择"Build Windows App"工作流
4. 点击"Run workflow"按钮
5. 选择分支并点击"Run workflow"

### 本地测试Windows构建

如果需要在本地测试Windows构建（需要Windows环境）：

```bash
# 安装依赖
pnpm install

# 构建前端
pnpm run build

# 仅构建Windows版本
pnpm run dist:win
```

## 构建产物

成功构建后会生成以下文件：

- `希沃触控一体机管理系统 Setup 0.0.0.exe` - NSIS安装程序
- 可能还会生成`.msi`文件（如果配置了）

## 注意事项

1. **代理设置**：如果在中国大陆环境下构建，可能需要配置npm镜像
2. **依赖下载**：首次构建可能需要较长时间下载Electron二进制文件
3. **权限问题**：确保GitHub仓库有足够的权限创建Release和上传Artifacts
4. **存储空间**：构建产物会占用GitHub Actions的存储配额

## 故障排除

### 常见问题

1. **构建失败**：检查依赖是否正确安装，查看Actions日志
2. **打包失败**：确保所有必要的文件都包含在`files`配置中
3. **Release创建失败**：检查`GITHUB_TOKEN`权限

### 调试方法

1. 查看GitHub Actions的详细日志
2. 在本地Windows环境中复现问题
3. 检查electron-builder的配置是否正确

## 更新日志

- 2024-01-XX：初始化Windows构建工作流
- 添加了跨平台兼容性检查
- 配置了自动化构建和发布流程