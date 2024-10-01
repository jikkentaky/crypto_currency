const formatPercentage = (num: number) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + 'M';
  } else if (num >= 10) {
    return (num / 10).toFixed(2) + 'K';
  } else if (num >= 0.1) {
    return (num * 100).toFixed(2);
  } else {
    return (num * 100).toFixed(2);
  }
}

export { formatPercentage }