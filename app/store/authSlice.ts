
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    pin?: string;
    isAdmin?: boolean;
    token?: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
   
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        isAdmin?: boolean;
        pin?: string;
        token: string;
      }>
    ) {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
        pin: action.payload.pin,
        token: action.payload.token, 
      };
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { signup, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
