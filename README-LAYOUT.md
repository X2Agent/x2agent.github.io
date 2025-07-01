# X2Agent 布局系统说明

## 概述

本项目已从动态加载 header 和 footer 的方式升级为基于布局文件的静态构建系统。新系统提供了更好的性能、SEO 友好性和维护性。

## 系统优势

### 🚀 性能提升
- **更快的加载速度**：无需等待 JavaScript 动态加载组件
- **减少网络请求**：所有内容在一个 HTML 文件中
- **更好的缓存策略**：静态文件可以被更有效地缓存

### 🔍 SEO 友好
- **完整的 HTML 结构**：搜索引擎可以立即看到完整页面内容
- **更好的爬虫支持**：无需执行 JavaScript 即可获取页面内容
- **改善的页面加载指标**：更好的 Core Web Vitals 分数

### 🛠️ 维护性提升
- **统一的布局管理**：所有页面共享同一个布局模板
- **内容与布局分离**：页面内容独立于布局结构
- **更好的可扩展性**：添加新页面更加简单

## 项目结构

```
x2agent.github.io/
├── layouts/
│   └── base.html              # 基础布局模板
├── pages/
│   ├── index-content.html     # 首页内容
│   └── market-assistant-content.html  # MarketAssistant页面内容
├── components/                 # 旧的组件文件（可删除）
│   ├── header.html
│   └── footer.html
├── css/
│   └── style.css
├── js/
│   └── common.js              # 简化后的脚本
├── images/
├── build.js                   # 构建脚本
├── index.html                 # 生成的首页
├── market-assistant.html      # 生成的MarketAssistant页面
└── README-LAYOUT.md           # 本文档
```

## 使用方法

### 添加新页面

1. **创建页面内容文件**
   ```bash
   # 在 pages/ 目录下创建新的内容文件
   touch pages/new-page-content.html
   ```

2. **编辑页面内容**
   ```html
   <!-- pages/new-page-content.html -->
   <section class="hero-section">
       <h1>新页面标题</h1>
       <p>页面内容...</p>
   </section>
   ```

3. **在构建脚本中添加页面配置**
   ```javascript
   // build.js 中的 pages 对象
   const pages = {
       // 现有页面...
       'new-page.html': {
           title: '新页面标题',
           contentFile: 'pages/new-page-content.html',
           head_extra: '',
           scripts: ''
       }
   };
   ```

4. **运行构建脚本**
   ```bash
   node build.js
   ```

### 修改现有页面

1. **编辑页面内容文件**
   ```bash
   # 编辑对应的内容文件
   # 例如：pages/index-content.html
   ```

2. **重新构建**
   ```bash
   node build.js
   ```

### 修改布局

1. **编辑布局模板**
   ```bash
   # 编辑 layouts/base.html
   ```

2. **重新构建所有页面**
   ```bash
   node build.js
   ```

## 模板变量

布局模板 `layouts/base.html` 支持以下变量：

- `{{title}}` - 页面标题
- `{{head_extra}}` - 额外的 head 内容（如特殊的 meta 标签、CSS 等）
- `{{content}}` - 页面主要内容
- `{{scripts}}` - 页面特定的 JavaScript 代码

## 构建脚本

### 主要功能

- **StaticTemplateEngine**: 简单的模板引擎，支持变量替换
- **buildPages()**: 构建所有配置的页面
- **ensurePagesDirectory()**: 确保必要的目录存在

### 运行构建

```bash
# 构建所有页面
node build.js

# 启动本地服务器预览
python -m http.server 8000
```

## 开发工作流

1. **修改内容**：编辑 `pages/` 目录下的内容文件
2. **修改布局**：编辑 `layouts/base.html`（如需要）
3. **构建**：运行 `node build.js`
4. **预览**：使用本地服务器查看效果
5. **部署**：提交生成的 HTML 文件

## 从旧系统迁移

### 已完成的迁移步骤

1. ✅ 创建了 `layouts/base.html` 布局模板
2. ✅ 提取页面内容到 `pages/` 目录
3. ✅ 创建了构建脚本 `build.js`
4. ✅ 简化了 `js/common.js`，移除动态加载逻辑
5. ✅ 生成了新的静态 HTML 文件

### 可选的清理步骤

```bash
# 删除旧的组件文件（可选）
rm -rf components/
```

## 注意事项

1. **构建后提交**：每次修改内容后，需要运行构建脚本并提交生成的 HTML 文件
2. **保持同步**：确保页面内容文件和生成的 HTML 文件保持同步
3. **测试预览**：在提交前使用本地服务器测试页面效果

## 故障排除

### 常见问题

**Q: 构建失败，提示找不到内容文件**
A: 确保 `pages/` 目录下存在对应的内容文件

**Q: 页面样式丢失**
A: 检查 CSS 文件路径是否正确，确保在正确的目录下运行构建脚本

**Q: JavaScript 功能不工作**
A: 检查构建脚本中的 `scripts` 配置是否正确

### 调试技巧

```bash
# 检查生成的文件
ls -la *.html

# 查看构建日志
node build.js

# 验证内容文件
ls -la pages/
```

---

通过这个新的布局系统，X2Agent 网站现在具有更好的性能、可维护性和扩展性。如有任何问题，请参考本文档或检查构建脚本的输出信息。