import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AlertBoard from "../../components/AlertBoard";

import KanbanBoard from "../../components/app/board/KanbanBoard";
import KanbanHeader from "../../components/app/board/KanbanHeader";
import SideBarBoard from "../../components/app/board/SideBarBoard";
import {
  getBoard,
  getBoards,
  moveBoardTareas,
} from "../../features/app/boardFunctions/boardFunctions";
import { setAlertAsyncWithRedirect } from "../../features/app/boardSlice";
import styles from "../../styles/app/pages/board.module.scss";

const Board = () => {
  // State
  const [boardCopy, setBoardCopy] = useState({});

  // React redux
  const dispatch = useDispatch();

  const { allBoards, currentBoard } = useSelector((state) => state.board);

  // React redux
  const params = useParams();

  useEffect(() => {
    const boardId = params.token;

    // if (!boards[boardId]) {
    //   dispatch(
    //     setAlertAsyncWithRedirect({
    //       alert: { msg: "Something went wrong", error: true },
    //       navigateFunction,
    //     })
    //   );
    // }
    const callDispatch = async () => {
      await dispatch(getBoards());

      dispatch(getBoard(boardId));
    };

    callDispatch();
  }, []);

  useEffect(() => {
    const boardId = params.token;

    dispatch(getBoard(boardId));
  }, [allBoards]);

  useEffect(() => {
    setBoardCopy(structuredClone(currentBoard));
  }, [currentBoard]);

  const handleBoardChange = (board) => {
    setBoardCopy(board);
    dispatch(moveBoardTareas(board));
  };

  return (
    <>
      <div>
        <AlertBoard />
      </div>

      <main className={styles.board}>
        <aside className={styles.sideBoard}>
          <SideBarBoard board={boardCopy} />
        </aside>

        <div className={styles.kanban}>
          <KanbanHeader name={boardCopy.name} />
          <KanbanBoard board={boardCopy} setBoard={handleBoardChange} />
        </div>
      </main>
    </>
  );
};

export default Board;
