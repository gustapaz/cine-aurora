import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
test(
  'exportação contém rotas completas, metadados e assets locais válidos',
  { skip: !existsSync('build/index.html') },
  () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
      );
    const pages = walk('build').filter((f) => f.endsWith('index.html'));
    assert.equal(pages.length, 52);
    for (const file of pages) {
      const html = readFileSync(file, 'utf8');
      assert.match(html, /<html lang="pt-BR"/);
      assert.match(html, /<title>.+<\/title>/);
      assert.match(html, /rel="canonical"/);
      assert.match(html, /name="description"/);
      assert.match(html, /<h1[\s>]/);
      for (const match of html.matchAll(/(?:href|src)="(\/cine-aurora\/[^"?#]*)/g)) {
        const path = match[1]!.replace('/cine-aurora/', '');
        assert.ok(existsSync(join('build', path)), `${file}: ${path}`);
      }
    }
    assert.ok(existsSync('build/sitemap.xml'));
    assert.ok(existsSync('build/social.png'));
  },
);
