const convertToUSD = (value: number, max = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: max,
  }).format(value)
}

export { convertToUSD }
