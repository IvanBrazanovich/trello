import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Alert from "../../components/Alert";

import KanbanBoard from "../../components/app/board/KanbanBoard";
import KanbanHeader from "../../components/app/board/KanbanHeader";
import SideBarBoard from "../../components/app/board/SideBarBoard";
import { setAlertAsyncWithRedirect } from "../../features/app/boardSlice";
import styles from "../../styles/app/pages/board.module.scss";

const Board = () => {
  // State
  const [board, setBoard] = useState({});

  // React redux
  const dispatch = useDispatch();
  const navigateFunction = useNavigate();

  // React redux
  const params = useParams();

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const boardId = params.token;

    if (!boards[boardId]) {
      dispatch(
        setAlertAsyncWithRedirect({
          alert: { msg: "Something went wrong", error: true },
          navigateFunction,
        })
      );
    } else {
      setBoard(boards[boardId]);
    }
  }, []);

  return (
    <>
      <div>
        <Alert />
      </div>

      <main className={styles.board}>
        <aside className={styles.sideBoard}>
          <SideBarBoard board={board} />
        </aside>

        <div className={styles.kanban}>
          <KanbanHeader name={board.name} />
          <KanbanBoard board={board} setBoard={setBoard} />
        </div>
      </main>
    </>
  );
};

export default Board;
