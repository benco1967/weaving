
export const dumpPattern = ([bytes, width, height]) => {

  for (let y = 0; y < height; y++) {
    const xx = y * width;
    let txt = '';
    for (let x = 0; x < width; x++) {

      txt += bytes[xx + x] ? '|' : '-'
    }
    console.log(txt);
  }
  return [bytes, width, height];
};