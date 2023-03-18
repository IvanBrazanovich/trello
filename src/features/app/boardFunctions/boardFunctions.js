import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBoardToWorkSpace } from "./workSpacesFunctions";

const getBoards = createAsyncThunk(
  "Boards/getBoards",
  async function (req, thunkApi) {
    const boards = JSON.parse(localStorage.getItem("boards"));
    return boards;
  }
);

const getBoardsOfWorkSpace = createAsyncThunk(
  "Boards/getBoardsOfWorkSpace",
  async function (workSpaceBoardIds, thunkApi) {
    const { allBoards } = thunkApi.getState().board;
    const boardsOfWorkSpace = {};

    workSpaceBoardIds.forEach((item) => {
      if (allBoards[item]) {
        boardsOfWorkSpace[item] = allBoards[item];
      }
    });

    return boardsOfWorkSpace;
  }
);

const addListToBoard = createAsyncThunk(
  "Board/addListToBoard",
  async function ({ listName }, thunkApi) {
    const { allBoards, currentBoard } = thunkApi.getState().board;

    const idNumber = Math.floor(Math.random() * 1000) + Date.now();

    const boardId = currentBoard.id;
    const boardCopy = { ...allBoards[boardId] };
    const listsCopyOfBoard = { ...boardCopy.lists };
    // const listCopyOfBoard = { ...copyOfBoard.lists };

    listsCopyOfBoard[idNumber] = {
      name: listName,
      id: idNumber.toString(),
      tareas: [],
    };

    const allBoardsNew = {
      ...allBoards,
      [boardId]: { ...boardCopy, lists: listsCopyOfBoard },
    };

    localStorage.setItem("boards", JSON.stringify(allBoardsNew));

    return allBoardsNew;
  }
);

const createBoard = createAsyncThunk(
  "Board/createBoard",
  async function ({ nameBoard, workSpaceId }, thunkApi) {
    console.log(nameBoard, workSpaceId);
    const { allBoards } = thunkApi.getState().board;
    const idBoardNumber = Math.floor(Math.random() * 1000) + Date.now();
    const newBoard = {
      id: idBoardNumber.toString(),
      name: nameBoard,
      lists: {},
    };
    thunkApi.dispatch(addBoardToWorkSpace({ workSpaceId, idBoardNumber }));

    const newBoards = { ...allBoards, [idBoardNumber]: newBoard };

    localStorage.setItem("boards", JSON.stringify(newBoards));

    return { newBoards, idBoardNumber };
  }
);

const getBoard = createAsyncThunk(
  "Board/getBoard",
  async function (boardId, thunkApi) {
    const { allBoards } = thunkApi.getState().board;
    const board = { ...allBoards[boardId] };
    return board;
  }
);

const moveBoardTareas = createAsyncThunk(
  "Board/moveBoardTareas",
  async function (board, thunkApi) {
    const { allBoards } = thunkApi.getState().board;
    const allBoardsCopy = structuredClone(allBoards);
    allBoardsCopy[board.id] = board;
    localStorage.setItem("boards", JSON.stringify(allBoardsCopy));

    return allBoardsCopy;
  }
);

export {
  getBoards,
  getBoard,
  createBoard,
  addListToBoard,
  getBoardsOfWorkSpace,
  moveBoardTareas,
};
