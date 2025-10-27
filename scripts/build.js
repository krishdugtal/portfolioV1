const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const buildDir = path.join(root, 'build');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.git' || entry === 'build') continue;
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      copyRecursive(srcPath, destPath);
    }
  } else if (stat.isFile()) {
    fs.copyFileSync(src, dest);
  }
}

// Clean build dir
if (fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir);

// Copy files from root to build
const entries = fs.readdirSync(root);
for (const entry of entries) {
  if (entry === 'node_modules' || entry === '.git' || entry === 'build' || entry === 'scripts') continue;
  const srcPath = path.join(root, entry);
  const destPath = path.join(buildDir, entry);
  copyRecursive(srcPath, destPath);
}

console.log('Build complete. Output in:', buildDir);
