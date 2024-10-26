import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Swal from "sweetalert2";

const ViewOrder = () => {
  const { orderId } = useParams();
  const { order, getAllOrder, cancelOrder } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrder();
  }, []);

  const getOrder = order?.find((p) => p.orderId === parseInt(orderId));

  if (!getOrder) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="text-white text-lg">Order not found.</div>
      </div>
    );
  }

  const handleCancelOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(getOrder.orderId, "CANCEL");

        Swal.fire(
          "Cancelled!",
          "Your order has been cancelled.",
          "success"
        ).then(() => {
          navigate("/profile");
        });
      }
    });
  };

  return (
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
            ${getOrder.price}
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
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Payment Status
            </h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded shadow">
              {getOrder.paymentStatus}
            </p>
          </div>

          <Link
            to="/profile"
            className="mt-4 inline-block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition-colors duration-300"
          >
            Back to Orders
          </Link>

          <button
            onClick={handleCancelOrder}
            className="mt-4 inline-block text-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-500 transition-colors duration-300"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
