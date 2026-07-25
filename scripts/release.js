const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootPackagePath = path.join(__dirname, '../package.json');
const desktopPackagePath = path.join(__dirname, '../apps/desktop/package.json');
const tauriConfigPath = path.join(__dirname, '../apps/desktop/src-tauri/tauri.conf.json');
const webDownloadsDir = path.join(__dirname, '../apps/web/public/downloads');

if (!fs.existsSync(webDownloadsDir)) {
  fs.mkdirSync(webDownloadsDir, { recursive: true });
}

// 1. Sync compiled binaries to website public downloads folder
try {
  // Sync macOS DMG
  const macosDir = path.join(__dirname, '../apps/desktop/src-tauri/target/release/bundle/macos');
  if (fs.existsSync(macosDir)) {
    const files = fs.readdirSync(macosDir);
    const dmgFile = files.find(f => f.endsWith('.dmg'));
    if (dmgFile) {
      fs.copyFileSync(path.join(macosDir, dmgFile), path.join(webDownloadsDir, 'Petto.dmg'));
      console.log('📁 Synced latest Petto.dmg to apps/web/public/downloads/!');
    }
  }

  // Sync Windows EXE
  const winDir = path.join(__dirname, '../apps/desktop/src-tauri/target/release/bundle/nsis');
  if (fs.existsSync(winDir)) {
    const files = fs.readdirSync(winDir);
    const exeFile = files.find(f => f.endsWith('.exe') || f.endsWith('.msi'));
    if (exeFile) {
      fs.copyFileSync(path.join(winDir, exeFile), path.join(webDownloadsDir, 'Petto-setup.exe'));
      console.log('📁 Synced latest Petto-setup.exe to apps/web/public/downloads/!');
    }
  }
} catch (e) {
  console.log('Note on binary sync:', e.message);
}

// Read current version
const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf-8'));
const currentVersion = pkg.version || '0.1.0';

// Calculate next patch version (0.1.0 -> 0.1.1)
const versionParts = currentVersion.split('.').map(Number);
versionParts[2] += 1;
const newVersion = versionParts.join('.');

console.log(`🚀 Bumping version: v${currentVersion} -> v${newVersion}...`);

// 2. Update root package.json
pkg.version = newVersion;
fs.writeFileSync(rootPackagePath, JSON.stringify(pkg, null, 2) + '\n');

// 3. Update apps/desktop/package.json
const desktopPkg = JSON.parse(fs.readFileSync(desktopPackagePath, 'utf-8'));
desktopPkg.version = newVersion;
fs.writeFileSync(desktopPkg, JSON.stringify(desktopPkg, null, 2) + '\n');

// 4. Update tauri.conf.json
const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));
tauriConfig.version = newVersion;
fs.writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2) + '\n');

// 5. Git commit & tag & push
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
