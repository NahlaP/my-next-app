

// "use client";

// import React from "react";
// import { BiUser } from "react-icons/bi";
// import { FiHeart } from "react-icons/fi";
// import { HiOutlineShoppingBag } from "react-icons/hi";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store";
// import { logout } from "../store/authSlice";
// import { toast } from "sonner";

// const Header = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   const handleLogout = () => {
//     // Clear localStorage if using token there
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Dispatch Redux logout
//     dispatch(logout());

//     toast.success("Logout successful");

//     // Redirect after short delay
//     setTimeout(() => {
//       router.push("/");
//     }, 100);
//   };

//   return (
//     <header className="bg-gray-200 w-full flex items-center justify-between px-6 py-4 shadow-md">
//       <div className="flex items-center gap-2">
//         <Image
//           src="/images/logo.svg"
//           alt="Logo"
//           width={40}
//           height={40}
//           className="object-contain"
//         />
//         <div className="text-2xl font-bold text-gray-800">Store</div>
//       </div>

//       <div className="flex items-center space-x-6 text-lg text-gray-700">
//         {isAuthenticated ? (
//           <button
//             onClick={handleLogout}
//             className="bg-gray-400 hover:bg-gray-700 text-black py-2 px-4 text-sm rounded-md"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link href="/login">
//             <BiUser className="cursor-pointer hover:text-blue-600 transition duration-300" />
//           </Link>
//         )}

//         <Link href="#">
//           <FiHeart className="cursor-pointer hover:text-red-500 transition duration-300" />
//         </Link>
//         <Link href="/cart">
//           <HiOutlineShoppingBag className="cursor-pointer hover:text-green-500 transition duration-300" />
//         </Link>
        
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";

import React from "react";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/authSlice";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    // Clear localStorage if using token there
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch Redux logout
    dispatch(logout());

    toast.success("Logout successful");

    // Redirect after short delay
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <header className="bg-gray-200 w-full flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <div className="text-2xl font-bold text-gray-800">Store</div>
      </div>

      <div className="flex items-center space-x-6 text-lg text-gray-700">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-700 text-black py-2 px-4 text-sm rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <BiUser className="cursor-pointer hover:text-blue-600 transition duration-300" />
          </Link>
        )}

        {user?.isAdmin && (
          <Link
            href="/admin"
            className="text-sm bg-blue-100 hover:bg-blue-300 text-blue-800 py-1 px-3 rounded-md"
          >
            Admin Dashboard
          </Link>
        )}

        <Link href="#">
          <FiHeart className="cursor-pointer hover:text-red-500 transition duration-300" />
        </Link>
        <Link href="/cart">
          <HiOutlineShoppingBag className="cursor-pointer hover:text-green-500 transition duration-300" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
