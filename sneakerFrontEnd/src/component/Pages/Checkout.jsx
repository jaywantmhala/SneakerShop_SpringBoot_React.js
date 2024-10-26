import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const Checkout = () => {
  const { productId } = useParams();
  const { products, fetchAllProducts, createOrder, deleteCartItem } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const product = products?.find((p) => p.productId === parseInt(productId));

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePaymentChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const processOrder = async () => {
    if (!product) {
      setError("Product not found.");
      return;
    }

    const newProduct = {
      productId: product.productId,
      productName: product.productName,
      image: product.url,
      price: product.price * quantity,
      description: product.description,
      quantity,
      paymentStatus,
    };

    try {
      await createOrder(newProduct);

      Swal.fire({
        title: "Success!",
        text: "Order placed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/profile");
      });
    } catch (err) {
      console.error(err);
      setError("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {product ? (
          <div className="flex flex-col md:flex-row items-start">
            <img
              src={product.url}
              alt={product.name}
              className="w-64 h-64 object-cover rounded-md mb-4 md:mb-0 md:mr-8"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                {product.productName}
              </h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mb-4">
                ${product.price * quantity}
              </p>

              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="bg-gray-200 px-4 py-2 rounded-l-md text-xl font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border border-gray-300"
                />
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="bg-gray-200 px-4 py-2 rounded-r-md text-xl font-bold"
                >
                  +
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                <label className="block mb-2">
                  <input
                    type="radio"
                    value="Cash on Delivery"
                    checked={paymentStatus === "Cash on Delivery"}
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
                <label className="block mb-2">
                  <input
                    type="radio"
                    value="UPI"
                    checked={paymentStatus === "UPI"}
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  UPI
                </label>
              </div>

              <button
                onClick={processOrder}
                className="bg-yellow-500 text-white w-full py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition duration-200"
              >
                Order
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
