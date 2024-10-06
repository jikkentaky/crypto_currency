import { FC } from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonProps } from '@mui/material';
import styles from './styles.module.scss';
import { SORTING_BY, Resolution, PriceChange } from '@/types/bubbles.type';
import cn from 'classnames';
import { useStore } from '@/store';

type CustomToggleButton = ToggleButtonProps & {
  value: SORTING_BY | Resolution;
  content: string;
};

type Props = {
  buttons: CustomToggleButton[];
  resolution: SORTING_BY | Resolution;
  setResolution: (value: SORTING_BY | Resolution) => void;
  className?: string;
};

const ButtonGroupRadio: FC<Props> = ({ buttons, resolution, className = '', setResolution }) => {

  const { currentResolution, isOpenModal, sortBy, setCurrentResolution } = useStore()
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    alignment: string,
  ) => {
    const newAlignment = alignment || resolution;

    if (isOpenModal) {
      setResolution(newAlignment as SORTING_BY | Resolution)
    }

    if (sortBy === SORTING_BY.DAY) {
      setResolution(newAlignment as SORTING_BY | Resolution);
    }

    if (newAlignment === PriceChange.HOUR || newAlignment === PriceChange.DAY || newAlignment === PriceChange.FOUR_HOURS || newAlignment === PriceChange.TWELVE_HOURS) {
      setCurrentResolution(newAlignment as PriceChange)
    }
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
          className={cn(styles.button, { [styles.selected]: value === currentResolution as any })}
        >
          {content}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export { ButtonGroupRadio };