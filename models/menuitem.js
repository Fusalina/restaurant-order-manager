"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {}
  }

  MenuItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      category: {
        type: DataTypes.ENUM("starter", "main_course", "dessert", "drink"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MenuItem",
      tableName: "MenuItems",
      timestamps: true,
    }
  );

  return MenuItem;
};
