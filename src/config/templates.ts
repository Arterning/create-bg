import type { TemplateCategory } from '../types/index.js';

/**
 * 配置你的模板仓库
 *
 * repository 格式：
 * - 完整仓库: "username/repo"
 * - 指定分支: "username/repo#branch-name"
 * - 子目录: "username/repo/subdirectory"
 */
export const templateCategories: TemplateCategory[] = [
  {
    name: 'web',
    displayName: 'Web 应用',
    templates: [
      {
        name: 'react-vite',
        displayName: 'React + Vite',
        description: 'React 18 + Vite + TypeScript + TailwindCSS',
        repository: 'https://github.com/Arterning/next-template',
        branch: 'main'
      },
      {
        name: 'vue-vite',
        displayName: 'Vue + Vite',
        description: 'Vue 3 + Vite + TypeScript',
        repository: 'https://github.com/Arterning/next-template'
      },
      {
        name: 'next',
        displayName: 'Next.js',
        description: 'Next.js 14 + App Router + TypeScript',
        repository: 'https://github.com/Arterning/next-template'
      }
    ]
  },
  {
    name: 'backend',
    displayName: '后端应用',
    templates: [
      {
        name: 'nest',
        displayName: 'NestJS',
        description: 'NestJS + TypeScript + PostgreSQL',
        repository: 'https://github.com/Arterning/next-template'
      },
      {
        name: 'express',
        displayName: 'Express',
        description: 'Express + TypeScript + Prisma',
        repository: 'https://github.com/Arterning/next-template'
      }
    ]
  },
  {
    name: 'fullstack',
    displayName: '全栈应用',
    templates: [
      {
        name: 'monorepo',
        displayName: 'Monorepo',
        description: 'Turborepo + Next.js + NestJS',
        repository: 'https://github.com/Arterning/next-template'
      }
    ]
  }
];
