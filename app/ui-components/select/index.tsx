import { useStore } from "@/store";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import styles from "./styles.module.scss"
import { PriceArrowIcon } from "@/app/ui-components/icons";
import { SORTING_BY } from "@/types/bubbles.type";

const customSelectFields = {
  [SORTING_BY.VOLUME_24] : 'Volume ($)',
  [SORTING_BY.LIQUIDITY] : 'Liquidity ($)',
  [SORTING_BY.MCAP] : 'Market Cap ($)',
  [SORTING_BY.DAY] : 'Price Change (%)',
}

const sortByMenu = Object.keys(customSelectFields).map(key => ({
  value: key,
  name: customSelectFields[key as keyof typeof customSelectFields],
}));

const CustomSelect = () => {
  const { sortBy, setSortBy } = useStore()

  const handleChange = (event: SelectChangeEvent) => {
    const fieldName = event.target.value as SORTING_BY
    setSortBy(fieldName);
  };

  return (
    <FormControl fullWidth className={styles['form-control']}>
      <Select
        value={sortBy}
        onChange={handleChange}
        defaultValue={sortBy}
        className={styles['select']}
        IconComponent={(props) => (
          <PriceArrowIcon {...props} className={`${props.className} ${styles['icon']}`} />
        )}
      >
        {sortByMenu.map(({ value, name }) => (
          <MenuItem value={value} key={value} className={styles['menu-item']}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export { CustomSelect }