# Sources, licenses, and limitations

## Exercise data and instructions — MIT

Exercise IDs, names, equipment, body parts, targets, supporting muscles, and
instructions derive from [Hasan Emir Yıldırım's exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset).
Copyright (c) 2026 Hasan Emir Yıldırım. The upstream MIT copyright and permission
notice is preserved in LICENSE. The upstream license explicitly separates
instruction text/data from media:
https://github.com/hasaneyldrm/exercises-dataset/blob/main/LICENSE

No upstream Gym visual thumbnails, GIFs, videos, or attribution-bearing media
are included. That upstream media has separate restrictions; downloading this
repository does not give permission to use it.

Flow adds a coarse movement-pattern classification and a custom media mapping.
The inherited `muscleGroup` field is deliberately omitted: Flow's import often
derived it from a secondary muscle, so it is not a reliable primary-muscle label.
The exported `target` and `secondaryMuscles` remain upstream-derived and have
not received a full professional review.

## Custom artwork — CC0-1.0 dedication, limited evidence

The 1,257 custom frame sets have historical records declaring CC0-1.0.
Generation metadata reports OpenAI Image Gen followed by silhouette processing
and SVG vectorization. Only 13 original prompt files remain; 1,244 are not
retained. Each exported provenance record states its actual prompt status.

An empty references list means that no reference was recorded, not that a
complete clean-room generation trail has been verified. Retained prompt text
records intended constraints, not proof that generation followed them. SVG
hashes establish file integrity, not authorship, exercise correctness, or legal
clearance. Historical acceptance/reviewer labels are not exported as independent
certification. PNG master hashes are retained for correlation; the masters
themselves are not part of this lightweight distribution.

ARTWORK-LICENSE dedicates only rights Flow can legally dedicate. It is not a
guarantee that every output is copyrightable, unique, or cleared of third-party
rights. This is an openly documented preview, not a professionally certified
exercise library. Please report concerns with the exercise ID and frame name.

## Intended use and review

The frames are stylized illustrations. They may omit equipment, misrepresent
variants, or show imperfect form. Text can contain inherited inaccuracies.
Review both text and artwork before using them for instruction. The frame
timing is a display setting, not a prescribed exercise tempo.

AI description drafts, if supplied in a separate drafts/ directory, are not
approved coaching content. They must not silently replace the base instructions.

Historical GIF previews are deliberately excluded because some were blank.
This repository also excludes the Flow app, configuration, user data, credentials,
and private Git history.
