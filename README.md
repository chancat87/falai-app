# FalAI 图像生成应用

FalAI 是一个基于 [FAL.AI](https://fal.ai/) API 的高级图像生成应用，提供直观的用户界面，让用户能够轻松创建、管理和分享 AI 生成的图像。该应用采用 Vue 3 和 ShadcnUI 构建，支持响应式设计，确保在桌面端和移动端都有出色的用户体验。

![FalAI 应用截图](https://cdn.ldstatic.com/optimized/4X/7/7/3/7732c03de520187cd842164a6d13baf8d4213c29_2_1350x998.jpeg)

## 🌟 主要特点

- **多模型支持**：集成了多种 FAL.AI 图像生成模型，包括 Flux Pro、Flux Pro Ultra 和 LoRA 模型
- **高级提示词工具**：内置 AI 提示词增强和标签结构化功能，帮助用户创建更有效的提示词
- **自定义设置**：支持保存和加载自定义生成设置，提高工作效率
- **生成历史**：完整的生成历史记录，支持分页浏览、搜索和筛选
- **API 密钥管理**：灵活的 API 密钥管理系统，支持多密钥配置和自动切换
- **响应式设计**：完美适配桌面端和移动端设备
- **优化的图像显示**：支持多图预览、懒加载和渐进式加载
- **NSFW 内容管理**：内置 NSFW 内容检测和模糊处理

## 🚀 功能亮点

### 图像生成

- 支持多种图像尺寸和宽高比
- 可调整的生成参数（步数、引导系数等）
- 支持一次生成多张图片（最多 4 张）
- 实时显示生成进度和加载状态
- 支持 LoRA 模型的权重调整

### 提示词工具

- AI 提示词增强功能，基于 Claude 3.7 Sonnet 模型
- 提示词标签结构化工具，优化生成效果
- 提示词输入建议和最佳实践提示

### 图像管理

- 缩略图预览行，便于浏览多张生成的图片
- 按原始比例显示图片，保持图像完整性
- 一键下载生成的图片
- 详细的图像元数据显示（尺寸、种子值等）

### 历史记录

- 完整的生成历史浏览功能
- 支持按模型和提示词搜索
- 分页功能，支持浏览大量历史记录
- 图片预览和详细信息查看

### API 密钥管理

- 支持添加和管理多个 FAL.AI API 密钥
- 密钥分组功能，便于组织管理
- 一键测试密钥可用性
- 当密钥余额不足时自动切换到下一个可用密钥

## 🛠️ 技术栈

- **前端框架**：Vue 3 + TypeScript
- **UI 组件**：ShadcnUI + Tailwind CSS
- **状态管理**：Vue Composition API
- **路由**：Vue Router
- **API 集成**：FAL.AI JavaScript SDK
- **数据存储**：Supabase + 本地存储
- **构建工具**：Vite
- **部署**：Vercel

## 📦 安装与使用

### 环境要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本

### 安装步骤

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/falai-app.git
   cd falai-app
   ```

2. 安装依赖
   ```bash
   pnpm install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env
   ```

   编辑 `.env` 文件，添加必要的 API 密钥和配置

4. 启动开发服务器
   ```bash
   pnpm dev
   ```

5. 构建生产版本
   ```bash
   pnpm build
   ```

## 🔑 API 密钥配置

应用需要 FAL.AI API 密钥才能正常工作。您可以通过以下方式配置密钥：

1. **密钥文件URL（推荐）**：在 `.env` 文件中设置 `VITE_FAL_API_KEYS_URL`，指向包含API密钥的文件URL
2. **Vercel 部署环境变量**：在 Vercel 项目仓库的设置页面中，进入 "Environment Variables" 部分添加 `VITE_FAL_API_KEYS_URL` 变量
3. **用户界面**：通过应用内的 API 密钥管理界面添加密钥

### 密钥文件格式

密钥文件应该是纯文本格式，每行一个API密钥：
```
9263a18e-28f9-4af7-9905-0f17621d4d3a:04ee433e91cdd23e5ac116231a954819
9263a18e-28f9-4af7-9905-0f17621d4d3a:04ee433e91cdd23e5ac116231a954810
fal.xxxxxx
fal.yyyyyy
```

### 环境变量配置示例

```bash
# 配置密钥文件URL
VITE_FAL_API_KEYS_URL=https://example.com/api-keys.txt
```

> **重要提示：** 如果您在 Vercel 上部署应用，必须在 Vercel 项目仓库的设置页面中配置环境变量，而不是仅仅依赖于 `.env` 文件。这是因为在构建过程中，`.env` 文件中的变量可能不会被正确地应用到部署环境中。

> **安全提示：** 确保您的密钥文件URL是安全的，建议使用HTTPS协议，并考虑添加访问控制以防止密钥泄露。

## 📱 移动端支持

应用完全支持移动设备，提供了针对移动端优化的界面：

- 自适应布局，确保在各种屏幕尺寸上的良好显示
- 触摸友好的控件和交互
- 针对移动网络优化的图片加载策略

## 🤝 贡献

欢迎贡献代码、报告问题或提出改进建议！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解更多信息。

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [FAL.AI](https://fal.ai/) 提供强大的 AI 图像生成 API
- [ShadcnUI](https://ui.shadcn.com/) 提供美观实用的 UI 组件
- [Vue 团队](https://vuejs.org/) 开发了出色的前端框架
- 所有为本项目做出贡献的开发者
