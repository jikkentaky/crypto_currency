'use client'

import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useStore } from '@/store';
import { CloseIcon } from '@/app/ui-components/icons';
import { createContext, useContext, useState } from 'react';
import { TModalProps } from './types';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useWindowDimensions } from '@/hooks/use-window-dimensions';

type Props = {
  children: React.ReactNode
}


const ModalContext = createContext<TModalProps>({
  isEditNetworks: false,
  setIsEditNetworks: () => { },
})

const ModalComponent: React.FC<Props> = ({ children }) => {
  const [isEditNetworks, setIsEditNetworks] = useState(false)
  const { isOpenModal, isNetworks, setIsOpenModal, setIsNetworks } = useStore()
  const { width } = useWindowDimensions()
  const isMobile = width < 1160;
  const handleClose = () => {
    setIsOpenModal(false)
    setIsEditNetworks(false)
    if (isNetworks) {
      setIsNetworks(false)
    }
  }

  return (
    <ModalContext.Provider value={{ isEditNetworks, setIsEditNetworks }}>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.content}>
          <div className={styles.relative}>
            {isEditNetworks && !isMobile && (
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
            <button className={styles['icon-wrapper']} onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </Modal>
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalComponent, useModal }
