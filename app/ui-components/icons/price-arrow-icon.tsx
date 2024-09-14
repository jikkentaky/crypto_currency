import { FC } from "react"
// import styles from '@/app/components/coins-table/styles.module.scss'

type Props = {
  className?: string
}

const PriceArrowIcon: FC<Props> = ({ className }) => {
  return (
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0.352051 5.78979L5.35205 0.789795L10.3521 5.78979H0.352051Z" fill="white" />
    </svg>
  )
}

export { PriceArrowIcon }