export const getBraidedWeave = (warpTxt, weftTxt) => {

  const warp = warpTxt.split(' ').map(n => +n);
  const width = warp.reduce((s, n) => s + +n, 0);

  const weft = weftTxt.split(' ').map(n => +n);
  const height = weft.reduce((s, n) => s += n, 0);

  const bytes = new Uint8Array(width * height);

  let y = 0;
  let yMax = 0;
  for(let j = 0; j < weft.length; j++) {
    yMax = y + weft[j];
    for (;y < yMax; y++) {
      let x = 0;
      let xMax = 0;
      const xx = y * width;
      for (let i = 0; i < warp.length; i++) {
        xMax = x + warp[i];
        const k = (i + j) % 2;
        for (; x < xMax; x++) {
          bytes[xx + x] = k;
        }
      }
    }
  }

  return [bytes, width, height];
};