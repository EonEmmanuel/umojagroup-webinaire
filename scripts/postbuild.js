import fs from 'node:fs';
import path from 'node:path';

const distServerDir = path.join(process.cwd(), 'dist', 'server');
const entryPath = path.join(distServerDir, 'entry.js');

// Check for built server files
const serverFile = fs.existsSync(path.join(distServerDir, 'server.js')) ? 'server.js' : 'index.js';

const content = `import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import * as serverModule from './${serverFile}'

const getRouter = serverModule.getRouter || (serverModule.default && serverModule.default.getRouter);

const handler = createStartHandler({
  getRouter,
  getStreamHandler: defaultStreamHandler,
})

export default {
  async fetch(request, env, ctx) {
    return handler(request)
  },
}
`;

fs.writeFileSync(entryPath, content);
console.log(`Postbuild: Created dist/server/entry.js (importing from ${serverFile})`);
