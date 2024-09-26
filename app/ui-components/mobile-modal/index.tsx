import { useStore } from "@/store";
import { Modal } from "@mui/material"
import styles from './styles.module.scss'
import { FC, ReactNode } from "react";
import { ArrowBackIcon, CloseIcon } from "@/app/ui-components/icons";
import cn from 'classnames';
import { useWindowDimensions } from "@/hooks/use-window-dimensions";

type Props = {
  className?: string
  children: ReactNode;
  open: boolean;
  onClose: (value: boolean) => void;
}

const MobileModal: FC<Props> = ({ children, className = '', open, onClose }) => {
  const { isNetworks, setIsNetworks, setSearchNetwork } = useStore()
  const { width } = useWindowDimensions()

  const handleClose = () => {
    onClose(false)
    setSearchNetwork('')

    if (isNetworks) {
      setIsNetworks(false)
    }
  };

  const handleBack = () => {
    setIsNetworks(false)
  }

  const isShowNetworkContent = isNetworks && width < 1100

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className={cn(styles.content, className)}>
        {isShowNetworkContent && <button className={styles['icon-back']} onClick={handleBack}>
          <ArrowBackIcon />
        </button>}

        <button className={styles['icon-close']} onClick={handleClose}>
          <CloseIcon />
        </button>

        {children}
      </div>
    </Modal>
  )
}

export { MobileModal }