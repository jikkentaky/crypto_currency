const formatPercentage = (num: number | null) => {
  if (!num) {
    return '0.00';
  }

  return num.toFixed(2);
}

export { formatPercentage }