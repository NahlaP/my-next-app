"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { loginSuccess } from "@/app/store/authSlice";

const GlobalAuthChecker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);


useEffect(() => {
  if (!isAuthenticated && user && user.token) {
    dispatch(
      loginSuccess({
        name: user.name,
        email: user.email,
        token: user.token,
        isAdmin: user.isAdmin,
        pin: user.pin,
      })
    );
  }
}, [isAuthenticated, user, dispatch]);
  return null;
};

export default GlobalAuthChecker;
