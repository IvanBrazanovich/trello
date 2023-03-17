import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    msg: "",
    error: false,
  },
  workSpaces: [],
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
      navigateFunction(`${toWhere || "/app"}`);
    }, 3000);
  }
);

export const createBoard = createAsyncThunk(
  "Board/createBoard",
  async function ({ nameBoard, navigateFunction, workSpaceId }, { dispatch }) {
    const boards = JSON.parse(localStorage.getItem("boards")) || [];
    const idBoardNumber = Math.floor(Math.random() * 1000) + Date.now();
    const newBoard = {
      id: idBoardNumber.toString(),
      name: nameBoard,
      lists: {},
    };
    addToWorkSpace(workSpaceId, idBoardNumber);
    // const newBoard = {
    //   name: nameBoard,
    //   lists: {
    //     jasd128y2HA3idf: {
    //       name: "NameofList1",
    //       id: "jasd128y2HA3idf",
    //       tareas: [
    //         { name: "NameTarea", id: "jasd128y2HA3idf111" },
    //         { name: "NameTarea2", id: "ja2HAsd128y3aidf222" },
    //         { name: "NameTarea3", id: "ja1sd2HA128y3aidf333" },
    //         { name: "NameTarea4", id: "jasd128y13aidf444" },
    //         { name: "NameTarea5", id: "jas2HAd1228y3a2HA5idf555" },
    //       ],
    //     },
    //     jasda128y2HA3idf: {
    //       name: "NameofList2",
    //       id: "jasda128y2HA3idf",
    //       tareas: [
    //         { name: "NameTarea6", id: "ja1281hayidf666" },
    //         { name: "NameTarea7", id: "j1haasd1281hayaidf777" },
    //         { name: "NameTarea8", id: "ja18y3aidf888" },
    //         { name: "NameTarea9", id: "jas1had13a1haidf999" },
    //         { name: "NameTarea10", id: "jas8y3a5idf1000" },
    //       ],
    //     },
    //     jasda1a28y2HA3idf: {
    //       name: "NameofList3",
    //       id: "jasda1a28y2HA3idf",
    //       tareas: [
    //         { name: "NameTarea11", id: "jad1ha1yf" },
    //         { name: "NameTarea12", id: "js1ha128y3aidf" },
    //         { name: "NameTarea13", id: "ja1s1had1idf" },
    //         { name: "NameTarea14", id: "jasd13aidf" },
    //         { name: "NameTarea15", id: "ja1hasd122i1hadf" },
    //       ],
    //     },
    //   },
    //   id: idNumber.toString(),
    // };
    const newBoards = { ...boards, [idBoardNumber]: newBoard };

    localStorage.setItem("boards", JSON.stringify(newBoards));

    navigateFunction(`/app/board/${newBoard.id}`);
    // Logic to consume endpoint
  }
);

const addToWorkSpace = (workSpaceId, idBoardNumber) => {
  const workSpaces = JSON.parse(localStorage.getItem("workSpaces"));

  let workSpaceKey;
  const workSpace = workSpaces.filter((item, key) => {
    if (item.id === workSpaceId) {
      workSpaceKey = key;
      return true;
    } else {
      return false;
    }
  })[0];
  workSpace.boards.push(idBoardNumber.toString());

  const newWorkSpaces = workSpaces.map((item) =>
    item.id === workSpace.id ? workSpace : item
  );
  console.log(newWorkSpaces);
  localStorage.setItem("workSpaces", JSON.stringify(newWorkSpaces));
};

export const createWorkSpace = createAsyncThunk(
  "Board/createWorkSpace",
  async function ({ nameWorkSpace, navigateFunction, setModal }, { dispatch }) {
    const workSpaces = JSON.parse(localStorage.getItem("workSpaces")) || [];
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();
    const newWorkSpace = {
      name: nameWorkSpace,
      boards: [],
      id: idNumber.toString(),
    };

    const newWorkSpaces = [...workSpaces, newWorkSpace];
    localStorage.setItem("workSpaces", JSON.stringify(newWorkSpaces));
    setModal(false);
  }
);

export const getWorkSpaces = createAsyncThunk(
  "Board/getWorkSpaces",
  async function () {
    const workSpaces = JSON.parse(localStorage.getItem("workSpaces"));
    return workSpaces;
  }
);

export const addListToBoard = createAsyncThunk(
  "Board/addListToBoard",
  async function ({ listName, boardId }, { dispatch }) {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();

    console.log(boardId, listName);
    boards[boardId].lists[idNumber] = {
      name: listName,
      id: idNumber.toString(),
      tareas: [],
    };

    localStorage.setItem("boards", JSON.stringify(boards));
  }
);

export const addTareaToList = createAsyncThunk(
  "Board/addTareaToList",
  async function ({ tareaName, listId, boardId }, { dispatch }) {
    const boards = JSON.parse(localStorage.getItem("boards"));
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();
    console.log(tareaName, listId, boardId);

    boards[boardId].lists[listId].tareas.push({
      name: tareaName,
      id: idNumber.toString(),
    });
    localStorage.setItem("boards", JSON.stringify(boards));
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
  extraReducers: (builder) => {
    builder.addCase(getWorkSpaces.fulfilled, (state, action) => {
      if (action.payload) {
        state.workSpaces = action.payload;
      }
    });
  },
});

export const { testingState, setAlert } = boardSlice.actions;

export default boardSlice.reducer;
