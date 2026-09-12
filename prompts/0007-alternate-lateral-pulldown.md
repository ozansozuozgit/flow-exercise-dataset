# Alternate lateral pulldown — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  seated on a simple, unbranded cable machine.
- Keep the same machine frame, overhead pulleys, cables, handles, bench, feet,
  and planted hips in every frame; no cable or equipment may cross a quadrant.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted bench/foot right/bottom
  edge to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: upright seated start, feet flat, both arms overhead holding both
  handles with elbows extended.
- Frame 01: pull the left handle toward the left side of the chest while the
  right arm stays overhead; keep the torso stable.
- Frame 02: pull the right handle toward the right side of the chest while the
  left arm stays overhead; keep the torso stable.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
