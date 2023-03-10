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
      lists: {
        jasd128y2HA3idf: {
          name: "NameofList1",
          id: "jasd128y2HA3idf",
          tareas: [
            { name: "NameTarea", id: "jasd128y2HA3idf111" },
            { name: "NameTarea2", id: "ja2HAsd128y3aidf222" },
            { name: "NameTarea3", id: "ja1sd2HA128y3aidf333" },
            { name: "NameTarea4", id: "jasd128y13aidf444" },
            { name: "NameTarea5", id: "jas2HAd1228y3a2HA5idf555" },
          ],
        },
        jasda128y2HA3idf: {
          name: "NameofList2",
          id: "jasda128y2HA3idf",
          tareas: [
            { name: "NameTarea6", id: "ja1281hayidf666" },
            { name: "NameTarea7", id: "j1haasd1281hayaidf777" },
            { name: "NameTarea8", id: "ja18y3aidf888" },
            { name: "NameTarea9", id: "jas1had13a1haidf999" },
            { name: "NameTarea10", id: "jas8y3a5idf1000" },
          ],
        },
        jasda1a28y2HA3idf: {
          name: "NameofList3",
          id: "jasda1a28y2HA3idf",
          tareas: [
            { name: "NameTarea11", id: "jad1ha1yf" },
            { name: "NameTarea12", id: "js1ha128y3aidf" },
            { name: "NameTarea13", id: "ja1s1had1idf" },
            { name: "NameTarea14", id: "jasd13aidf" },
            { name: "NameTarea15", id: "ja1hasd122i1hadf" },
          ],
        },
      },
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
