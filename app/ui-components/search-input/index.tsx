import { ChangeEvent, FC } from 'react';
import { BaseTextFieldProps, InputAdornment, TextField } from '@mui/material';
import styles from './styles.module.scss';

type Props = BaseTextFieldProps & {
  icon?: JSX.Element;
  onChange: (value: string) => void;
};

const SearchInput: FC<Props> = ({ placeholder, value, label, icon, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {label && (
        <label htmlFor="outlined-basic" className={styles['search-label']}>
          {label}
        </label>
      )}

      <TextField
        id="outlined-basic"
        variant="outlined"
        className={styles['search-field']}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export { SearchInput };