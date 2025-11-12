#!/usr/bin/env node

import * as p from '@clack/prompts';
import pc from 'picocolors';
import * as path from 'path';
import * as fs from 'fs';
import { templateCategories } from './config/templates.js';
import {
  cloneTemplate,
  replaceTemplateVariables,
  isDirectoryEmpty
} from './utils/template.js';
import {
  detectPackageManager,
  isPackageManagerInstalled,
  installDependencies,
  getInstallCommand
} from './utils/packageManager.js';
import { initializeGit, isGitInstalled } from './utils/git.js';
import type { Template, PackageManager } from './types/index.js';

async function main() {
  console.clear();

  p.intro(pc.bgCyan(pc.black(' create-bg ')));

  // 获取项目名称（从命令行参数或提示输入）
  const args = process.argv.slice(2);
  let projectName = args[0];

  if (!projectName) {
    const nameResult = await p.text({
      message: '项目名称是什么？',
      placeholder: 'my-app',
      validate: (value) => {
        if (!value) return '项目名称不能为空';
        if (!/^[a-z0-9-_]+$/.test(value)) {
          return '项目名称只能包含小写字母、数字、连字符和下划线';
        }
        return;
      }
    });

    if (p.isCancel(nameResult)) {
      p.cancel('操作已取消');
      process.exit(0);
    }

    projectName = nameResult as string;
  }

  const projectPath = path.join(process.cwd(), projectName);

  // 检查目录是否已存在
  if (fs.existsSync(projectPath) && !isDirectoryEmpty(projectPath)) {
    p.cancel(`目录 ${pc.cyan(projectName)} 已存在且不为空`);
    process.exit(1);
  }

  // 选择模板类别
  const categoryResult = await p.select({
    message: '选择项目类别',
    options: templateCategories.map((cat) => ({
      value: cat.name,
      label: cat.displayName,
      hint: `${cat.templates.length} 个模板`
    }))
  });

  if (p.isCancel(categoryResult)) {
    p.cancel('操作已取消');
    process.exit(0);
  }

  const selectedCategory = templateCategories.find(
    (cat) => cat.name === categoryResult
  );

  if (!selectedCategory) {
    p.cancel('未找到选择的类别');
    process.exit(1);
  }

  // 选择具体模板
  const templateResult = await p.select({
    message: '选择项目模板',
    options: selectedCategory.templates.map((template) => ({
      value: template.name,
      label: template.displayName,
      hint: template.description
    }))
  });

  if (p.isCancel(templateResult)) {
    p.cancel('操作已取消');
    process.exit(0);
  }

  const selectedTemplate = selectedCategory.templates.find(
    (t) => t.name === templateResult
  ) as Template;

  // 检测包管理器
  const detectedPM = detectPackageManager();

  // 询问是否安装依赖
  const shouldInstall = await p.confirm({
    message: '是否自动安装依赖？',
    initialValue: true
  });

  if (p.isCancel(shouldInstall)) {
    p.cancel('操作已取消');
    process.exit(0);
  }

  let packageManager: PackageManager = detectedPM;

  // 如果要安装依赖，询问使用哪个包管理器
  if (shouldInstall) {
    const pmResult = await p.select({
      message: '选择包管理器',
      options: [
        { value: 'pnpm', label: 'pnpm', hint: '快速、节省磁盘空间' },
        { value: 'npm', label: 'npm', hint: 'Node.js 默认包管理器' },
        { value: 'yarn', label: 'yarn', hint: '稳定、可靠' }
      ],
      initialValue: detectedPM
    });

    if (p.isCancel(pmResult)) {
      p.cancel('操作已取消');
      process.exit(0);
    }

    packageManager = pmResult as PackageManager;

    // 检查选择的包管理器是否已安装
    if (!isPackageManagerInstalled(packageManager)) {
      p.cancel(
        `${pc.cyan(packageManager)} 未安装，请先安装或选择其他包管理器`
      );
      process.exit(1);
    }
  }

  // 询问是否初始化 Git
  let shouldInitGit = false;
  if (isGitInstalled()) {
    const gitResult = await p.confirm({
      message: '是否初始化 Git 仓库？',
      initialValue: true
    });

    if (p.isCancel(gitResult)) {
      p.cancel('操作已取消');
      process.exit(0);
    }

    shouldInitGit = gitResult;
  }

  // 开始创建项目
  const s = p.spinner();

  try {
    // 1. 克隆模板
    s.start('正在克隆模板...');
    await cloneTemplate(selectedTemplate, projectPath);
    s.stop('模板克隆成功');

    // 2. 替换变量
    s.start('正在配置项目...');
    await replaceTemplateVariables(projectPath, projectName);
    s.stop('项目配置完成');

    // 3. 安装依赖
    if (shouldInstall) {
      s.start(`正在使用 ${packageManager} 安装依赖...`);
      await installDependencies(projectPath, packageManager);
      s.stop('依赖安装完成');
    }

    // 4. 初始化 Git
    if (shouldInitGit) {
      s.start('正在初始化 Git 仓库...');
      await initializeGit(projectPath);
      s.stop('Git 仓库初始化完成');
    }

    p.outro(pc.green('项目创建成功！'));

    // 显示后续步骤
    console.log();
    console.log(pc.bold('下一步：'));
    console.log();
    console.log(pc.cyan(`  cd ${projectName}`));

    if (!shouldInstall) {
      console.log(pc.cyan(`  ${getInstallCommand(packageManager)}`));
    }

    console.log();
    console.log(pc.dim('Happy coding! 🎉'));
    console.log();
  } catch (error) {
    s.stop('创建失败');
    p.cancel(pc.red(`错误: ${error}`));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(pc.red('发生错误:'), error);
  process.exit(1);
});
