const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// create order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      total += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      items,
      totalPrice: total
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
