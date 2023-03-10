import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Alert from "../../components/Alert";

import KanbanBoard from "../../components/KanbanBoard";

const Board = () => {
  // State
  const [board, setBoard] = useState({});

  // React redux
  const dispatch = useDispatch();

  // React redux
  const params = useParams();

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const currentBoard = boards.filter((item) => item.id === params.token);

    if (!currentBoard[0]) {
      dispatch(
        setAlertAsyncWithRedirect({ msg: "Something went wrong", error: true })
      );
    } else {
      setBoard(currentBoard[0]);
    }
  }, []);

  return (
    <>
      <div>
        <Alert />
      </div>

      <KanbanBoard board={board} setBoard={setBoard} />
    </>
  );
};

export default Board;
