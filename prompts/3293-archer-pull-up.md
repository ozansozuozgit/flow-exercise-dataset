# Archer pull-up — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  hanging from one unbranded horizontal pull-up bar.
- Use a vector-friendly flat silhouette: the entire athlete and bar are uniform
  dark charcoal with only restrained warm-white contour details.
- Keep the same bar, grip spacing, clothing, torso, crossed feet, and camera in
  every frame; no second bar or equipment may appear.
- Keep every complete figure and the full bar inside its own quadrant with a
  wide white gutter.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted bar right/bottom edge to
  frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: dead hang with both arms straight and an overhand grip.
- Frame 01: left archer pull-up, left elbow bent with chin above the bar while
  the right arm remains fully straight.
- Frame 02: right archer pull-up, right elbow bent with chin above the bar while
  the left arm remains fully straight.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
