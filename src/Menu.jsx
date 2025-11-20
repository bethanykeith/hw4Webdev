import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; 

const menuItems = [
  { name: "House-Brewed Espresso", price: 2 },
  { name: "Latte", price: 3.5 },
  { name: "Americano", price: 3 },
  { name: "Flat White", price: 3 },
  { name: "Croissant", price: 3 },
  { name: "Muffin of the Day", price: 3 },
  { name: "Bag of Coffee Beans", price: 10 },
];

function Menu() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);
      if (existingItem) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/beans.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="hero_text">
        <Link to="/">COFFEE BISTRO MENU</Link>
        </div>
      </div>

      {/* MENU TABLE */}
      <table className="menu">
        <thead>
          <tr>
            <th>Bistro Bites & Drinks</th>
            <th>$</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, idx) => (
            <tr key={idx} onClick={() => addToCart(item)}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart">
        {cart.length === 0 ? (
          <p>NO ITEMS IN CART.</p>
        ) : (
          <>
            {cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.name, parseInt(e.target.value))}
                  style={{
                    width: "60px",
                    marginLeft: "10px",
                    padding: "5px",
                    fontSize: "18px"
                  }}
                />
                <span
                  className="remove-btn"
                  onClick={() => removeFromCart(item.name)}
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </span>
              </div>
            ))}
            <div style={{ fontWeight: "bold", fontSize: "36px", marginTop: "20px" }}>
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={clearCart}
              style={{ marginTop: "10px", padding: "10px 20px", fontSize: "24px" }}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>

      <div className="slider">
        <div className="slides">
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/americano.jpeg`} alt="Slide 1" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/coffee.jpeg`} alt="Slide 2" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/croissant.jpeg`} alt="Slide 3" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/interior.jpeg`} alt="Slide 4" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/muffin.jpeg`} alt="Slide 5" />
          </div>
          <div className="slide">
            <img src={`${process.env.PUBLIC_URL}/Unknown.jpeg`} alt="Slide 6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
