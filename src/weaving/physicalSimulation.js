export const computeHeight = (weave) => {
  const [bytes, weaveWidth, weaveHeight] = weave;

  const size = bytes.length;
  const warpHeight = [new Array(size), new Array(size), new Array(size)];
  const weftHeight = [new Array(size), new Array(size), new Array(size)];
  bytes.forEach((x, i) => {
    weftHeight[0][i] = x ? 1.0 : -1.0;
    weftHeight[2][i] = x ? 1.0 : -1.0;
    warpHeight[0][i] = x ? -1.0 : 1.0;
    warpHeight[2][i] = x ? -1.0 : 1.0;
  });

  for (let step = 0; step < 201; step++) {
    const t = step % 3;
    const tNext = (step + 1) % 3;
    const tPrev = (step + 2) % 3; // = -1
    for (let i = 0; i < size; i++) {

      const warpViscosityEffect = (warpHeight[t][i] - warpHeight[tPrev][i]) * 0.01;
      const weftViscosityEffect = (weftHeight[t][i] - weftHeight[tPrev][i]) * 0.01;
      const line = Math.floor(i / weaveWidth) * weaveWidth;
      const warpEffect = (-2 * warpHeight[t][i] + warpHeight[t][(i + 1) % weaveWidth + line] + warpHeight[t][(i + weaveWidth - 1) % weaveWidth + line]) * 0.01;
      const weftEffect = (-2 * weftHeight[t][i] + weftHeight[t][(i + weaveWidth) % size] + weftHeight[t][(i + size - weaveWidth) % size]) * 0.01;
      const distWarpWeft = warpHeight[t][i] - weftHeight[t][i];
      const weftWarpEffect = distWarpWeft > 1 || distWarpWeft < -1 ? 0 : distWarpWeft * 0.1;
      warpHeight[tNext][i] = warpHeight[t][i] + warpEffect + weftWarpEffect + warpViscosityEffect;
      weftHeight[tNext][i] = weftHeight[t][i] + weftEffect - weftWarpEffect + weftViscosityEffect;
    }
  }
  console.log(warpHeight[0]);
  console.log(weftHeight[0]);
  return [warpHeight[0], weftHeight[0], weaveWidth, weaveHeight];
};

