import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMenuItems(data);
        } else if (Array.isArray(data.menu)) {
          setMenuItems(data.menu);
        } else {
          console.error("Unexpected menu response:", data);
        }
      })
      .catch(err => console.error("Menu fetch error:", err));
  }, []);


  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);

      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
    setMessage(`${item.name} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };


  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    const order = {
      items: cart.map(item => ({
        menuItem: item._id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      if (res.ok) {
        alert("Order placed successfully!");
        setCart([]);
      } else {
        alert("Order failed.");
      }
    } catch (err) {
      console.error(err);
    }
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
          {menuItems.map((item) => (
            <tr key={item._id} onClick={() => addToCart(item)}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        {message && (
          <div className="cart-message" style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            margin: "10px 0",
            borderRadius: "5px",
            fontWeight: "bold"
          }}>
            {message}
          </div>
        )}
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
                  onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  style={{
                    width: "60px",
                    marginLeft: "10px",
                    padding: "5px",
                    fontSize: "18px"
                  }}
                />
                <span
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
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
            <button
              onClick={placeOrder}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "24px",
                backgroundColor: "#2e7d32",
                color: "white"
              }}
            >
              Place Order
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
