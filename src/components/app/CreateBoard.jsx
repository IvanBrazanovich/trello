import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createBoard, setAlertAsync } from "../../features/app/boardSlice";
import styles from "../../styles/app/components/createBoard.module.scss";
import Alert from "../Alert";

const CreateBoard = ({ workSpaceId }) => {
  // State
  const [nameBoard, setNameBoard] = useState("");

  // React Router
  const navigateFunction = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state.board);
  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameBoard.trim() === "") {
      return dispatch(
        setAlertAsync({
          msg: "Field Required",
          error: true,
        })
      );
    }

    dispatch(createBoard({ nameBoard, navigateFunction, workSpaceId }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createBoardForm}>
      {alert.msg && <Alert />}
      <div>
        <label htmlFor="nameBoard">Name of Board</label>
        <input
          type="text"
          id="nameBoard"
          name="nameBoard"
          placeholder="Vacation Plan"
          value={nameBoard}
          onChange={(e) => setNameBoard(e.target.value)}
        />
      </div>
      <button type="Submit">Create</button>
    </form>
  );
};

export default CreateBoard;
