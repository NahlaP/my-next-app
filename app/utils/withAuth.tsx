"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "../store";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push(`/login?redirectTo=${pathname}`);
      }
    }, [isAuthenticated, router, pathname]);

    if (!isAuthenticated) {
      return <div className="text-center mt-10">Redirecting to login...</div>;
    }

    return <WrappedComponent />;
  };

  return AuthWrapper;
};

export default withAuth;
