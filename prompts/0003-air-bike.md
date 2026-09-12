# Air bike — clean-room source brief

## Invariants

- Generate one original, source-free 2 × 2 pose sheet with one adult athlete.
- Use a fixed side-facing camera, the same clothing and body proportions, and
  the same planted lower-back/hip contact in every frame.
- Use a flat pure-white source field that is deterministically converted into a
  transparent, warm-white SVG silhouette. The generated bitmap is not shipped.
- Preserve a single locked canvas and align the planted lower-back/hip edge to
  frame 00; never independently centre or resize an animation frame.
- Do not use input images, legacy Flow media, external artwork, text, arrows,
  logos, shadows, glows, watermarks, or a gym environment.

## Frames

- Frame 00: supine start, both hands behind the head, one knee bent and the
  opposite leg extended, elbows open.
- Frame 01: controlled crunch transition toward the bent knee while the
  extended leg stays long and low.
- Frame 02: controlled opposite-side crunch with the torso rotated toward the
  opposite knee and the extended leg still long and low.

The player returns through frame 01: `00 → 01 → 02 → 01`.
