import { FC } from "react"
import styles from './styles.module.scss'
import { ButtonBaseProps } from "@mui/material"
import cn from 'classnames'

const MobileButton: FC<ButtonBaseProps> = ({ children, className = '', onClick }) => {
  return (
    <button className={cn(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}

export { MobileButton }