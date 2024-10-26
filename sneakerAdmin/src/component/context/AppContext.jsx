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
  const [users, setUsers] = useState([]);

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

  const getAllOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:8282/admin/all-order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
    }
  };

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

  const getAllUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8282/admin/all-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
    }
  };

  const logoutUser = () => {
    setAuthToken("");
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8282/admin/status/${orderId}`,
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
        console.log("status:", response.data);
        console.log("New Status: " + newStatus);
      } else {
        console.error("Error updating cart:", response);
      }
    } catch (error) {
      console.error("API Error while updating cart quantity:", error);
    }
  };

  const addProduct = async (newProduct) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8282/admin/create-product",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.status === 201) {
        setProducts((prevProducts) => [...prevProducts, response.data]);
        return true;
      } else {
        console.error("Failed to add product:", response);
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8282/admin/delete-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
        console.log("Product deleted:", productId);
        return true;
      } else {
        console.error("Failed to delete product:", response);
        return false;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        users,
        authToken,
        loginUser,

        products,
        fetchAllProducts,
        getAllUser,
        addProduct,

        deleteProduct,
        getStatus,
        order,
        logoutUser,
        getAllOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
