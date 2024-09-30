const formatPercentage = (num: number) => {
  if (num >= 1) {
    return Math.round(num) + 'K';
  } else {
    const decimalPart = num.toString().split('.')[1] || '';

    const paddedDecimal = decimalPart.padEnd(4, '0');

    return paddedDecimal[0] + paddedDecimal[1] + ',' + paddedDecimal[2] + paddedDecimal[3];
  }
}

export { formatPercentage }