import React from "react";
import AlertLogin from "../../components/AlertLogin";
import styles from "../../styles/login/pages/layoutAuth.module.scss";

const ConfirmAccount = () => {
  return (
    <div className={styles.form__container}>
      <h1>Confirm Account</h1>

      <form className={styles.form}>{alert.msg && <AlertLogin />}</form>
    </div>
  );
};

export default ConfirmAccount;
