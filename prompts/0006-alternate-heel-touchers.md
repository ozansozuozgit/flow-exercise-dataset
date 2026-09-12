# Alternate heel touchers — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete.
- Use a direct overhead/front camera so the right-versus-left reach is explicit;
  keep the same clothing, proportions, planted feet, and lower-back contact.
- Keep every complete figure inside its own quadrant with a wide white gutter;
  no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted-foot right/bottom edge
  to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: supine neutral start, knees bent, both feet planted, arms reaching
  out to the sides.
- Frame 01: small right oblique crunch with the right hand reaching toward the
  right heel while the left arm stays extended.
- Frame 02: mirrored left oblique crunch with the left hand reaching toward the
  left heel while the right arm stays extended.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
