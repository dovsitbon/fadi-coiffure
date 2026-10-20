// Compile Tailwind (base + utilities séparés) et l'injecte dans index.html.
// Usage : npm run build:css
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'tw-'));
const run = (name, input) => {
  const i = join(dir, name + '.in.css'), o = join(dir, name + '.css');
  writeFileSync(i, input);
  execSync(`npx --yes tailwindcss@3.4.16 -c tailwind.config.js -i "${i}" -o "${o}" --minify`, { stdio: 'inherit' });
  return readFileSync(o, 'utf8').trim();
};
const base = run('base', '@tailwind base;');
const utils = run('utils', '@tailwind components;@tailwind utilities;');

let html = readFileSync('index.html', 'utf8');
const inject = (id, css) => {
  const re = new RegExp('(<style id="' + id + '">)[^<]*(</style>)');
  if (!re.test(html)) throw new Error('missing <style id="' + id + '">');
  html = html.replace(re, (_, a, b) => a + css + b);
};
inject('tw-base', base);
inject('tw-utils', utils);
writeFileSync('index.html', html);
console.log(`tw-base ${base.length} B, tw-utils ${utils.length} B`);
