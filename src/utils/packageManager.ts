import { execSync } from 'child_process';
import type { PackageManager } from '../types/index.js';

/**
 * 检测当前使用的包管理器
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';

  if (userAgent.includes('pnpm')) {
    return 'pnpm';
  } else if (userAgent.includes('yarn')) {
    return 'yarn';
  }

  return 'npm';
}

/**
 * 检查包管理器是否已安装
 */
export function isPackageManagerInstalled(pm: PackageManager): boolean {
  try {
    execSync(`${pm} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取安装命令
 */
export function getInstallCommand(pm: PackageManager): string {
  const commands = {
    npm: 'npm install',
    pnpm: 'pnpm install',
    yarn: 'yarn install'
  };
  return commands[pm];
}

/**
 * 执行依赖安装
 */
export async function installDependencies(
  projectPath: string,
  pm: PackageManager
): Promise<void> {
  const command = getInstallCommand(pm);

  return new Promise((resolve, reject) => {
    try {
      execSync(command, {
        cwd: projectPath,
        stdio: 'inherit'
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
