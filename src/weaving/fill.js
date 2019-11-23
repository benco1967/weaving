
export const fillWithPattern = ([pattern, sWidth, sHeight], width, height) => {

  const bytes = new Uint8Array(width * height);

  for (let y = 0; y < sHeight; y++) {
    const xd = y * width;
    const xs = y * sWidth;
    for (let x = 0; x < sWidth; x++) {
      bytes[xd + x] = pattern[xs + x];
    }
    for(let x = sWidth; x < width; x += sWidth) {
      bytes.copyWithin(xd + x, xd, xd + sWidth);
    }
  }

  for (let y = sHeight; y < height; y++) {
    const xd = y * width;
    const ys = (y % sHeight) * width;
    bytes.copyWithin(xd, ys, ys + width);
  }

  return [bytes, width, height]
};
