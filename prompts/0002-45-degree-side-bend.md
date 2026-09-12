# 45-degree side bend — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete.
- Keep a fixed front-facing camera, the same clothing and body proportions, and
  both feet planted at the same baseline in every frame.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted-foot edge to frame 00;
  never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: upright neutral standing start with feet shoulder-width apart and
  arms relaxed at the sides.
- Frame 01: controlled partial lateral bend with the torso long and hips level.
- Frame 02: controlled 45-degree lateral bend with no twist and no forward
  collapse.

The player returns through frame 01: `00 → 01 → 02 → 01`.
