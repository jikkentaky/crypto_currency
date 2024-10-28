type Props = {
  className?: string
}

const PriceArrowIcon = ({ className }: Props) => {
  return (
    <svg width='20' height='18' viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.9409 5.97064L5.05859 5.97064L5.05859 7.38241L6.47036 7.38241L6.47036 8.79417L7.88212 8.79417L7.88212 10.2059L9.29389 10.2059L9.29389 11.6177L10.7057 11.6177L10.7057 10.2059L12.1174 10.2059L12.1174 8.79417L13.5292 8.79417L13.5292 7.38241L14.9409 7.38241L14.9409 5.97064Z" fill="#F9F9F9" />
    </svg>

  )
}

export { PriceArrowIcon }