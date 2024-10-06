'use client'

import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useStore } from '@/store';
import { CloseIcon } from '@/app/ui-components/icons';
import { Typography } from '@/app/ui-components/typography';
import { createContext, useContext, useState } from 'react';
import { TModalProps } from './types';
import Image from 'next/image';
import { Button } from '@mui/material';

type Props = {
  children: React.ReactNode
}

const modalTitles = {
  selectNetworks: 'Select networks',
  favoriteNetworks: 'Favorite networks',
}

const ModalContext = createContext<TModalProps>({
  isEditNetworks: false,
  setIsEditNetworks: () => { },
})

const ModalComponent: React.FC<Props> = ({ children }) => {
  const [isEditNetworks, setIsEditNetworks] = useState(false)
  const { isOpenModal, isNetworks, setIsOpenModal, setIsNetworks } = useStore()

  const handleClose = () => {
    setIsOpenModal(false)
    setIsEditNetworks(false)
    if (isNetworks) {
      setIsNetworks(false)
    }
  }

  const headerName = isEditNetworks ? modalTitles.favoriteNetworks : modalTitles.selectNetworks
  return (
    <ModalContext.Provider value={{ isEditNetworks, setIsEditNetworks }}>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.content}>
          <button className={styles['icon-wrapper']} onClick={handleClose}>
            <CloseIcon />
          </button>

          {isNetworks && (
            <div>
              <div className={styles.relative}>
                {isEditNetworks && (
                  <Button
                    className={styles['back-button']}
                    onClick={() => setIsEditNetworks(false)}
                  >
                    <Image
                      loading="lazy"
                      src={`/static/assets/images/arrow-back.png`}
                      alt={`back icon`}
                      width={24}
                      height={24}
                      className={styles.img}
                    />
                  </Button>
                )}
              </div>
              <h2>{headerName}</h2>

              <Typography>Toggle network visibility throughout the app.</Typography>
            </div>
          )}
          {children}
        </div>
      </Modal>
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalComponent, useModal }
