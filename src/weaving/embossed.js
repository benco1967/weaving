import {convert} from "./convert";

const weave = `
xxxxx.x.x.x.x.
.xxx.x.x...x.x
x.x.x.x.....x.
.x.x.x.......x
x.x.x.........
.x.x.x.......x
x.x.x.x.....x.
.xxx.x.x...x.x
xxxxx.x.x.x.x.
xxxxxx.x.x.x.x
xxxxxxx.x.x.xx
xxxxxx.x.x.x.x
`;

export const getEmbossedWeave = () => convert(weave);