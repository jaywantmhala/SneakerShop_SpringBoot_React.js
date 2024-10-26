import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../component/Pages/Navbar";
import Footer from "../component/Pages/Footer";
import Home from "../component/Pages/Home";
import Login from "../component/Auth/Login";
import SignUp from "../component/Auth/SignUp";
import ProfilePage from "../component/User/ProfilePage";
import Cart from "../component/User/Cart";
import Shop from "../component/Pages/Shop";
import ViewProduct from "../component/Pages/ViewProduct";
import Checkout from "../component/Pages/Checkout";
import ViewOrder from "../component/Pages/ViewOrder";
import Contact from "../component/Pages/Contact";
import About from "../component/Pages/About";

const RouterNavbar = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ViewProduct />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/order/:orderId" element={<ViewOrder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default RouterNavbar;
