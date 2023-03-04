import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Alert from "../../components/Alert";
import { setAlertAsync, testingState } from "../../features/app/boardSlice";

const Board = () => {
  // State
  const [board, setBoard] = useState({});
  // React redux
  const dispatch = useDispatch();

  // React redux
  const params = useParams();
  const navigateFunction = useNavigate();

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const currentBoard = boards.filter((item) => item.id === params.token);

    if (!currentBoard[0]) {
      dispatch(
        setAlertAsyncWithRedirect({ msg: "Something went wrong", error: true })
      );
    } else {
      setBoard(currentBoard);
    }
  }, []);

  return (
    <div>
      <Alert />
    </div>
  );
};

export default Board;
