import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/general/alert.module.scss";

const Alert = () => {
  const [alert, setAlert] = useState({});

  const alertLogin = useSelector((state) => state.login.alert);
  const alertBoard = useSelector((state) => state.board.alert);

  useEffect(() => {
    if (alertLogin.msg) {
      setAlert(alertLogin);
    } else {
      setAlert(alertBoard);
    }
  }, [alertBoard, alertLogin]);

  if (!alert.msg) {
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

export default Alert;
