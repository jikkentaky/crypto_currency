import { FC } from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material';
import styles from './styles.module.scss';
import { PriceChangePercentage, Resolution } from '@/types/bubbles.type';

type CustomToggleButton = ToggleButtonProps & {
  value: string;
  content: string;
};

type Props = {
  buttons: CustomToggleButton[];
  resolution: PriceChangePercentage | Resolution;
  setResolution: (value: PriceChangePercentage | Resolution) => void;
};

const ButtonGroupRadio: FC<Props> = ({ buttons, resolution, setResolution }) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setResolution(newAlignment as PriceChangePercentage | Resolution)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={resolution}
      exclusive
      onChange={handleChange}
      aria-label="price-change"
      className={styles['button-group']}
      sx={{
        '.MuiToggleButton-root': {
          color: '#fff',
        },
        '.Mui-selected': {
          backgroundColor: '#00dc3e !important',
          color: '#000',
        },
      }}
    >
      {buttons.map(({ value, content }) => (
        <ToggleButton key={value} value={value} className={styles.button}>
          {content}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export { ButtonGroupRadio }
