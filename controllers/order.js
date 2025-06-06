const { Order, OrderItem, MenuItem, sequelize } = require("../models");

const OrderService = require("../services/order");

module.exports = {
  async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(
        req.body.customer_id,
        req.body.items
      );
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;

      const order = await Order.findByPk(order_id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      await order.save();

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async modifyOrder(req, res) {
    const { order_id } = req.params;
    const { items } = req.body;

    try {
      const result = await OrderService.modifyOrder(order_id, items);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
