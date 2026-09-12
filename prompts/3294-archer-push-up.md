# Archer push-up — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  on a flat floor and no equipment.
- Use a clear front three-quarter camera so left and right hands are explicit;
  keep the same clothing, feet, hips, camera, scale, and floor contact.
- Keep every complete figure inside its own quadrant with a wide white gutter;
  no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted-feet right/bottom edge
  to frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: high plank with both palms planted wide and feet together.
- Frame 01: left-side archer push-up with the left arm straight and reaching
  far left while the right elbow bends beneath the chest.
- Frame 02: mirrored right-side archer push-up with the right arm straight and
  reaching far right while the left elbow bends beneath the chest.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
