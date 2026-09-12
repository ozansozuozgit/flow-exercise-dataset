# Flow Exercise Dataset

Free exercise data with custom SVG animation frames. Built for developers who
want a downloadable, self-hostable starting point for exercise interfaces.

**Preview release:** 1,324 exercise records · 1,257 custom animations · 67
instructions-only exercises · 3,771 SVG frames (about 44 MB).

This is a work-in-progress library, not professionally verified exercise
coaching. Read [sources and limitations](NOTICE.md) before shipping it.

## Download and use

Clone this repository or use GitHub's **Code → Download ZIP**. No account,
API key, subscription, or usage quota is required to use the downloaded files.

```sh
git clone https://github.com/ozansozuozgit/flow-exercise-dataset.git
cd flow-exercise-dataset
npm test
```

The validator needs Node.js 22 or newer and has no package dependencies.

```js
import { readFileSync } from 'node:fs';

const exercises = JSON.parse(readFileSync('data/exercises.json', 'utf8'));
const exercise = exercises.find(e => e.id === '0001');
console.log(exercise.name, exercise.instructions);

// Relative asset paths, ready to copy into your application's static folder.
if (exercise.animation) {
  const { frames, sequence, frameDurationMs } = exercise.animation;
  console.log(sequence.map(index => frames[index]), frameDurationMs);
}
```

## Files and schema

| Path | Contents |
| --- | --- |
| `data/exercises.json` | All 1,324 exercise records |
| `data/dataset.json` | Counts, schema version, source information |
| `data/checksums.json` | SHA-256 for every SVG |
| `assets/<id>/frame-0{0,1,2}.svg` | Three frames per custom animation |
| `provenance/<id>.json` | Hashes and honest prompt-evidence status |
| `prompts/` | The 13 retained original prompts |
| `scripts/validate.mjs` | Dependency-free integrity checks |

IDs are four-character strings; preserve leading zeros. Each record contains
`name`, `bodyPart`, `equipment`, `target`, `secondaryMuscles`,
`movementPattern`, `instructions`, `dataLicense`, `mediaStatus`, and `animation`.
`animation` is null when `mediaStatus` is `instructions-only`; do not load a
legacy GIF or substitute an unrelated illustration.

For custom artwork, `animation` contains three `frames`, a playback `sequence`
of `[0, 1, 2, 1]`, a per-frame `frameDurationMs`, `license`, and `provenance` path.
Swap whole SVG images at the stated interval; the individual SVG files are
static. Preload the frames to avoid flicker. Pause when hidden, expose a pause
control, and show the first frame for reduced-motion users.

The SVGs are transparent warm-white silhouettes (`#F4F2ED`), so use a dark
background or tint them deliberately. Preserve each SVG's viewBox and use
contain sizing; do not independently crop or recenter its frames. Animation
timing is illustrative, not an exercise prescription. Blank historical GIF
previews are not included.

## Free means free

- **Data and code:** MIT, with the upstream attribution preserved.
- **Custom artwork:** CC0-1.0 dedication, to the extent of rights held; see
  [ARTWORK-LICENSE](ARTWORK-LICENSE) and [NOTICE.md](NOTICE.md).
- Personal and commercial self-hosted use has no usage-based fee. Follow the
  applicable notices; no third-party rights clearance is promised.

A hosted API may be offered separately in the future, with a free allowance
and paid higher-volume access. There is no hosted API, billing, or promised
quota today. A future hosting service would not add quotas to these downloads.

## Quality and contributions

Only 13 original prompts survive for 1,257 animations. The missing 1,244 are
explicitly marked, not reconstructed. We do not claim independently proven
clean-room origin, professional form review, or blanket legal clearance.

`npm test` verifies record coverage, frame paths, hashes, and basic vector-only
content. It does not prove that an animation correctly teaches an exercise.
Please open an issue with the exercise ID for naming, setup, form, equipment,
accessibility, or provenance concerns. Description improvements should include
their source and any unresolved ambiguity. New artwork is not being generated
as part of this release.
