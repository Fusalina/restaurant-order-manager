const { Customer, Order, OrderItem, MenuItem } = require("../models");

class CustomerService {
  static async createCustomer(data) {
    const { name, email, phone } = data;

    if (!name || !email || !phone) {
      throw new Error("Name, email, and phone are required.");
    }

    return await Customer.create({ name, email, phone });
  }

  static async getCustomerOrders(customer_id) {
    return await Order.findAll({
      where: { customer_id },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: MenuItem, as: "menuItem" }],
        },
      ],
    });
  }
}

module.exports = CustomerService;
