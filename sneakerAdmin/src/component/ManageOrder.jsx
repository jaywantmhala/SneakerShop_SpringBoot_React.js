import React, { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";

const ManageOrder = () => {
  const { order, getAllOrders, getStatus } = useApp();
  const [filter, setFilter] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatusChange = (e, orderId) => {
    const updatedStatus = e.target.value;
    console.log("Selected Status:", updatedStatus, "Order ID:", orderId);
    getStatus(orderId, updatedStatus);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredOrders = order.filter((item) => {
    const orderDate = new Date(item.orderDate).toLocaleDateString();
    const selectedDateStr = selectedDate
      ? new Date(selectedDate).toLocaleDateString()
      : "";

    return (
      (filter === "ALL" || item.status === filter) &&
      (!selectedDate || orderDate === selectedDateStr)
    );
  });

  const statusOptions = [
    "ALL",
    "CANCEL",
    "PICKED",
    "OUT FOR DELIVERY",
    "DELIVERED",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          <label className="text-sm font-medium text-gray-600 mr-2">
            Filter by Status:
          </label>
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`border border-gray-300 rounded-lg px-4 py-2 ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              setSelectedDate(new Date().toISOString().split("T")[0])
            }
            className="border border-gray-300 rounded-lg px-4 py-2 bg-blue-500 text-white"
          >
            Today
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-red-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((item) => (
            <div
              key={item.orderId}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4"
            >
              <div className="flex justify-between items-center">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.productName}</h2>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Order Date: {item.orderDate}
              </p>

              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-600">
                  Status:
                </label>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(e, item.orderId)}
                  className="border border-gray-300 rounded-lg p-2"
                  disabled={
                    item.status === "CANCEL" || item.status === "DELIVERED"
                  }
                >
                  <option>{item.status}</option>
                  <option value="PICKED">PICKED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
