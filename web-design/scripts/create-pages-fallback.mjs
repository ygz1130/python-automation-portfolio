import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function createPagesFallback(distDirectory) {
  const index = join(distDirectory, 'index.html');
  await copyFile(index, join(distDirectory, '404.html'));
  const caseDirectory = join(distDirectory, 'work', 'aster-house');
  await mkdir(caseDirectory, { recursive: true });
  await copyFile(index, join(caseDirectory, 'index.html'));
  await writeFile(join(distDirectory, '.nojekyll'), '');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await createPagesFallback(join(dirname(dirname(fileURLToPath(import.meta.url))), 'dist'));
}
