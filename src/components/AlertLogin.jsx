import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/general/alert.module.scss";

const AlertLogin = () => {
  const alertLogin = useSelector((state) => state.login.alert);

  if (!alertLogin.msg) {
    return null;
  }
  return (
    <div
      className={`${styles.alert} ${
        alert.error ? styles.alert__red : styles.alert__blue
      }`}
    >
      {alert.msg}
    </div>
  );
};

export default AlertLogin;
