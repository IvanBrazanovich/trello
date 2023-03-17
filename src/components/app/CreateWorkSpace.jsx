import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Alert from "../Alert";
import styles from "../../styles/app/components/createWorkSpace.module.scss";
import { createWorkSpace } from "../../features/app/boardSlice";

const CreateWorkSpace = ({ setModal }) => {
  // State
  const [nameWorkSpace, setNameWorkSpace] = useState("");

  // React Router
  const navigateFunction = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.board);

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameWorkSpace.trim() === "") {
      return dispatch(
        setAlertAsync({
          msg: "Field Required",
          error: true,
        })
      );
    }

    dispatch(createWorkSpace({ nameWorkSpace, navigateFunction, setModal }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createWorkSpace}>
      {alert.msg && <Alert />}
      <div>
        <label htmlFor="nameWorkSpace">Name of WorkSpace</label>
        <input
          type="text"
          id="nameWorkSpace"
          name="nameWorkSpace"
          placeholder="Vacation Plan"
          value={nameWorkSpace}
          onChange={(e) => setNameWorkSpace(e.target.value)}
        />
      </div>
      <button type="Submit">Create</button>
    </form>
  );
};

export default CreateWorkSpace;
