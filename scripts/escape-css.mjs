// Runs after `next build`. The minifier turns the icon font's "\e04e" escapes into raw characters
// and the CSS declares no encoding, so a host that sends plain text/css can get the icons garbled.
// Writing every non-ASCII character back as a CSS escape makes the files safe on any host.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function cssFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return cssFiles(path);
    return entry.name.endsWith('.css') ? [path] : [];
  });
}

let escaped = 0;
for (const file of cssFiles('out/_next/static')) {
  const css = readFileSync(file, 'utf8');
  const safe = css.replace(/[^\x00-\x7f]/gu, char => {
    escaped += 1;
    return `\\${char.codePointAt(0).toString(16)} `; // the space ends the escape
  });
  writeFileSync(file, safe);
}
console.log(`escape-css: ${escaped} characters escaped`);
