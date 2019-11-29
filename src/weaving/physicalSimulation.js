
const NB_STEPS = 5;
const NB_MAX_STEPS = 4000;

const compute = (self) => {
  if(self.step > NB_MAX_STEPS) {
    self.stopComputing();
  }
  else {
    const maxStep = self.step + NB_STEPS;
    for (; self.step < maxStep; self.step++) {
      console.log(self.step, self.status)
      const t = self.step % 3;
      const tNext = (t + 1) % 3;
      const tPrev = (t + 2) % 3; // = -1
      for (let i = 0; i < self.size; i++) {
        const speedWarp = self.warpHeightBuffers[t][i] - self.warpHeightBuffers[tPrev][i];
        const speedWeft = self.weftHeightBuffers[t][i] - self.weftHeightBuffers[tPrev][i];
        const warpViscosityEffect = speedWarp * .25;
        const weftViscosityEffect = speedWeft * .25;
        const line = Math.floor(i / self.weaveWidth) * self.weaveWidth;
        const weftEffect = (
          -2 * self.weftHeightBuffers[t][i]
          + self.weftHeightBuffers[t][(i + 1) % self.weaveWidth + line]
          + self.weftHeightBuffers[t][(i + self.weaveWidth - 1) % self.weaveWidth + line]
        ) * 0.01;
        const warpEffect = (
          -2 * self.warpHeightBuffers[t][i]
          + self.warpHeightBuffers[t][(i + self.weaveWidth) % self.size]
          + self.warpHeightBuffers[t][(i + self.size - self.weaveWidth) % self.size]
        ) * 0.01;
        const distWarpWeft = self.warpHeightBuffers[t][i] - self.weftHeightBuffers[t][i];
        const absDist = Math.abs(distWarpWeft);
        const weftWarpEffect = absDist > .8 ? 0 : (absDist > .7 ? distWarpWeft * 0.01 : distWarpWeft * 0.03);
        self.warpHeightBuffers[tNext][i] = self.warpHeightBuffers[t][i] + warpEffect + weftWarpEffect + warpViscosityEffect;
        self.weftHeightBuffers[tNext][i] = self.weftHeightBuffers[t][i] + weftEffect - weftWarpEffect + weftViscosityEffect;
      }
    }
  }
};

export class PhysicalWeave {
  constructor(weave) {
    const [bytes, weaveWidth, weaveHeight] = weave;
    this.size = bytes.length;

    this.weaveWidth = weaveWidth;
    this.weaveHeight = weaveHeight;
    this.warpHeight = new Array(this.size);
    this.weftHeight = new Array(this.size);
    this.warpHeightBuffers = [this.warpHeight, new Array(this.size), new Array(this.size)];
    this.weftHeightBuffers = [this.weftHeight, new Array(this.size), new Array(this.size)];
    const self = this;
    bytes.forEach((x, i) => {
      self.weftHeightBuffers[0][i] = x ? 1.0 : -1.0;
      self.weftHeightBuffers[1][i] = x ? 1.0 : -1.0;
      self.weftHeightBuffers[2][i] = x ? 1.0 : -1.0;
      self.warpHeightBuffers[0][i] = x ? -1.0 : 1.0;
      self.warpHeightBuffers[1][i] = x ? -1.0 : 1.0;
      self.warpHeightBuffers[2][i] = x ? -1.0 : 1.0;
    });

    this.status = 'idle';
    this.step = 0;
    this.intervalId = null;

    this.startComputing();
  }

  toggle(x, y, knot) {
    const xx = y * this.weaveWidth + x;
    this.warpHeightBuffers[0][xx] = knot ? -1.0 : 1.0;
    this.warpHeightBuffers[1][xx] = knot ? -1.0 : 1.0;
    this.warpHeightBuffers[2][xx] = knot ? -1.0 : 1.0;
    this.weftHeightBuffers[0][xx] = knot ? 1.0 : -1.0;
    this.weftHeightBuffers[1][xx] = knot ? 1.0 : -1.0;
    this.weftHeightBuffers[2][xx] = knot ? 1.0 : -1.0;
    this.startComputing();
  };

  startComputing() {
    switch(this.status) {
      case 'computing': {
        clearInterval(this.intervalId);
        // no break
      }
      case 'idle': {
        this.status = 'computing';
        this.step = 0;
        const self = this;

        // start background compute
        this.intervalId = setInterval(() => {
          compute(self);
        }, 10)
      }
    }
  }
  stopComputing() {
    switch(this.status) {
      case 'computing': {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.status = 'idle';
      }
    }
  }
}



