const { Order, OrderItem, MenuItem, sequelize } = require("../models");

module.exports = {
  async createOrder(customer_id, items) {
    if (!items || items.length === 0) {
      throw new Error("Items array cannot be empty");
    }
    const transaction = await sequelize.transaction();
    try {
      const order = await Order.create(
        { customer_id, status: "pending", total: 0 },
        { transaction }
      );

      let total = 0;
      const orderItems = [];

      for (const item of items) {
        if (item.quantity <= 0) {
          throw new Error(
            `Quantity for item ${item.menu_item_id} must be greater than 0`
          );
        }

        const menuItem = await MenuItem.findByPk(item.menu_item_id);
        if (!menuItem) {
          throw new Error(`Menu item ${item.menu_item_id} not found`);
        }

        const subtotal = menuItem.price * item.quantity;
        total += subtotal;

        const orderItem = await OrderItem.create(
          {
            order_id: order.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            subtotal,
          },
          { transaction }
        );

        orderItems.push(orderItem);
      }

      order.total = total;
      await order.save({ transaction });

      await transaction.commit();

      return { order, orderItems };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async updateOrderStatus(order_id, status) {
    const order = await Order.findByPk(order_id);

    if (!order) {
      throw new Error("Order not found");
    }

    order.status = status;
    await order.save();

    return order;
  },

  async modifyOrder(order_id, items) {
    const transaction = await sequelize.transaction();
    try {
      const order = await Order.findByPk(order_id);

      if (!order) {
        throw new Error("Order not found");
      }

      await OrderItem.destroy({ where: { order_id }, transaction });

      let total = 0;
      const newItems = [];

      for (const item of items) {
        const menuItem = await MenuItem.findByPk(item.menu_item_id);
        if (!menuItem) {
          throw new Error(`Menu item ${item.menu_item_id} not found`);
        }

        const subtotal = menuItem.price * item.quantity;
        total += subtotal;

        const orderItem = await OrderItem.create(
          {
            order_id: order.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            subtotal,
          },
          { transaction }
        );

        newItems.push(orderItem);
      }

      order.total = total;
      await order.save({ transaction });

      await transaction.commit();

      return { order, newItems };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
