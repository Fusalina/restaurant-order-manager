const { Customer, Order, OrderItem, MenuItem } = require("../models");

module.exports = {
  async createCustomer(req, res) {
    try {
      const { name, email, phone } = req.body;

      const customer = await Customer.create({ name, email, phone });

      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCustomerOrders(req, res) {
    try {
      const { customer_id } = req.params;

      const orders = await Order.findAll({
        where: { customer_id },
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [{ model: MenuItem, as: "menuItem" }],
          },
        ],
      });

      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
