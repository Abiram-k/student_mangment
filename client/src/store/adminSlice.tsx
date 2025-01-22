import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isLoggedIn: Boolean;
  admin: {
    username: string;
    email: string;
  } | null;
}

const initialState: AdminState = {
  isLoggedIn: false,
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginSuccess: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.admin = action.payload;
    },
    adminLogoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.admin = null;
    },
  },
});

export const { adminLoginSuccess, adminLogoutSuccess } = adminSlice.actions;
export default adminSlice.reducer;
