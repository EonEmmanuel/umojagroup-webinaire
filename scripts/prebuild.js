import fs from 'node:fs';
import path from 'node:path';

const distServerDir = path.join(process.cwd(), 'dist', 'server');

if (!fs.existsSync(distServerDir)) {
  fs.mkdirSync(distServerDir, { recursive: true });
}

const entryPath = path.join(distServerDir, 'entry.js');
fs.writeFileSync(entryPath, 'export default { fetch() {} }');

console.log('Prebuild: Created dummy dist/server/entry.js');
