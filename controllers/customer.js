const CustomerService = require("../services/customer");

module.exports = {
  async createCustomer(req, res) {
    try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCustomerOrders(req, res) {
    try {
      const { customer_id } = req.params;
      const orders = await CustomerService.getCustomerOrders(customer_id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
