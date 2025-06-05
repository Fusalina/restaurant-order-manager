"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {}
  }

  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Must be a valid email address" },
          notEmpty: { msg: "Email is required" },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone number is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Customers", // make sure this matches your table name in migrations
      timestamps: true,
    }
  );

  return Customer;
};
