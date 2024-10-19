import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const SearchInput: FC<Props> = ({ placeholder, value, className, onChange, ...restProps }) => {

  return (
    <input
      type="text" value={value}
      onChange={onChange}
      className={cn(styles['search-field'], className)}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export { SearchInput };