import Image from 'next/image';
import styles from './styles.module.scss';
import { SearchInput } from '@/app/ui-components/search-input';
import { useStore } from '@/store';
import { Typography } from '@/app/ui-components/typography';
import { EditIcon } from '@/app/ui-components/icons';
import { useMemo } from 'react';
import cn from 'classnames';

const MobileModalNetworks = () => {
  const { searchNetwork, chosenNetwork, networkList, setSearchNetwork, setChosenNetwork, setIsNetworks } = useStore()

  const filteredNetworks = useMemo(
    () =>
      networkList?.filter(({ name, isVisible }) =>
        name.toLowerCase().includes(searchNetwork.toLowerCase().trim()) && isVisible,
      ),
    [searchNetwork, networkList],
  )

  return (
    <>
      <div className={styles['networks-search']}>
        <SearchInput
          isHide
          placeholder="Enter network..."
          value={searchNetwork}
          onChange={setSearchNetwork}
        />
      </div>

      <Typography className={styles.title}>All networks</Typography>

      <div className={styles['networks']}>
        {filteredNetworks && filteredNetworks.map(({ id, name, isVisible }) => {
          const imageName = name.toLowerCase().replace(/\s+/g, '-');
          const path = `/static/assets/networks-icons/${imageName}.png`;

          return (
            <button
              key={id}
              className={cn(styles.button,
                { [styles.selected]: chosenNetwork?.id === id })
              }
              onClick={() => setChosenNetwork({ id, name, isVisible })}
            >
              <Image
                loading='lazy'
                src={path}
                alt={`${name} icon`}
                width={24}
                height={24}
                className={styles.img}
              />

              <span>
                {name}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.edit} onClick={() => setIsNetworks(true)}>
        <EditIcon />
        Edit favorite networks
      </div>
    </>
  )
}

export { MobileModalNetworks }