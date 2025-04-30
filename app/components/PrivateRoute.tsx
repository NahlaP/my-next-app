// components/PrivateRoute.tsx
"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false); // Set loading to false once the user is authenticated
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent w-12 h-12 rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>; // Render protected content when authenticated
};

export default PrivateRoute;
