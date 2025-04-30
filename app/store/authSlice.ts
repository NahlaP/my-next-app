
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
//   user: { name: string; email: string; password: string } | null;
user: { name: string; email: string; password: string; pin?: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // signup(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
    //   state.user = action.payload;
    // },
    signup(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      
    // loginSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
    //     state.isAuthenticated = true;
    //     state.user = {
    //       name: action.payload.name,
    //       email: action.payload.email,
    //       password: '', // or remove this if password not needed
    //     };
    //   },
    // loginSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
        loginSuccess(state, action: PayloadAction<{ name: string; email: string; pin?: string }>) {
        state.isAuthenticated = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          password: "", // optional: you can remove this field entirely
        };
      },
      
      
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { signup, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
