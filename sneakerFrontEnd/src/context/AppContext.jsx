import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  // const [role, setRole] = useState("");

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8282/auth/login", {
        email,
        password,
      });
      const { token, userData } = response.data;
      setAuthToken(token);
      setUser(userData);

      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const saveUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8282/auth/save",
        userData
      );

      const { token, user } = response.data;
      setAuthToken(token);
      setUser(user);

      localStorage.setItem("token", token);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to save user:", error);
      throw error;
    }
  };

  // const registerUser = async (userData) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8282/auth/register",
  //       userData
  //     );
  //     return response.data;
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     throw error;
  //   }
  // };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8282/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        fetchUserProfile();
      }
    }
  }, [authToken]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8282/auth/getAllProduct"
      );

      if (response.status === 200) {
        setProducts(response.data);
        console.log("Products fetched:", response.data);
      } else {
        console.error("Error fetching products:", response);
      }
    } catch (error) {
      console.error("API Error while fetching products:", error);
    }
  };

  const logoutUser = () => {
    setAuthToken("");
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // for all product

  // const addProduct = async (newProduct) => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No authentication token found");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8282/admin/create-product", // Your API URL
  //       newProduct,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.data && response.status === 201) {
  //       setProducts((prevProducts) => [...prevProducts, response.data]); // Add the new product
  //       return true; // Indicate success
  //     } else {
  //       console.error("Failed to add product:", response);
  //       return false; // Failure case
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     return false; // Error case
  //   }
  // };

  const getCartItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8282/user/getAllCart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems(response.data);
        console.log(response.data);
      } else {
        console.error("Error fetching cart items:", response);
      }
    } catch (error) {
      console.error("API Error while fetching cart items:", error);
    }
  };
  const updateCartQuantity = async (cartId, newQuantity) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8282/user/update-cart/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity: newQuantity } : item
          )
        );
        console.log("Cart updated successfully:", response.data);
        console.log("NewQuantity: " + newQuantity);
      } else {
        console.error("Error updating cart:", response);
      }
    } catch (error) {
      console.error("API Error while updating cart quantity:", error);
    }
  };

  const addToCart = async (productId, cartData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8282/user/add-cart/${productId}`,
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) => [...prevItems, response.data]);
        console.log("Product added to cart:", response.data);
        return response.data;
      } else {
        console.error("Failed to add product to cart:", response);
        return null;
      }
    } catch (error) {
      console.error("API Error while adding product to cart:", error);
      return null;
    }
  };

  const deleteCartItem = async (cartId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8282/user/delete-cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartId !== cartId)
        );
        console.log("Cart item deleted successfully");
      } else {
        console.error("Error deleting cart item:", response);
      }
    } catch (error) {
      console.error("API Error while deleting cart item:", error);
    }
  };

  const getProductId = (productId) => {
    console.log("From context", productId);
  };

  const getOrderId = (orderId) => {
    console.log("From context", orderId);
  };

  const createOrder = async (newProduct) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8282/user/create-order",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.status === 201) {
        setOrder((prevOrders) => [...prevOrders, response.data]);
        return true;
      } else {
        console.error("Failed to create order:", response);
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  const getAllOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8282/user/all-order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setOrder(response.data);
        console.log(response.data);
      } else {
        console.error("Error fetching order:", response);
      }
    } catch (error) {
      console.error("API Error while fetching cart items:", error);
    }
  };

  const cancelOrder = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8282/user/cancel-order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrder((prevItems) =>
          prevItems.map((item) =>
            item.orderId === orderId ? { ...item, status: newStatus } : item
          )
        );
        console.log("Cart updated successfully:", response.data);
        console.log("NewQuantity: " + newStatus);
      } else {
        console.error("Error updating cart:", response);
      }
    } catch (error) {
      console.error("API Error while updating cart quantity:", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        authToken,
        loginUser,
        saveUser,
        logoutUser,
        cartItems,
        getCartItems,
        products,
        fetchAllProducts,
        addToCart,
        updateCartQuantity,
        deleteCartItem,
        getProductId,
        createOrder,
        order,
        getAllOrder,
        cancelOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
