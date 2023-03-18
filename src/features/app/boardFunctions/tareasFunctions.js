import { createAsyncThunk } from "@reduxjs/toolkit";
const addTareaToList = createAsyncThunk(
  "Board/addTareaToList",

  async function ({ tareaName, listId }, thunkApi) {
    const { allBoards, currentBoard } = thunkApi.getState().board;
    const idNumber = Math.floor(Math.random() * 1000) + Date.now();

    const allBoardsCopy = structuredClone(allBoards);

    allBoardsCopy[currentBoard.id].lists[listId].tareas.push({
      name: tareaName,
      id: idNumber.toString(),
    });

    localStorage.setItem("boards", JSON.stringify(allBoardsCopy));
    return allBoardsCopy;
  }
);

export { addTareaToList };
