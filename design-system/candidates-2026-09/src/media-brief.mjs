// What media.mjs generates: one key visual per demo (a shared still-life series), one
// atmosphere plate per candidate, three logo candidates. Costs (higgsfield generate cost,
// 2026-09-13): gpt_image_2_5 high/2k 3, soul_location 0.12, nano_banana_flash 1.5,
// z_image 0.15, recraft_v4_1 vector 1k 2.5 credits.

// The Higgsfield plus trial only accepts Higgsfield's own models through the MCP (2026-09-13):
// soul_location and soul_cinematic run; gpt_image_2_5, nano_banana_2 and recraft_v4_1 answer
// only_mcp_usage_on_trial_is_available. Key visuals therefore use Soul Cinema; switch `key` back to
// gpt_image_2_5 (quality high, resolution 2k) once the account is off the trial, and regenerate with --force.
export const models = {
  key: { model: 'soul_cinematic', params: { aspect_ratio: '16:9', quality: '2k' } },
  plate: { model: 'soul_location', params: { aspect_ratio: '16:9' } },
  logo: { model: 'recraft_v4_1', params: { model_type: 'vector', aspect_ratio: '1:1', resolution: '1k' } },
};
export const fallbacks = { key: ['nano_banana_flash', 'nano_banana_2_lite'], plate: ['z_image'] };
export const cutOrder = ['plate-swiss-ledger', 'plate-blueprint', 'plate-monolith'];

// Written at the palette checkpoint: { "colors": ["#RRGGBB", ...], "background": "#RRGGBB" }
export const logoColorsFile = 'brandkit/logo-colors.json';

export const series =
  'Abstract editorial key visual, one still-life composition of simple geometric objects on a seamless studio ground, soft diffused light, subtle paper grain, matte materials, restrained palette: warm off-white, graphite, and one accent colour. Centred subject, generous negative space, 35mm lens, tack-sharp. Uninhabited scene, no text, no letters, no logos, no screens, no user interface.';

const key = (slug, subject) => ({ id: `kv-${slug}`, kind: 'key', ground: null, prompt: `${series} Subject: ${subject}` });
const plate = (slug, ground, prompt, extra = {}) => ({ id: `plate-${slug}`, kind: 'plate', ground, prompt, ...extra });
const logo = (n, prompt) => ({ id: `logo-${n}`, kind: 'logo', ground: null, prompt });

export const assets = [
  key('pos', 'a tidy grid of small matte boxes on a low shelf, one box lifted and tilted, a thin amber ribbon threading the shelf rows like an aisle, a single round amber token in front. Accent colour: warm amber.'),
  key('besttrend', 'three simple house-shaped blocks of different heights on a shallow map-like plane with faint contour lines, a single cyan pin standing beside the tallest block, a folded paper card leaning at its base. Accent colour: cyan.'),
  key('besttrend-api', 'two identical stacks of rounded slabs mirrored across a thin vertical rod, joined by one taut teal cord passing through a small ring; one slab in each stack is a hollow frame. Accent colour: teal.'),
  key('invoice', 'a neat fan of blank paper sheets with a violet stripe along one edge, a small brass paper clip, and a row of three coins descending in size; one sheet lifted by a corner casting a soft shadow. Accent colour: violet.'),
  key('findjob', 'a matte sphere resting in the exact notch of a wave-shaped block, a scattering of smaller graphite spheres nearby, one of them magenta and aligned with a thin magenta line pointing to the notch. Accent colour: magenta.'),
  key('tireshop', 'a stack of four black rubber-textured rings leaning against a rounded block, one ring rolled forward, a small red wedge standing upright, tread hinted by fine grooves. Accent colour: red.'),
  key('timezone', 'three thin discs standing on edge at different rotations like clock faces without numerals, each with a single cobalt hand, their cast shadows overlapping on the ground to suggest offsets, a slender horizon line behind. Accent colour: cobalt blue.'),

  plate('signal-index', 'light', 'Macro photograph of a sheet of uncoated cream paper stock under raking window light, faint laid-paper texture, the soft shadow of a window mullion crossing diagonally, one thin cobalt pencil rule near the bottom edge, neutral warm tones, low contrast, tack-sharp grain, uninhabited, no text.'),
  plate('control-room', 'dark', 'Abstract telemetry backdrop: a fine dot-matrix grid on charcoal, faint concentric radar rings fading outward from the lower left, two thin horizontal scan lines, a soft cool blue-grey glow at that corner, subtle film grain, flat and even, no bright highlights, uninhabited, no text.', { model: 'soul_cinematic', params: { aspect_ratio: '16:9', quality: '2k' } }),
  plate('swiss-ledger', 'light', 'Overhead photograph of a blank white sheet of layout paper on a bright light table, faint light-grey grid lines, one corner slightly lifted with a crisp soft shadow, pure neutral greys, extremely minimal, even light, uninhabited, no text.'),
  plate('gallery-wall', 'light', 'Photograph of a white gallery wall lit from above by a soft skylight, gentle top-to-bottom light gradient, faint plaster texture, one thin picture rail along the top edge, the shadow of an unseen frame\'s corner at the right, neutral, minimal, uninhabited, no text.'),
  plate('reel', 'dark', 'Cinematic atmosphere plate: a dark stage filled with thin haze, one soft horizontal anamorphic light streak in warm amber crossing the frame, gentle falloff into deep navy shadows, fine film grain, wide composition, no objects, uninhabited, no text.'),
  plate('chapters', 'light', 'Neutral light-grey seamless studio backdrop with a soft gradient from a top light, faint woven fabric texture, a single shallow fold line running vertically at one third, calm and even, uninhabited, no text.'),
  plate('blueprint', 'light', 'Flat scan of lightly aged drafting vellum, faint fibre texture, two subtle fold creases forming a soft cross, a slight warm-grey tone lighter at the centre, even light, no marks, uninhabited, no text.'),
  plate('broadsheet', null, 'Black-and-white press photograph with visible halftone grain: a bright industrial laundry hall, rows of tall wire linen carts receding in perspective, a handheld reader resting on a folded stack of white towels in the foreground, hard daylight from high windows, documentary style, uninhabited, no text, no logos.'),
  plate('atelier', 'light', 'Soft-focus photograph of raw linen canvas in warm cream light, fine visible weave, a gentle vignette toward the edges, a faint brass-toned reflection at the lower right, extremely quiet, uninhabited, no text.'),
  plate('monolith', 'light', 'High-contrast black-and-white photograph: a single tall polished stone slab standing on a smooth concrete floor in an empty white studio, hard side light, one long clean shadow, everything else pure white, minimal, uninhabited, no text.'),

  logo(1, 'Lettermark monogram of the lowercase initials mk, both letters cut from one continuous ribbon of uniform width so the m\'s last stem is shared as the k\'s stem, and the k\'s upper arm terminates in a quarter-circle arc concentric with the stem\'s inner corner. Bold geometric grotesque construction, squared terminals, even counters, one solid silhouette with no gaps, optically centred. One locked primary tone on the locked background. Flat vector design, clean lines, no shadows, no texture, no text beyond the initials mk. Clean editable vector paths, SVG-friendly, minimal anchor points.'),
  logo(2, 'Abstract mark: a small solid dot anchored at the lower left of a rounded-square field, with three concentric quarter-circle arcs radiating from it toward the upper right, the outermost arc split into two equal dashes so the gap reads as a diagonal channel. Uniform stroke weight equal to the dot\'s radius, rounded line caps, symmetric about the diagonal, the dot is the only filled element. Locked accent for the dot, locked primary tone for the arcs, on the locked background. Monoline vector design, uniform stroke weight, rounded line caps, no other fills, no shadows, no texture, no text. Clean editable vector paths, SVG-friendly, minimal anchor points.'),
  logo(3, 'Pictorial mark of an RFID inlay coil: one continuous square spiral of three turns with rounded corners, drawn as a solid flat band of uniform width, starting at the outer edge and ending at a small solid square chip in the exact centre; the spiral\'s gaps equal the band width so positive and negative space alternate evenly. Locked primary tone for the spiral, locked accent for the centre chip, on the locked background. Flat vector design, clean lines, no shadows, no texture, no text. Clean editable vector paths, SVG-friendly, minimal anchor points.'),
];
