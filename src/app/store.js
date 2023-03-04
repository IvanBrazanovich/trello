import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/login/loginSlice";
import boardReducer from "../features/app/boardSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    board: boardReducer,
  },
});
