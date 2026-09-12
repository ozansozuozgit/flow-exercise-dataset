# Arms overhead full sit-up — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  on a flat floor in a consistent side three-quarter view.
- Keep the same clothing, planted feet, knee angle, camera, scale, and floor
  contact in every frame; no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted-foot right/bottom edge
  to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: supine start, knees bent, both feet flat, arms straight overhead.
- Frame 01: controlled half sit-up with the torso curling forward and arms
  reaching toward the knees.
- Frame 02: full sit-up with torso upright and arms straight overhead; feet and
  knees remain fixed.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
