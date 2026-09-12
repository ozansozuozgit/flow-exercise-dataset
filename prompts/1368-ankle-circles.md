# Ankle circles — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  seated on the floor in a consistent front three-quarter view.
- Keep the pelvis, hands, left leg, right knee, clothing, and body proportions
  stable in every frame; only the right ankle and foot rotate.
- Keep every complete figure inside its own quadrant with a wide white gutter;
  no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted seated right/bottom edge
  to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: seated support position, both legs extended, right foot lifted
  slightly and neutral.
- Frame 01: right ankle rotated inward as one point on a clockwise circle.
- Frame 02: right ankle rotated outward as the opposite point of the circle;
  keep the knee and hip fixed.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
