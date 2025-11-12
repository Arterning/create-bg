import degit from 'degit';
import * as fs from 'fs';
import * as path from 'path';
import type { Template } from '../types/index.js';

/**
 * 从 GitHub 克隆模板
 */
export async function cloneTemplate(
  template: Template,
  targetPath: string
): Promise<void> {
  const { repository, branch } = template;

  // 构建 degit 源字符串
  let source = repository;
  if (branch) {
    source = `${repository}#${branch}`;
  }

  const emitter = degit(source, {
    cache: false,
    force: true,
    verbose: false
  });

  try {
    await emitter.clone(targetPath);
  } catch (error) {
    throw new Error(`Failed to clone template: ${error}`);
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
