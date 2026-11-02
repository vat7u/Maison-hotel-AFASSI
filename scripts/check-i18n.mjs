// Runs before `next build` (`prebuild`) and as `npm run check:i18n`. TypeScript already checks that
// every language file has the keys of fr.json. This script checks what types cannot: array lengths,
// {placeholders}, empty strings, the confirmation sentences, leftover Arabic and search-result lengths.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/messages';
const BASE = 'fr';
const ARABIC = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/u;
const LIMITS = { title: 65, description: 160 };
const SEARCH_KEYS = ['homeTitle', 'homeDescription', 'aboutTitle', 'aboutDescription', 'journalTitle', 'journalDescription'];

const files = readdirSync(DIR).filter(name => name.endsWith('.json'));
const messages = Object.fromEntries(files.map(name => [name.replace('.json', ''), JSON.parse(readFileSync(join(DIR, name), 'utf8'))]));
const problems = [];
const fail = (lang, key, text) => problems.push(`${lang}: ${key || '(file)'} — ${text}`);

const placeholders = text => (text.match(/\{\w+\}/g) ?? []).sort().join(' ');

function compare(lang, key, base, value) {
  if (Array.isArray(base)) {
    if (!Array.isArray(value)) return fail(lang, key, 'should be a list');
    if (value.length !== base.length) fail(lang, key, `has ${value.length} items, ${BASE} has ${base.length}`);
    base.forEach((item, i) => compare(lang, `${key}[${i}]`, item, value[i]));
  } else if (base !== null && typeof base === 'object') {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) return fail(lang, key, 'should be an object');
    for (const name of Object.keys(base)) {
      const path = key ? `${key}.${name}` : name;
      if (!(name in value)) fail(lang, path, 'missing');
      else compare(lang, path, base[name], value[name]);
    }
    for (const name of Object.keys(value)) {
      if (!(name in base)) fail(lang, key ? `${key}.${name}` : name, `not in ${BASE}.json`);
    }
  } else if (typeof value !== 'string') {
    fail(lang, key, 'should be text');
  } else {
    if (value.trim() === '') fail(lang, key, 'is empty');
    if (placeholders(value) !== placeholders(base)) {
      fail(lang, key, `placeholders [${placeholders(value)}] differ from ${BASE} [${placeholders(base)}]`);
    }
    if (ARABIC.test(value)) fail(lang, key, 'contains Arabic characters');
  }
}

if (!messages[BASE]) {
  console.error(`check-i18n: ${DIR}/${BASE}.json not found`);
  process.exit(1);
}

for (const [lang, data] of Object.entries(messages)) {
  if (lang !== BASE) compare(lang, '', messages[BASE], data);
  for (const key of ['dialogOne', 'dialogMany']) {
    const sentence = data.booking?.[key];
    const count = typeof sentence === 'string' ? sentence.split('{rooms}').length - 1 : 0;
    if (count !== 1) fail(lang, `booking.${key}`, `must hold {rooms} once, holds it ${count} times`);
  }
  for (const key of SEARCH_KEYS) {
    const text = data.meta?.[key];
    if (typeof text !== 'string') continue;
    const limit = key.endsWith('Title') ? LIMITS.title : LIMITS.description;
    if (text.length > limit) fail(lang, `meta.${key}`, `is ${text.length} characters, the limit is ${limit}`);
  }
}

if (problems.length > 0) {
  console.error(`check-i18n: ${problems.length} problem${problems.length === 1 ? '' : 's'}\n${problems.map(p => `  ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`check-i18n: ${Object.keys(messages).join(', ')} match ${BASE}.json`);
