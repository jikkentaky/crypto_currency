import BigNumber from "bignumber.js";
import { SUBSCRIPT_NUMBER_MAP } from "./config";

const formatTokenPrice = (price: number, precision?: number, gr0 = true) => {
  if (!price) {
    return price.toString()
  }

  if (!precision) {
    precision = calcPricePrecision(+price)
  }

  let formatted = new BigNumber(price).toFormat(precision)

  if (formatted.match(/^0\.[0]+$/g)) {
    formatted = formatted.replace(/\.[0]+$/g, '')
  }

  if (gr0 && formatted.match(/\.0{4,42}[1-9]+/g)) {
    const match = formatted.match(/\.0{4,42}/g)

    if (match) {
      const matchString = match[0].slice(1)
      formatted = formatted.replace(/\.0{4,42}/g, `.0${SUBSCRIPT_NUMBER_MAP[matchString.length]}`)
    }
  }

  return formatted
}

const calcPricePrecision = (num: number) => {
  if (!num) return 8

  switch (true) {
    case Math.abs(+num) < 0.000000000000000000000000001:
      return 32

    case Math.abs(+num) < 0.0000000000000000000000001:
      return 30

    case Math.abs(+num) < 0.00000000000000000000001:
      return 28

    case Math.abs(+num) < 0.000000000000000000001:
      return 26

    case Math.abs(+num) < 0.0000000000000000001:
      return 24

    case Math.abs(+num) < 0.00000000000000001:
      return 22

    case Math.abs(+num) < 0.000000000000001:
      return 20

    case Math.abs(+num) < 0.0000000000001:
      return 18

    case Math.abs(+num) < 0.00000000001:
      return 16

    case Math.abs(+num) < 0.000000001:
      return 14

    case Math.abs(+num) < 0.0000001:
      return 12

    case Math.abs(+num) < 0.00001:
      return 10

    case Math.abs(+num) < 0.05:
      return 6

    case Math.abs(+num) < 1:
      return 4

    case Math.abs(+num) < 20:
      return 3

    default:
      return 2
  }
}

export { formatTokenPrice }