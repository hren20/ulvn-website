import { defineConfig } from 'astro/config';

const [ownerFromRepository, nameFromRepository] =
  (process.env.GITHUB_REPOSITORY || '').split('/');
const repositoryOwner = ownerFromRepository || 'username';
const repositoryName = nameFromRepository || 'project-name';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProjectPage =
  isGithubActions && repositoryName && !repositoryName.endsWith('.github.io');

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || `https://${repositoryOwner}.github.io`,
  base: process.env.BASE_PATH || (isProjectPage ? `/${repositoryName}` : '/')
});
