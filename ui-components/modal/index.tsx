"use client";

import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "@/ui-components/icons";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

const ModalComponent: React.FC<Props> = ({ children, isOpen, handleClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.content}>
        <div className={styles.relative}>
          <button className={styles["icon-wrapper"]} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export { ModalComponent };
