# 快速开始指南

## 第一步：配置你的模板仓库

编辑 `src/config/templates.ts`，将示例仓库替换为你自己的 GitHub 仓库：

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
        repository: 'your-github-username/react-vite-template', // 改成你的仓库
        branch: 'main'
      }
    ]
  }
];
```

## 第二步：本地测试

```bash
# 1. 进入项目目录
cd create-bg

# 2. 安装依赖
pnpm install

# 3. 本地测试运行
pnpm dev my-test-project
```

这会创建一个名为 `my-test-project` 的测试项目，验证你的配置是否正确。

## 第三步：构建项目

```bash
pnpm build
```

构建后的文件会在 `dist/` 目录中。

## 第四步：本地测试已构建版本

```bash
# 1. 创建全局链接
npm link

# 2. 测试使用
create-bg another-test-project

# 3. 或者使用 npx 测试
npx . test-with-npx
```

## 第五步：发布到 npm

### 5.1 准备发布

更新 `package.json` 中的信息：

```json
{
  "name": "create-bg",
  "version": "0.0.1",
  "description": "A CLI tool to create projects from GitHub templates",
  "author": "你的名字 <your-email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/create-bg.git"
  },
  "homepage": "https://github.com/your-username/create-bg#readme",
  "keywords": [
    "cli",
    "scaffold",
    "template",
    "create-app",
    "generator"
  ]
}
```

### 5.2 登录 npm

```bash
npm login
```

### 5.3 发布

```bash
# 首次发布
npm publish

# 后续更新（记得先更新版本号）
npm version patch  # 0.0.1 -> 0.0.2
npm publish
```

## 第六步：使用已发布的包

发布成功后，其他用户可以这样使用：

```bash
# 方式 1: 使用 npx（推荐）
npx create-bg my-project

# 方式 2: 使用 npm create
npm create bg my-project

# 方式 3: 使用 pnpm create
pnpm create bg my-project

# 方式 4: 全局安装后使用
npm install -g create-bg
create-bg my-project
```

## 常见问题

### Q1: 如何测试不同的模板？

在配置文件中添加多个模板，然后使用 `pnpm dev` 测试每一个。

### Q2: 发布前需要注意什么？

- 确保所有模板仓库都是公开的
- 验证每个模板都能正常克隆和使用
- 测试所有功能（依赖安装、Git 初始化等）
- 更新 README 和文档

### Q3: 如何更新已发布的版本？

```bash
# 修改代码后
pnpm build

# 更新版本号
npm version patch  # 或 minor, major

# 发布
npm publish
```

### Q4: 包名被占用怎么办？

在 npm 官网搜索可用的包名，或者使用 scoped package：

```json
{
  "name": "@your-username/create-bg"
}
```

使用时：
```bash
npx @your-username/create-bg
npm create @your-username/bg
```

## 下一步

1. 创建你的第一个模板仓库（参考 TEMPLATE_EXAMPLE.md）
2. 在 `src/config/templates.ts` 中配置模板
3. 本地测试验证
4. 发布到 npm
5. 分享给其他人使用

祝你使用愉快！
