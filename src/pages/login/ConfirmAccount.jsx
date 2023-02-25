import React from "react";
import styles from "../../styles/login/pages/layoutAuth.module.scss";
import Alert from "../../components/Alert";

const ConfirmAccount = () => {
  return (
    <div className={styles.form__container}>
      <h1>Confirm Account</h1>

      <form className={styles.form}>{alert.msg && <Alert />}</form>
    </div>
  );
};

export default ConfirmAccount;
