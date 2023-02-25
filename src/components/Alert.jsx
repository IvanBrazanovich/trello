import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/general/alert.module.scss";

const Alert = () => {
  const alert = useSelector((state) => state.login.alert);

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

export default Alert;
