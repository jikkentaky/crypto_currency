import { FC } from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material';
import styles from './styles.module.scss';
import { PriceChange } from '@/types/bubbles.type';
import cn from 'classnames';

type CustomToggleButton = ToggleButtonProps & {
  value: PriceChange;
  content: string;
};

type Props = {
  buttons: CustomToggleButton[];
  resolution: PriceChange;
  setResolution: (value: PriceChange) => void;
  className?: string;
};

const ButtonGroupRadio: FC<Props> = ({ buttons, resolution, className = '', setResolution }) => {

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    alignment: string,
  ) => {
    const newAlignment = alignment || resolution;
    setResolution(newAlignment as PriceChange)
  };

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
          fontWeight: 800,
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
      ))}
    </ToggleButtonGroup>
  );
};

export { ButtonGroupRadio };