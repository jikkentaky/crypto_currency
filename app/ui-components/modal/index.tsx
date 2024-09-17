'use client'

import Modal from '@mui/material/Modal';
import styles from './styles.module.scss'
import { useStore } from '@/store';
import { CloseIcon } from '@/app/ui-components/icons';

type Props = {
  isNetworkModal?: boolean
  children: React.ReactNode
}

const ModalComponent: React.FC<Props> = ({ isNetworkModal, children }) => {
  const { isOpenModal, setIsOpenModal } = useStore()

  const handleClose = () => {
    setIsOpenModal(false)
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
            {isNetworkModal && <h2>Favorite networks</h2>}

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