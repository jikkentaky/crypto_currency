function convertToBillions(number: number) {
  return `${(number / 1e9).toFixed(3)}B`;
}

export { convertToBillions }