import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Files and directories to remove
const itemsToRemove = [
  '.git',
  'index.html',
  'terminal.html',
  'styles.css',
  'neo-styles.css',
  'script.js',
  'CNAME',
  'robots.txt',
  'sitemap.xml',
  'LICENSE',
  'image',
  '.gitmodules',
];

console.log('[Cleanup] Starting project cleanup...\n');

itemsToRemove.forEach(item => {
  const fullPath = path.join(projectRoot, item);
  
  try {
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`✓ Removed directory: ${item}/`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`✓ Removed file: ${item}`);
      }
    }
  } catch (error) {
    console.error(`✗ Error removing ${item}: ${error.message}`);
  }
});

console.log('\n[Cleanup] Project cleanup complete!');
console.log('[Cleanup] Next.js project is ready for review.');
