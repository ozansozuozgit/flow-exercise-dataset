import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const rows = read('data/exercises.json');
const metadata = read('data/dataset.json');
const sums = read('data/checksums.json');
const ids = new Set();
const used = new Set();
let animated = 0, retained = 0;
for (const e of rows) {
  assert.match(e.id, /^\d{4}$/);
  assert(!ids.has(e.id), `duplicate ID ${e.id}`); ids.add(e.id);
  assert(e.name && e.instructions.length && e.instructions.every(s => typeof s === 'string' && s.trim()));
  assert(!('image' in e) && !('gif' in e) && !('description' in e));
  assert.equal(e.dataLicense, 'MIT');
  if (!e.animation) { assert.equal(e.mediaStatus, 'instructions-only'); continue; }
  animated++;
  assert.equal(e.mediaStatus, 'custom-svg');
  const a = e.animation;
  assert.equal(a.license, 'CC0-1.0');
  assert(a.frameDurationMs > 0 && Number.isFinite(a.frameDurationMs));
  assert.deepEqual(a.sequence, [0, 1, 2, 1]);
  assert.equal(a.frames.length, 3);
  assert.equal(a.provenance, `provenance/${e.id}.json`);
  const p = read(a.provenance);
  assert.equal(p.exerciseId, e.id);
  if (p.promptEvidence.status === 'retained') {
    assert(p.promptEvidence.path.startsWith(`prompts/${e.id}-`) && !p.promptEvidence.path.includes('..'));
    assert(fs.statSync(path.join(root, p.promptEvidence.path)).size > 0); retained++;
  } else { assert.equal(p.promptEvidence.status, 'not-retained'); assert.equal(p.promptEvidence.path, null); }
  a.frames.forEach((f, i) => {
    assert.equal(f, `assets/${e.id}/frame-0${i}.svg`);
    assert(!used.has(f)); used.add(f);
    const bytes = fs.readFileSync(path.join(root, f));
    const hash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(hash, sums[f], f);
    assert.equal(hash, p.frames[i].sha256, f);
    assert.equal(p.frames[i].path, f);
    const svg = bytes.toString('utf8');
    assert(/<svg[\s>]/.test(svg) && /<path\b[^>]*\bd=["'][^"']+/.test(svg), f);
    assert(!/<(?:script|image|foreignObject)\b|\bon\w+\s*=|(?:href|xlink:href)\s*=|data:image\//i.test(svg), `non-vector or active SVG ${f}`);
  });
}
assert.equal(rows.length, metadata.exerciseCount);
assert.equal(animated, metadata.animatedExerciseCount);
assert.equal(rows.length - animated, metadata.instructionsOnlyCount);
assert.equal(used.size, metadata.svgFrameCount);
assert.equal(Object.keys(sums).length, used.size);
assert.equal(retained, metadata.retainedPromptCount);
const assetFiles = fs.readdirSync(path.join(root, 'assets'), { recursive: true }).filter(f => fs.statSync(path.join(root, 'assets', f)).isFile());
assert.equal(assetFiles.length, used.size);
assert(assetFiles.every(f => used.has(`assets/${f}`)));
console.log(`PASS: ${rows.length} unique exercises; ${animated} animations; ${rows.length - animated} instructions-only; ${used.size} SVG hashes; ${retained} retained prompts.`);
console.log('Technical integrity only: not a visual, biomechanical, medical, or legal clearance review.');
