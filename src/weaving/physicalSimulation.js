export const initHeightBuffers = (weave) => {
  const [bytes, weaveWidth, weaveHeight] = weave;
  const size = bytes.length;
  const warpHeightBuffers = [new Array(size), new Array(size), new Array(size)];
  const weftHeightBuffers = [new Array(size), new Array(size), new Array(size)];
  bytes.forEach((x, i) => {
    weftHeightBuffers[0][i] = x ? 1.0 : -1.0;
    weftHeightBuffers[1][i] = x ? 1.0 : -1.0;
    weftHeightBuffers[2][i] = x ? 1.0 : -1.0;
    warpHeightBuffers[0][i] = x ? -1.0 : 1.0;
    warpHeightBuffers[1][i] = x ? -1.0 : 1.0;
    warpHeightBuffers[2][i] = x ? -1.0 : 1.0;
  });

  return {warpHeightBuffers, weftHeightBuffers, weaveWidth, weaveHeight};
};

export const computeHeight = (heightBuffers, step) => {
  const {warpHeightBuffers: warpHeight, weftHeightBuffers: weftHeight, weaveWidth, weaveHeight} = heightBuffers;

  const size = warpHeight[0].length;
  const maxStep = step + 10;
  for (; step < maxStep; step++) {
    const t = step % 3;
    const tNext = (step + 1) % 3;
    const tPrev = (step + 2) % 3; // = -1
    for (let i = 0; i < size; i++) {
      const speedWarp = warpHeight[t][i] - warpHeight[tPrev][i];
      const speedWeft = weftHeight[t][i] - weftHeight[tPrev][i];
      const warpViscosityEffect = speedWarp * .25;
      const weftViscosityEffect = speedWeft * .25;
      const line = Math.floor(i / weaveWidth) * weaveWidth;
      const warpEffect = (-2 * warpHeight[t][i] + warpHeight[t][(i + 1) % weaveWidth + line] + warpHeight[t][(i + weaveWidth - 1) % weaveWidth + line]) * 0.01;
      const weftEffect = (-2 * weftHeight[t][i] + weftHeight[t][(i + weaveWidth) % size] + weftHeight[t][(i + size - weaveWidth) % size]) * 0.01;
      const distWarpWeft = warpHeight[t][i] - weftHeight[t][i];
      const absDist = Math.abs(distWarpWeft);
      const weftWarpEffect = absDist > .8 ? 0 : (absDist > .7 ? distWarpWeft * 0.01 : distWarpWeft * 0.03);
      warpHeight[tNext][i] = warpHeight[t][i] + warpEffect + weftWarpEffect + warpViscosityEffect;
      weftHeight[tNext][i] = weftHeight[t][i] + weftEffect - weftWarpEffect + weftViscosityEffect;
    }
  }

  return step;
};

