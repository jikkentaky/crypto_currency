import { FC, ReactNode } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type TypographyProps = {
  children?: ReactNode
  variantWeight?: 'inherit' | 'regular' | 'medium' | 'semibold' | 'bold'
  variant?: 'body1' | 'body2'
  className?: string
  color?: 'green' | 'red'
}

const Typography: FC<TypographyProps> = ({
  children,
  variantWeight = 'inherit',
  variant = 'body1',
  color = '',
  className,
  ...props
}) => {
  return (
    <p
      className={cn(
        {
          [styles[variantWeight]]: variantWeight,
          [styles[variant]]: variant,
          [styles[color]]: color,
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export { Typography }
