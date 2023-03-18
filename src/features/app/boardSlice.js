import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addListToBoard,
  createBoard,
  getBoard,
  getBoards,
  getBoardsOfWorkSpace,
  moveBoardTareas,
} from "./boardFunctions/boardFunctions";
import { addTareaToList } from "./boardFunctions/tareasFunctions";
import {
  addBoardToWorkSpace,
  getWorkSpace,
  getWorkSpaces,
} from "./boardFunctions/workSpacesFunctions";

const initialState = {
  alert: {
    msg: "",
    error: false,
  },
  workSpaces: [],
  currentWorkSpace: {},
  currentBoard: {},
  currentListBasedOnBoard: [],
  allBoards: {},
  currentBoardsOfWorkSpace: {},
  redirectSuccess: false,
};

export const setAlertAsync = createAsyncThunk(
  "Board/setAlertAsync",
  async function (payload, { dispatch }) {
    dispatch(setAlert(payload));
    setTimeout(() => {
      dispatch(setAlert({ msg: "", error: false }));
    }, 3000);
  }
);
export const setAlertAsyncWithRedirect = createAsyncThunk(
  "Board/setAlertAsync",
  async function ({ alert, route }, { dispatch }) {
    dispatch(setAlert(alert));

    setTimeout(() => {
      dispatch(setAlert({ msg: "", error: false }));
      navigateFunction(`${route || "/app"}`);
    }, 3000);
  }
);

const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    changeRedirect: (state, action) => {
      state.redirectSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkSpaces.fulfilled, (state, action) => {
      if (action.payload) {
        state.workSpaces = action.payload;
      }
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.allBoards = action.payload;
    });
    builder.addCase(addBoardToWorkSpace.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(addBoardToWorkSpace.fulfilled, (state, action) => {
      state.workSpaces = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      const { newBoards, idBoardNumber } = action.payload;
      state.redirectSuccess = true;
      state.currentBoard = newBoards[idBoardNumber];
      state.allBoards = action.payload;
    });
    builder.addCase(getBoardsOfWorkSpace.fulfilled, (state, action) => {
      state.currentBoardsOfWorkSpace = action.payload;
    });
    builder.addCase(getWorkSpace.fulfilled, (state, action) => {
      state.currentWorkSpace = action.payload;
    });
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.currentBoard = action.payload;
    });
    builder.addCase(addTareaToList.fulfilled, (state, action) => {
      state.allBoards = action.payload;
    });
    builder.addCase(moveBoardTareas.fulfilled, (state, action) => {
      state.allBoards = action.payload;
    });
    builder.addCase(addListToBoard.fulfilled, (state, action) => {
      state.allBoards = action.payload;
    });
  },
});

export const { testingState, setAlert, changeRedirect } = boardSlice.actions;

export default boardSlice.reducer;
