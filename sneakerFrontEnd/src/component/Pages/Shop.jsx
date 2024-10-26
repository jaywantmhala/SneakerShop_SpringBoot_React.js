import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const Shop = () => {
  const { products, fetchAllProducts, addToCart, getProductId } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartData = {
      quantity: 1,
    };
    addToCart(product.productId, cartData);
    console.log(product.productId);
  };

  const handleGetProductId = (productId) => {
    getProductId(productId);
    navigate(`/product/${productId}`);
  };

  const handleBuyProductId = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Explore Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.productId}
                className="bg-white shadow-lg rounded-lg p-5 relative overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:scale-105"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleGetProductId(product.productId)}
                >
                  <img
                    src={product.url}
                    alt={product.productName}
                    className="w-full h-56 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-110"
                  />

                  <AiOutlineHeart className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300" />
                </div>

                {/* Product Info */}
                <div className="px-4 py-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {product.description}
                  </h3>
                  <p className="text-gray-700 text-lg font-semibold mb-4">
                    ${product.price}
                  </p>
                </div>

                <div className="px-4 pb-4 flex flex-col space-y-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 mb-2"
                  >
                    <AiOutlineShoppingCart className="mr-2 text-xl" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyProductId(product.productId)}
                    className="flex items-center justify-center bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                  >
                    <BsArrowRight className="mr-2 text-xl" />
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg col-span-3 text-gray-600">
              No products available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
