import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const PALETTE = {
  charcoalSlate: [0x55, 0x55, 0x55],
  warmCream: [0xfb, 0xf7, 0xf0],
  softSage: [0xd9, 0xe4, 0xdd],
  warmGreige: [0xcd, 0xc9, 0xc3],
};

/**
 * Compute standard IEEE 802.3 CRC32 checksum for PNG chunks.
 */
function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Create a single length-prefixed, CRC-verified PNG chunk buffer.
 */
function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Encode raw RGBA pixel buffer into a valid PNG binary buffer.
 */
function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.allocUnsafe(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const stride = width * 4;
  const raw = Buffer.allocUnsafe((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type 0 (None)
    rgba.copy(raw, rowStart + 1, y * stride, (y + 1) * stride);
  }

  const compressed = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * Signed distance to a rounded axis-aligned box centered at (cx, cy).
 */
function sdRoundedBox(px, py, cx, cy, halfW, halfH, radius) {
  const qx = Math.abs(px - cx) - (halfW - radius);
  const qy = Math.abs(py - cy) - (halfH - radius);
  const outDist = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  const inDist = Math.min(Math.max(qx, qy), 0);
  return outDist + inDist - radius;
}

/**
 * Signed distance to a finite capsule segment between (ax, ay) and (bx, by).
 */
function sdSegment(px, py, ax, ay, bx, by, radius) {
  const pax = px - ax;
  const pay = py - ay;
  const bax = bx - ax;
  const bay = by - ay;
  const denom = bax * bax + bay * bay || 1;
  const h = Math.max(0, Math.min(1, (pax * bax + pay * bay) / denom));
  return Math.hypot(pax - bax * h, pay - bay * h) - radius;
}

/**
 * Signed distance to a convex trapezoid speaker cone (left x0..right x1).
 */
function sdSpeakerCone(px, py) {
  // Cone vertices in 64x64 viewBox: (24.5, 26.5), (33.5, 20), (33.5, 44), (24.5, 37.5)
  if (px >= 24.5 && px <= 33.5) {
    const t = (px - 24.5) / 9;
    const halfH = 5.5 + t * 6.5;
    const dy = Math.abs(py - 32) - halfH;
    const dx = Math.max(24.5 - px, px - 33.5);
    return Math.max(dy, dx);
  }
  const clampedX = Math.max(24.5, Math.min(33.5, px));
  const t = (clampedX - 24.5) / 9;
  const halfH = 5.5 + t * 6.5;
  const clampedY = Math.max(32 - halfH, Math.min(32 + halfH, py));
  return Math.hypot(px - clampedX, py - clampedY);
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function blendColor(dstR, dstG, dstB, srcRgb, alpha) {
  const a = clamp01(alpha);
  const inv = 1 - a;
  return [
    dstR * inv + srcRgb[0] * a,
    dstG * inv + srcRgb[1] * a,
    dstB * inv + srcRgb[2] * a,
  ];
}

/**
 * Render an anti-aliased maskable square PNG icon in 64x64 logical units.
 */
function renderIconRgba(size) {
  const rgba = Buffer.allocUnsafe(size * size * 4);
  const aa = 64 / size;

  for (let py = 0; py < size; py++) {
    const y = ((py + 0.5) / size) * 64;
    for (let px = 0; px < size; px++) {
      const x = ((px + 0.5) / size) * 64;

      let [r, g, b] = PALETTE.charcoalSlate;

      // Outer Warm Greige ring inside maskable safe zone
      const distFromCenter = Math.hypot(x - 32, y - 32);
      const outerRingDist = Math.abs(distFromCenter - 23.5) - 0.65;
      if (outerRingDist < aa) {
        const alpha = clamp01((aa - outerRingDist) / (2 * aa));
        [r, g, b] = blendColor(r, g, b, PALETTE.warmGreige, alpha);
      }

      // Inner Soft Sage Mist ring
      const sageRingDist = Math.abs(distFromCenter - 21) - 0.95;
      if (sageRingDist < aa) {
        const alpha = clamp01((aa - sageRingDist) / (2 * aa));
        [r, g, b] = blendColor(r, g, b, PALETTE.softSage, alpha);
      }

      // Warm Cream Alabaster speaker body + cone
      const boxDist = sdRoundedBox(x, y, 21, 32, 4, 5.5, 1.8);
      const coneDist = sdSpeakerCone(x, y);
      const speakerDist = Math.min(boxDist, coneDist);
      if (speakerDist < aa) {
        const alpha = clamp01((aa - speakerDist) / (2 * aa));
        [r, g, b] = blendColor(r, g, b, PALETTE.warmCream, alpha);
      }

      // Soft Sage Mist mute "X" mark
      const slash1 = sdSegment(x, y, 38, 26.5, 46.5, 37.5, 1.85);
      const slash2 = sdSegment(x, y, 46.5, 26.5, 38, 37.5, 1.85);
      const crossDist = Math.min(slash1, slash2);
      if (crossDist < aa) {
        const alpha = clamp01((aa - crossDist) / (2 * aa));
        [r, g, b] = blendColor(r, g, b, PALETTE.softSage, alpha);
      }

      const offset = (py * size + px) * 4;
      rgba[offset] = Math.round(r);
      rgba[offset + 1] = Math.round(g);
      rgba[offset + 2] = Math.round(b);
      rgba[offset + 3] = 255;
    }
  }

  return rgba;
}

const targets = [
  { size: 192, file: 'public/icon-192.png' },
  { size: 512, file: 'public/icon-512.png' },
];

for (const { size, file } of targets) {
  const rgba = renderIconRgba(size);
  const png = encodePng(size, size, rgba);
  const outPath = resolve(rootDir, file);
  writeFileSync(outPath, png);
  console.log(`Generated ${file} (${size}x${size}, ${png.length} bytes)`);
}
