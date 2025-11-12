import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 检查 Git 是否已安装
 */
export function isGitInstalled(): boolean {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * 初始化 Git 仓库
 */
export async function initializeGit(projectPath: string): Promise<void> {
  try {
    // 初始化 git 仓库
    execSync('git init', {
      cwd: projectPath,
      stdio: 'ignore'
    });

    // 创建 .gitignore 如果不存在
    const gitignorePath = path.join(projectPath, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
      const defaultGitignore = `node_modules
dist
*.log
.DS_Store
.env
.vscode
.idea
`;
      fs.writeFileSync(gitignorePath, defaultGitignore, 'utf-8');
    }

    // 添加所有文件
    execSync('git add -A', {
      cwd: projectPath,
      stdio: 'ignore'
    });

    // 创建初始提交
    execSync('git commit -m "Initial commit from create-bg"', {
      cwd: projectPath,
      stdio: 'ignore'
    });
  } catch (error) {
    throw new Error(`Git initialization failed: ${error}`);
  }
}
