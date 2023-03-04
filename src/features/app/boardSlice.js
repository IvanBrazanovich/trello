import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    msg: "",
    error: false,
  },
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
  async function ({ alert, navigateFunction, toWhere }, { dispatch }) {
    dispatch(setAlert(alert));

    setTimeout(() => {
      dispatch(setAlert({ msg: "", error: false }));
      navigateFunction(`${toWhere}`);
    }, 3000);
  }
);

export const createNewBoard = createAsyncThunk(
  "Board/createBoard",
  async function ({ nameBoard, navigateFunction }, { dispatch }) {
    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();
    const newBoard = {
      name: nameBoard,
      tareas: [],
      id: idNumber.toString(),
    };

    const newBoards = [...boards, newBoard];
    localStorage.setItem("boards", JSON.stringify(newBoards));

    navigateFunction(`board/${newBoard.id}`);
    // Logic to consume endpoint
  }
);

const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { testingState, setAlert } = boardSlice.actions;

export default boardSlice.reducer;
