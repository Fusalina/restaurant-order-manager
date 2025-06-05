const {
  Order,
  OrderItem,
  Customer,
  MenuItem,
  sequelize,
} = require("../models");

module.exports = {
  async createOrder(req, res) {
    // const transaction = await sequelize.transaction();
    // try {
    //   const { customer_id, items } = req.body;
    //   // items = [{ menu_item_id, quantity }]
    //   const order = await Order.create(
    //     { customer_id, status: "pending", total: 0 },
    //     { transaction }
    //   );
    //   let total = 0;
    //   const orderItems = [];
    //   for (const item of items) {
    //     const menuItem = await MenuItem.findByPk(item.menu_item_id);
    //     if (!menuItem) {
    //       throw new Error(`Menu item ${item.menu_item_id} not found`);
    //     }
    //     const subtotal = menuItem.price * item.quantity;
    //     total += subtotal;
    //     const orderItem = await OrderItem.create(
    //       {
    //         order_id: order.id,
    //         menu_item_id: item.menu_item_id,
    //         quantity: item.quantity,
    //         subtotal,
    //       },
    //       { transaction }
    //     );
    //     orderItems.push(orderItem);
    //   }
    //   order.total = total;
    //   await order.save({ transaction });
    //   await transaction.commit();
    //   res.status(201).json({
    //     order,
    //     items: orderItems,
    //   });
    // } catch (error) {
    //   await transaction.rollback();
    //   res.status(500).json({ error: error.message });
    // }
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
    const transaction = await sequelize.transaction();
    try {
      const { order_id } = req.params;
      const { items } = req.body;
      // items = [{ menu_item_id, quantity }]

      const order = await Order.findByPk(order_id, {
        include: [{ model: OrderItem, as: "items" }],
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
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

      res.json({
        order,
        items: newItems,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: error.message });
    }
  },
};
