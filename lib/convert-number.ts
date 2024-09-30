const convertNumber = (number: number) => {
  if (number < 1e3) {
    return `${number}`;
  }

  if (number < 1e6) {
    return `${(number / 1e3).toFixed(3)}K`;
  }

  if (number < 1e9) {
    return `${(number / 1e6).toFixed(3)}M`;
  }

  return `${(number / 1e9).toFixed(3)}B`;
}

export { convertNumber }