import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Login from "../Login";
import { useApp } from "../context/AppContext";
import ManageOrder from "../ManageOrder";
import ChangeStatus from "../ChangeStatus";
import AddProduct from "../AddProduct";
import AdminProfile from "../AdminProfile";
import ViewProduct from "../ViewProduct";

const RouterNavbar = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {}, [user, navigate]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-order" element={<ManageOrder />} />
            <Route path="/status/:orderId" element={<ChangeStatus />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
            <Route path="/viewProduct" element={<ViewProduct />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default RouterNavbar;
