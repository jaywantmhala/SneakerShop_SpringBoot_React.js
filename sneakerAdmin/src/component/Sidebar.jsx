import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "./context/AppContext";

const Sidebar = () => {
  const { user } = useApp();

  const avatarLetter = user.email.charAt(0).toUpperCase();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 min-h-screen">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3">
          <span className="text-xl font-bold">{avatarLetter}</span>
        </div>
        <div>
          <h4 className="text-lg font-bold">{user.email}</h4>
          <span className="text-sm text-green-500">Online</span>
        </div>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/home">Dashboard</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/manage-order">Manage Order</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/addProduct">Add Product</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/viewProduct">Manage Products</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
