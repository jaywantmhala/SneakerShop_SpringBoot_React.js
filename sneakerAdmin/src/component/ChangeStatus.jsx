import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "./context/AppContext";

const ChangeStatus = () => {
  const { orderId } = useParams();
  const { order, getAllOrders } = useApp();
  const getOrder = order?.find((p) => p.orderId === parseInt(orderId));
  const [changeStatus, setStatus] = useState("");

  useEffect(() => {
    getAllOrders();
    if (getOrder) {
      setStatus(getOrder.status);
    }
  }, [getAllOrders, getOrder]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    console.log(changeStatus);
  }, [changeStatus]);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto max-w-5xl p-8 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
            <img
              src={getOrder.image}
              alt={getOrder.productName}
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {getOrder.productName}
            </h3>
            <p className="text-xl text-gray-600 bg-gray-50 p-2 rounded shadow">
              ₹{getOrder.price}
            </p>
          </div>

          <div className="md:w-1/2 md:pl-8 flex flex-col justify-between">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Order Details
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Quantity
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
                {getOrder.quantity}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Order Date
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
                {getOrder.orderDate}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Expected Delivery Date
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
                {getOrder.recieveDate}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Order Status
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
                {getOrder.status}
              </p>

              <select
                value={changeStatus}
                onChange={handleStatusChange}
                className="mt-2 p-2 border rounded-lg"
              >
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Status
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
                {getOrder.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatus;
