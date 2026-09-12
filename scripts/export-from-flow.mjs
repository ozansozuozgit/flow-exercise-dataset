// Exports an explicit allowlist; never copies the app or its Git history.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(process.argv[2] ?? '');
assert(process.argv[2], 'Usage: node scripts/export-from-flow.mjs /path/to/flow');
const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const write = (p, value) => {
  const file = path.join(output, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
};
for (const dir of ['data', 'assets', 'provenance', 'prompts']) {
  assert(!fs.existsSync(path.join(output, dir)), `Refusing to overwrite ${dir}`);
}
const catalog = read('src/data/exercises.json');
const media = read('data/custom-exercises/exercises.json');
const byId = new Map(media.map(e => [e.id, e]));
assert.equal(byId.size, media.length);
assert.equal(new Set(catalog.map(e => e.id)).size, catalog.length);
assert(media.every(e => catalog.some(c => c.id === e.id)));
const evidence = new Map(fs.readdirSync(path.join(root, 'data/custom-exercises/provenance'))
  .filter(f => f.endsWith('.json')).map(f => {
    const p = read(`data/custom-exercises/provenance/${f}`);
    return [p.exerciseId, p];
  }));
const prompts = fs.readdirSync(path.join(root, 'data/custom-exercises/prompts')).filter(f => f.endsWith('.md'));
const checksums = {};
const records = catalog.map(e => {
  assert.match(e.id, /^\d{4}$/);
  const m = byId.get(e.id);
  let animation = null;
  if (m) {
    const p = evidence.get(e.id);
    assert(p, `${e.id}: missing provenance`);
    assert.deepEqual(m.frames, ['frame-00.svg', 'frame-01.svg', 'frame-02.svg']);
    const frames = m.frames.map((f, index) => {
      const relative = `assets/${e.id}/${f}`;
      const bytes = fs.readFileSync(path.join(root, 'assets/custom-exercises', e.id, 'svg', f));
      const accepted = p.acceptedFrames[index];
      assert.equal(accepted.svg, f);
      assert.equal(accepted.svgSha256, sha(bytes), `${e.id}/${f}: changed frame`);
      fs.mkdirSync(path.dirname(path.join(output, relative)), { recursive: true });
      fs.writeFileSync(path.join(output, relative), bytes, { flag: 'wx' });
      checksums[relative] = sha(bytes);
      return relative;
    });
    const retained = prompts.filter(f => f.startsWith(`${e.id}-`));
    assert(retained.length <= 1);
    const prompt = retained[0] ? `prompts/${retained[0]}` : null;
    if (prompt) {
      fs.mkdirSync(path.join(output, 'prompts'), { recursive: true });
      fs.copyFileSync(path.join(root, 'data/custom-exercises', prompt), path.join(output, prompt), fs.constants.COPYFILE_EXCL);
    }
    write(`provenance/${e.id}.json`, {
      exerciseId: e.id,
      artworkLicense: 'CC0-1.0',
      generatorReported: p.generator ?? 'not-recorded',
      promptEvidence: { status: prompt ? 'retained' : 'not-retained', path: prompt },
      referencesRecorded: p.sourceReferences ?? [],
      provenanceNotice: 'Historical generation metadata, not independent proof of clean-room origin or third-party clearance. Empty references mean none recorded. No professional form review is asserted.',
      frames: frames.map((file, i) => ({ path: file, sha256: checksums[file], sourceMasterSha256: p.candidateFrames[i].masterSha256 })),
    });
    animation = { frames, sequence: [0, 1, 2, 1], frameDurationMs: m.frameDurationMs, license: 'CC0-1.0', provenance: `provenance/${e.id}.json` };
  }
  return {
    id: e.id, name: e.name, bodyPart: e.bodyPart, equipment: e.equipment,
    target: e.target, secondaryMuscles: e.secondaryMuscles,
    movementPattern: e.pattern, instructions: e.steps,
    dataLicense: 'MIT', mediaStatus: animation ? 'custom-svg' : 'instructions-only', animation,
  };
});
write('data/exercises.json', records);
write('data/checksums.json', checksums);
write('data/dataset.json', {
  schemaVersion: 1, releaseStage: 'preview', exerciseCount: records.length,
  animatedExerciseCount: media.length, instructionsOnlyCount: records.length - media.length,
  svgFrameCount: Object.keys(checksums).length, retainedPromptCount: prompts.length,
  descriptionStatus: 'Not included in base catalog; AI drafts, when available, are separate and unreviewed.',
  upstream: { url: 'https://github.com/hasaneyldrm/exercises-dataset', license: 'MIT', scope: 'Exercise metadata and instruction text only; no upstream media is distributed.' },
});
console.log(`Exported ${records.length} records and ${Object.keys(checksums).length} SVG frames.`);
