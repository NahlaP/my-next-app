// app/dashboard/page.tsx
"use client";

import PrivateRoute from "../components/PrivateRoute";

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your protected dashboard!</p>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
