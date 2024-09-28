import { ChangeEvent, FC } from 'react';
import { BaseTextFieldProps, TextField } from '@mui/material';
import styles from './styles.module.scss';
import cn from 'classnames';
import Image from 'next/image';

type Props = BaseTextFieldProps & {
  isHide?: boolean;
  width?: string;
  icon?: JSX.Element;
  onChange: (value: string) => void;
};

const SearchInput: FC<Props> = ({ isHide = false, placeholder, value, width = '215px', onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles['search-wrapper']}>
      <label
        htmlFor="outlined-basic"
        className={cn(styles['search-label'], {
          [styles['hide']]: !isHide
        })}
      >
        <Image
          src="/static/assets/networks-icons/search.png"
          alt="search-icon" width={16} height={16}
        />
        Search
      </label>

      <TextField
        id="outlined-basic"
        variant="outlined"
        className={styles['search-field']}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        sx={{
          '&': {
            width: width + ' !important',
          },
          '& .MuiInputBase-input': {
            fontFamily: '"Jersey 10", sans-serif',
            color: '#fff',
            fontSize: '16px !important',
          },
          '& .MuiInputBase-input::placeholder': {
            fontFamily: '"Jersey 10", sans-serif',
            color: '#fff',
            opacity: 1,
            fontSize: '16px !important',
          }
        }}
      />
    </div>
  );
};

export { SearchInput };