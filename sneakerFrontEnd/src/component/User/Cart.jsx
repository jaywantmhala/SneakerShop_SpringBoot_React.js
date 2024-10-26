import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";

const Cart = () => {
  const { cartItems, getCartItems } = useApp();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.productName} - {item.quantity} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
