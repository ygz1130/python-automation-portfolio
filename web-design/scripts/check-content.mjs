import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function collect(directory) {
  const chunks = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'test' || entry.name === '__tests__' || /\.(test|spec)\./.test(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) chunks.push(...await collect(path));
    else if (['.jsx', '.js'].includes(extname(entry.name))) chunks.push(await readFile(path, 'utf8'));
  }
  return chunks;
}
const required = ['Self-initiated fictional case study', 'not a claim of paid client engagement', 'Demo form — nothing is transmitted or stored.'];
const banned = [/increased (sales|revenue|conversion)/i, /award-winning/i, /guaranteed results/i];
const directory = dirname(dirname(fileURLToPath(import.meta.url)));
const content = (await collect(join(directory, 'src'))).join('\n');
const issues = [
  ...required.filter(value => !content.includes(value)).map(value => 'Missing disclosure: ' + value),
  ...banned.filter(pattern => pattern.test(content)).map(pattern => 'Unsupported claim: ' + pattern),
];
if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else console.log('Content audit passed: 3 disclosures present, 0 unsupported claim patterns.');
