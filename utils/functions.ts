// https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e

import { IColorStore, TColorHSL, useColorStore } from "@/store/ColorUtils";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDeltaE00 } from "delta-e";

export function getStringFromHSL(value: TColorHSL) {
  return `hsl(${value.h}, ${value.s}%, ${value.l}%)`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomColor(): TColorHSL {
  return {
    h: Math.floor(Math.random() * 360),
    s: Math.floor(Math.random() * 100),
    l: Math.floor(Math.random() * 100),
  };
}

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hslToRgb(hsl: { h: number; s: number; l: number }) {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r *= 255;
  g *= 255;
  b *= 255;

  return { r, g, b };
}

export function rgbToXyz(rgb: { r: number; g: number; b: number }) {
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  if (r > 0.04045) {
    r = Math.pow((r + 0.055) / 1.055, 2.4);
  } else {
    r = r / 12.92;
  }

  if (g > 0.04045) {
    g = Math.pow((g + 0.055) / 1.055, 2.4);
  } else {
    g = g / 12.92;
  }

  if (b > 0.04045) {
    b = Math.pow((b + 0.055) / 1.055, 2.4);
  } else {
    b = b / 12.92;
  }

  r *= 100;
  g *= 100;
  b *= 100;

  // Observer = 2°, Illuminant = D65
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  return { x, y, z };
}

export function xyzToLab(xyz: { x: number; y: number; z: number }) {
  // Observer = 2°, Illuminant = D65
  let x = xyz.x / 95.047;
  let y = xyz.y / 100.0;
  let z = xyz.z / 108.883;

  if (x > 0.008856) {
    x = Math.pow(x, 0.333333333);
  } else {
    x = 7.787 * x + 0.137931034;
  }

  if (y > 0.008856) {
    y = Math.pow(y, 0.333333333);
  } else {
    y = 7.787 * y + 0.137931034;
  }

  if (z > 0.008856) {
    z = Math.pow(z, 0.333333333);
  } else {
    z = 7.787 * z + 0.137931034;
  }

  const L = 116 * y - 16;
  const A = 500 * (x - y);
  const B = 200 * (y - z);

  return { L, A, B };
}

export const hslToLab = (color: TColorHSL) => {
  const rgb = hslToRgb(color);
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
};

export function calculatePoints(src: TColorHSL, dest: TColorHSL) {
  const delta = getDeltaE00(hslToLab(src), hslToLab(dest));

  return (100 - delta).toFixed(2);
}
