import { FC } from 'react'

import { InputAdornment, TextField } from '@mui/material'


import styles from './styles.module.scss'
import { SearchIcon } from '@/app/ui-components/icons/search-icon'

type Props = {
  placeholder?: string
  searchInput?: string | null
  setSearchInput?: (value: string) => void
}

const SearchInput: FC<Props> = ({ placeholder, searchInput, setSearchInput }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      className={styles['search-field']}
      placeholder={placeholder}
      value={searchInput}
      onChange={(e) => setSearchInput?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
export { SearchInput }
