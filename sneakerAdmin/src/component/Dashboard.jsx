import React, { useState, useEffect } from "react";
import { useApp } from "./context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";

const Dashboard = () => {
  const { order, products, getAllOrders, fetchAllProducts, getAllUser, users } =
    useApp();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllOrders();
    fetchAllProducts();
    getAllUser();
  }, []);

  const getDateWithoutTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = getDateWithoutTime(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const filteredOrders = order.filter((currentOrder) => {
    if (!currentOrder.orderDate) {
      console.error("Missing orderDate for order:", currentOrder);
      return false;
    }

    const orderDate = getDateWithoutTime(new Date(currentOrder.orderDate));
    if (isNaN(orderDate.getTime())) {
      console.error(
        "Invalid orderDate format for order:",
        currentOrder.orderDate
      );
      return false;
    }

    if (filter === "today") {
      return orderDate.getTime() === today.getTime();
    } else if (filter === "tomorrow") {
      return orderDate.getTime() === tomorrow.getTime();
    } else {
      return true;
    }
  });

  const totalPrice = filteredOrders.reduce(
    (sum, currentOrder) => sum + (currentOrder.price || 0),
    0
  );

  const data = filteredOrders
    .map((currentOrder) => {
      const dateObj = new Date(currentOrder.orderDate);

      if (isNaN(dateObj.getTime())) {
        console.error("Skipping invalid orderDate:", currentOrder.orderDate);
        return null;
      }

      return {
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: currentOrder.price || 0,
      };
    })
    .filter(Boolean);

  const deliveryCount = order.filter(
    (orders) => orders.status === "DELIVERED"
  ).length;

  return (
    <div>
      <div className="col-span-4 flex justify-end">
        <select
          className="p-2 bg-white border rounded shadow mb-6"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-xl font-bold">{filteredOrders.length}</div>
          <div>All Orders</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-xl font-bold">{totalPrice}</div>
          <div>Estimated Income</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-xl font-bold">{products.length}</div>
          <div>Products</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-xl font-bold">{users.length}</div>
          <div>Activated Users</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-xl font-bold">{deliveryCount}</div>
          <div>Succesfully Delivery</div>
        </div>
      </div>

      <div className="mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Brush dataKey="date" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
