import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { createPagesFallback } from './create-pages-fallback.mjs';

test('emits identical root fallback and known direct-route entry', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'form-field-pages-'));
  try {
    const html = '<!doctype html><html><body><div id="root"></div></body></html>';
    await writeFile(join(directory, 'index.html'), html);
    await createPagesFallback(directory);
    assert.equal(await readFile(join(directory, '404.html'), 'utf8'), html);
    assert.equal(await readFile(join(directory, 'work/aster-house/index.html'), 'utf8'), html);
    assert.equal(await readFile(join(directory, '.nojekyll'), 'utf8'), '');
  } finally {
    const target = resolve(directory);
    assert.ok(target.startsWith(resolve(tmpdir()) + '\\') || target.startsWith(resolve(tmpdir()) + '/'));
    assert.ok(target.includes('form-field-pages-'));
    await rm(target, { recursive: true, force: true });
  }
});

test('missing build rejects rather than silently succeeding', async () => {
  await assert.rejects(createPagesFallback(join(tmpdir(), 'form-field-nonexistent-dist')), { code: 'ENOENT' });
});
