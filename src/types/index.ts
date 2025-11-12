export interface Template {
  name: string;
  displayName: string;
  description: string;
  repository: string; // GitHub repository in format: username/repo or username/repo/subdirectory
  branch?: string; // Optional branch, defaults to main
}

export interface TemplateCategory {
  name: string;
  displayName: string;
  templates: Template[];
}

export interface ProjectConfig {
  projectName: string;
  template: Template;
  packageManager: 'npm' | 'pnpm' | 'yarn';
  shouldInstallDeps: boolean;
  shouldInitGit: boolean;
}

export type PackageManager = 'npm' | 'pnpm' | 'yarn';
