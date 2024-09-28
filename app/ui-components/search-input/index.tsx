import { ChangeEvent, FC } from 'react';
import { BaseTextFieldProps, TextField } from '@mui/material';
import styles from './styles.module.scss';
import { SearchIcon } from '@/app/ui-components/icons';
import cn from 'classnames';

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
        <SearchIcon /> Search
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