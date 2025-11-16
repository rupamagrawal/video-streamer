import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loggedIn, logout } = useAuth();  
  
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-900 text-gray-200 shadow-md">
      
      {/* Logo */}
      <h3 className="text-2xl font-bold text-white hover:cursor-pointer transition-all duration-200 hover:scale-105">
        <Link to="/">VideoStream</Link>
      </h3>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-8 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-white transition-all duration-200 hover:scale-105"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/upload"
              className="hover:text-white transition-all duration-200 hover:scale-105"
            >
              Upload
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* SHOW LOGIN IF NOT LOGGED IN */}
        {!loggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-md text-white hover:scale-105"
          >
            Login
          </button>
        )}

        {/* SHOW PROFILE + LOGOUT IF LOGGED IN */}
        {loggedIn && (
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <img
              src={user.avatar}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-700"
            />

            {/* Logout */}
            <button
              onClick={logout}
              className="px-4 py-1 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-md text-white hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
