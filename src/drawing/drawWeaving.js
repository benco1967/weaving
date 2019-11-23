export const drawWeaving = (ctx, grid, zoom, imageWidth, imageHeight, bytes, weaveWidth, weaveHeight, warp, warpColors, weft, weftColors, x, y) => {

  const weavingWidth = imageWidth/ zoom;
  const weavingHeight = imageHeight / zoom;

  if (x !== undefined && false) {
    const knot = bytes[y * weaveWidth + x];

    for (let j = y; j < weavingHeight; j += weaveHeight) {
      for (let i = x; i < weavingWidth; i += weaveWidth) {
        ctx.fillStyle = knot ?
          weftColors[weft[j % weft.length]] :
          warpColors[warp[i % warp.length]];
        ctx.fillRect(i * zoom, j * zoom, zoom, zoom);

        if (zoom > 4 && grid) {
          ctx.fillStyle = 'gray';
          ctx.fillRect(i * zoom, j * zoom, 1, weaveHeight * zoom);
          ctx.fillRect(i * zoom, j * zoom, weaveWidth * zoom, 1);
        }
      }
    }
  } else {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, imageWidth, imageHeight);

    ctx.fillStyle = 'black';

    for (let y = 0; y < weavingHeight; y++) {
      const xx = (y % weaveHeight) * weaveWidth;
      for (let x = 0; x < weavingWidth; x++) {
        ctx.fillStyle = bytes[xx + x % weaveWidth] ?
          weftColors[weft[y % weft.length]] :
          warpColors[warp[x % warp.length]];
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