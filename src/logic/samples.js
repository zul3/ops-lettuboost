// Seeded receipts and photos are stored as { sample: [label, hue, kind] } instead of image data.
// They are drawn on a canvas when loaded, so the database never holds the generated pixels.

const cache = new Map();

export function sampleUrl(label, hue, kind) {
  const key = label + '|' + hue + '|' + kind;
  if (cache.has(key)) return cache.get(key);
  if (typeof document === 'undefined') return '';
  const W = 480, H = kind === 'receipt' ? 620 : 320;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  if (!g) return '';
  if (kind === 'receipt') {
    g.fillStyle = '#fbfaf4'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#2b2b2b'; g.textAlign = 'center'; g.font = '700 28px monospace'; g.fillText(label.toUpperCase(), W / 2, 70);
    g.font = '15px monospace'; g.fillStyle = '#777'; g.fillText('SAMPLE RECEIPT', W / 2, 98);
    g.fillStyle = '#c9c6bb';
    for (let i = 0; i < 11; i++) { g.fillRect(48, 150 + i * 36, 220 + (i * 53) % 120, 9); g.fillRect(W - 120, 150 + i * 36, 72, 9); }
    g.fillStyle = '#2b2b2b'; g.fillRect(48, 560, W - 96, 3);
  } else {
    const gr = g.createLinearGradient(0, 0, W, H);
    gr.addColorStop(0, 'hsl(' + hue + ',38%,74%)'); gr.addColorStop(1, 'hsl(' + (hue + 28) + ',42%,42%)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 14;
    for (let x = -H; x < W + H; x += 46) { g.beginPath(); g.moveTo(x, H); g.lineTo(x + H, 0); g.stroke(); }
    g.fillStyle = 'rgba(12,36,24,.62)'; g.fillRect(0, H - 54, W, 54);
    g.fillStyle = '#ffffff'; g.textAlign = 'left'; g.font = '600 17px sans-serif'; g.fillText('SAMPLE PHOTO · ' + label, 18, H - 21);
  }
  const url = c.toDataURL('image/jpeg', 0.72);
  cache.set(key, url);
  return url;
}

// Fill in url for every { sample } object found anywhere in a value.
export function hydrate(v) {
  if (Array.isArray(v)) return v.map(hydrate);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k in v) o[k] = hydrate(v[k]);
    if (Array.isArray(v.sample) && !o.url) o.url = sampleUrl(v.sample[0], v.sample[1], v.sample[2]);
    return o;
  }
  return v;
}

// Strip generated urls back off before saving.
export function dehydrate(v) {
  if (Array.isArray(v)) return v.map(dehydrate);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k in v) if (!(k === 'url' && Array.isArray(v.sample))) o[k] = dehydrate(v[k]);
    return o;
  }
  return v;
}
