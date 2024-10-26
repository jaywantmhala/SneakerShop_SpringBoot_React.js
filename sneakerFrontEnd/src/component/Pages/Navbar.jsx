import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const {
    user,
    cartItems = [],
    getCartItems,
    updateCartQuantity,
    deleteCartItem,
    logoutUser,
  } = useApp();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleDeleteFromCart = (cartId) => {
    deleteCartItem(cartId);
    console.log("Cart item deleted with id: " + cartId);
  };

  useEffect(() => {
    getCartItems();
    console.log(cartItems);
  }, []);

  const avatarLetter =
    user && user.email ? user.email.charAt(0).toUpperCase() : "";

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-500 p-4 shadow-lg text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/home" className="text-3xl font-bold tracking-wide">
          SneakerShop
        </Link>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={toggleCart}
              className="hover:text-gray-200 transition-colors duration-300 flex items-center bg-transparent border-none cursor-pointer"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  fontSize: "14px",
                  width: "15px",
                  height: "15px",
                  margin: "11px",
                }}
              >
                <span
                  style={{ position: "absolute", top: "-7px", left: "4px" }}
                >
                  {cartItems.length}
                </span>
              </span>
            </button>
          </li>
          {user ? (
            <li className="relative flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center relative group">
                {avatarLetter}
                <div className="absolute hidden group-hover:block top-10 left-1/2 transform -translate-x-1/2 w-24 bg-white text-gray-800 shadow-lg rounded-md text-center p-2 z-50">
                  <Link
                    to="/profile"
                    className="block text-sm font-medium hover:text-blue-500 transition-colors duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-sm font-medium text-red-500 hover:text-red-700 transition-colors duration-300 mt-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <span>{user.email}</span>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="hover:text-gray-200 transition-colors duration-300 flex items-center"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-3xl focus:outline-none bg-transparent border-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-red-400 hover:text-red-600 transition-colors duration-300" />
            ) : (
              <Menu className="h-6 w-6 hover:text-blue-300 transition-colors duration-300" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="text-lg p-4 space-y-4 rounded-lg shadow-lg">
          <li>
            <Link
              to="/home"
              className="block px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="block px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <button
              onClick={toggleCart}
              className="w-full justify-start px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300 flex items-center bg-transparent border-none cursor-pointer"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Cart
            </button>
          </li>
          {user ? (
            <li className="flex items-center space-x-2 px-4 py-2">
              <div className="w-8 h-8 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center">
                {avatarLetter}
              </div>
              <span>{user.email}</span>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-blue-700 rounded transition-all duration-300"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div
        className={`fixed top-0 right-0 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: "100vh", overflowY: "auto", zIndex: 50 }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            className="text-gray-700 hover:text-red-600 transition-colors duration-300 focus:outline-none"
            onClick={() => setCartOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="mt-8 p-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="border border-gray-300 rounded px-2 py-1 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateCartQuantity(item.cartId, item.quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-500">
                      {item.quantity}
                    </span>
                    <button
                      className="border border-gray-300 rounded px-2 py-1 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                      onClick={() => {
                        updateCartQuantity(item.cartId, item.quantity + 1);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      onClick={() => handleDeleteFromCart(item.cartId)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
