import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaFilter, FaCalendarAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user, logoutUser, order, getAllOrder } = useApp();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [calendarDate, setCalendarDate] = useState("");

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleGetOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const filteredOrders = order
    ?.filter((ord) => {
      if (filter === "all") return true;
      if (filter === "active") return ord.status !== "CANCEL";
      if (filter === "canceled") return ord.status === "CANCEL";
      return true;
    })
    .filter((ord) => {
      const orderDate = new Date(ord.orderDate);
      if (dateFilter === "today") return isSameDay(orderDate, today);
      if (dateFilter === "yesterday") return isSameDay(orderDate, yesterday);
      if (calendarDate) return isSameDay(orderDate, new Date(calendarDate));
      return true;
    });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="text-white text-lg">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto max-w-5xl p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-purple-100 rounded-full">
              <FaUser className="text-4xl text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              {user.fname} {user.lname}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <button
            onClick={logoutUser}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none mb-8"
          >
            <FaSignOutAlt /> Logout
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="text-gray-700" htmlFor="orderFilter">
                <FaFilter className="inline-block mr-1" /> Filter Orders:
              </label>
              <select
                id="orderFilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              >
                <option value="all">All Orders</option>
                <option value="active">Active Orders</option>
                <option value="canceled">Canceled Orders</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700" htmlFor="dateFilter">
                <FaCalendarAlt className="inline-block mr-1" /> Filter by Date:
              </label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700" htmlFor="calendarDate">
                Select a Date:
              </label>
              <input
                type="date"
                id="calendarDate"
                value={calendarDate}
                onChange={(e) => setCalendarDate(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Order History
            </h3>
            {filteredOrders && filteredOrders.length > 0 ? (
              <ul className="space-y-4">
                {filteredOrders.map((order) => (
                  <li
                    key={order.orderId}
                    className="border-b pb-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="w-20 h-20 object-cover mr-4 rounded"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-gray-700">
                          Order ID: {order.orderId}
                        </h4>
                        <p className="text-gray-600">
                          Product: {order.productName} | Quantity:{" "}
                          {order.quantity}
                        </p>
                        <p className="text-gray-600">
                          Total Price: ${order.price * order.quantity}
                        </p>
                        <p className="text-gray-600">Status: {order.status}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGetOrder(order.orderId)}
                      className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white focus:outline-none"
                    >
                      View Order
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
