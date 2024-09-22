const convertToMillions = (amount: number) => {
  return `${(amount / 1e6).toFixed(3)}M`;
}

export { convertToMillions }