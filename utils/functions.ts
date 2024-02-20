// https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e

import { IColorStore, TColorHSL, useColorStore } from "@/store/ColorUtils";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDeltaE00 } from "delta-e";

const pos = [2, 5];

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

export async function fetchRandomColor() {
  const response = await fetch("/api/getHSL");
  const data = await response.json();
  return data;
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

export function hslToHex(hsl: TColorHSL) {
  let { h, s, l } = hsl;
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function rgbToHsl(rgb: { r: number; g: number; b: number }) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h *= 360;
  s *= 100;
  l *= 100;

  return { h, s, l };
}

export function hexToHsl(hex: string): TColorHSL {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;

  // 3 digits
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  return rgbToHsl({ r: +r, g: +g, b: +b });
}

export function timeToString(time: number, padding = 2) {
  const { millis, seconds, minutes, hours } = formatElapsedTime(time);
  const paddedSeconds = seconds.toString().padStart(padding, "0");
  const paddedMillis = millis.toString().padStart(3, "0");

  let formattedTime = `${paddedSeconds}.${paddedMillis}`;
  if (minutes > 0) {
    const paddedMinutes = minutes.toString().padStart(padding, "0");
    formattedTime = `${paddedMinutes}:${formattedTime}`;
  }
  if (hours > 0) {
    const paddedHours = hours.toString().padStart(padding, "0");
    formattedTime = `${paddedHours}:${formattedTime}`;
  }

  return formattedTime;
}

export function formatElapsedTime(elapsedTime: number) {
  // elapsedTime is returned by performance.now() in milliseconds

  const millis = Math.floor(elapsedTime % 1000);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  return {
    millis,
    seconds,
    minutes,
    hours,
  };
}

export function elapsedTimeToString(elapsedTime: number) {
  const { millis, seconds, minutes, hours } = formatElapsedTime(elapsedTime);
  let formattedTime = `${seconds}s ${millis}ms`;
  if (minutes > 0) {
    formattedTime = `${minutes}m ${formattedTime}`;
  }
  if (hours > 0) {
    formattedTime = `${hours}h ${formattedTime}`;
  }

  return formattedTime;
}

export function scoreToBase64(
  elapsedTime: number,
  edition: number,
  isTryHardMode: boolean
) {
  const score = { t: elapsedTime, e: edition, i: isTryHardMode };
  const json = JSON.stringify(score);
  return btoa(json);
}

function randomString(len: number, charSet?: string) {
  charSet =
    charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function removeByIndex(str: string, index: number) {
  return str.slice(0, index) + str.slice(index + 1);
}

export function encodeScore(
  elapsedTime: number,
  edition: number,
  isTryHardMode: boolean
) {
  const id = randomString(2);
  const chars = id.split("");

  const values = `${Math.trunc(elapsedTime)},${edition},${Number(
    isTryHardMode
  )}`;
  const base64 = btoa(values);

  let modifiedBase64 = "";

  let startIndex = 0;
  for (const p of pos) {
    modifiedBase64 += base64.substring(startIndex, p) + chars.shift();
    startIndex = p;
  }
  modifiedBase64 += base64.substring(startIndex);

  modifiedBase64 = modifiedBase64.replace(/=/g, "");

  return modifiedBase64;
}

export function decodeScore(modifiedBase64: string) {
  let base64 = modifiedBase64;

  for (const p of pos) {
    base64 = removeByIndex(base64, p);
  }
  const [elapsedTime, edition, isTryHardMode] = JSON.parse(`[${atob(base64)}]`);

  return {
    elapsedTime: Number(elapsedTime),
    edition,
    isTryHardMode: Boolean(isTryHardMode),
  };
}
