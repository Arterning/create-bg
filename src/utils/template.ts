import degit from 'degit';
import * as fs from 'fs';
import * as path from 'path';
import type { Template } from '../types/index.js';

/**
 * 规范化 GitHub 仓库 URL
 * 将完整的 HTTPS URL 转换为 degit 需要的格式
 * @example
 * https://github.com/user/repo -> user/repo
 * user/repo -> user/repo
 */
function normalizeGitHubUrl(repository: string): string {
  // 如果已经是简化格式，直接返回
  if (!repository.includes('://')) {
    return repository;
  }

  try {
    // 处理完整的 HTTPS URL
    const url = new URL(repository);

    // 验证是否为 GitHub URL
    if (!url.hostname.includes('github.com')) {
      throw new Error('Only GitHub repositories are supported');
    }

    // 提取路径并移除开头的斜杠
    let path = url.pathname.slice(1);

    // 移除 .git 后缀（如果存在）
    if (path.endsWith('.git')) {
      path = path.slice(0, -4);
    }

    return path;
  } catch (error) {
    throw new Error(`Invalid repository URL: ${repository}`);
  }
}

/**
 * 从 GitHub 克隆模板
 */
export async function cloneTemplate(
  template: Template,
  targetPath: string
): Promise<void> {
  const { repository, branch } = template;

  // 规范化仓库 URL
  const normalizedRepo = normalizeGitHubUrl(repository);

  // 构建 degit 源字符串
  // 注意：如果不指定分支，degit 会自动使用仓库的默认分支
  let source = normalizedRepo;
  if (branch && branch.trim()) {
    source = `${normalizedRepo}#${branch}`;
  }

  const emitter = degit(source, {
    cache: false,
    force: true,
    verbose: false
  });

  try {
    await emitter.clone(targetPath);
  } catch (error) {
    // 提供更友好的错误信息
    let errorMessage = `Failed to clone template from ${repository}`;

    if (branch) {
      errorMessage += `\n分支 "${branch}" 可能不存在，请检查仓库的默认分支（可能是 master 或 main）`;
      errorMessage += `\n提示：如果不确定，可以不指定 branch 字段，让工具自动使用默认分支`;
    }

    errorMessage += `\n原始错误: ${error}`;

    throw new Error(errorMessage);
  }
}

/**
 * 替换模板文件中的变量
 */
export async function replaceTemplateVariables(
  projectPath: string,
  projectName: string
): Promise<void> {
  try {
    // 替换 package.json 中的项目名称
    const packageJsonPath = path.join(projectPath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, 'utf-8')
      );

      packageJson.name = projectName;

      // 重置版本号
      packageJson.version = '0.0.0';

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n',
        'utf-8'
      );
    }

    // 可以在这里添加更多的变量替换逻辑
    // 例如：替换 README.md 中的项目名称等
    const readmePath = path.join(projectPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      let readmeContent = fs.readFileSync(readmePath, 'utf-8');

      // 替换常见的占位符
      readmeContent = readmeContent
        .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
        .replace(/\{\{project-name\}\}/g, projectName);

      fs.writeFileSync(readmePath, readmeContent, 'utf-8');
    }
  } catch (error) {
    throw new Error(`Failed to replace template variables: ${error}`);
  }
}

/**
 * 检查目录是否为空
 */
export function isDirectoryEmpty(dirPath: string): boolean {
  if (!fs.existsSync(dirPath)) {
    return true;
  }

  const files = fs.readdirSync(dirPath);
  return files.length === 0;
}
