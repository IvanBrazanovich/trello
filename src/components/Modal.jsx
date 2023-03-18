import { X } from "@phosphor-icons/react";
import React from "react";
import ReactDOM from "react-dom";
import styles from "../styles/general/modal.module.scss";

const Modal = ({ children, setModal }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modal__close} onClick={(e) => setModal(false)}>
        <X size={32} weight="bold" />
      </div>
      <div className={styles.modal__content}>{children}</div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
