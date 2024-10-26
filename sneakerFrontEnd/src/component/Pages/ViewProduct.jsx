import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const ViewProduct = () => {
  const { productId } = useParams();
  const { products, fetchAllProducts } = useApp();

  useEffect(() => {
    fetchAllProducts();
  }, []);
  const product = products?.find((p) => p.productId === parseInt(productId));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-3xl font-bold text-red-600">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
      <div className="bg-white shadow-2xl rounded-lg max-w-5xl p-8 transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 rounded-lg">
            <img
              src={product.url}
              alt={product.productName}
              className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
            />
          </div>

          <div className="flex-1 mt-6 md:mt-0 md:ml-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.productName}
            </h1>
            <p className="text-lg text-gray-500 mb-2">
              Product ID:{" "}
              <span className="text-gray-800">{product.productId}</span>
            </p>
            <p className="text-3xl font-semibold text-green-600 mb-6">
              ${product.price}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="mt-8">
              <button className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
