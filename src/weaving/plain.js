export const getPlainWeave = () => {
  const bytes = new Uint8Array(4);

  bytes[0] = 0;
  bytes[1] = 1;
  bytes[2] = 1;
  bytes[3] = 0;
  return [bytes, 2, 2];
};