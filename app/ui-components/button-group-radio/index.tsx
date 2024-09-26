import { FC } from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material';
import styles from './styles.module.scss';
import { PriceChangePercentage, Resolution } from '@/types/bubbles.type';
import cn from 'classnames';

type CustomToggleButton = ToggleButtonProps & {
  value: string;
  content: string;
};

type Props = ToggleButtonProps & {
  buttons: CustomToggleButton[];
  resolution: PriceChangePercentage | Resolution;
  setResolution: (value: PriceChangePercentage | Resolution) => void;
};

const ButtonGroupRadio: FC<Props> = ({ buttons, resolution, className, setResolution }) => {
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
      className={cn(className, styles['button-group'])}
      sx={{
        '.MuiToggleButton-root': {
          font: 'inherit',
          color: '#fff',
        },
        '.Mui-selected': {
          backgroundColor: '#261E51 !important',
        },
      }}
    >
      {buttons.map(({ value, content }) => (
        <ToggleButton
          key={value}
          value={value}
          className={cn(styles.button, { [styles.selected]: value === resolution })}
        >
          {content}
        </ToggleButton>
      ))
      }
    </ToggleButtonGroup >
  );
};

export { ButtonGroupRadio }
