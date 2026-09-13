// Optional tooling: npm install --no-save --package-lock=false sharp
// Requires ffmpeg and ffprobe on PATH. No artwork is generated or modified.
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const require = createRequire(import.meta.url);
const sharp = require(process.env.FLOW_PREVIEW_SHARP || 'sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'previews');
const temporary = await mkdtemp(join(tmpdir(), 'flow-preview-render-'));
const catalog = JSON.parse(await readFile(join(root, 'data/exercises.json'), 'utf8'));
const dataset = JSON.parse(await readFile(join(root, 'data/dataset.json'), 'utf8'));
const selections = [
  ['0390', 'Seated biceps curl', 'On a stability ball'],
  ['1397', 'Standing calves', 'Bodyweight'],
  ['0813', 'Triceps dip', 'Between benches'],
  ['2292', 'Rear delt raise', 'Dumbbells'],
];
const exercises = selections.map(([id]) => catalog.find(e => e.id === id));
const sequence = exercises[0].animation.sequence;
const duration = exercises[0].animation.frameDurationMs;
if (exercises.some(e => JSON.stringify(e.animation.sequence) !== JSON.stringify(sequence)
    || e.animation.frameDurationMs !== duration)) throw Error('Preview timing differs between exercises');
await mkdir(out, { recursive: true });
const bg = '#181b20';
const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
const text = (x, y, label, size = 24, color = '#f4f2ed') => `<text x="${x}" y="${y}" fill="${color}" font-family="sans-serif" font-size="${size}">${escape(label)}</text>`;
const overlay = `<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">${
  text(48, 66, '1,257 exercise animations', 48) + text(48, 111, 'FLOW / FREE SVG DATASET', 22, '#b6bdc7') +
  selections.map(([id, label, detail], i) => {
    const x = 48 + (i % 2) * 520, y = 528 + Math.floor(i / 2) * 440;
    return text(x, y, label, 26) + text(x, y + 30, `${id} / ${detail}`, 20, '#b6bdc7');
  }).join('') + text(48, 1050, 'AI-generated preview / Illustrative motion, not verified coaching', 20, '#b6bdc7')
}</svg>`;
const records = [];
for (let n = 0; n < sequence.length; n++) {
  const composites = [];
  for (let i = 0; i < exercises.length; i++) {
    const e = exercises[i];
    const sourcePath = e.animation.frames[sequence[n]];
    const source = await readFile(join(root, sourcePath));
    if (n < 3) records.push({ id: e.id, source: sourcePath, sha256: createHash('sha256').update(source).digest('hex') });
    const raster = await sharp(source).resize(400, 360, { fit: 'contain', background: bg }).flatten({ background: bg }).png().toBuffer();
    composites.push({ input: raster, left: 88 + (i % 2) * 520, top: 148 + Math.floor(i / 2) * 440 });
    const folder = join(temporary, e.id);
    await mkdir(folder, { recursive: true });
    await sharp(source).resize(480, 480, { fit: 'contain', background: bg }).flatten({ background: bg }).png().toFile(join(folder, `frame-${n}.png`));
  }
  composites.push({ input: Buffer.from(overlay), left: 0, top: 0 });
  await sharp({ create: { width: 1080, height: 1080, channels: 3, background: bg } }).composite(composites).png().toFile(join(temporary, `frame-${n}.png`));
}
function ffmpeg(args) { execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' }); }
function gif(input, output, width) {
  ffmpeg(['-framerate', `1000/${duration}`, '-i', input, '-filter_complex', `scale=${width}:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=3`, '-loop', '0', output]);
}
gif(join(temporary, 'frame-%d.png'), join(out, 'flow-exercises.gif'), 720);
for (const e of exercises) gif(join(temporary, e.id, 'frame-%d.png'), join(out, `${e.id}.gif`), 480);
await sharp(join(temporary, 'frame-1.png')).png().toFile(join(out, 'flow-exercises.png'));
ffmpeg(['-stream_loop', '-1', '-framerate', `1000/${duration}`, '-i', join(temporary, 'frame-%d.png'), '-t', String(sequence.length * duration * 15 / 1000), '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', '50', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(out, 'flow-exercises-x.mp4')]);
if (dataset.animatedExerciseCount !== 1257) throw Error('Update the preview title for the new dataset count');
await writeFile(join(out, 'sources.json'), JSON.stringify({ exerciseIds: selections.map(s => s[0]), sequence, frameDurationMs: duration, sources: records, note: 'Derived from published SVGs; no new poses, interpolation, independent cropping, or coaching review.' }, null, 2) + '\n');
console.log('Rendered four individual GIFs, one grid GIF, one poster, and a 10.8-second MP4.');
