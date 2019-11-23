export const generatePatternFormula = (pattern, offset) => {

  const width = pattern.reduce((s, n) => s + +n, 0);
  offset = (width + offset) % width;

  const bytes = new Uint8Array(width * width);
  let x = 0;
  let xMax = 0;
  for (let i = 0; i < pattern.length; i++) {
    const k = i % 2;
    xMax = x + pattern[i];
    for (; x < xMax; x++) {
      bytes[x] = k;
    }
  }
  for (let y = 1; y < width; y++) {
    const xx = y * width;
    const o = (offset * y) % width;
    bytes.copyWithin(xx, o, width);
    bytes.copyWithin(xx + width - o, 0, o);
  }

  return [bytes, width, width];
};