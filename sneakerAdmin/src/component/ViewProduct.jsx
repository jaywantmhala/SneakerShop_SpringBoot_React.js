import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useApp } from "./context/AppContext";

const ViewProduct = () => {
  const { products, fetchAllProducts, deleteProduct } = useApp();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Product List
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <button
                onClick={() => deleteProduct(product.productId)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                title="Delete Product"
              >
                <FaTrash size={16} />
              </button>

              <img
                src={product.url}
                alt={product.productName}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 text-gray-800">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold text-lg mb-2">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Product ID: {product.productId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
