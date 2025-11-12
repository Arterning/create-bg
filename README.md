# create-bg

一个现代化的项目脚手架工具，基于 GitHub 模板快速创建新项目。

## 特性

✨ **交互式 CLI** - 基于 [Clack](https://github.com/natemoo-re/clack) 的优雅交互式界面
📦 **多模板支持** - 支持配置多个 GitHub 仓库作为模板
🔧 **智能检测** - 自动检测并使用用户偏好的包管理器（npm/pnpm/yarn）
🎨 **变量替换** - 自动替换模板中的项目名称和其他变量
🚀 **一键初始化** - 可选自动安装依赖和初始化 Git 仓库

## 安装

### 全局安装

```bash
npm install -g create-bg
# or
pnpm add -g create-bg
# or
yarn global add create-bg
```

### 直接使用（推荐）

无需安装，直接使用以下任一方式：

```bash
# 使用 npx
npx create-bg my-app

# 使用 npm
npm create bg my-app

# 使用 pnpm
pnpm create bg my-app

# 使用 yarn
yarn create bg my-app
```

## 使用方法

### 基本使用

```bash
# 不指定项目名称，交互式输入
npx create-bg

# 指定项目名称
npx create-bg my-awesome-project
```

### 交互流程

1. **输入项目名称**（如果未在命令行指定）
2. **选择项目类别**（Web 应用、后端应用、全栈应用等）
3. **选择具体模板**（React、Vue、NestJS 等）
4. **选择是否安装依赖**
5. **选择包管理器**（npm/pnpm/yarn）
6. **选择是否初始化 Git 仓库**

工具会自动：
- 从 GitHub 克隆选择的模板
- 替换 `package.json` 中的项目名称
- 替换 `README.md` 中的占位符
- 安装依赖（如果选择）
- 初始化 Git 仓库并创建初始提交（如果选择）

## 配置模板

编辑 `src/config/templates.ts` 文件来配置你自己的模板仓库：

```typescript
export const templateCategories: TemplateCategory[] = [
  {
    name: 'web',
    displayName: 'Web 应用',
    templates: [
      {
        name: 'react-vite',
        displayName: 'React + Vite',
        description: 'React 18 + Vite + TypeScript + TailwindCSS',
        repository: 'your-github-username/react-vite-template',
        branch: 'main' // 可选，默认为 main
      },
      // 更多模板...
    ]
  },
  // 更多分类...
];
```

### 仓库格式

- **完整仓库**: `username/repo`
- **指定分支**: `username/repo#branch-name` 或在 `branch` 字段指定
- **子目录**: `username/repo/subdirectory`

## 模板变量

工具会自动替换模板文件中的以下变量：

### package.json
- `name`: 自动设置为用户输入的项目名称
- `version`: 重置为 `0.0.0`

### README.md
- `{{PROJECT_NAME}}`: 替换为项目名称
- `{{project-name}}`: 替换为项目名称

你可以在模板仓库的 README.md 中使用这些占位符：

```markdown
# {{PROJECT_NAME}}

欢迎使用 {{project-name}}！
```

## 开发

```bash
# 克隆项目
git clone https://github.com/your-username/create-bg.git
cd create-bg

# 安装依赖
pnpm install

# 开发模式运行
pnpm dev

# 构建
pnpm build

# 本地测试
npm link
create-bg test-project
```

## 项目结构

```
create-bg/
├── src/
│   ├── config/
│   │   └── templates.ts      # 模板配置
│   ├── types/
│   │   └── index.ts          # TypeScript 类型定义
│   ├── utils/
│   │   ├── git.ts            # Git 相关工具
│   │   ├── packageManager.ts # 包管理器工具
│   │   └── template.ts       # 模板处理工具
│   └── index.ts              # CLI 入口文件
├── package.json
├── tsconfig.json
└── README.md
```

## 技术栈

- **TypeScript** - 类型安全
- **Clack** - 现代化的 CLI 交互界面
- **degit** - 快速克隆 Git 仓库
- **picocolors** - 终端颜色输出

## 发布到 npm

1. 更新 `package.json` 中的作者、仓库等信息
2. 构建项目：

```bash
pnpm build
```

3. 登录 npm：

```bash
npm login
```

4. 发布：

```bash
npm publish
```

发布后，用户就可以通过以下方式使用：

```bash
npx create-bg
npm create bg
pnpm create bg
```

## 最佳实践

### 创建模板仓库

1. 在模板的 `package.json` 中使用通用的包名或留空
2. 在 `README.md` 中使用 `{{PROJECT_NAME}}` 占位符
3. 确保 `.gitignore` 文件完整
4. 添加清晰的项目说明和使用文档

### 示例模板 package.json

```json
{
  "name": "template-name",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

## 常见问题

### Q: 如何添加新的模板？

A: 编辑 `src/config/templates.ts`，在对应的类别中添加新的模板配置。

### Q: 支持私有仓库吗？

A: 目前主要支持公开仓库。如果需要支持私有仓库，需要配置 GitHub token。

### Q: 可以从其他 Git 服务（GitLab、Bitbucket）克隆吗？

A: `degit` 主要支持 GitHub，但也支持 GitLab 和 Bitbucket，格式为：
- GitLab: `gitlab:user/repo`
- Bitbucket: `bitbucket:user/repo`

### Q: 如何自定义更多的变量替换？

A: 编辑 `src/utils/template.ts` 中的 `replaceTemplateVariables` 函数，添加更多的替换逻辑。

## License

MIT

## 作者

[Your Name]

## 贡献

欢迎提交 Issue 和 Pull Request！
