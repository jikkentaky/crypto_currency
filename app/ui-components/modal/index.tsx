'use client'

import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useStore } from '@/store';
import { CloseIcon } from '@/app/ui-components/icons';
import { Typography } from '@/app/ui-components/typography';

type Props = {
  children: React.ReactNode
}

const ModalComponent: React.FC<Props> = ({ children }) => {
  const { isOpenModal, isNetworks, setIsOpenModal, setIsNetworks } = useStore()

  const handleClose = () => {
    setIsOpenModal(false)

    if (isNetworks) {
      setIsNetworks(false)
    }
  };

  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.content}>
          <div className={styles['title-wrapper']}>
            {isNetworks &&
              <div>
                <h2>Favorite networks</h2>

                <Typography>
                  Toggle network visibility throughout the app.
                </Typography>
              </div>}

            <button className={styles['icon-wrapper']} onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </Modal>
    </div>
  );
}

export { ModalComponent }