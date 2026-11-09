'use strict';

function pixelsFor(value, name) {
  const text = String(value).trim();
  if (!text) throw new Error(`Enter a ${name} in inches.`);
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    throw new Error(`Enter a positive number for ${name}, such as 8 or 8.5.`);
  }
  const inches = Number(text);
  if (!Number.isFinite(inches) || inches <= 0) {
    throw new Error(`${name[0].toUpperCase() + name.slice(1)} must be greater than zero.`);
  }
  const rawPixels = inches * 300;
  const pixels = Math.round(rawPixels);
  if (!Number.isSafeInteger(pixels)) {
    throw new Error(`${name[0].toUpperCase() + name.slice(1)} is too large to calculate reliably.`);
  }
  if (pixels < 1) throw new Error(`Use a larger ${name}; this value rounds to zero pixels.`);
  return { inches, pixels, rounded: rawPixels !== pixels };
}

function calculateSize(width, height) {
  const w = pixelsFor(width, 'width');
  const h = pixelsFor(height, 'height');
  return { width: w.pixels, height: h.pixels, rounded: w.rounded || h.rounded };
}

if (typeof module !== 'undefined') module.exports = { calculateSize };
