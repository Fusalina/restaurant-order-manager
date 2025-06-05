"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderItems",
      [
        {
          order_id: 1, // for Rita's order
          menu_item_id: 1, // Olive Mix (starter)
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 1,
          menu_item_id: 3, // Chocolate Cake (dessert)
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 2, // for Vanessa's order
          menu_item_id: 2, // Lychee Ceviche (main_course)
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order_id: 2,
          menu_item_id: 4, // Negroni Sbagliato (drink)
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
