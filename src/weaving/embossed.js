import {convert} from "./convert";

const weave = `
xxxxx.x.x.xxxx
xxxx.x.x.x.xxx
xxx.x.x.x.x.xx
xx.x.x...x.x.x
x.x.x.....x.x.
.x.x.......x.x
x.x.........x.
.x.x.......x.x
x.x.x.....x.x.
xx.x.x...x.x.x
xxx.x.x.x.x.xx
xxxx.x.x.x.xxx
`;

export const getEmbossedWeave = () => convert(weave);