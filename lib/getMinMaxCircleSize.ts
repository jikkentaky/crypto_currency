const getMinMaxCircleSize = (width: number, height: number) => {
  const max = Math.min(width, height) * 0.1;
  const min = Math.min(width, height) * 0.020;

  return [max, min];
};

export { getMinMaxCircleSize }