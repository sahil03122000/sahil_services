export const initials = name =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("") || "B";

/* Darkens (negative amount) or lightens (positive) a #rrggbb colour. */
export const shade = (hex, amount) => {
  const n = parseInt(hex.slice(1), 16);
  const mix = c => {
    const target = amount < 0 ? 0 : 255;
    return Math.round(c + (target - c) * Math.abs(amount));
  };
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/* Font size that keeps `text` within `maxWidth` (rough, for SVG text). */
export const fitFont = (text, maxWidth, maxSize, ratio = 0.58) =>
  Math.max(8, Math.min(maxSize, maxWidth / (Math.max(text.length, 1) * ratio)));
