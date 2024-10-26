import React from "react";
import { useApp } from "./context/AppContext";
import { FaUser, FaEnvelope, FaSignOutAlt, FaUserSecret } from "react-icons/fa";

const AdminProfile = () => {
  const { user, logoutUser } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 h-40 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-4xl font-bold">
            {user.fname[0]}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {user.fname} {user.lname}
          </h2>

          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <p className="text-gray-600 text-lg">First Name: {user.fname}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <p className="text-gray-600 text-lg">Last Name: {user.lname}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500" />
              <p className="text-gray-600 text-lg">Email: {user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserSecret className="text-blue-500" />
              <p className="text-gray-600 text-lg">Designation: {user.role}</p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
