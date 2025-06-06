"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderItems",
      [
        {
          order_id: 1,
          menu_item_id: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 1,
          menu_item_id: 3,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 2,
          menu_item_id: 2,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 2,
          menu_item_id: 4,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderItems", null, {});
  },
};
