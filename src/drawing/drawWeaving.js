export const drawWeaving = (ctx, grid, zoom, imageWidth, imageHeight, bytes, weaveWidth, weaveHeight, warp, warpColors, weft, weftColors, x, y) => {

  const weavingWidth = imageWidth / zoom;
  const weavingHeight = imageHeight / zoom;

  if (x !== undefined && false) {
    const knot = bytes[y * weaveWidth + x];

    for (let j = y; j < weavingHeight; j += weaveHeight) {
      for (let i = x; i < weavingWidth; i += weaveWidth) {
        ctx.fillStyle = knot ?
          warpColors[warp[i % warp.length]] :
        weftColors[weft[j % weft.length]] ;
        ctx.fillRect(i * zoom, j * zoom, zoom, zoom);

        if (zoom > 4 && grid) {
          ctx.fillStyle = 'gray';
          ctx.fillRect(i * zoom, j * zoom, 1, weaveHeight * zoom);
          ctx.fillRect(i * zoom, j * zoom, weaveWidth * zoom, 1);
        }
      }
    }
  } else {
    for (let y = 0; y < weavingHeight; y++) {
      const xx = (y % weaveHeight) * weaveWidth;
      for (let x = 0; x < weavingWidth; x++) {
        ctx.fillStyle = bytes[xx + x % weaveWidth] ?
          warpColors[warp[x % warp.length]] :
          weftColors[weft[y % weft.length]];
        ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
      }
    }

    if (zoom > 4 && grid) {
      ctx.fillStyle = 'gray';
      for (let x = 0; x < weavingWidth; x++) {
        ctx.fillRect(x * zoom, 0, 1, imageHeight);
      }
      for (let y = 0; y < weavingHeight; y++) {
        ctx.fillRect(0, y * zoom, imageWidth, 1);
      }
    }
  }
};