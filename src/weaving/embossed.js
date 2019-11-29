import {convert} from "./convert";

const weave = `
x.x.........x.
.x.x.......x.x
x.x.x.....x.x.
xx.x.x...x.x.x
xxx.x.x.x.x.xx
xxxx.x.x.x.xxx
xxxxx.x.x.xxxx
xxxx.x.x.x.xxx
xxx.x.x.x.x.xx
xx.x.x...x.x.x
x.x.x.....x.x.
.x.x.......x.x
`;

export const getEmbossedWeave = () => convert(weave);