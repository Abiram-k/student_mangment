import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: Boolean;
  user: {
    username: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucess: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSucess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
