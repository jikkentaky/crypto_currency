import { ChangeEvent, FC } from 'react';
import { BaseTextFieldProps, TextField } from '@mui/material';
import styles from './styles.module.scss';
import cn from 'classnames';

type Props = BaseTextFieldProps & {
  isHide?: boolean;
  width?: string;
  icon?: JSX.Element;
  onChange: (value: string) => void;
};

const SearchInput: FC<Props> = ({ isHide = false, placeholder, value, width = '215px', className, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(styles['search-wrapper'], className)}>
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
            fontFamily: '"Work Sans", sans-serif',
            color: '#fff',
            fontSize: '16px !important',
          },
          '& .MuiInputBase-input::placeholder': {
            fontFamily: '"Work Sans", sans-serif',
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