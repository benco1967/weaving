
export const drawWeave = (ctx, grid, zoom, imageWidth, imageHeight, bytes, weaveWidth, weaveHeight, x, y) => {

  const width = imageWidth / zoom;
  const height = imageHeight / zoom;

  if (x !== undefined && false) {
    const color = bytes[y * weaveWidth + x] ? 'black' : 'white';

    for (let j = y; j < height; j += weaveHeight) {
      for (let i = x; i < width; i += weaveWidth) {
        ctx.fillStyle = color;
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

    for (let y = 0; y < height; y++) {
      const xx = (y % weaveHeight) * weaveWidth;
      for (let x = 0; x < width; x++) {
        if (bytes[xx + x % weaveWidth]) {
          ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
        }
      }
    }

    if (zoom > 4 && grid) {
      ctx.fillStyle = 'gray';
      for (let x = 0; x < width; x++) {
        ctx.fillRect(x * zoom, 0, 1, imageHeight);
      }
      for (let y = 0; y < height; y++) {
        ctx.fillRect(0, y * zoom, imageWidth, 1);
      }
    }
  }
};