import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../features/app/boardFunctions/boardFunctions";
import { setAlertAsync } from "../../features/app/boardSlice";
import useRedirect from "../../hooks/useRedirect";
import styles from "../../styles/app/components/createBoard.module.scss";
import AlertBoard from "../AlertBoard";

const CreateBoard = ({ workSpaceId }) => {
  // State
  const [nameBoard, setNameBoard] = useState("");

  // Redux
  const dispatch = useDispatch();
  const { alert, currentBoard } = useSelector((state) => state.board);

  // custom hooks
  useRedirect(`/app/board/${currentBoard.id}`, currentBoard);

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

    dispatch(createBoard({ nameBoard, workSpaceId }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createBoardForm}>
      {alert.msg && <AlertBoard />}
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
