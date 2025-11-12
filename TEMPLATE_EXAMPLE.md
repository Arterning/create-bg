# 模板仓库示例

这个文档展示了如何创建一个与 create-bg 兼容的模板仓库。

## 基本结构

一个标准的模板仓库应该包含：

```
template-repo/
├── package.json          # 项目配置
├── README.md            # 项目说明（可使用占位符）
├── .gitignore           # Git 忽略文件
├── tsconfig.json        # TypeScript 配置（如果使用 TS）
├── src/                 # 源代码目录
│   └── index.ts
└── ...其他项目文件
```

## package.json 示例

```json
{
  "name": "template-name",
  "version": "0.0.0",
  "private": true,
  "description": "A template for creating awesome projects",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

**注意事项：**
- `name`: 会被 create-bg 自动替换为用户输入的项目名称
- `version`: 会被重置为 `0.0.0`
- `private`: 可以设置为 `true`，create-bg 不会修改此字段

## README.md 示例

在模板的 README.md 中使用占位符：

```markdown
# {{PROJECT_NAME}}

欢迎使用 {{project-name}}！

这是一个使用 create-bg 创建的项目。

## 开始使用

\`\`\`bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
\`\`\`

## 项目说明

这个项目基于以下技术栈：
- React 18
- TypeScript
- Vite

## 开发

...（你的开发说明）

## 许可证

MIT
```

**支持的占位符：**
- `{{PROJECT_NAME}}`: 会被替换为项目名称
- `{{project-name}}`: 会被替换为项目名称

## .gitignore 示例

```
# 依赖
node_modules/
.pnp
.pnp.js

# 构建输出
dist/
build/
out/

# 环境变量
.env
.env.local
.env.*.local

# 日志
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# 编辑器
.vscode/
.idea/
*.swp
*.swo
*~

# 操作系统
.DS_Store
Thumbs.db

# 测试
coverage/
.nyc_output/

# 临时文件
*.tmp
.cache/
```

## 模板仓库最佳实践

### 1. 保持简洁

只包含必要的文件和配置，让用户可以基于模板快速开始开发。

### 2. 提供清晰的文档

在 README 中说明：
- 项目的技术栈
- 如何启动开发环境
- 如何构建生产版本
- 项目结构说明
- 常见问题

### 3. 使用合理的默认配置

- 配置好开发工具（ESLint, Prettier）
- 设置合理的 TypeScript 配置
- 包含必要的 VSCode 配置推荐

### 4. 版本管理

- 保持依赖版本相对较新
- 定期更新依赖
- 在 README 中说明主要依赖的版本

### 5. 添加示例代码

提供一个简单的示例，展示如何使用模板：
- 一个简单的首页
- 基本的路由配置（如果适用）
- 样式系统的使用示例

## 完整的 React + Vite 模板示例

仓库地址：`https://github.com/your-username/react-vite-template`

```
react-vite-template/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.ico
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css
    └── vite-env.d.ts
```

### src/main.tsx

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### src/App.tsx

```typescript
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>{{PROJECT_NAME}}</h1>
      <p>Welcome to your new project!</p>
    </div>
  )
}

export default App
```

## 在 create-bg 中配置模板

将模板添加到 `src/config/templates.ts`：

```typescript
{
  name: 'react-vite',
  displayName: 'React + Vite',
  description: 'React 18 + Vite + TypeScript + TailwindCSS',
  repository: 'your-username/react-vite-template',
  branch: 'main'
}
```

## 高级功能

### 支持子目录

如果你的仓库包含多个模板：

```
monorepo/
├── templates/
│   ├── react/
│   ├── vue/
│   └── nextjs/
```

配置时指定子目录：

```typescript
{
  name: 'react',
  displayName: 'React',
  description: 'React template',
  repository: 'your-username/monorepo/templates/react'
}
```

### 支持特定分支

如果模板在非主分支：

```typescript
{
  name: 'react-experimental',
  displayName: 'React (Experimental)',
  description: 'React with experimental features',
  repository: 'your-username/react-template',
  branch: 'experimental'
}
```

## 测试模板

在发布模板前，使用 create-bg 测试：

```bash
# 使用本地开发版本
cd create-bg
pnpm dev my-test-project

# 或者直接使用 degit 测试
npx degit your-username/your-template test-project
cd test-project
pnpm install
pnpm dev
```

## 模板维护

- 定期更新依赖版本
- 修复安全漏洞
- 根据用户反馈改进
- 保持文档更新
