# Arms apart circular toe touch — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete
  standing in a consistent side three-quarter view.
- Keep the same clothing, camera, scale, straight-knee form, and full-body
  margins in every frame; no limb may cross a quadrant boundary.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the center/bottom body anchor to
  frame 00 because the planted side alternates between repetitions.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: upright stance, feet shoulder-width, both arms extended sideways.
- Frame 01: hinge forward with straight legs; right hand reaches toward the
  toes while the left leg lifts straight behind and the right foot stays planted.
- Frame 02: mirrored hinge; left hand reaches toward the toes while the right leg
  lifts straight behind and the left foot stays planted.
- Frame 03: repeat the frame-01 transition for the return path.

The player uses the three unique frames and returns through frame 01:
`00 → 01 → 02 → 01`.
