const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const { join } = require("node:path");
const { Script, runInNewContext } = require('node:vm');

const html = readFileSync(join(__dirname, "..", "index.html"), "utf8");
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]);

test('the standalone prototype contains valid JavaScript', () => {
  assert.ok(scripts.length > 0, 'Expected inline browser JavaScript');
  for (const script of scripts) new Script(script);
});

test('the demo has selectable fictional patients and nursing records', () => {
  const fixtureScript = scripts.find(script => script.includes('window.DEMO'));
  assert.ok(fixtureScript, 'Expected the embedded demo fixture');
  const bootstrap = fixtureScript.indexOf('const D=window.DEMO');
  assert.ok(bootstrap > 0, 'Expected fixture data before the application bootstrap');
  const window = {};
  runInNewContext(fixtureScript.slice(0, bootstrap), { window }, { timeout: 500 });
  const { patients } = window.DEMO;
  assert.ok(patients.length > 1);
  assert.ok(new Set(patients.map(patient => patient.ward)).size > 1);
  assert.equal(new Set(patients.map(patient => patient.id)).size, patients.length);
  assert.ok(patients.every(patient => patient.nursing?.observations?.length));
});
