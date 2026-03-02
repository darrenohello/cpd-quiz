

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.oQEihx_5.js","_app/immutable/chunks/BdtiX-M4.js","_app/immutable/chunks/cwJcEbz3.js","_app/immutable/chunks/BSCMI3hL.js","_app/immutable/chunks/DkChwVix.js"];
export const stylesheets = ["_app/immutable/assets/0.V80olw6x.css"];
export const fonts = [];
