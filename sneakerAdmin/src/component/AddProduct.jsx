import React, { useState } from "react";
import { useApp } from "./context/AppContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { addProduct } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      description,
      price,
      url,
    };

    try {
      const result = await addProduct(newProduct);
      if (result) {
        setMessage("Product added successfully!");
        setMessageType("success");

        setProductName("");
        setDescription("");
        setPrice("");
        setUrl("");
      } else {
        setMessage("Failed to add product.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred while adding the product.");
      setMessageType("error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Add New Product
      </h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded-lg text-center flex items-center justify-center space-x-2 ${
            messageType === "success"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {messageType === "success" ? (
            <FaCheckCircle className="text-2xl" />
          ) : (
            <FaTimesCircle className="text-2xl" />
          )}
          <span className="font-medium">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="productName"
            className="block text-lg font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-indigo-400 transition duration-200"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-indigo-400 transition duration-200"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-lg font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-indigo-400 transition duration-200"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-lg font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-indigo-400 transition duration-200"
            placeholder="Enter image URL"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 text-lg font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
