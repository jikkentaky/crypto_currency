import { ChangeEvent, FC } from 'react';
import { BaseTextFieldProps, TextField } from '@mui/material';
import styles from './styles.module.scss';
import { SearchIcon } from '../icons';
import '@/app/globals.scss';

type Props = BaseTextFieldProps & {
  width?: string;
  icon?: JSX.Element;
  onChange: (value: string) => void;
};

const SearchInput: FC<Props> = ({ placeholder, value, width = '215px', onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles['search-wrapper']}>
      <label htmlFor="outlined-basic" className={styles['search-label']}>
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
            fontFamily: '"Press Start 2P", system-ui',
            color: '#fff',
            fontSize: '8px !important',
          },
          '& .MuiInputBase-input::placeholder': {
            fontFamily: '"Press Start 2P", system-ui',
            color: '#fff',
            opacity: 1,
            fontSize: '8px !important',
          }
        }}
      />
    </div>
  );
};

export { SearchInput };