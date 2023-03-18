import React, { useState } from "react";
import styles from "../../styles/login/pages/layoutAuth.module.scss";
import { useDispatch } from "react-redux";
import { setAlertAsync } from "../../features/login/loginSlice";
import { useSelector } from "react-redux";
import AlertLogin from "../../components/AlertLogin";

const ChangePassword = () => {
  // State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.login.alert);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if ([password, confirmPassword].map((item) => item.trim()).includes("")) {
      return dispatch(
        setAlertAsync({ msg: "All fields are required", error: true })
      );
    }

    if (password !== confirmPassword) {
      return dispatch(
        setAlertAsync({ msg: "Passwords don't match", error: true })
      );
    }
  };

  return (
    <div className={styles.form__container}>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {alert.msg && <AlertLogin />}
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
