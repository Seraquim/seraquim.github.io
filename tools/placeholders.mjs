#!/usr/bin/env node
/* ==========================================================================
   Placeholder specimens — deterministic SVG visuals that stand in for real
   project imagery until it exists. Every file is generated from a seed, so
   re-running produces identical output.

   To replace one: put the real image in /assets/work/, update the <img>
   tags that point at the specimen, and delete its line below.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../assets/specimens");

const C = {
  ink: "#141413", paper: "#F4F2ED", white: "#FAF9F6", grey: "#8A877F",
  verm: "#D9481F", cobalt: "#3B4250", ochre: "#C9B8A6", moss: "#6B6F5A",
  blush: "#E3D9CE", lilac: "#DAD9D3", sand: "#E6E0D5", night: "#1E1E1C",
};

const SANS = "Helvetica Neue, Helvetica, Arial, Liberation Sans, sans-serif";
const SERIF = "Georgia, Times New Roman, Liberation Serif, serif";
const MONO = "Menlo, Consolas, Liberation Mono, monospace";

/* name, style, colours [bg, fg, accent], width, height, seed, extra */
const LIST = [
  // Projects
  ["p-low-tide-1", "poster", ["sand", "ink", "sand"], 1600, 1000, 11, { text: "LT", sub: "LOW TIDE EDITIONS" }],
  ["p-low-tide-2", "contour", ["paper", "ink", "ochre"], 1000, 1250, 12],
  ["p-low-tide-3", "type", ["white", "ink", "verm"], 1000, 1000, 13, { text: "Tt" }],
  ["p-low-tide-4", "swatch", ["paper", "ink", "verm"], 1600, 1000, 14, { swatches: ["ochre", "ink", "paper", "sand", "verm", "moss"] }],
  ["p-signal-1", "moire", ["ink", "paper", "verm"], 1000, 1250, 21],
  ["p-signal-2", "poster", ["ink", "paper", "verm"], 1000, 1250, 22, { text: "S/N", sub: "SIGNAL & NOISE — 26" }],
  ["p-signal-3", "halftone", ["ink", "verm", "paper"], 1600, 1000, 23],
  ["p-signal-4", "grid", ["paper", "ink", "verm"], 1000, 1000, 24],
  ["p-ferro-1", "type", ["moss", "paper", "ochre"], 1600, 1000, 31, { text: "Fe" }],
  ["p-ferro-2", "grid", ["paper", "moss", "ink"], 1000, 1250, 32],
  ["p-ferro-3", "poster", ["lilac", "moss", "sand"], 1000, 1000, 33, { text: "FERRO", sub: "HARDWARE SINCE 1952" }],
  ["p-halflight-1", "ui", ["lilac", "ink", "white"], 1000, 1250, 41],
  ["p-halflight-2", "halftone", ["night", "lilac", "ochre"], 1600, 1000, 42],
  ["p-halflight-3", "ui", ["night", "lilac", "verm"], 1600, 1000, 43],
  ["p-common-1", "dieline", ["sand", "ink", "verm"], 1600, 1000, 51],
  ["p-common-2", "cutout", ["paper", "ink", "ochre"], 1000, 1250, 52],
  ["p-common-3", "swatch", ["white", "ink", "verm"], 1000, 1000, 53, { swatches: ["sand", "ochre", "moss", "ink", "blush", "verm"] }],
  ["p-orbit-1", "orbit", ["ink", "paper", "verm"], 1600, 1000, 61],
  ["p-orbit-2", "orbit", ["paper", "ink", "cobalt"], 1000, 1250, 62],
  ["p-orbit-3", "orbit", ["cobalt", "white", "verm"], 1000, 1000, 63],

  // Archive
  ["a-001", "type", ["paper", "ink", "verm"], 1000, 1250, 101, { text: "Ag" }],
  ["a-002", "halftone", ["paper", "ink", "verm"], 1000, 1000, 102],
  ["a-003", "sketch", ["white", "grey", "verm"], 1000, 1250, 103],
  ["a-004", "orbit", ["night", "lilac", "verm"], 1000, 1000, 104],
  ["a-005", "swatch", ["paper", "ink", "verm"], 1250, 1000, 105, { swatches: ["verm", "blush", "ochre", "sand", "cobalt", "ink"] }],
  ["a-006", "cutout", ["blush", "ink", "cobalt"], 1000, 1250, 106],
  ["a-007", "moire", ["paper", "ink", "cobalt"], 1000, 1000, 107],
  ["a-008", "poster", ["ink", "paper", "verm"], 1000, 1414, 108, { text: "024", sub: "EXPERIMENT — WIDTH AS MATERIAL" }],
  ["a-009", "contour", ["night", "paper", "verm"], 1250, 1000, 109],
  ["a-010", "sketch", ["paper", "ink", "cobalt"], 1250, 1000, 110],
  ["a-011", "grid", ["ochre", "ink", "paper"], 1000, 1000, 111],
  ["a-012", "type", ["ink", "paper", "verm"], 1000, 1000, 112, { text: "&" }],
  ["a-013", "ui", ["paper", "ink", "verm"], 1250, 1000, 113],
  ["a-014", "halftone", ["cobalt", "paper", "verm"], 1000, 1250, 114],
  ["a-015", "dieline", ["white", "ink", "verm"], 1000, 1000, 115],
  ["a-016", "orbit", ["paper", "verm", "ink"], 1000, 1250, 116],
  ["a-017", "cutout", ["ochre", "ink", "verm"], 1000, 1000, 117],
  ["a-018", "sketch", ["sand", "ink", "verm"], 1000, 1250, 118],
  ["a-019", "poster", ["lilac", "ink", "verm"], 1000, 1414, 119, { text: "?!", sub: "UNRELEASED — CAMPAIGN B" }],
  ["a-020", "contour", ["paper", "cobalt", "verm"], 1000, 1000, 120],
  ["a-021", "moire", ["verm", "ink", "paper"], 1250, 1000, 121],
  ["a-022", "type", ["white", "cobalt", "verm"], 1000, 1250, 122, { text: "Rr" }],
  ["a-023", "grid", ["ink", "paper", "verm"], 1000, 1000, 123],
  ["a-024", "swatch", ["ink", "paper", "verm"], 1000, 1250, 124, { swatches: ["night", "lilac", "cobalt", "paper", "verm", "grey"] }],

  // Portrait stand-in (About page)
  ["portrait", "portrait", ["paper", "ink", "verm"], 1000, 1250, 777],
];

/* --- Helpers ------------------------------------------------------------- */

function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => Math.round(n * 10) / 10;
const pick = (r, list) => list[Math.floor(r() * list.length)];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* --- Styles -------------------------------------------------------------- */

const STYLES = {
  halftone(r, w, h, p) {
    const cell = Math.max(w, h) / (34 + Math.floor(r() * 8));
    const fx = r() * w, fy = r() * h;
    const k1 = 0.004 + r() * 0.006, k2 = 0.003 + r() * 0.006, ph = r() * 6;
    let out = "";
    for (let y = cell / 2; y < h; y += cell) {
      for (let x = cell / 2; x < w; x += cell) {
        const d = Math.hypot(x - fx, y - fy) / Math.max(w, h);
        const v = 0.5 + 0.5 * Math.sin(x * k1 + y * k2 + ph) * Math.cos(d * 7);
        const rad = cell * 0.5 * Math.max(0, Math.min(1, v * (1.15 - d)));
        if (rad > 0.6) out += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}"/>`;
      }
    }
    const ac = `<circle cx="${f(fx)}" cy="${f(fy)}" r="${f(cell * 3.2)}" fill="${p.ac}"/>`;
    return `<g fill="${p.fg}" opacity=".8">${out}</g>${ac}`;
  },

  orbit(r, w, h, p) {
    const cx = w * (0.4 + r() * 0.2), cy = h * (0.42 + r() * 0.16);
    const R = Math.min(w, h) * (0.3 + r() * 0.08);
    const rot = f(-30 + r() * 60);
    const tilt = 0.25 + r() * 0.3;
    let lines = "";
    for (let i = -6; i <= 6; i++) {
      const a = (i / 7) * (Math.PI / 2);
      const rx = R * Math.cos(a);
      lines += `<ellipse cx="0" cy="${f(R * Math.sin(a))}" rx="${f(rx)}" ry="${f(rx * tilt)}"/>`;
    }
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI;
      lines += `<ellipse cx="0" cy="0" rx="${f(Math.abs(R * Math.cos(a)))}" ry="${f(R)}"/>`;
    }
    const mr = R * (0.14 + r() * 0.08);
    const ma = r() * Math.PI * 2;
    const ring = `<ellipse cx="0" cy="0" rx="${f(R * 1.55)}" ry="${f(R * 0.32)}" stroke-width="3"/>`;
    return `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${rot})" fill="none" stroke="${p.fg}" stroke-width="1.4">${lines}${ring}</g>
<circle cx="${f(cx + Math.cos(ma) * R * 1.3)}" cy="${f(cy + Math.sin(ma) * R * 0.9)}" r="${f(mr)}" fill="${p.ac}"/>
<text x="${f(w * 0.05)}" y="${f(h * 0.94)}" font-family="${MONO}" font-size="${f(w * 0.018)}" fill="${p.fg}">R=${f(R)} / T=${f(tilt * 100)} / ROT ${rot}°</text>`;
  },

  poster(r, w, h, p, x) {
    const text = x.text || "S";
    const size = Math.min((w * 0.92) / (text.length * 0.7), h * 0.62);
    const blockH = h * (0.16 + r() * 0.08);
    return `<rect x="0" y="${f(h - blockH)}" width="${w}" height="${f(blockH)}" fill="${p.ac}"/>
<text x="${f(w * 0.04)}" y="${f(h * 0.08 + size * 0.78)}" font-family="${SANS}" font-weight="900" font-size="${f(size)}" letter-spacing="${f(-size * 0.04)}" fill="${p.fg}">${esc(text)}</text>
<text x="${f(w * 0.06)}" y="${f(h - blockH * 0.5)}" font-family="${MONO}" font-size="${f(w * 0.016)}" fill="${p.fg}">${esc(x.sub || "")}</text>`;
  },

  swatch(r, w, h, p, x) {
    const sw = (x.swatches || ["ink", "verm", "paper"]).map((k) => [k, C[k]]);
    const cols = w > h ? 3 : 2, rows = Math.ceil(sw.length / cols);
    const pad = w * 0.05, gap = w * 0.02;
    const cw = (w - pad * 2 - gap * (cols - 1)) / cols;
    const ch = (h - pad * 2 - gap * (rows - 1) - h * 0.06) / rows;
    return sw.map(([k, hex], i) => {
      const cx = pad + (i % cols) * (cw + gap), cy = pad + Math.floor(i / cols) * (ch + gap);
      const light = ["paper", "white", "sand", "blush", "lilac"].includes(k);
      return `<rect x="${f(cx)}" y="${f(cy)}" width="${f(cw)}" height="${f(ch)}" fill="${hex}" stroke="${p.fg}" stroke-width="${light ? 1 : 0}"/>
<text x="${f(cx + 14)}" y="${f(cy + ch - 16)}" font-family="${MONO}" font-size="${f(w * 0.017)}" fill="${light ? C.ink : C.paper}">${k.toUpperCase()} ${hex}</text>`;
    }).join("") + `<text x="${f(pad)}" y="${f(h - pad * 0.6)}" font-family="${MONO}" font-size="${f(w * 0.016)}" fill="${p.fg}">COLOUR STUDY — ${String(Math.floor(r() * 90) + 10).padStart(3, "0")}</text>`;
  },

  contour(r, w, h, p) {
    const cx = w * (0.3 + r() * 0.4), cy = h * (0.3 + r() * 0.4);
    const ph = [r() * 6, r() * 6, r() * 6];
    let out = "";
    for (let k = 1; k <= 18; k++) {
      const base = k * Math.max(w, h) * 0.035;
      let d = "";
      for (let i = 0; i <= 72; i++) {
        const a = (i / 72) * Math.PI * 2;
        const rr = base * (1 + 0.18 * Math.sin(a * 3 + ph[0] + k * 0.2) + 0.08 * Math.sin(a * 5 + ph[1]) + 0.05 * Math.cos(a * 2 + ph[2] - k * 0.1));
        d += `${i ? "L" : "M"}${f(cx + Math.cos(a) * rr)} ${f(cy + Math.sin(a) * rr)}`;
      }
      out += `<path d="${d}Z" stroke="${k === 7 ? p.ac : p.fg}" stroke-width="${k === 7 ? 4 : 1.3}"/>`;
    }
    return `<g fill="none">${out}</g>`;
  },

  grid(r, w, h, p) {
    const n = 4 + Math.floor(r() * 3), cell = Math.min(w, h) / (n + 0.6);
    const cols = Math.floor(w / cell), rows = Math.floor(h / cell);
    const ox = (w - cols * cell) / 2, oy = (h - rows * cell) / 2;
    let out = "";
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = ox + i * cell, y = oy + j * cell, c = r() < 0.18 ? p.ac : p.fg, t = r();
      const q = Math.floor(r() * 4), cxq = x + (q % 2) * cell, cyq = y + (q > 1 ? cell : 0);
      if (t < 0.22) out += `<rect x="${f(x)}" y="${f(y)}" width="${f(cell)}" height="${f(cell)}" fill="${c}"/>`;
      else if (t < 0.5) out += `<path d="M${f(cxq)} ${f(cyq)} L${f(cxq + (q % 2 ? -cell : cell))} ${f(cyq)} A${f(cell)} ${f(cell)} 0 0 ${q === 1 || q === 2 ? 0 : 1} ${f(cxq)} ${f(cyq + (q > 1 ? -cell : cell))}Z" fill="${c}"/>`;
      else if (t < 0.68) out += `<circle cx="${f(x + cell / 2)}" cy="${f(y + cell / 2)}" r="${f(cell * 0.42)}" fill="${c}"/>`;
      else if (t < 0.8) out += `<rect x="${f(x)}" y="${f(y + cell / 2)}" width="${f(cell)}" height="${f(cell / 2)}" fill="${c}"/>`;
    }
    return `<g stroke="${p.fg}" stroke-width=".6" opacity=".4">${Array.from({ length: cols + 1 }, (_, i) => `<line x1="${f(ox + i * cell)}" y1="0" x2="${f(ox + i * cell)}" y2="${h}"/>`).join("")}</g>${out}`;
  },

  moire(r, w, h, p) {
    const gap = 18 + r() * 8, rot = 2 + r() * 3;
    const set = (stroke) => Array.from({ length: Math.ceil((w + h) * 1.5 / gap) }, (_, i) => `<line x1="${f(-h + i * gap)}" y1="${-h}" x2="${f(-h + i * gap)}" y2="${h * 2}" stroke="${stroke}"/>`).join("");
    const cx = w * (0.3 + r() * 0.4), cy = h * (0.3 + r() * 0.4);
    return `<defs><clipPath id="m"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(Math.min(w, h) * 0.36)}"/></clipPath></defs>
<g stroke-width="1.2" opacity=".55">${set(p.fg)}</g>
<g stroke-width="1.2" clip-path="url(#m)"><rect width="${w}" height="${h}" fill="${p.bg}"/><g transform="rotate(${f(rot)} ${f(cx)} ${f(cy)})">${set(p.ac)}</g></g>`;
  },

  cutout(r, w, h, p) {
    const cols = [p.fg, p.ac, C.verm, C.cobalt, C.paper].filter((c) => c !== p.bg);
    let out = "";
    for (let i = 0; i < 7; i++) {
      const c = pick(r, cols), x = r() * w * 0.8, y = r() * h * 0.8, s = Math.min(w, h) * (0.15 + r() * 0.3);
      const t = r(), rot = f(-25 + r() * 50);
      if (t < 0.4) out += `<rect x="${f(x)}" y="${f(y)}" width="${f(s * 1.3)}" height="${f(s * 0.7)}" fill="${c}" transform="rotate(${rot} ${f(x)} ${f(y)})"/>`;
      else if (t < 0.7) out += `<circle cx="${f(x + s / 2)}" cy="${f(y + s / 2)}" r="${f(s / 2)}" fill="${c}"/>`;
      else out += `<path d="M${f(x)} ${f(y + s)} L${f(x + s / 2)} ${f(y)} L${f(x + s)} ${f(y + s)}Z" fill="${c}" transform="rotate(${rot} ${f(x + s / 2)} ${f(y + s / 2)})"/>`;
    }
    return out;
  },

  sketch(r, w, h, p) {
    let out = "";
    for (let k = 0; k < 9; k++) {
      let x = r() * w, y = r() * h, d = `M${f(x)} ${f(y)}`;
      for (let i = 0; i < 40; i++) {
        x = Math.max(20, Math.min(w - 20, x + (r() - 0.5) * 70));
        y = Math.max(20, Math.min(h - 20, y + (r() - 0.5) * 70));
        d += ` L${f(x)} ${f(y)}`;
      }
      out += `<path d="${d}" fill="none" stroke="${p.fg}" stroke-width="${f(0.8 + r() * 1.2)}" stroke-linejoin="round" opacity=".7"/>`;
    }
    const ex = w * (0.3 + r() * 0.4), ey = h * (0.3 + r() * 0.4);
    return `<g stroke="${p.fg}" stroke-width=".7" opacity=".5"><line x1="${f(w * 0.1)}" y1="0" x2="${f(w * 0.1)}" y2="${h}"/><line x1="0" y1="${f(h * 0.82)}" x2="${w}" y2="${f(h * 0.82)}"/></g>${out}
<ellipse cx="${f(ex)}" cy="${f(ey)}" rx="${f(w * 0.14)}" ry="${f(h * 0.08)}" fill="none" stroke="${p.ac}" stroke-width="4" transform="rotate(-8 ${f(ex)} ${f(ey)})"/>
<line x1="${f(ex + w * 0.14)}" y1="${f(ey)}" x2="${f(Math.min(w - 40, ex + w * 0.3))}" y2="${f(ey - h * 0.12)}" stroke="${p.ac}" stroke-width="3"/>
<text x="${f(Math.min(w - 220, ex + w * 0.2))}" y="${f(ey - h * 0.14)}" font-family="${MONO}" font-size="${f(w * 0.024)}" fill="${p.ac}">this, but louder</text>`;
  },

  type(r, w, h, p, x) {
    const text = x.text || "Aa";
    const size = Math.min(h * 0.62, w / (text.length * 0.62));
    const base = h * 0.7, xh = base - size * 0.47, cap = base - size * 0.7;
    const guide = (y, label) => `<line x1="0" y1="${f(y)}" x2="${w}" y2="${f(y)}" stroke="${p.ac}" stroke-width="1.5"/><text x="${f(w - 20)}" y="${f(y - 8)}" text-anchor="end" font-family="${MONO}" font-size="${f(w * 0.018)}" fill="${p.ac}">${label}</text>`;
    return `${guide(base, "BASELINE")}${guide(xh, "X-HEIGHT")}${guide(cap, "CAP")}
<text x="${f(w / 2)}" y="${f(base)}" text-anchor="middle" font-family="${SERIF}" font-size="${f(size)}" fill="${p.fg}">${esc(text)}</text>
<text x="${f(w * 0.04)}" y="${f(h * 0.94)}" font-family="${MONO}" font-size="${f(w * 0.018)}" fill="${p.fg}">TYPE STUDY — ${esc(text)} — ${f(size)}PT</text>`;
  },

  ui(r, w, h, p) {
    const n = w > h ? 3 : 2;
    const fw = Math.min(w / (n + 0.8), h * 0.42), fh = fw * 2.05;
    let out = "";
    for (let i = 0; i < n; i++) {
      const x = w * 0.08 + i * (w * 0.84 - fw) / Math.max(1, n - 1), y = (h - fh) / 2 + (i % 2 ? h * 0.06 : -h * 0.04);
      out += `<g transform="translate(${f(x)} ${f(y)})"><rect width="${f(fw)}" height="${f(fh)}" rx="${f(fw * 0.12)}" fill="${p.bg === C.night ? C.ink : C.white}" stroke="${p.fg}" stroke-width="2"/>`;
      out += `<circle cx="${f(fw / 2)}" cy="${f(fh * 0.28)}" r="${f(fw * (0.18 + r() * 0.12))}" fill="${i === 1 ? p.ac : p.fg}"/>`;
      for (let k = 0; k < 4; k++) out += `<rect x="${f(fw * 0.12)}" y="${f(fh * (0.52 + k * 0.08))}" width="${f(fw * (0.4 + r() * 0.4))}" height="${f(fh * 0.025)}" rx="2" fill="${p.fg}" opacity=".7"/>`;
      out += `<rect x="${f(fw * 0.12)}" y="${f(fh * 0.86)}" width="${f(fw * 0.76)}" height="${f(fh * 0.06)}" rx="${f(fh * 0.03)}" fill="${p.ac}"/></g>`;
    }
    return out;
  },

  dieline(r, w, h, p) {
    const s = Math.min(w / 4.6, h / 3.4), ox = (w - s * 4.2) / 2, oy = (h - s * 3) / 2;
    const faces = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]];
    let out = faces.map(([i, j], k) => `<rect x="${f(ox + i * s)}" y="${f(oy + j * s)}" width="${f(s)}" height="${f(s)}" fill="${k === 1 ? p.ac : "none"}" stroke="${p.fg}" stroke-width="2"/>`).join("");
    out += `<path d="M${f(ox + 4 * s)} ${f(oy + s)} l${f(s * 0.2)} ${f(s * 0.15)} v${f(s * 0.7)} l${f(-s * 0.2)} ${f(s * 0.15)}" fill="none" stroke="${p.fg}" stroke-width="2"/>`;
    out += `<g stroke="${p.fg}" stroke-dasharray="8 6" stroke-width="1.2">${[1, 2, 3].map((i) => `<line x1="${f(ox + i * s)}" y1="${f(oy + s)}" x2="${f(ox + i * s)}" y2="${f(oy + 2 * s)}"/>`).join("")}</g>`;
    out += `<text x="${f(ox + s * 1.08)}" y="${f(oy + s * 1.9)}" font-family="${SANS}" font-weight="900" font-size="${f(s * 0.3)}" fill="${p.bg}">CG</text>`;
    return out + `<text x="${f(w * 0.04)}" y="${f(h * 0.95)}" font-family="${MONO}" font-size="${f(w * 0.016)}" fill="${p.fg}">DIELINE — 250G — CUT / - - - FOLD</text>`;
  },

  portrait(r, w, h, p) {
    // A self-portrait as a measured object: head and shoulders built from rules.
    let out = "";
    const cx = w / 2, cy = h * 0.4, R = w * 0.22;
    for (let i = 0; i < 46; i++) {
      const y = cy - R * 1.2 + i * (R * 2.4 / 46);
      const dx = Math.sqrt(Math.max(0, 1 - ((y - cy) / (R * 1.2)) ** 2)) * R;
      if (dx > 2) out += `<line x1="${f(cx - dx)}" y1="${f(y)}" x2="${f(cx + dx)}" y2="${f(y)}" stroke="${p.fg}" stroke-width="${f(1 + (i % 5 === 0 ? 1.5 : 0))}"/>`;
    }
    for (let i = 0; i < 40; i++) {
      const y = h * 0.72 + i * 9;
      const dx = w * 0.18 + Math.sqrt(i) * w * 0.05;
      out += `<line x1="${f(cx - dx)}" y1="${f(y)}" x2="${f(cx + dx)}" y2="${f(y)}" stroke="${p.fg}" stroke-width="1.2"/>`;
    }
    return `${out}<rect x="${f(cx - R * 0.9)}" y="${f(cy - R * 0.12)}" width="${f(R * 1.8)}" height="${f(R * 0.22)}" fill="${p.ac}"/>
<text x="${f(w * 0.05)}" y="${f(h * 0.06)}" font-family="${MONO}" font-size="${f(w * 0.02)}" fill="${p.fg}">SELF-PORTRAIT AS A MEASURED OBJECT — 46 LINES</text>`;
  },
};

/* --- Write --------------------------------------------------------------- */

fs.mkdirSync(OUT, { recursive: true });

for (const [name, style, [bg, fg, ac], w, h, seed, extra = {}] of LIST) {
  const p = { bg: C[bg], fg: C[fg], ac: C[ac] };
  const body = STYLES[style](rng(seed), w, h, p, extra);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${p.bg}"/>${body}</svg>\n`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
}

console.log(`placeholders: ${LIST.length} specimens → ${path.relative(process.cwd(), OUT)}`);
