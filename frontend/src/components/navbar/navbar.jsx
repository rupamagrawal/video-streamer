// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, loggedIn, logout, loading } = useAuth();

//   if (loading || user === undefined) {
//     return (
//       <header className="flex items-center justify-between px-8 py-4 bg-gray-900 text-gray-200 shadow-md">
//         <h3 className="text-2xl font-bold text-white">
//           <Link to="/">VideoStream</Link>
//         </h3>

//         {/* Placeholder right section */}
//         <div className="w-24 h-8 bg-gray-800 rounded-md animate-pulse"></div>
//       </header>
//     );
//   }

//   // Normal navbar AFTER auth check
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-gray-900 text-gray-200 shadow-md">
//       {/* Logo */}
//       <h3 className="text-2xl font-bold text-white">
//         <Link to="/">VideoStream</Link>
//       </h3>

//       {/* Center */}
//       <nav>
//         <ul className="flex gap-8 text-lg">
//           <li>
//             <Link
//               to="/"
//               className="hover:text-white transition-all duration-200 hover:scale-105"
//             >
//               Home
//             </Link>
//           </li>

//           {/* Upload only if logged in */}
//           {loggedIn && (
//             <li>
//               <Link
//                 to="/upload"
//                 className="hover:text-white transition-all duration-200 hover:scale-105"
//               >
//                 Upload
//               </Link>
//             </li>
//           )}
//         </ul>
//       </nav>

//       {/* Right Side */}
//       <div className="flex items-center gap-4">
//         {/* If NOT logged in */}
//         {!loggedIn && (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
//             >
//               Login
//             </button>

//             <button
//               onClick={() => navigate("/register")}
//               className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-md text-white"
//             >
//               Register
//             </button>
//           </>
//         )}

//         {/* If logged in */}
//         {loggedIn && (
//           <div className="flex items-center gap-4">
//             <img
//               src={user.avatar}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full border border-gray-700 object-cover"
//             />

//             <button
//               onClick={logout}
//               className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loggedIn, logout, loading } = useAuth();

  // 🔥 Prevent flicker on refresh
  if (loading || user === undefined) {
    return (
      <header className="flex items-center justify-between px-8 py-4 bg-gray-900 text-gray-200 shadow-md">
        <h3 className="text-2xl font-bold text-white">
          <Link to="/">VideoStream</Link>
        </h3>

        {/* Placeholder */}
        <div className="w-24 h-8 bg-gray-800 rounded-md animate-pulse"></div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-900 text-gray-200 shadow-md">

      {/* Logo */}
      <h3 className="text-2xl font-bold text-white">
        <Link to="/">VideoStream</Link>
      </h3>

      {/* Center */}
      <nav>
        <ul className="flex gap-8 text-lg">
          <li>
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
          </li>

          {loggedIn && (
            <li>
              <Link to="/upload" className="hover:text-white transition">
                Upload
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {!loggedIn && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 bg-blue-600 rounded-md text-white"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1 bg-green-600 rounded-md text-white"
            >
              Register
            </button>
          </>
        )}

        {loggedIn && (
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-700 object-cover"
            />

            <button
              onClick={logout}
              className="px-4 py-1 bg-red-600 rounded-md text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </header>
  );
}
