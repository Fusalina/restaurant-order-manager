"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "MenuItems",
      [
        {
          name: "Olive Mix",
          description: "A selection of marinated olives and herbs",
          price: 5.5,
          category: "starter",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lychee Ceviche",
          description: "Fresh lychee ceviche with citrus and herbs",
          price: 14.0,
          category: "main_course",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chocolate Cake",
          description: "Rich chocolate layered cake",
          price: 6.5,
          category: "dessert",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Negroni Sbagliato",
          description: "A sparkling twist on the classic Negroni cocktail",
          price: 9.0,
          category: "drink",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MenuItems", null, {});
  },
};
