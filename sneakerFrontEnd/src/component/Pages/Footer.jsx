import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-700 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">SneakerShop</h2>
          <p className="mb-4">
            Your one-stop shop for the latest and greatest sneakers. Premium
            quality, affordable prices, and fast delivery!
          </p>
          <div className="flex space-x-4">
            <Link
              to="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
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
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-200 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="mb-4">
            Get the latest news and updates straight to your inbox.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-gray-300">
        <p>&copy; 2024 SneakerShop By Jaywant Mhala. All Rights Reserved.</p>
        <p>
          Built with passion by
          <a
            href="https://github.com/jaywantmhala"
            className="hover:underline hover:text-white transition-all duration-300"
          >
            SneakerShop Dev Team
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
