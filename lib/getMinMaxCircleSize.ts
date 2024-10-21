const getMinMaxCircleSize = (width: number, height: number) => {
  const minSize = width > 1160 ? 0.03 : 0.035;
  const maxSize = width > 1160 ? 0.12 : 0.1;
  const max = Math.min(width, height) * maxSize;
  const min = Math.min(width, height) * minSize;

  return [max, min];
};

export { getMinMaxCircleSize }