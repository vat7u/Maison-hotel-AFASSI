// Runs after `escape-css` (`postbuild`). Reads the built pages in out/<lang>/ with plain string and
// regular-expression checks, and fails the build if the language setup in the HTML is wrong:
// folders, <html lang>, canonical, hreflang, titles and descriptions, and unfilled {placeholders}.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const LANGS = ['fr', 'en', 'es', 'de'];
const OUT = 'out';
const problems = [];
const fail = (page, text) => problems.push(`${page} — ${text}`);

function pages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return pages(path);
    return entry.name === 'index.html' ? [path] : [];
  });
}

const attr = (html, pattern) => html.match(pattern)?.[1];
const decode = text => text.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

if (!existsSync(OUT)) {
  console.error(`check-output: ${OUT}/ not found; run it after next build`);
  process.exit(1);
}

for (const lang of LANGS) {
  if (!existsSync(join(OUT, lang))) fail(`${OUT}/${lang}`, 'folder is missing');
}
if (existsSync(join(OUT, 'ar'))) fail(`${OUT}/ar`, 'folder should not exist: Arabic was removed');

// path after the language -> language -> { title, description }
const texts = new Map();

for (const lang of LANGS.filter(l => existsSync(join(OUT, l)))) {
  for (const file of pages(join(OUT, lang))) {
    const page = relative(OUT, file).replace(/\\/g, '/');
    const path = '/' + relative(join(OUT, lang), file).replace(/\\/g, '/').replace(/index\.html$/, '');
    const journal = path.startsWith('/journal/');
    const article = journal && path !== '/journal/';
    const html = readFileSync(file, 'utf8');

    if (attr(html, /<html[^>]*\blang="([^"]*)"/) !== lang) fail(page, `<html lang> is not "${lang}"`);

    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
    const expected = `/${journal ? 'fr' : lang}${path}`;
    if (!canonical || new URL(canonical).pathname !== expected) fail(page, `canonical is ${canonical}, expected ${expected}`);

    const alternates = new Set([...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)"/gi)].map(m => m[1]));
    if (journal) {
      if (alternates.size > 0) fail(page, 'journal page should have no hreflang');
    } else {
      for (const code of [...LANGS, 'x-default']) {
        if (!alternates.has(code)) fail(page, `hreflang "${code}" is missing`);
      }
    }

    const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
    const placeholder = body.match(/\{\w+\}/);
    if (placeholder) fail(page, `shows an unfilled placeholder ${placeholder[0]}`);

    if (!article) {
      const title = attr(html, /<title>([^<]*)<\/title>/);
      const description = attr(html, /<meta name="description" content="([^"]*)"/);
      if (!title || !description) fail(page, 'title or description is missing');
      else {
        if (!texts.has(path)) texts.set(path, {});
        texts.get(path)[lang] = { title: decode(title), description: decode(description), page };
      }
    }
  }
}

// Titles and descriptions must differ between languages for the same page, and between home and About.
const seen = (key, entries) => {
  const first = new Map();
  for (const { text, page } of entries) {
    if (first.has(text)) fail(page, `${key} is the same as in ${first.get(text)}`);
    else first.set(text, page);
  }
};
for (const byLang of texts.values()) {
  for (const key of ['title', 'description']) {
    seen(key, Object.values(byLang).map(entry => ({ text: entry[key], page: entry.page })));
  }
}
for (const lang of LANGS) {
  for (const key of ['title', 'description']) {
    seen(key, ['/', '/a-propos/'].map(path => texts.get(path)?.[lang]).filter(Boolean).map(entry => ({ text: entry[key], page: entry.page })));
  }
}

if (problems.length > 0) {
  console.error(`check-output: ${problems.length} problem${problems.length === 1 ? '' : 's'}\n${problems.map(p => `  ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`check-output: ${LANGS.join(', ')} pages in ${OUT}/ are consistent`);
