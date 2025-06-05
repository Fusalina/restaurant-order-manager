"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          customer_id: 1, // assuming Rita Von Hunty exists with id 1
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customer_id: 2, // assuming Vanessa Suoersauro exists with id 2
          status: "preparing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
