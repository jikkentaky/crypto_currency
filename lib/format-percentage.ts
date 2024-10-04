const formatPercentage = (num: number) => {
  if (num >= 100000) {
    return (num / 100000).toFixed(2) + 'B';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(2) + 'M';
  } else if (num >= 10) {
    return (num / 10).toFixed(2) + 'K';
  } else {
    return (num * 100).toFixed(2);
  }
}

export { formatPercentage }