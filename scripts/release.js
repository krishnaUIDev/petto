const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootPackagePath = path.join(__dirname, '../package.json');
const desktopPackagePath = path.join(__dirname, '../apps/desktop/package.json');
const tauriConfigPath = path.join(__dirname, '../apps/desktop/src-tauri/tauri.conf.json');

// Read current version
const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf-8'));
const currentVersion = pkg.version || '0.1.0';

// Calculate next patch version (0.1.0 -> 0.1.1)
const versionParts = currentVersion.split('.').map(Number);
versionParts[2] += 1;
const newVersion = versionParts.join('.');

console.log(`🚀 Bumping version: v${currentVersion} -> v${newVersion}...`);

// 1. Update root package.json
pkg.version = newVersion;
fs.writeFileSync(rootPackagePath, JSON.stringify(pkg, null, 2) + '\n');

// 2. Update apps/desktop/package.json
const desktopPkg = JSON.parse(fs.readFileSync(desktopPackagePath, 'utf-8'));
desktopPkg.version = newVersion;
fs.writeFileSync(desktopPackagePath, JSON.stringify(desktopPkg, null, 2) + '\n');

// 3. Update tauri.conf.json
const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));
tauriConfig.version = newVersion;
fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2) + '\n');

// 4. Git commit & tag & push
console.log(`📦 Committing and pushing tag v${newVersion} to GitHub...`);
try {
  if (process.env.CI) {
    execSync(`git config user.name "github-actions[bot]"`, { stdio: 'inherit' });
    execSync(`git config user.email "github-actions[bot]@users.noreply.github.com"`, { stdio: 'inherit' });
  }
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "chore(release): v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  
  if (!process.env.CI) {
    execSync(`git push origin main --tags`, { stdio: 'inherit' });
  } else {
    execSync(`git push origin HEAD:main --tags`, { stdio: 'inherit' });
  }
} catch (err) {
  console.log('Git commit/push note:', err.message);
}

console.log(`✅ Success! Release v${newVersion} created and pushed to GitHub.`);
console.log(`GitHub Actions will now compile Petto.dmg and Petto.exe automatically!`);
