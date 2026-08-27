import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '.output');
const destination = resolve(root, 'dist/site/downloads/css-cause-map-chrome.zip');

async function filesBelow(directory) {
  const entries = await readdir(directory);
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry);
    return (await stat(path)).isDirectory() ? filesBelow(path) : [path];
  }));
  return nested.flat();
}

const candidates = (await filesBelow(output)).filter((path) => path.endsWith('.zip') && path.toLowerCase().includes('chrome'));
const source = candidates.sort().at(-1);
if (!source) throw new Error('No packaged Chrome ZIP found. Run npm run package first.');
await mkdir(resolve(root, 'dist/site/downloads'), { recursive: true });
await cp(source, destination);
console.log(`Staged ${source.replace(`${root}/`, '')} -> dist/site/downloads/css-cause-map-chrome.zip`);
