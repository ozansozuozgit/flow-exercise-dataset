# All fours squad stretch — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete.
- Keep a fixed side three-quarter camera, the same clothing and body
  proportions, and both planted hands at the same baseline in every frame.
- Keep the complete figure inside each source quadrant with a wide white gutter;
  no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted-hand left/bottom edge
  to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: neutral all-fours start, hands under shoulders and knees under hips.
- Frame 01: extend the same right leg straight back at hip height with a slightly
  bent knee and flexed foot; keep the left knee and both hands planted.
- Frame 02: keep that same leg at the same angle while lowering the pelvis for a
  controlled quadriceps stretch; do not lift the leg or twist the torso.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
