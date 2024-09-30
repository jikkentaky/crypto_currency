const formatPercentage = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toLocaleString('en-US') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toLocaleString('en-US') + 'K';
  } else if (num >= 1) {
    return Math.round(num).toLocaleString('en-US');
  } else {
    const decimalPart = num.toString().split('.')[1] || '';

    const paddedDecimal = decimalPart.padEnd(4, '0');

    return paddedDecimal[1] + ',' + paddedDecimal[2] + paddedDecimal[3];
  }
}

export { formatPercentage }