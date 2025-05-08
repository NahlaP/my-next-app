
"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../store';
import { logout } from '../store/authSlice';

const LogoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-xl">Logging out...</div>
    </div>
  );
};

export default LogoutPage;
