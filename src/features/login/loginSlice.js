import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    msg: "",
    error: false,
  },
};

export const setAlertAsync = createAsyncThunk(
  "Login/setAlertAsync",
  async function (payload, { dispatch }) {
    dispatch(setAlert(payload));

    setTimeout(() => {
      dispatch(setAlert({ msg: "", error: false }));
    }, 3000);
  }
);

// CRUD USER
export const registerUser = createAsyncThunk(
  "Login/registerUser",
  async function (data, { dispatch }) {
    const first_fetch = fetch(`url`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const second_fetch = first_fetch.json();

    if (second_fetch.status !== 200) {
      return dispatch(
        setAlertAsync({ msg: second_fetch.alert.message, error: true })
      );
    }

    return dispatch(
      setAlertAsync({ msg: second_fetch.alert.message, error: false })
    );
  }
);
export const loginUser = createAsyncThunk(
  "Login/loginUser",
  async function (data, { dispatch }) {
    const first_fetch = fetch(`url/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const second_fetch = first_fetch.json();

    if (second_fetch.status !== 200) {
      return dispatch(
        setAlertAsync({ msg: second_fetch.alert.message, error: true })
      );
    }

    return dispatch(
      setAlertAsync({ msg: second_fetch.alert.message, error: false })
    );
  }
);
export const forgotPasswordUser = createAsyncThunk(
  "Login/forgotPasswordUser",
  async function (data, { dispatch }) {
    const first_fetch = fetch(`url`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const second_fetch = first_fetch.json();

    if (second_fetch.status !== 200) {
      return dispatch(
        setAlertAsync({ msg: second_fetch.alert.message, error: true })
      );
    }

    return dispatch(
      setAlertAsync({ msg: second_fetch.alert.message, error: false })
    );
  }
);
export const changePasswordUser = createAsyncThunk(
  "Login/changePasswordUser",
  async function (data, { dispatch }) {
    const first_fetch = fetch(`url`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const second_fetch = first_fetch.json();

    if (second_fetch.status !== 200) {
      return dispatch(
        setAlertAsync({ msg: second_fetch.alert.message, error: true })
      );
    }

    return dispatch(
      setAlertAsync({ msg: second_fetch.alert.message, error: false })
    );
  }
);
export const confirmAccountUser = createAsyncThunk(
  "Login/confirmAccountUser",
  async function (data, { dispatch }) {
    const first_fetch = fetch(`url/dataToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const second_fetch = first_fetch.json();

    if (second_fetch.status !== 200) {
      return dispatch(
        setAlertAsync({ msg: second_fetch.alert.message, error: true })
      );
    }

    return dispatch(
      setAlertAsync({ msg: second_fetch.alert.message, error: false })
    );
  }
);

export const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setAlert: () => {
      state.alert = action.payload;
    },
  },
});

export const { setAlert } = loginSlice.actions;

export default loginSlice.reducer;
