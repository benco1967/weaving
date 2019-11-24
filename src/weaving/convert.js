export const convert = txt => {
  const weave = txt.split('\n').filter(word => word.length > 1);
  return [new Uint8Array(weave.flatMap(x => x.split('')).reduce((r, x) => {
      switch (x) {
        case 'x' :
          r.push(1);
          break;
        case '.' :
          r.push(0);
          break;
        default:
      }
      return r;
    }, [])
  ), weave[0].length, weave.length];
};