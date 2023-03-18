import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { setAlertAsyncWithRedirect } from "../boardSlice";
import { getBoardsOfWorkSpace } from "./boardFunctions";

const addBoardToWorkSpace = createAsyncThunk(
  "Board/addListToWorkSpace",
  async function ({ workSpaceId, idBoardNumber }, thunkApi) {
    const { workSpaces } = thunkApi.getState().board;
    const currentWorkSpace = { ...workSpaces[workSpaceId] };
    const currentWorkSpaceBoards = [...currentWorkSpace.boards];

    currentWorkSpaceBoards.push(idBoardNumber.toString());
    currentWorkSpace.boards = currentWorkSpaceBoards;

    const copyWorkSpaces = { ...workSpaces };

    copyWorkSpaces[workSpaceId] = { ...currentWorkSpace, ...workSpaces };
    localStorage.setItem("workSpaces", JSON.stringify(copyWorkSpaces));
    return copyWorkSpaces;
  }
);

const createWorkSpace = createAsyncThunk(
  "Board/createWorkSpace",
  async function ({ nameWorkSpace, navigateFunction, setModal }, { dispatch }) {
    const workSpaces = JSON.parse(localStorage.getItem("workSpaces")) || {};
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();
    const newWorkSpace = {
      name: nameWorkSpace,
      boards: [],
      id: idNumber.toString(),
    };

    const copyWorkSpaces = { ...workSpaces };
    copyWorkSpaces[idNumber] = newWorkSpace;

    localStorage.setItem("workSpaces", JSON.stringify(copyWorkSpaces));

    setModal(false);
  }
);

const getWorkSpaces = createAsyncThunk(
  "Board/getWorkSpaces",
  async function () {
    const workSpaces = JSON.parse(localStorage.getItem("workSpaces"));
    return workSpaces;
  }
);

const getWorkSpace = createAsyncThunk(
  "Boards/getWorkSpace",
  async function (workspaceId, thunkApi) {
    const { workSpaces } = thunkApi.getState().board;

    const currentWorkSpace = workSpaces[workspaceId];

    if (!currentWorkSpace) {
      return thunkApi.dispatch(
        setAlertAsyncWithRedirect({
          alert: { msg: "Something went wrong", error: true },
          navigateFunction,
        })
      );
    }

    await thunkApi.dispatch(getBoardsOfWorkSpace(currentWorkSpace.boards));

    return currentWorkSpace;
  }
);

export { getWorkSpace, getWorkSpaces, createWorkSpace, addBoardToWorkSpace };
