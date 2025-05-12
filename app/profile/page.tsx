// // app/profile/page.tsx

// "use client";

// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
// import withAuth from "../utils/withAuth"; // Adjusted import path

// const ProfilePage = () => {
//   const user = useSelector((state: RootState) => state.auth.user);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//       <p>
//         <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
//       </p>
//     </div>
//   );
// };

// // Wrap ProfilePage with withAuth to ensure authentication is required
// export default withAuth(ProfilePage);



"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import withAuth from "../utils/withAuth";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01]">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Name & Email */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{user.email}</p>

          {/* Info Grid */}
          <div className="w-full text-left space-y-3 mt-4 text-sm text-gray-700">
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Role</span>
              <span className={`font-semibold ${user.isAdmin ? "text-green-600" : "text-blue-600"}`}>
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>

            {user.pin && (
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PIN</span>
                <span className="text-gray-800 font-semibold">{user.pin}</span>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => router.push("/logout")}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
