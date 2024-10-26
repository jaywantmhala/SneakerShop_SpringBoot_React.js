import React, { useState } from "react";
import { useApp } from "./context/AppContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logoutUser } = useApp();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const avatarLetter = user.email.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center space-x-4 relative">
        <button className="text-gray-600">🔔</button>
        <button className="text-gray-600">✉️</button>
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="text-xl font-bold">{avatarLetter}</span>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <Link
                to="/adminProfile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={logoutUser}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
