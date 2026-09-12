# Arm slingers hanging bent knee legs — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  hanging from one single unbranded horizontal pull-up bar.
- Keep the same bar, grip spacing, clothing, torso, hip position, and camera in
  every frame; no equipment may cross a quadrant boundary.
- Keep every complete figure and the full bar inside its own quadrant with a
  wide white gutter.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted bar right/bottom edge to
  frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: dead hang with arms fully extended and knees bent at roughly 90°.
- Frame 01: controlled bent-knee raise toward the chest while the arms stay
  straight and the bar/hand spacing stay fixed.
- Frame 02: peak raise with the knees close to the elbows/chest and the torso
  stable; do not turn it into a pull-up or leg swing.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
