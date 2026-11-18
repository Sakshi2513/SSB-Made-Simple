# AI image prompts for the task pages

Save each image in `public/tasks/` using the exact file name shown (`.webp`, `.jpg` or `.png`). The pages pick them up automatically. If a file is missing, the page shows the built-in illustration instead.

**Size:** 1600 x 1000 px (16:10). **Style prefix** (paste before every prompt):

> Photorealistic, cinematic documentary photograph, natural daylight, shallow depth of field, ultra-detailed, 16:10 landscape. Young Indian men and women aged 20 to 25 in plain sports clothes with chest numbers, determined and focused expressions. No text, no logos, no watermark, no captions.

Negative prompt (if supported): `text, letters, watermark, logo, cartoon, illustration, distorted faces, extra fingers, low quality, blur`

## Main tasks

| File name | Subject (add after the style prefix) |
|---|---|
| `oir.webp` | A candidate sitting at a desk in a quiet examination hall, focused on a reasoning question paper with a pencil, other candidates blurred in the background. |
| `ppdt.webp` | A hazy black and white picture projected on a screen in a dim hall, with candidates in the foreground looking at it and writing notes. |
| `tat.webp` | A candidate writing a story on a sheet of paper in a dim examination hall, a projected picture glowing softly on the screen behind. |
| `wat.webp` | A candidate quickly writing a sentence on an answer sheet, a single word glowing on a projector screen in the background. |
| `srt.webp` | A candidate writing quickly in a booklet at a desk in an examination hall, with a clock visible on the wall behind. |
| `sdt.webp` | A candidate sitting calmly with a notebook, writing thoughtfully about himself, warm soft light from a window. |
| `gto.webp` | A group of candidates working together outdoors on a military obstacle ground, lifting a long wooden plank over a low obstacle. |
| `personal-interview.webp` | A candidate in neat formal clothes sitting across a table from an interviewing officer in an office, a file on the table, calm professional atmosphere. |

## GTO tasks

| File name | Subject (add after the style prefix) |
|---|---|
| `group-discussion.webp` | A group of eight candidates seated in a circle on chairs in a large hall, one candidate speaking and gesturing while the others listen attentively. |
| `group-planning-exercise.webp` | Candidates gathered around a table-top scale model of a village with small buildings, roads and a river, pointing at it and discussing a plan. |
| `progressive-group-task.webp` | A group of candidates on an outdoor obstacle ground carrying a wooden plank and a rope across a steel frame obstacle, teamwork in action. |
| `half-group-task.webp` | A small group of four candidates crossing an outdoor steel obstacle with a plank and a rope, one candidate giving directions. |
| `lecturette.webp` | A candidate standing and giving a confident short speech in front of a seated group of candidates and an assessing officer, in an outdoor shaded area. |
| `individual-obstacles.webp` | A candidate mid-jump over a high wooden wall obstacle on an outdoor military obstacle course, dust in the air, intense effort. |
| `command-task.webp` | A candidate acting as commander pointing and giving instructions to two teammates beside an outdoor obstacle with a plank and drums. |
| `snake-race.webp` | Teams of candidates racing across an outdoor obstacle course carrying a long rolled-up canvas tent together, running side by side. |
| `final-group-task.webp` | The whole group of candidates working together to move a heavy load over a tall outdoor obstacle at the end of the day, tired but determined. |

## Tips
- If a person looks odd, regenerate. Faces and hands are the common issues.
- Keep the main subject in the centre, because the hero crops the image slightly on small screens.
- Compress each image to under about 300 KB (WebP works well).
