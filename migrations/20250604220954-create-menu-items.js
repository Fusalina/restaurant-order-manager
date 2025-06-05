"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MenuItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      category: {
        type: Sequelize.ENUM("starter", "main_course", "dessert", "drink"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MenuItems");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_MenuItems_category";'
    );
  },
};
