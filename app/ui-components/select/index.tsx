import { useStore } from "@/store";
import { SORT_BY } from "@/types/sort-by.enum";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import styles from "./styles.module.scss"
import { PriceArrowIcon } from "@/app/ui-components/icons";

const sortByMenu = Object.keys(SORT_BY).map(key => ({
  value: key,
  name: SORT_BY[key as keyof typeof SORT_BY],
}));

const CustomSelect = () => {
  const { sortBy, setSortBy } = useStore()

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SORT_BY);
  };

  return (
    <FormControl fullWidth>
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